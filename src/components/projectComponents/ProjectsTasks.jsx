import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const ProjectsTasks = () => {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState({})

  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const getProjectTasks = async () => {
    const url = `${baseUrl}/project/${projectId}/task`;
    const response = await axios.get(url);
    setTasks(response.data);

    const project= `${baseUrl}/project/${projectId}`
    const projectResponse = await axios.get(project)
    setProject(projectResponse.data)
  }

  const handleDelete = async (taskId)=>{
    const url = `${baseUrl}/task/${taskId}`
    await axios.delete(url)
    getProjectTasks()

  }

  

  useEffect(() => {
    getProjectTasks();
  }, [])


  return (
    <>
      <h1>{project.title} Tasks</h1>
      <button onClick={()=>{navigate(`/project/${projectId}/new-task` )}}>Add New Task</button>

      {tasks.length === 0 ? (
        <h2>There is no tasks </h2>
      ) : (
        tasks.map((task) => {
          return (

            <div key={task._id}>
              <h2>{task.title}</h2>
              <button onClick={()=>{navigate(`/project/${projectId}/task/${task._id}`)}}>View Details</button>
              <button onClick={()=>{handleDelete(task._id)}}>Delete</button>
            </div>
          )
        })
      )}
    </>
  );
};

export default ProjectsTasks;
