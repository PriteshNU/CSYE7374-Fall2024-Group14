import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import "../styles/css/KanbanBoard.css";
const jwtToken = localStorage.getItem("jwtToken");

export default function KanbanBoard({ data }) {
  const [notStarted, setNotStarted] = useState([{}]);
  const [inProgress, setInProgress] = useState([{}]);
  const [completed, setCompleted] = useState([{}]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const username = localStorage.getItem("user_name");

  useEffect(() => {
    const dataToDisplay = data;
    console.log(username);
    console.log(dataToDisplay);
    const filterNotStarted = dataToDisplay.filter(
      (item) => item.status === "Open"
    );
    setNotStarted(filterNotStarted || [{}]);

    const filterInProgress = dataToDisplay.filter(
      (item) => item.status === "InProgress" || item.status === "OnHold"
    );
    setInProgress(filterInProgress || [{}]);

    const filterCompleted = dataToDisplay.filter(
      (item) => item.status === "Done"
    );
    setCompleted(filterCompleted || [{}]);
  }, [data]);

  // Function to handle the end of a drag operation
  const handleDragEnd = async (result) => {
    console.log("result:", result);

    if (!result.destination) {
      console.log("No destination");
      return;
    }

    const { destination, source, draggableId } = result;
    console.log("source:", source);
    console.log("destination:", destination);

    // If the source and destination columns are the same, do nothing
    if (source.droppableId === destination.droppableId) {
      console.log("Same column, do nothing");
      return;
    }

    // Find the task based on the dragged ID
    const task = findItemById(draggableId, [
      ...notStarted,
      ...inProgress,
      ...completed,
    ]);
    console.log("task:", task);

    if (!task) {
      console.log("Task not found");
      return;
    } else {
      // update status
      var status = "";
      if (destination.droppableId === "2" && source.droppableId === "1") {
        console.log("dest id : " + destination.droppableId);
        status = "InProgress";
      } else if (
        destination.droppableId === "3" &&
        source.droppableId === "2"
      ) {
        status = "Done";
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${jwtToken}`);

      var raw = JSON.stringify({
        id: task.id,
        name: task.name,
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
        status: status,
        assignee: {
          id: 0,
          username: "string",
          firstname: "string",
          lastname: "string",
          role: "Admin",
        },
        comments: [
          {
            id: 0,
            user: {
              id: 0,
              username: "string",
              firstname: "string",
              lastname: "string",
              role: "Admin",
            },
            createdAt: "2023-12-11T08:22:21.291Z",
            comment: "string",
          },
        ],
        assigneeId: task.assignee.id,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8080/api/v1/tasks/changeStatus",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      //--------------------------

      try {
        const response = await fetch("http://localhost:8080/api/v1/tasks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const tasks = await response.json();
        console.log(tasks);
        const notStartedTasks = tasks.data.filter(
          (task) => task.status === "Open"
        );
        const inProgressTasks = tasks.data.filter(
          (task) => task.status === "InProgress"
        );
        const completedTasks = tasks.data.filter(
          (task) => task.status === "Done"
        );

        setNotStarted(notStartedTasks);
        setInProgress(inProgressTasks);
        setCompleted(completedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    // Separate tasks based on their status
    const updatedNotStarted = notStarted.filter((t) => t.id !== task.id);
    const updatedInProgress = inProgress.filter((t) => t.id !== task.id);
    const updatedCompleted = completed.filter((t) => t.id !== task.id);

    // Logic for moving tasks between columns
    if (destination.droppableId === "2" && task.status === "notStarted") {
      // Move the task to "In Progress"
      console.log("Moving to In Progress");
      setNotStarted(updatedNotStarted);
      setInProgress((prevInProgress) => [
        ...prevInProgress,
        { ...task, status: "inProgress" },
      ]);
    } else if (
      destination.droppableId === "3" &&
      task.status === "inProgress"
    ) {
      // Move the task to "Done"
      console.log("Moving to Done");
      setInProgress(updatedInProgress);
      setCompleted((prevCompleted) => [
        ...prevCompleted,
        { ...task, status: "completed" },
      ]);
    }
  };

  // Function to find an item by its ID in an array
  const findItemById = (id, array) =>
    array.find((item) => item && item.id.toString() === id.toString());

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-container">
        <h2 className="board-title">Kanban Board</h2>
        <br />
        <div className="columns-container">
          {/* Render columns for "To Do", "In Progress", and "Done" */}
          <Column title={"To Do"} tasks={notStarted} id={"1"} />
          <Column title={"In Progress"} tasks={inProgress} id={"2"} />
          <Column title={"Done"} tasks={completed} id={"3"} />
        </div>
      </div>
    </DragDropContext>
  );
}
