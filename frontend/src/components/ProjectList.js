import React, { useState, useEffect } from "react";
import "../styles/css/ProjectList.css";
import { ListGroup, Container, Spinner, Alert } from "react-bootstrap";
import { FaFolder } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai"; // Import a better project-related icon

import axios from "axios";

const jwtToken = localStorage.getItem("jwtToken");

const ProjectList = ({ onRowClick, refresh, selectedProjectId }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
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
        {loading && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <Spinner animation="border" variant="primary" />
            <p>Loading projects...</p>
          </div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && !error && projects.length === 0 && (
          <p style={{ textAlign: "center", color: "#666" }}>No projects found.</p>
        )}
        {!loading && !error && (
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
                  <AiOutlineProject className="project-icon" />
                  <span className="project-name">{project.name}</span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    </Container>
  );
};

export default ProjectList;
