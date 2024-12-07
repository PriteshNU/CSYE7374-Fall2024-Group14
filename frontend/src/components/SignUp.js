import React, { useState } from "react";
import "../styles/css/SignUp.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    role: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    console.log("changed");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/auth/register`,
        formData
      );
      console.log("signup successful");
      setErrorMessage("");
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error.response);
      setErrorMessage("Sign up failed", error.response);
    }
  };

  return (
    <>
      <Container fluid className="signUp-main">
        <Container className="signUp-title">
          <h1>Sign Up !</h1>
          <h6>Create your Account</h6>
        </Container>
        <br />
        <Container className="signUp-form">
          <Row className="justify-content-md-center">
            <Col md="10">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group
                      controlId="formBasicFirstName"
                      className="formGroup-custom"
                    >
                      <Form.Label>First Name :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your First Name"
                        value={formData.firstname}
                        name="firstname"
                        onChange={handleChange}
                      />
                      {/* <input type="text"></input> */}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      controlId="formBasicLastName"
                      className="formGroup-custom"
                    >
                      <Form.Label>Last Name :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your Last Name"
                        value={formData.lastname}
                        name="lastname"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={8}>
                    <Form.Group
                      controlId="formBasicEmail"
                      className="formGroup-custom"
                    >
                      <Form.Label>UserName :</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email Id"
                        value={formData.username}
                        name="username"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group
                      controlId="formBasicDropdown"
                      className="formGroup-custom"
                    >
                      <Form.Label>Choose your Role : </Form.Label>
                      <Form.Select
                        name="role"
                        onChange={handleChange}
                        value={formData.role}
                      >
                        <option>Select an Option</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="TechLead">Technical Lead</option>
                        <option value="Tester">Tester</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <br />
                <Row>
                  <Col>
                    <Form.Group
                      controlId="formBasicPassword"
                      className="formGroup-custom"
                    >
                      <Form.Label>Password :</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />

                <Button variant="secondary" type="submit">
                  Create Account
                </Button>
                <br />
                {errorMessage && (
                  <span style={{ color: "red", marginLeft: "10px" }}>
                    {errorMessage}
                  </span>
                )}
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default SignUp;
