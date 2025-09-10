import { useNavigate } from "react-router";
import { Link } from "react-router";

import "../style/authStyle/Logoutbutton.css";
function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-links-container">
        <Link to="/userProfile" className="navbar-links">
          User Profile
        </Link>
        <Link to="/" className="navbar-links">
          All Projects
        </Link>
        <Link to="/task" className="navbar-links">
          All Tasks
        </Link>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
