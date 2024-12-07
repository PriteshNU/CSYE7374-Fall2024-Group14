import React, { useState, useEffect } from "react";
import "../styles/css/CreateTask.css";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const jwtToken = localStorage.getItem("jwtToken");

const NewTask = ({ onButtonClick }) => {
  const [showComponent, setShowComponent] = useState(true);
  const [assignees, setAssignees] = useState([]);
  const [projectData, setProjectData] = useState([
    { id: 1, name: "Test Project 1", description: "Test Project 1" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: new Date(),
    priority: "",
    status: "",
    assigneeId: 0,
    projectId: "",
  });

  const handleCancelClick = () => {
    // Update state to hide the component
    setShowComponent(false);
  };

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, deadline: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/tasks/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.id > 0) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const fetchAssignees = async () => {
      try {
        if (!formData.projectId) {
          formData.projectId = 1;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/projects/${formData.projectId}/users`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setAssignees(response.data);
      } catch (error) {
        console.error("Error fetching assignees:", error);
      }
    };

    fetchAssignees();
    console.log(assignees);
  }, [formData.projectId]);

  return (
    <Container className="formBackground">
      <div className="createTaskForm-title">Create Task</div>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Select Project</Form.Label>
          <Form.Select
            aria-label="Project Name"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
          >
            <option>Select Project</option>
            {projectData.map((project) => (
              <option key={project.id} value={project.id}>
                {`${project.name} - ${project.id}`}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="DatePicker">
          <Form.Label>Select Deadline</Form.Label>
          <DatePicker
            selected={formData.deadline}
            value={formData.deadline}
            onChange={handleDateChange}
          />
        </div>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Select Priority</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option> -- </option>
            <option value="Highest">Highest</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="Lowest">Lowest</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Select Status</Form.Label>
          <Form.Select
            aria-label="Select Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option> -- </option>
            <option value="Open">Open</option>
            <option value="InProgress">InProgress</option>
            <option value="OnHold">OnHold</option>
            <option value="InReview">InReview</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Select Assignee</Form.Label>
          <Form.Select
            aria-label="Assignee"
            name="assigneeId"
            value={formData.assigneeId}
            onChange={handleChange}
          >
            <option>Select Assignee</option>
            {assignees.map((assignee) => (
              <option
                key={"assignee_" + assignee.id}
                value={assignee.id}
              >{`${assignee.firstname} ${assignee.lastname}`}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="Buttons">
          <Button variant="primary btn-lg" type="submit">
            Assign
          </Button>
          <Button
            variant="danger btn-lg"
            type="reset"
            onClick={() => onButtonClick("viewAlltasks")}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default NewTask;
