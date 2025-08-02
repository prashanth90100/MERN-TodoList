import { useState } from 'react'
import './App.css'
import Home from './Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div >
      <Home />
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  )
}

export default App
