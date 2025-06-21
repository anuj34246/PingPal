// client/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import EmailForm from './components/EmailForm';
import Verify from './pages/Verify';
import Unsubscribe from './pages/Unsubscribe';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get(`${API_BASE}/tasks`);
    setTasks(res.data);
  };

  const addTask = async (name) => {
    await axios.post(`${API_BASE}/tasks`, { name });
    fetchTasks();
  };

  const updateTask = async (id, completed) => {
    await axios.patch(`${API_BASE}/tasks/${id}`, { completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_BASE}/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
              <h1>Task Scheduler</h1>
              <TaskForm onAdd={addTask} />
              <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
              <hr />
              <EmailForm />
            </div>
          }
        />
        <Route path="/verify" element={<Verify />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
      </Routes>
    </Router>
  );
}

export default App;