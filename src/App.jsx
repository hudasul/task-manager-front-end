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
          <LogoutButton onLogout={handleLogout} />
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
        </Routes>
      </Router>
    </>
  );
};

export default App;
