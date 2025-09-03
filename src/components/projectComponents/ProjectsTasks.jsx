import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const ProjectsTasks = () => {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);

  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const getProjectTasks = async () => {
    const url = `${baseUrl}/project/${projectId}/task`;
    const response = await axios.get(url);
    setTasks(response.data);
  };

  useEffect(() => {
    getProjectTasks();
  }, [])


  return (
    <>
      <h1>Project tasks</h1>
      <button onClick={()=>{navigate(`/project/${projectId}/new-task` )}}>Add New Task</button>

      {tasks.length === 0 ? (
        <h2>There is no tasks </h2>
      ) : (
        tasks.map((task) => {
          return (
            <div key={task._id}>
              <h2>{task.title}</h2>
              <button onClick={()=>{navigate(`/project/${projectId}/task/${task._id}`)}}>View Details</button>
            </div>
          );
        })
      )}
    </>
  );
};

export default ProjectsTasks;
