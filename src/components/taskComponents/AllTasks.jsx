import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const AllTasks = ({ token, user }) => {
  const [tasks, setTasks] = useState([]);

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
  }

  const handleDelete = async (taskId)=>{
    const url = `${baseUrl}/task/${taskId}`
    await axios.delete(url)
    getUserTasks()

  }



  useEffect(() => {
    getUserTasks();
  }, []);

  return (
    <>
      <br />
      <br />
      <button
        onClick={() => {
          navigate("/task/new");
        }}
      >
        Add New Task
      </button>
      <h1>All Tasks</h1>
      {tasks.length === 0 ? (
        <h2>There is no tasks </h2>
      ) : (
        tasks.map((task) => {
          return (
            <div key={task._id}>
              <h1>{task.title}</h1>
              <p>Task Description: {task.description}</p>
              <p>Deadline: {new Date(task.date).toLocaleDateString()}</p>
              <p>Status: {task.status}</p>
              {task.importance === true ? (
                <p>Important: Yes </p>
              ) : (
                <p>Important: No </p>
              )}
              <button onClick={()=>{handleDelete(task._id)}}>Delete</button>
              <button onClick={()=>{navigate(`/task/${task._id}/edit`)}}>Edit</button>
            </div>
          );
        })
      )}
    </>
  );
};

export default AllTasks;
