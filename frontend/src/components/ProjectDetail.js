import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import LeftNavigation from "./LeftNavigation";
import CreateTask from "./CreateTask";
import "../styles/css/Home.css";
const jwtToken = localStorage.getItem("jwtToken");

const ProjectDetail = () => {
  const [projectData, setProjectData] = useState({});
  const [showCreateTask, setShowCreateTask] = useState(false);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/projects/${projectId}`, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
          },
        });
        setProjectData(response.data);
      } catch (error) {
        console.error('Error fetching project detail:', error);
      }
    };

    fetchProjectDetail();
  }, [projectId]);

  return (
    <div className="flex-container">
      <LeftNavigation />
      <div className="project-detail-container">
        <Card>
          <Card.Body>
            <Card.Title>{projectData.name}</Card.Title>
            <Card.Text>
              {projectData.description}
            </Card.Text>
            <Card.Text>
              Created Date: {projectData.createdDate}
            </Card.Text>
            <Button variant="primary" onClick={() => setShowCreateTask(true)}>
              Create Task
            </Button>
          </Card.Body>
        </Card>
        {showCreateTask && <CreateTask />}
      </div>
    </div>
  );
};

export default ProjectDetail;
