import React from "react";
import "../styles/css/ProjectList.css";
import { ListGroup, Container } from "react-bootstrap";
import { FaFolder } from "react-icons/fa"; // Use folder icon for each project

const ProjectList = ({ onRowClick, projects }) => {
  return (
    <Container fluid className="tasklist-container">
      <div
        className="project-list-scroll"
        style={{
          height: "350px", // Slightly taller for a better view
          overflowY: "auto", // Enables vertical scrolling when needed
        }}
      >
        <ListGroup variant="flush">
          {projects.map((project) => (
            <ListGroup.Item
              key={project.id}
              onClick={() => onRowClick(project.id)}
              className="project-list-item"
            >
              <div className="project-item-content">
                <FaFolder className="project-icon" /> {/* Folder icon */}
                <span className="project-name">{project.name}</span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
};

export default ProjectList;