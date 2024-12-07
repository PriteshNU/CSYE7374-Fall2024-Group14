import React, { useState, useEffect } from "react";
import "../styles/css/CreateTask.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const jwtToken = localStorage.getItem("jwtToken");

const DeleteTask = ({ onButtonClick }) => {
  const [showComponent, setShowComponent] = useState(true);
  const [projectData, setProjectData] = useState([
    { id: 1, name: "Test Project 1", description: "Test Project 1" },
  ]);
  const [taskData, setTaskData] = useState([
    { id: 1, name: "Task 1", description: "Task 1" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: new Date(),
    priority: "",
    status: "",
    assigneeId: 0,
    projectId: "",
    taskId: "",
  });

  const handleCancelClick = () => {
    // Update state to hide the component
    setShowComponent(false);
  };

  // fetch all tasks
  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/tasks`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const result = await response.data.data;
        setTaskData(result);
        console.log("-------------------------");
        console.log(result);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchAllTasks();
  }, []);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/projects?page=0&size=50`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const projects = response.data.data;

        setProjectData(projects);
        console.log(projects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log(projectData);
  }, []);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, deadline: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/tasks/${formData.taskId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Task deleted !");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="formBackground">
      <div>
        <h3> Delete Task </h3>
      </div>
      <Form onSubmit={handleSubmit}>
        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Select Project</Form.Label>
                    <Form.Select aria-label="Project Name"
                        name='projectId'
                        value={formData.projectId}
                        onChange={handleChange}>
                        <option>Select Project</option>
                        {projectData.map((project) => (
                            <option key={project.id} value={project.id}>
                            {`${project.name} - ${project.id}`}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group> */}

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Select Task to remove</Form.Label>
          <Form.Select
            aria-label="Task Name"
            name="taskId"
            value={formData.taskId}
            onChange={handleChange}
          >
            <option>Select Task</option>
            {taskData.map((task) => (
              <option key={task.id} value={task.id}>
                {`${task.name} - ${task.id}`}
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

export default DeleteTask;
