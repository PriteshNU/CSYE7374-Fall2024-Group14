import { React, useEffect } from "react";
import LeftNavigation from "./LeftNavigation";
import ActivityLog from "./ActivityLog";
import "../styles/css/Home.css";
import { useState } from "react";
import NewTask from "./CreateTask";
import KanbanBoard from "./KanbanBoard";
import axios from "axios";
import ProjectForm from "./ProjectForm";
import AssignProject from "./AssignProject";
import AssignTask from "./AssignTask";
import DeleteTask from "./DeleteTask";
import DeleteProject from "./DeleteProject";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const jwtToken = localStorage.getItem("jwtToken");

const Home = () => {
  const [displayComponent, setDisplayComponent] = useState(null);
  const [allTasks, setAllTask] = useState([]);
  const [allProjectTasks, setAllProjectTask] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [refreshLeftNav, setRefreshLeftNav] = useState(false);

  const userId = localStorage.getItem("user_id");
  const userRole = localStorage.getItem("user_role");
  const isUserAdminOrManager = userRole === "Admin" || userRole === "Manager";

  const handleDisplayComponent = (Component) => {
    setDisplayComponent(Component);
  };

  const fetchAllTasks = async () => {
    try {
      const params = {};
      if (!isUserAdminOrManager) {
        params.userId = userId;
      }
      const response = await axios.get(`${baseUrl}/api/v1/tasks`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
        params,
      });
      setAllTask(response.data.data);
    } catch (error) {
      console.error("Error fetching all tasks:", error);
    }
  };

  const fetchTasksByProjectId = async (projectId) => {
    try {
      const params = { projectId };
      if (!isUserAdminOrManager) {
        params.userId = userId;
        params.projectId = projectId;
      }
      const response = await axios.get(`${baseUrl}/api/v1/tasks`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
        params,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching tasks by project ID:", error);
      throw error;
    }
  };

  const handleProjectSelection = async (projectId) => {
    setSelectedProjectId(projectId);
    try {
      const projectTasks = await fetchTasksByProjectId(projectId);
      setAllProjectTask(projectTasks);
      handleDisplayComponent("Project");
    } catch (error) {
      console.error("Error handling project selection:", error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const refreshTasks = async () => {
    try {
      fetchAllTasks();

      setRefreshLeftNav((prev) => !prev); // Toggle refresh state
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    }
  };

  const display = () => {
    switch (displayComponent) {
      case "ActivityLog":
        return <ActivityLog />;
      case "CreateTask":
        return <NewTask onButtonClick={handleDisplayComponent} />;
      case "DeleteTask":
        return <DeleteTask onButtonClick={handleDisplayComponent} />;
      case "CreateProject":
        return (
          <ProjectForm
            refreshTasks={refreshTasks}
            onButtonClick={handleDisplayComponent}
          />
        );
      case "DeleteProject":
        return <DeleteProject onButtonClick={handleDisplayComponent} />;
      case "Project":
        return allProjectTasks ? (
          <KanbanBoard
            data={allProjectTasks}
            onButtonClick={handleDisplayComponent}
          />
        ) : null;
      case "AssignProject":
        return <AssignProject onButtonClick={handleDisplayComponent} />;
      case "AssignTask":
        return <AssignTask onButtonClick={handleDisplayComponent} />;
      default:
        return allTasks && allTasks.length > 0 ? (
          <KanbanBoard data={allTasks} onButtonClick={handleDisplayComponent} />
        ) : null;
    }
  };

  return (
    <>
      <div className="main">
        <div className="verticalNavbar">
          <LeftNavigation
            onButtonClick={handleDisplayComponent}
            onRowClick={handleProjectSelection}
            refreshTrigger={refreshLeftNav}
            selectedProjectId={selectedProjectId}
          />
        </div>
        <div className="main-content">{display()}</div>
      </div>
    </>
  );
};

export default Home;
