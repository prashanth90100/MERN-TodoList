import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const handleAdd = () => {
  if (!task) {
    toast.warn("Please enter a task.");
    return;
  }

  axios.post('http://localhost:3001/add', { task })
    .then(result => {
      toast.success("Task added!");
      setTask('');
      setTodos(prev => [...prev, result.data]);
    })
    .catch(err => toast.error("Failed to add task."));
};


function Create({ setTodos }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task || task.trim() === "") return;

    axios.post('http://localhost:3001/add', { task })
      .then(result => {
        // Add new task to the UI
        setTodos(prev => [...prev, result.data]);
        setTask(""); // Clear input
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='create_form'>
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
