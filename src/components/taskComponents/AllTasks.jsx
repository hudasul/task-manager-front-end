import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"

import '../style/tasksStyle/AllTasks.css'

const AllTasks = ({ token, user }) => {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [formData, setFormData] = useState({ search: "" })
  const [searchedTasks, setSearchedTasks] = useState([])


  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const getUserTasks = async () => {
    if (!token || !user) return;

    const url = `${baseUrl}/task`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userTasks = response.data.filter((task) => task.creator === user.id);
    setTasks(userTasks);
    setAllTasks(userTasks);
  };

  const handleDelete = async (taskId) => {
    const url = `${baseUrl}/task/${taskId}`;
    await axios.delete(url);
    getUserTasks();
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    let updatedTasks = [...allTasks];

    switch (value) {
      case "byDate":
        updatedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "byImportance":
        updatedTasks = updatedTasks.filter((task) => task.importance === true);
        break;
      case "Complete":
        updatedTasks = updatedTasks.filter(
          (task) => task.status.toLowerCase() === "complete"
        );
        break;
      case "Pending":
        updatedTasks = updatedTasks.filter(
          (task) => task.status.toLowerCase() === "pending"
        );
        break;
      case "In Progress":
        updatedTasks = updatedTasks.filter(
          (task) => task.status.toLowerCase() === "in progress"
        );
        break;
      default:
        break;
    }

    setTasks(updatedTasks);
  };

  const handleSearch = (event)=>{
    const value = event.target.value
    setFormData({search: value})

    const matches = tasks.filter((task) =>
      task.title.toLowerCase().includes(value.toLowerCase())
    );

    setSearchedTasks(matches);

  }

  useEffect(() => {
    getUserTasks();
  }, []);

  return (
    <>
      <br />
      <br />
      <header className="all-task-header">
      <h1>All Tasks</h1>
      <button
       id="add-task-btn"
        onClick={() => {
          navigate("/task/new");
        }}
      >
        Add New Task
      </button>
      <br />
      <input
        type="text"
        placeholder="Search"
        name="search"
        id="task-search"
        onChange={handleSearch}
      />
     <br />
     <div className="task-filter">
      <label htmlFor="filterTasks">Filter: </label>
      <select name="filter" id="filter" onChange={handleFilterChange}>
        <option value="all">Show All</option>
        <option value="byDate">By Date</option>
        <option value="Complete">Completed Tasks</option>
        <option value="Pending">Pending Tasks</option>
        <option value="In Progress">In Progress Tasks</option>
        <option value="byImportance">Important Tasks</option>
      </select>
      </div>
        <div className="all-tasks-container">
      {tasks.length === 0 ? (
        <h2>There is no tasks </h2>
      ) : (
        (formData.search ? searchedTasks : tasks).map((task) => {
          return (
            <div className="task-container" key={task._id}>
              <div className="task-info">
              <h1>{task.title}</h1>
              <p>Task Description: {task.description}</p>
              <p>Deadline: {new Date(task.date).toLocaleDateString()}</p>
              <p>Status: {task.status}</p>
              {task.importance === true ? (
                <p>Important: Yes </p>
              ) : (
                <p>Important: No </p>
              )}
              </div>
              <div className="tasks-btn">
              <button
                onClick={() => {
                  handleDelete(task._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  navigate(`/task/${task._id}/edit`);
                }}
              >
                Edit
              </button>
              </div>
            </div>
          );
        })
      )}
      </div>
      </header>
    </>
  );
};

export default AllTasks;
