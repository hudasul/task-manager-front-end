import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios"

import '../style/tasksStyle/TaskForm.css'

const TaskForm = ({ token }) => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    status: "Pending",
    importance: "false",
  });

  const getTaskData = async () => {
    const response = await axios.get(`${baseUrl}/task/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const task = response.data;
    const tasktDate = new Date(task.date).toISOString().split("T")[0];
    setFormData({
      title: task.title,
      description: task.description,
      date: tasktDate,
      status: task.status,
      importance: task.importance ? "true" : "false",
    });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (taskId) {
      await axios.put(`${baseUrl}/task/${taskId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await axios.post(`${baseUrl}/task/new`,formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    navigate("/task");
  };

  useEffect(() => {
    if (taskId) {
      getTaskData();
    }
  }, []);

  return (
    <>
    <div className="all-task-form">
      <div className="task-form-container">
      {taskId ? <h1>Update Task</h1> : <h1>Add a New Task</h1>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
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
          value={formData.description}
          required
        ></textarea>
        <br />
        <br />
        <label htmlFor="date">Deadline: </label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="status">Status: </label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>

        <br />
        <br />
        <div className="task-imprtance-div">
        <label htmlFor="importance">Important? </label>
        <input
          type="checkbox"
          name="importance"
          id="importance"
          checked={formData.importance === "true"}
          onChange={(event) =>
            setFormData({
              ...formData,
              importance: event.target.checked ? "true" : "false",
            })
          }
        />
        </div>
        <br />
        <br />
        <button>{taskId ? "update" : "Add"}</button>
        <button onClick={()=>{navigate('/task')}}>Cancel</button>
      </form>
      </div>
      </div>
    </>
  );
};

export default TaskForm;