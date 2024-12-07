import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout Successful");

    localStorage.removeItem("jwtToken");
    const storedData = localStorage.getItem("jwtToken");
    console.log(storedData);

    navigate("login");
  };

  return (
    <>
      <Navbar bg="black" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/">TaskSphere</Navbar.Brand>

          <Nav className="ml-auto">
            {/* <Nav.Link href="/login">Login</Nav.Link> */}
            {/* <Nav.Link href="/signup">Sign Up</Nav.Link> */}

            <Button onClick={handleLogout}>Log out</Button>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};
export default Layout;
