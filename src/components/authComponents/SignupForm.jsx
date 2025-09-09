import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";

import "../style/authStyle/Signup.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 8) {
      return setMessage("Password should have at least 8 digits");
    }

    try {
      await axios.post(`${baseUrl}/auth/signup`, { username, password });
      setMessage("");
      navigate("/login");
    } catch (error) {
      if (error.response?.status === 400 &&error.response.data.message === "Username already exists") 
      {
        setMessage("Username is taken");
      }
    }
  };

  return (
    <>
      <Link to={"/home"} id="home-link">
        Home Page
      </Link>
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="Signup-inputs">
            <input
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <br />
            <br />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <p id="signup-message">{message}</p>
          </div>
          <br />
          <br />

          <div className="signup-btns">
            <button type="submit">Sign Up</button>
            <br />
            <br />
            <Link to="/login"> Login</Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default SignUp;
