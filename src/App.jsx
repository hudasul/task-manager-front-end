import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";

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
    localStorage.removeItem("token");
  }
  return (
    <>
      <Router>
        <h1>Task Manager</h1>
        {token ? (
          <>
          <LogoutButton onLogout={handleLogout} />
          <Link to="/">All  Projects</Link>
          <Link to="/task">All Tasks</Link>
          </>
        ) : (
          <div>
            <Link to="/signup">Sign Up </Link>
            <Link to="/login"> Login</Link>
          </div>
        )}

        <Routes>
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
          <Route path="/project/:projectId/task" element={<ProjectsTasks />} />
          <Route path="/project/:projectId/task/:taskId" element={<TaskDetails/>}/>
          <Route path="/project/new" element={<ProjectForm token={token} />}/>
          <Route path="/project/:projectId/new-task" element={<ProjectTaskForm token={token} />}/>  
          <Route path="/task" element={<AllTasks token={token} user={user}/>}/>
          <Route path="/task/new" element={<TaskForm token={token} user={user}/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
