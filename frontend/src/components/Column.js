import React from "react";
import styled from "styled-components";
import Task from "./Task";
import "../styles/css/scroll.css";
import { Droppable } from "react-beautiful-dnd";

const ColumnContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  max-height: 70vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
`;

const ColumnTitle = styled.h3`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const TaskList = styled.div`
  padding: 3px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "blue" : "#f4f5f7")};
  flex-grow: 1;
  min-height: 100px;
`;

export default function Column({ title, tasks, id }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <ColumnContainer ref={provided.innerRef} {...provided.droppableProps}>
          <ColumnTitle>{title}</ColumnTitle>
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </ColumnContainer>
      )}
    </Droppable>
  );
}

