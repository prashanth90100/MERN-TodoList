import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';


function Home() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEdit = (id) => {
  axios.put(`http://localhost:3001/update/${id}`)
    .then(res => {
      setTodos(prev =>
        prev.map(todo =>
          todo._id === id ? { ...todo, done: res.data.done } : todo
        )
      );
    })
    .catch(err => console.log(err));
    toast.success("Task marked as completed!");

};
const handleDelete = (id) => {
  axios.delete(`http://localhost:3001/delete/${id}`)
    .then(() => {
      setTodos(prev => prev.filter(todo => todo._id !== id));
    })
    .catch(err => console.log(err));
    toast.info("Task deleted!");

};


  return (
    <div className='home'>
      <h2>Todo List</h2>
      <Create setTodos={setTodos} />
      {
        todos.length === 0
          ?
          <div><h2>No Record</h2></div>
          :
          todos.map(todo => (
           <div className='task' key={todo._id}>
  <div className="checkbox" onClick={() => handleEdit(todo._id)}>
    <BsCircleFill
      className='icon'
      style={{ color: todo.done ? 'red' : 'gray' }}
    />
    <p style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
      {todo.task}
    </p>
  </div>
  <div>
    <span onClick={() => handleDelete(todo._id)}>
  <BsFillTrashFill className='icon' />
</span>

  </div>
</div>

          ))
      }
    </div>
  );
}

export default Home;
