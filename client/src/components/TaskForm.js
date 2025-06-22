// client/src/components/TaskForm.js
import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onAdd }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAdd(taskName);
      setTaskName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="task-name"
        id="task-name"
        placeholder="Enter new task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
        className="task-input"
      />
      <button type="submit" id="add-task" className="add-task-btn">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
