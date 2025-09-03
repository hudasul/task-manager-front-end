import React from "react";

const ProjectForm = () => {
  return (
    <>
      <h1>Create A New Project</h1>
      <form>
        <label htmlFor="title">Project Title: </label>
        <input type="text" name="title" id="title" />

        <br />
        <br />
        <label htmlFor="deadline">Project DEadline: </label>
        <input type="date" name="deadline" id="deadline" />
        <br />
        <br />
        <button>Add</button>
      </form>
    </>
  );
};

export default ProjectForm;
