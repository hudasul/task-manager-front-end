import { Link } from "react-router";

import "./style/Home.css";
const Home = () => {
  return (
    <div className="all-container">
      <div className="home-container">
        <h1>Task Manager</h1>
        <p>Login so we could help you manage your tasks!</p>
        <div className="links-container">
          <Link to={"/login"} className="Home-links">
            Login
          </Link>
          <Link to={"/signup"} className="Home-links">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
