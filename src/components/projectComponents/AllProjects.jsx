import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const AllProjects = ({ token, user }) => {
  const [projects, setProjects] = useState([]);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

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
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <h1>All Projects</h1>

      {projects.length === 0 ? (
        <h2>There is no projects </h2>
      ) : (
        projects.map((project) => {
          return (
            <div key={project._id}>
              <h2>{project.title}</h2>
              <p>Deadline: {new Date(project.date).toLocaleDateString()}</p>
              <button>View Details</button>
            </div>
          );
        })
      )}
    </>
  );
};

export default AllProjects;
