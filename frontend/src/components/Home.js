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

  const display = () => {
    switch (displayComponent) {
      case "ActivityLog":
        return <ActivityLog />;
      case "CreateTask":
        return <NewTask onButtonClick={handleDisplayComponent} />;
      case "DeleteTask":
        return <DeleteTask onButtonClick={handleDisplayComponent} />;
      case "CreateProject":
        return <ProjectForm />;
      case "DeleteProject":
        return <DeleteProject onButtonClick={handleDisplayComponent} />;
      case "Project":
        return allProjectTasks ? <KanbanBoard data={allProjectTasks} /> : null;
      case "AssignProject":
        return <AssignProject />;
      default:
        return allTasks && allTasks.length > 0 ? (
          <KanbanBoard data={allTasks} />
        ) : null;
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

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
          />
        </div>
        <div className="main-content">{display()}</div>
      </div>
    </>
  );
};

export default Home;
