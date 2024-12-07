import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useEffect, useState } from "react";
import Column from "./components/Column";
import KanbanBoard from "./components/KanbanBoard";
import Task from "./components/Task";
import CreateTask from "./components/CreateTask";
import ProjectDetail from "./components/ProjectDetail";
import { Navigate } from "react-router-dom";
import AssignProject from "./components/AssignProject";
import AssignTask from "./components/AssignTask";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<Navigate to={"/login"} />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/" element={<Layout />}>
            <Route index="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="newTask" element={<CreateTask />} />
            <Route
              path="/projectDetail/:projectId"
              element={<ProjectDetail />}
            />
            <Route
              path="/assignTask/:taskId"
              element={<AssignTask />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
