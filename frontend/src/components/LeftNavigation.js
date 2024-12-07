import React, { useState, useEffect } from "react";
import "../styles/css/LeftNavbar.css";
import { Nav, Container, Button } from "react-bootstrap";
import TaskList from "./TaskList";
import axios from "axios";
const jwtToken = localStorage.getItem("jwtToken");

const LeftNavigation = ({ onButtonClick, onRowClick }) => {
  const userRole = localStorage.getItem("user_role");
  const userName = localStorage.getItem("user_name");
  const isUserAdminOrManager = userRole === "Admin" || userRole === "Manager";
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/users/${userName}/profile`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setUserProfile(response.data);
        localStorage.setItem("user_id", response.data.id);
      } catch (error) {
        console.error("Error fetching assignees:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Nav className="flex-column vertical-navbar">
      <Container className="profile-container">
        <h5>
          Hello, {userProfile.firstname} {userProfile.lastname}
        </h5>
        <h6>Profile: {userProfile.username}</h6>
        <h6>Role: {userProfile.role}</h6>
      </Container>
      <hr />
      <TaskList onRowClick={onRowClick} />
      <div className="action-buttons-container">
        <Button className="mt-3 mb-3" onClick={() => onButtonClick("AllTasks")}>
          View All Tasks
        </Button>
        {isUserAdminOrManager && (
          <Button className="mb-3" onClick={() => onButtonClick("CreateTask")}>
            Create New Task
          </Button>
        )}

        {isUserAdminOrManager && (
          <Button className="mb-3" onClick={() => onButtonClick("CreateProject")}>
            Create New Project
          </Button>
        )}
        {isUserAdminOrManager && (
          <Button className="mb-3" onClick={() => onButtonClick("AssignProject")}>
            Assign Project
          </Button>
        )}

        {isUserAdminOrManager && (
          <Button className="mb-3" onClick={() => onButtonClick("DeleteTask")}>
            Delete Task
          </Button>
        )}
        {/* {isUserAdminOrManager && (
          <Button className="mb-3" onClick={() => onButtonClick("DeleteProject")}>
            Delete Project
          </Button>
        )} */}
      </div>
    </Nav>
  );
};

export default LeftNavigation;
