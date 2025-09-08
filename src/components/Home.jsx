import { Link } from "react-router";

import "./style/Home.css";
const Home = () => {
  return (
    <div className="home-container"> 
    
    <div className="home-text">  
      <h1>Task Manager</h1>
      <p>Login se we could help you manage your tasks!</p>
      </div> 
      <div className="links-container">
        <Link to={"/login"} className="Home-links">
          Login
        </Link>
        <Link to={"/signup"} className="Home-links">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
