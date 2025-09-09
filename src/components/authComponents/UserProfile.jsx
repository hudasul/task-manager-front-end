import { useState } from "react";
import axios from "axios";

import "../style/authStyle/UserProfile.css";

const UserProfile = ({ token, user }) => {
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword.length < 8) {
      return setMessage("Password should have at least 8 characters");
    }

    try {
      await axios.put(
        `${baseUrl}/auth/updatePassword`,
        {
          userId: user.id,
          oldPassword: password,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPassword("");
      setNewPassword("");
      setMessage("Password changed successfully!");
      setShowForm(false);
    } catch (error) {
      if (
        error.response?.status === 401 &&
        error.response.data.message === "Incorrect old password"
      ) {
        setMessage("Incorrect old password");
      }
    }
  };

  return (
    <>
      <div className="user-profile">
        <h1>Welcome, {user.username}</h1>
        <img src="https://i.imgur.com/0u37nFc.jpeg" alt="user-profile-pic" />
        <br />
        <br />
        {showForm ? null : (
          <button
            onClick={() => {
              setShowForm(true);
            }}
          >
            Change Password
          </button>
        )}
        {showForm ? (
          <div className="pass-change">
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="old password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <br />
              <input
                type="password"
                placeholder="new password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />

              <br />
              <br />
              <button>Change password</button>
            </form>
            
          </div>
        ) : null}
        
        <p>{message}</p>
      </div>
    </>
  );
};

export default UserProfile;
