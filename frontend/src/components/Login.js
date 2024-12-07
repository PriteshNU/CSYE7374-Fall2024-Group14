import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../styles/css/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/auth/login`,
        loginFormData
      );

      const { access_token } = response.data;
      localStorage.setItem("jwtToken", access_token);

      const tokenData = JSON.parse(atob(access_token.split(".")[1]));

      localStorage.setItem("user_role", tokenData.roles);
      localStorage.setItem("user_name", tokenData.sub);

      navigate("/");
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  return (
    <>
      <Container fluid className="login-main">
        <Container className="login-title">
          <h1>Login</h1>
          <h6>login to manage your project</h6>
        </Container>
        <br />
        <Container className="login-form">
          <Row className="justify-content-md-center">
            <Col md="9">
              <Form onSubmit={handleOnSubmit}>
                <Form.Group
                  controlId="formBasicUsername"
                  className="formGroup-custom"
                >
                  <Form.Label>Username :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    onChange={handleOnChange}
                    value={loginFormData.usename}
                  />
                </Form.Group>
                <br />
                <Form.Group
                  controlId="formBasicPassword"
                  className="formGroup-custom"
                >
                  <Form.Label>Password :</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleOnChange}
                    value={loginFormData.password}
                  />
                </Form.Group>

                <br />

                <Button variant="secondary" type="submit">
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
          <br />
          <Container className="login-footer">
            <h6>
              Not a member? <Link to={"/signup"}>Sign up Here</Link>
            </h6>
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default Login;
