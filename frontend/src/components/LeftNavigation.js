import React, { useState, useEffect } from "react";
import "../styles/css/LeftNavbar.css";
import { Nav, Container, Button } from "react-bootstrap";
import ProjectList from "./ProjectList";
import {
  FaTasks,
  FaPlus,
  FaProjectDiagram,
  FaUserPlus,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";

const jwtToken = localStorage.getItem("jwtToken");

const LeftNavigation = ({
  onButtonClick,
  onRowClick,
  refreshTrigger,
  selectedProjectId,
}) => {
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
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [refreshTrigger]);

  return (
    <Nav className="flex-column vertical-navbar">
      <Container className="profile-container text-center py-3">
        {/* Add user profile picture if available */}
        {userProfile.avatar && (
          <img
            src={userProfile.avatar}
            alt="User Avatar"
            className="rounded-circle mb-3"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
        )}
        <h5>
          Hello, {userProfile.firstname} {userProfile.lastname}
        </h5>
        <h6>Profile: {userProfile.username}</h6>
        <h6>Role: {userProfile.role}</h6>
      </Container>
      <hr />
      <ProjectList
        onRowClick={onRowClick}
        refresh={refreshTrigger}
        selectedProjectId={selectedProjectId}
      />
      <div className="action-buttons-container mt-3">
        <Button
          className="mb-3 d-flex align-items-center"
          variant="primary"
          onClick={() => onButtonClick("AllTasks")}
        >
          <FaTasks className="me-2" />
          View All Tasks
        </Button>
        {isUserAdminOrManager && (
          <Button
            className="mb-3 d-flex align-items-center"
            variant="success"
            onClick={() => onButtonClick("CreateTask")}
          >
            <FaPlus className="me-2" />
            Create New Task
          </Button>
        )}
        {isUserAdminOrManager && (
          <Button
            className="mb-3 d-flex align-items-center"
            variant="info"
            onClick={() => onButtonClick("CreateProject")}
          >
            <FaProjectDiagram className="me-2" />
            Create New Project
          </Button>
        )}
        {isUserAdminOrManager && (
          <Button
            className="mb-3 d-flex align-items-center"
            variant="warning"
            onClick={() => onButtonClick("AssignProject")}
          >
            <FaUserPlus className="me-2" />
            Assign Project
          </Button>
        )}
        {isUserAdminOrManager && (
          <Button
            className="mb-3 d-flex align-items-center"
            variant="danger"
            onClick={() => onButtonClick("DeleteTask")}
          >
            <FaTrash className="me-2" />
            Delete Task
          </Button>
        )}
      </div>
    </Nav>
  );
};

export default LeftNavigation;
