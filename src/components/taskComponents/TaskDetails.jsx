import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const TaskDetails = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const getTaskDetails = async () => {
    const url = `${baseUrl}/task/${taskId}`;
    const response = await axios.get(url);
    setTask(response.data);
    console.log(task);
  };

  useEffect(() => {
    getTaskDetails();
  }, []);
  return (

    <>
      <button
        onClick={() => {
          navigate(`/project/${projectId}/task`);
        }}
      >
        Back to Project
      </button>
      <h1>{task.title} Task Details</h1>
      <p>Task Description: {task.description}</p>
      <p>Deadline: {new Date(task.date).toLocaleDateString()}</p>
      <p>Status: {task.status}</p>
       {task.importance === true ? <p>Importance: yes </p> :<p>Importance: No </p>  }
    </>
  );
};

export default TaskDetails;
