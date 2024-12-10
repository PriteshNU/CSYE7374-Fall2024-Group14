import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">TaskSphere</Navbar.Brand>
          <div className="ml-auto">
            <Button
              onClick={handleLogout}
              variant="outline-light"
              className="ms-auto"
            >
              Log out
            </Button>
          </div>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;
