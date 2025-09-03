import React from 'react'

const TaskForm = ()=> {
  return (
    <>
    <h1>Add a New Task</h1>
    <form >
        <label htmlFor="title">Title:</label>
        <input type="text" id='title' name='title'/>
        <br />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea name="description" id="description"></textarea>
        <br />
        <br />
        <label htmlFor="date">Deadline: </label>
        <input type="date" name="date" id="date" />
        <br />
        <br />
        <label htmlFor="status">Status</label>
        <select name="status" id="status">
            <option value="">Pending</option>
            <option value="">In Progress</option>
            <option value="">Complete</option>
        </select>

        <br />
        <br />
        <button>Add</button>
    </form>
    </>
  )
}

export default TaskForm