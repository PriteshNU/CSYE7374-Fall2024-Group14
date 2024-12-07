import React, { useState, useEffect } from "react";
import "../styles/css/CreateTask.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CellRangeType } from "ag-grid-community";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const jwtToken = localStorage.getItem("jwtToken");

const DeleteProject = ({ onButtonClick }) => {
  const [showComponent, setShowComponent] = useState(true);
  const [projectData, setProjectData] = useState([
    { id: 1, name: "Test Project 1", description: "Test Project 1" },
  ]);
  const [taskData, setTaskData] = useState([
    { id: 1, name: "Task 1", description: "Task 1" },
  ]);

  const [formData, setFormData] = useState({
    // name: "",
    // description: "",
    projectId: "",
  });

  const handleCancelClick = () => {
    // Update state to hide the component
    setShowComponent(false);
  };

  // fetch all projects
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/v1/projects?page=0&size=100`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const result = await response.data.data;
        console.log(result);
        setProjectData(result);
        console.log(projectData);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchAllProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/project/${formData.projectId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("project deleted !");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="formBackground">
      <div>
        <h3> Delete Project </h3>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Select project to delete</Form.Label>
          <Form.Select
            aria-label="Project Name"
            name="projectId"
            value={formData.id}
            onChange={handleChange}
          >
            <option>Select Project</option>
            {projectData.map((project) => (
              <option key={project.id} value={project.id}>
                {`${project.name}`}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="Buttons">
          <Button variant="primary btn-lg" type="submit">
            Delete
          </Button>
          <Button
            variant="danger btn-lg"
            type="reset"
            onClick={() => onButtonClick("AllTasks")}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DeleteProject;
