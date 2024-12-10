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
  height: calc(100vh - 100px); /* Adjust the 100px as needed */
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

