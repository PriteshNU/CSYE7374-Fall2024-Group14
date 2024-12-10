import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TaskContainer = styled.div`
  background-color: ${(props) =>
    props.isDragging ? "#d1ecf1" : props.isCompleted ? "#d4edda" : "#f8f9fa"};
  border: ${(props) =>
    props.isDragging ? "2px dashed #007bff" : "1px solid #ced4da"};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 8px;
  cursor: grab;
  box-shadow: ${(props) =>
    props.isDragging ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "none"};
  transition: box-shadow 0.2s ease;
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskTitle = styled.h5`
  font-size: 16px;
  margin: 0;
`;

const TaskPriority = styled.span`
  background-color: ${(props) =>
    props.priority === "High"
      ? "#f8d7da"
      : props.priority === "Medium"
      ? "#fff3cd"
      : "#d4edda"};
  color: ${(props) =>
    props.priority === "High"
      ? "#721c24"
      : props.priority === "Medium"
      ? "#856404"
      : "#155724"};
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
`;

export default function Task({ task, index, onTaskClick }) {

  const handleTaskClick = () => {
    localStorage.setItem("selectedTaskId", task.id);
    onTaskClick("AssignTask");
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <TaskContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          isCompleted={task.status === "Done"}
          onClick={handleTaskClick}
        >
          <TaskHeader>
            <TaskTitle>{task.name}</TaskTitle>
            <TaskPriority priority={task.priority}>
              {task.priority}
            </TaskPriority>
          </TaskHeader>
          <p>{task.description}</p>
        </TaskContainer>
      )}
    </Draggable>
  );
}
