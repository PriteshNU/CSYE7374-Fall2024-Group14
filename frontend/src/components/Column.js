import React from "react";
import styled from "styled-components";
import Task from "./Task";
import "../styles/css/scroll.css";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  background-color: #f4f5f7;
  border-radius: 2.5px;
  width: 300px;
  height: 65vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid gray;
`;

const Title = styled.h3`
  padding: 8px;
  background-color: pink;
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
  const columnTasks = tasks || [{}];
  console.log(columnTasks);

  return (
    <Container className="column">
      <Title
        style={{
          backgroundColor: "black",
          color: "white",
          position: "sticky",
          top: 0,
        }}
      >
        {title}
      </Title>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {columnTasks.map((task, index) => (
              <Task
                key={task.id} // Use task ID as the key
                index={index}
                task={task}
                isDraggable={true}
                isDone={false}
              />
            ))}

            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
