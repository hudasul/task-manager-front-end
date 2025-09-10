import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import "../style/projectStyle/AllProjects.css";
const AllProjects = ({ token, user }) => {
  const [projects, setProjects] = useState([]);
  const [sortChecked, setSortChecked] = useState(false);
  const [formData, setFormData] = useState({ search: "" });
  const [filteredProjects, setFilteredProjects] = useState([]);

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
    setProjects(userProjects);
  };

  const handleDelete = async (projectId) => {
    const url = `${baseUrl}/project/${projectId}`;
    await axios.delete(url);
    getAllProjects();
  };

  const sortByDate = () => {
    const sortedProjects = [...projects];
    sortedProjects.sort((a, b) => new Date(a.date) - new Date(b.date));
    setProjects(sortedProjects);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setFormData({ search: value });

    const matches = projects.filter((project) =>
      project.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProjects(matches);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <header className="all-projects-header">
        <h1>All Projects</h1>
        <button
          id="project-add-btn"
          onClick={() => {
            navigate("/project/new");
          }}
        >
          Add New Project
        </button>
        <br />
        <input
          type="text"
          placeholder="Search"
          name="search"
          id="project-search"
          onChange={handleSearch}
        />
        <br />
        <div className="project-sort">
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
                getAllProjects();
              }
            }}
          />
          <label htmlFor="sort">Sort By Date</label>
        </div>
      </header>
      <div className="all-project-container">
        {projects.length === 0 ? (
          <h2>There is no projects </h2>
        ) : (
          (formData.search ? filteredProjects : projects).map((project) => {
            return (
              <div className="project-container" key={project._id}>
                <div className="project-info">
                  <h2>{project.title}</h2>
                  <p>Deadline: {new Date(project.date).toLocaleDateString()}</p>
                </div>
                <div className="projects-btns">
                  <button
                    onClick={() => {
                      navigate(`/project/${project._id}/task`);
                    }}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(project._id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/project/${project._id}/edit`);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default AllProjects;
