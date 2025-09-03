import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const ProjectForm = ({ token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", date: "" });
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const { projectId } = useParams();

  const getProjectData = async () => {
    const response = await axios.get(`${baseUrl}/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const project = response.data;
    const projectDate = new Date(project.date).toISOString().split("T")[0];
    setFormData({ title: project.title, date: projectDate })
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (projectId) {
      await axios.put(`${baseUrl}/project/${projectId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await axios.post(`${baseUrl}/project/new`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    navigate("/");
  };

  useEffect(() => {
    if (projectId) {
      getProjectData();
    }
  }, []);

  return (
    <>
      <h1>Create A New Project</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Project Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <br />
        <br />
        <label htmlFor="date">Project Deadline: </label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button>Add</button>
      </form>
    </>
  );
};

export default ProjectForm;
