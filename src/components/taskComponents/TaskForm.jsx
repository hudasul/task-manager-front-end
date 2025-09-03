import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const TaskForm = ({ token }) => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    status: "",
    importance: "false",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    console.log(formData)
    event.preventDefault();
    await axios.post(`${baseUrl}/task/new`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate("/task");
  };

  return (
    <>
      <h1>Add a New Task</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          name="description"
          id="description"
          onChange={handleChange}
          required
        ></textarea>
        <br />
        <br />
        <label htmlFor="date">Deadline: </label>
        <input
          type="date"
          name="date"
          id="date"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="status">Status</label>
        <select name="status" id="status" onChange={handleChange} required>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>

        <br />
        <br />
        <label htmlFor="importance">Important? </label>
        <input
          type="checkbox"
          name="importance"
          id="importance"
          value='true'
          onChange={handleChange}
        />
        <br />
        <br />
        <button>Add</button>
      </form>
    </>
  );
};

export default TaskForm;
