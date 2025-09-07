import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios"

import '../style/projectStyle/ProjectTasks.css'

const ProjectsTasks = () => {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [project, setProject] = useState({});
  const [formData, setFormData] = useState({ search: "" });
  const [searchedTasks, setSearchedTasks] = useState([]);

  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const getProjectTasks = async () => {
    const url = `${baseUrl}/project/${projectId}/task`;
    const response = await axios.get(url);
    setTasks(response.data);
    setAllTasks(response.data);

    const project = `${baseUrl}/project/${projectId}`;
    const projectResponse = await axios.get(project);
    setProject(projectResponse.data);
  };

  const handleDelete = async (taskId) => {
    const url = `${baseUrl}/task/${taskId}`;
    await axios.delete(url);
    getProjectTasks();
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

  const handleSearch = (event) => {
    const value = event.target.value;
    setFormData({ search: value });

    const matches = tasks.filter((task) =>
      task.title.toLowerCase().includes(value.toLowerCase())
    );

    setSearchedTasks(matches);
  };

  useEffect(() => {
    getProjectTasks();
  }, []);

  return (
    <>
    <div className="project-task-header">
      <h1>{project.title} Tasks</h1>

      <button
      id="add-project-task-btn"
        onClick={() => {
          navigate(`/project/${projectId}/new-task`);
        }}
      >
        Add New Task
      </button>

      <br />
      <input
        type="text"
        placeholder="Search"
        name="search"
        id="search-project-task"
        onChange={handleSearch}
      />     
      <br />
      <div className="filter-project-tasks">
      <label htmlFor="filterTasks">Filter: </label>
      <select name="filter" id="filter" onChange={handleFilterChange}>
        <option value="all">Show All</option>
        <option value="byDate">By Date</option>
        <option value="Complete">Completed tasks</option>
        <option value="Pending">Pending Tasks</option>
        <option value="In Progress">In Progress tasks</option>
        <option value="byImportance">Important tasks</option>
      </select>
      </div>  
      
      </div>
      {tasks.length === 0 ? (
        <h2>There is no tasks </h2>
      ) : (
        (formData.search ? searchedTasks : tasks).map((task) => {
          return (
            <div className="prpject-task-container" key={task._id}>
              <div className="project-task-info">
              <h2>{task.title}</h2>
              <p>Deadline: {new Date(task.date).toLocaleDateString()}</p>
              <p>Status : {task.status}</p>
              {task.importance === true ? (
                <p>Important: Yes </p>
              ) : (
                <p>Important: No </p>
              )}
              </div>
              <div className="project-task-btn">
              <button
                onClick={() => {
                  navigate(`/project/${projectId}/task/${task._id}`);
                }}
              >
                View Details
              </button>
              <button
                onClick={() => {
                  handleDelete(task._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  navigate(`/project/${projectId}/edit-task/${task._id}`);
                }}
              >
                Edit
              </button>
              </div>
            </div>
          );
        })
      )}
      
    </>
  );
};

export default ProjectsTasks;
