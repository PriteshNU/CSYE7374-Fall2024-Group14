import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar, Image } from "antd";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 90px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TextContent = styled.div`
  display: flex;
`;

const Icons = styled.div`
  display: flex;
  justify-content: end;
  padding: 2px;
`;
function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDone
    ? "#F2D7D5"
    : props.isDraggable
    ? "#DCDCDC"
    : "#EAF4FC";
}

export default function Task({ task, index }) {
  const navigate = useNavigate();

  // const handleTaskClick = () => {
  //   navigate(`/assignTask/${task.id}`);
  // };

  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          // onClick={handleTaskClick}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging} // Update property name
        >
          <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span>
              <small>
                #{task.id}
                {"  "}
              </small>
            </span>
          </div>
          <div
            style={{
              textAlign: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <h4 style={{ fontWeight: "Bolder" }}>{task.name}</h4>
            <h5>{task.description}</h5>
            <h6 style={{ fontStyle: "italic" }}>priority : {task.priority}</h6>
          </div>
          <Icons>
            <div>
              <Avatar
                onClick={() => console.log(task)}
                src={"https://joesch.moe/api/v1/random?key=" + task.id}
              />
            </div>
          </Icons>
          {provided.placeholder ? (
            <div ref={provided.placeholder} style={{ visibility: "hidden" }} />
          ) : null}
        </Container>
      )}
    </Draggable>
  );
}
