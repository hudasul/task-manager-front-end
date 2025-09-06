import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const ProjectsTasks = () => {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState({});
  const [sortChecked, setSortChecked] = useState(false);

  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const getProjectTasks = async () => {
    const url = `${baseUrl}/project/${projectId}/task`;
    const response = await axios.get(url);
    setTasks(response.data);

    const project = `${baseUrl}/project/${projectId}`;
    const projectResponse = await axios.get(project);
    setProject(projectResponse.data);
  };

  const handleDelete = async (taskId) => {
    const url = `${baseUrl}/task/${taskId}`;
    await axios.delete(url);
    getProjectTasks();
  };

  const sortByDate = () => {
    const sortedProjectTasks = [...tasks];
    sortedProjectTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    setTasks(sortedProjectTasks);
  };

  useEffect(() => {
    getProjectTasks();
  }, []);

  return (
    <>
      <h1>{project.title} Tasks</h1>
      
      <button
        onClick={() => {
          navigate(`/project/${projectId}/new-task`);
        }}
      >
        Add New Task
      </button>
      
      <br />
      <input
        type="checkbox"
        name="sort"
        id="sort"
        checked={sortChecked}
        onChange={(event) => {
          const isChecked = event.target.checked;
          setSortChecked(isChecked);
          if (isChecked) {
            sortByDate();
          } else {
            getProjectTasks()
          }
        }}
      />
      <label htmlFor="sort">Sort By Date</label>

      {tasks.length === 0 ? (
        <h2>There is no tasks </h2>
      ) : (
        tasks.map((task) => {
          return (
            <div key={task._id}>
              <h2>{task.title}</h2>
              <p>Deadline: {new Date(task.date).toLocaleDateString()}</p>
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
          );
        })
      )}
    </>
  );
};

export default ProjectsTasks;
