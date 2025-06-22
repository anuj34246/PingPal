// client/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import EmailForm from './components/EmailForm';
import Verify from './pages/Verify';
import Unsubscribe from './pages/Unsubscribe';

import './App.css';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const addTask = async (name) => {
    try {
      await axios.post(`${API_BASE}/tasks`, { name });
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const updateTask = async (id, completed) => {
    try {
      await axios.patch(`${API_BASE}/tasks/${id}`, { completed });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Router>
      <div className="app-background">
        <div className="app-container">
          <Routes>
            <Route
              path="/"
              element={
                <div className="content-box">
                  <h1 className="main-title">📝 PingPal ⏰</h1>
                  <TaskForm onAdd={addTask} />
                  <TaskList
                    tasks={tasks}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                  />
                  <hr className="divider" />
                  <EmailForm />
                </div>
              }
            />
            <Route path="/verify" element={<Verify />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
