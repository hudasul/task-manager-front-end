import { useNavigate } from "react-router";
import { Link } from "react-router";


import '../style/authStyle/Logoutbutton.css'
function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="navbar-links-container">   
      <Link to="/" className="navbar-links" >All  Projects</Link>
      <Link to="/task" className="navbar-links">All Tasks</Link>
      </div>
    </div>
  );
}

export default LogoutButton;