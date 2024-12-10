import React, { useState, useEffect } from "react";
import "../styles/css/ProjectList.css";
import { ListGroup, Container } from "react-bootstrap";
import { FaFolder } from "react-icons/fa"; // Use folder icon for each project
import axios from "axios";

const jwtToken = localStorage.getItem("jwtToken");

const ProjectList = ({ onRowClick, refresh, selectedProjectId }) => {
  const [projects, setProjects] = useState([]);

  const user_id = localStorage.getItem("user_id");
  const userRole = localStorage.getItem("user_role");
  const isUserAdminOrManager = userRole === "Admin" || userRole === "Manager";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          isUserAdminOrManager
            ? `${process.env.REACT_APP_API_BASE_URL}/api/v1/projects?page=0&size=50`
            : `${process.env.REACT_APP_API_BASE_URL}/api/v1/projects?page=0&size=50&userId=${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const fetchedProjects = response.data.data;

        if (Array.isArray(fetchedProjects)) {
          setProjects(fetchedProjects);
        } else {
          console.error(
            "API response does not contain an array of projects:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <Container fluid className="tasklist-container">
      <div
        className="project-list-scroll"
        style={{
          height: "350px",
          overflowY: "auto",
        }}
      >
        <ListGroup variant="flush">
          {projects.map((project) => (
            <ListGroup.Item
              key={project.id}
              onClick={() => onRowClick(project.id)}
              className={`project-list-item ${
                project.id === selectedProjectId ? "active" : ""
              }`}
            >
              <div className="project-item-content">
                <FaFolder className="project-icon" />
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

