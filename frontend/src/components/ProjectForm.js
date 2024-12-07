import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../styles/css/ProjectForm.css";
import axios from "axios";

const jwtToken = localStorage.getItem("jwtToken");

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/projects/import`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        if (response.status === 200 && response.data[0].id > 0) {
          alert("Project Created !");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      //
      fetch("http://localhost:8080/api/v1/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert("Project Created !");
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <>
      <Container className="createProject-form">
        <div className="projectForm-title">Create Project</div>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <hr />
          <Container className="projectForm-OR">
            <h2>or</h2>
          </Container>

          <hr />
          <h5>Upload a CSV File</h5>
          <br />
          <Container className="projectForm-CSV">
            <input
              accept=".csv"
              type="file"
              id="fileInput"
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput">
              <Button>Upload</Button>
            </label>
            {file && <h5>{file.name}</h5>}
          </Container>
          <br />
          <Button type="submit">Submit </Button>
        </Form>
      </Container>
    </>
  );
};
export default ProjectForm;
