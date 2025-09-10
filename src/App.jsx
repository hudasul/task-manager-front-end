import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import {BrowserRouter as Router, Routes,  Route,  Navigate} from "react-router"
 
import SignUp from "./components/authComponents/SignupForm";
import LoginForm from "./components/authComponents/LoginForm";
import LogoutButton from "./components/authComponents/LogoutButton";
import ProtectedRoute from "./components/authComponents/ProtectedRoute";
import AllProjects from "./components/projectComponents/AllProjects";
import ProjectsTasks from "./components/projectComponents/ProjectsTasks";
import TaskDetails from "./components/taskComponents/TaskDetails";
import ProjectForm from "./components/projectComponents/ProjectForm";
import AllTasks from "./components/taskComponents/AllTasks";
import TaskForm from "./components/taskComponents/TaskForm";
import ProjectTaskForm from "./components/projectComponents/ProjectTaskForm";
import Home from "./components/Home";
import UserProfile from "./components/authComponents/UserProfile";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(token ? jwtDecode(token) : null);

  function handleLogin(newToken) {
    const decoded = jwtDecode(newToken);
    setToken(newToken);
    setUser(decoded);
    localStorage.setItem("token", newToken);
  }

  function handleLogout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    <Router>
      {token ? <LogoutButton onLogout={handleLogout} /> : null}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AllProjects token={token} user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userProfile"
          element={
            <ProtectedRoute>
              < UserProfile token={token} user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/new"
          element={
            <ProtectedRoute>
              <ProjectForm token={token} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:projectId/edit"
          element={
            <ProtectedRoute>
              <ProjectForm token={token} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:projectId/new-task"
          element={
            <ProtectedRoute>
              <ProjectTaskForm token={token} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:projectId/edit-task/:taskId"
          element={
            <ProtectedRoute>
              <ProjectTaskForm token={token} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:projectId/task"
          element={
            <ProtectedRoute>
              <ProjectsTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:projectId/task/:taskId"
          element={
            <ProtectedRoute>
              <TaskDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task"
          element={
            <ProtectedRoute>
              <AllTasks token={token} user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task/new"
          element={
            <ProtectedRoute>
              <TaskForm token={token} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task/:taskId/edit"
          element={
            <ProtectedRoute>
              <TaskForm token={token} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
