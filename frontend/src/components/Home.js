import { React, useEffect } from "react";
import LeftNavigation from "./LeftNavigation";
import ActivityLog from "./ActivityLog";
import "../styles/css/Home.css";
import { Button, Container, Nav } from "react-bootstrap";
import { useState } from "react";
import NewTask from "./CreateTask";
import KanbanBoard from "./KanbanBoard";
import axios from "axios";
import { ColumnGroup, Component } from "ag-grid-community";
import ProjectForm from "./ProjectForm";
import AssignProject from "./AssignProject";
import DeleteTask from "./DeleteTask";
import DeleteProject from "./DeleteProject";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const jwtToken = localStorage.getItem("jwtToken");

const Home = () => {
  const [displayComponent, setDisplayComponent] = useState(null);
  const [allTasks, setAllTask] = useState([{}]);
  const [allProjectTasks, setAllProjectTask] = useState([{}]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [refreshLeftNav, setRefreshLeftNav] = useState(false);
  const [projects, setProjects] = useState([]);
  const userRole = localStorage.getItem("user_role");
  const userId = localStorage.getItem("user_id");

  const handleDisplayComponent = (Component) => {
    setDisplayComponent(Component);
  };

  const fetchAllTasks = async () => { 
    try {
      const response = await axios.get(`${baseUrl}/api/v1/tasks`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const result = await response.data.data;
      setAllTask(result);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const fetchProjects = async () => {
    try {
      const userRole = localStorage.getItem("user_role");
      const userId = localStorage.getItem("user_id");
      let response;
  
      if (userRole === "Admin") {
        response = await axios.get(`${baseUrl}/api/v1/projects`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });
      } else {
        response = await axios.get(`${baseUrl}/api/v1/projects/user/${userId}`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });
      }
  
      const fetchedProjects = response.data.data || response.data;
      if (Array.isArray(fetchedProjects)) {
        setProjects(fetchedProjects);
      } else {
        console.error("Unexpected projects format:", fetchedProjects);
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };
  
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
        return <ProjectForm refreshTasks={refreshTasks} onButtonClick={handleDisplayComponent} />;
      case "DeleteProject":
        return <DeleteProject onButtonClick={handleDisplayComponent} />;
      case "Project":
        return allProjectTasks ? <KanbanBoard data={allProjectTasks} /> : null;
      case "AssignProject":
        return <AssignProject onButtonClick={handleDisplayComponent}/>;
      default:
        return allTasks && allTasks.length > 0 ? (
          <KanbanBoard data={allTasks} />
        ) : null;
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      // Ensure user profile is fetched first for non-admin roles
      const userRole = localStorage.getItem("user_role");
      const userId = localStorage.getItem("user_id");
  
      if (!userRole || !userId) {
        console.error("User role or ID not set. Cannot fetch projects.");
        return;
      }
  
      await fetchProjects(); // Fetch projects based on role
      await fetchAllTasks(); // Fetch all tasks
    };
    fetchInitialData();
  }, [displayComponent]);

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/tasks`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          projectId: id,
        },
      });
      const result = response.data.data;
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  const handleIdFromTaskList = async (projectId) => {
    console.log(projectId);
    setSelectedProjectId(projectId);

    fetchData(projectId)
      .then((data) => {
        console.log(data);
        setAllProjectTask(data);
        handleDisplayComponent("Project");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <div className="main">
        <div className="verticalNavbar">
          <LeftNavigation
            onButtonClick={handleDisplayComponent}
            onRowClick={handleIdFromTaskList}
            refreshTrigger={refreshLeftNav}
            projects={projects}
          />
        </div>
        <div className="main-content">{display()}</div>
      </div>
    </>
  );
};

export default Home;
