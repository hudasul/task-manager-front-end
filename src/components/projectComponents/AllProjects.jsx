import { useEffect, useState } from "react";
import { useNavigate , Link } from "react-router";
import axios from "axios";
const AllProjects = ({ token, user }) => {
  const [projects, setProjects] = useState([]);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const getAllProjects = async () => {
    if (!token || !user) return;

    const url = `${baseUrl}/project`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userProjects = response.data.filter(
      (project) => project.creator === user.id
    );
    setProjects(userProjects)
  }

  const handleDelete= async (projectId)=>{
     const url = `${baseUrl}/project/${projectId}`
     await axios.delete(url)
     getAllProjects()

  }

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <br />
      <br />
      <button onClick={()=>{navigate("/project/new")}}>Add New Project</button> 
      <h1>All Projects</h1>

      {projects.length === 0 ? (
        <h2>There is no projects </h2>
      ) : (
        projects.map((project) => {
          return (
            <div key={project._id}>
              <h2>{project.title}</h2>
              <p>Deadline: {new Date(project.date).toLocaleDateString()}</p>
              <button onClick={()=>{navigate(`/project/${project._id}/task`)}}>View Details</button>
              <button onClick={()=>{handleDelete(project._id)}}>Delete</button>
              <button onClick={()=>{navigate(`/project/${project._id}/edit`)}}>Edit</button>
            </div>
          );
        })
      )}
    </>
  );
};

export default AllProjects;
