import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios"

import '../style/tasksStyle/TaskDetails.css'

const TaskDetails = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const getTaskDetails = async () => {
    const url = `${baseUrl}/task/${taskId}`;
    const response = await axios.get(url);
    setTask(response.data);
  };

  useEffect(() => {
    getTaskDetails();
  }, []);
  return (

    <>
      <div className="all-detaills-container">
      <br />
      <br />
      <button
        id="go-back-btn"
        onClick={() => {
          navigate(`/project/${projectId}/task`);
        }}
      >
        Back to Project
      </button>
      
      <div className="task-detail-container">
      <h1>{task.title}</h1>
      <div className="task-info">
      <p><span>Task Description: </span>{task.description}</p>
      <p><span>Deadline: </span>{new Date(task.date).toLocaleDateString()}</p>
      <p><span>Status: </span>{task.status}</p>
       {task.importance === true ? <p><span>Important: </span> Yes </p> :<p><span>Important: </span> No </p>  }
    </div>
    </div>
    </div>
    </>
  );
};

export default TaskDetails;
