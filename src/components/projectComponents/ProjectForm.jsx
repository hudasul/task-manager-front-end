import { useState} from "react";
import { useNavigate} from "react-router";
import axios from "axios";

const ProjectForm = ({token}) => {
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({ title: "", date: "" });
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event) => {
    console.log(formData)
    event.preventDefault();
    await axios.post(`${baseUrl}/project/new`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
  }

  return (
    <>
      <h1>Create A New Project</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Project Title: </label>
        <input
          type="text"
          name="title"
          id="title"
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
