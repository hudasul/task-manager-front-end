import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";

import '../style/authStyle/Login.css'

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState('')
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
       const res = await axios.post(`${baseUrl}/auth/login`, {
      username,
      password,
    });
    localStorage.setItem("token", res.data.token);
    onLogin(res.data.token);
    navigate("/");
    }catch(err){
      setMessage('password or username is wrong')
    }
   
  };

  return (
    <>
      <Link to={'/home'} id="home-link">Home Page</Link>
      <div className="all-login">
      <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <h2 id="login-header">Login</h2>
        <div className="login-inputs">
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
          <p id="login-message">{message}</p>
        </div>
        <br />
        <div className="login-btns">
          <button type="submit">Login</button>
          <br />
          <br />
          <Link to="/signup" id="signup-link">Sign Up </Link>
        </div>
      </form>
      </div>
      </div>
    </>
  );
}

export default LoginForm;