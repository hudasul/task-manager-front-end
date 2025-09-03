import { useState } from "react";
import { useNavigate , Link} from "react-router";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`${baseUrl}/auth/signup`, {
      username,
      password,
    });
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="Signup-inputs">
          <input
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <br />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
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
  );
}
export default SignUp;