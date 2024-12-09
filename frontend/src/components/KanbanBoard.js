import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import "../styles/css/KanbanBoard.css";

const jwtToken = localStorage.getItem("jwtToken");

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f4f8;
  min-height: 100vh;
`;

const BoardTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ColumnsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
`;


export default function KanbanBoard({ data }) {
  const [notStarted, setNotStarted] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [onHold, setOnHold] = useState([]);

  useEffect(() => {
    const dataToDisplay = data;
    if (!data || data.length === 0) {
      console.error("No tasks found in the data prop.");
      return;
    }
    
    const filterNotStarted = dataToDisplay.filter(item => item.status === "Open");
    setNotStarted(filterNotStarted || [{}]);

    const filterInProgress = dataToDisplay.filter(item => item.status === "InProgress");
    setInProgress(filterInProgress || [{}]);

    const filterCompleted = dataToDisplay.filter(item => item.status === "Done");
    setCompleted(filterCompleted || [{}]);

    const filterInReview = dataToDisplay.filter(item => item.status === "InReview");
    setInReview(filterInReview || [{}]);

    const filterOnHold = dataToDisplay.filter(item => item.status === "OnHold");
    setOnHold(filterOnHold || [{}]);
}, [data]);

  // Function to handle the end of a drag operation
  const handleDragEnd = async (result) => {
    if (!result.destination) {
      console.log("No destination");
      return;
    }

    const { destination, source, draggableId } = result;
    // console.log("source:", source);
    // console.log("destination:", destination);

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
      ...inReview,
      ...onHold,
    ]);
    console.log("task:", task);

    if (!task) {
      console.log("Task not found");
      return;
    } else {
      // update status
      var status = "";
      if (destination.droppableId === "2" && source.droppableId === "1") {
        status = "InProgress"; // Open to In Progress
    } else if (destination.droppableId === "4") {
        status = "InReview"; // Any state to In Review
    } else if (destination.droppableId === "5" && source.droppableId != "1") {
        status = "OnHold"; // Any state to On Hold
    } else if (destination.droppableId === "3" && source.droppableId === "2") {
        status = "Done"; // In Progress to Done
    }else if (destination.droppableId === "2" && source.droppableId === "5") {
      status = "InProgress"; // On Hold to In Progress
  } 
    else {
      // Toast.error("Invalid drag-and-drop operation.");
        console.error("Invalid drag-and-drop operation.");
        return;
    }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${jwtToken}`);
    // Update task status locally
    const updatedTask = { ...task, status };

    // Remove task from source column and add to destination column
    const removeFromSource = (column, setColumn) =>
        setColumn(column.filter((t) => t.id !== task.id));

    const addToDestination = (setColumn) =>
        setColumn((prev) => [...prev, updatedTask]);

    if (source.droppableId === "1") {
        removeFromSource(notStarted, setNotStarted);
    } else if (source.droppableId === "2") {
        removeFromSource(inProgress, setInProgress);
    } else if (source.droppableId === "3") {
        removeFromSource(completed, setCompleted);
    } else if (source.droppableId === "4") {
        removeFromSource(inReview, setInReview);
    } else if (source.droppableId === "5") {
        removeFromSource(onHold, setOnHold);
    }

    if (destination.droppableId === "2") {
        addToDestination(setInProgress);
    } else if (destination.droppableId === "3") {
        addToDestination(setCompleted);
    } else if (destination.droppableId === "4") {
        addToDestination(setInReview);
    } else if (destination.droppableId === "5") {
        addToDestination(setOnHold);
    } else if (destination.droppableId === "1") {
        addToDestination(setNotStarted);
    }

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
      console.log("Sending request to backend:", raw); // Log request payload
      console.log("Request Options:", requestOptions); // Log headers and options
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    //  --------------------------

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
      <BoardContainer>
        <BoardTitle>Kanban Board</BoardTitle>
        <ColumnsContainer>
          <Column title="To Do" tasks={notStarted} id="1" />
          <Column title="In Progress" tasks={inProgress} id="2" />
          <Column title="Done" tasks={completed} id="3" />
          <Column title="In Review" tasks={inReview} id="4" />
          <Column title="On Hold" tasks={onHold} id="5" />
        </ColumnsContainer>
      </BoardContainer>
    </DragDropContext>
  );
}