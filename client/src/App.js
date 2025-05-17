import './App.css';
import React from 'react';
import { Routes,Route } from 'react-router-dom'
//add the components
import Registration from './components/Registration';
import Login from './components/Login';
import Agent from './components/Agent';
import Dashboard from './components/Dashboard';
import TaskUpload from "./components/TaskUpload"
function App() {
  return (
    //creating the routes 
    <Routes>
    <Route path="/register" element={<Registration/>}></Route>
    <Route path="/" element={<Login/>}></Route>
     <Route path="/agent" element={<Agent/>}></Route>
      <Route path="/Dashboard" element={<Dashboard/>}></Route>
      <Route path="/upload" element={<TaskUpload/>}></Route>
    
    </Routes>
  )
}

export default App;
