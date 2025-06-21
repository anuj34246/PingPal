// client/src/components/TaskList.js
import React from 'react';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  return (
    <ul className="tasks-list" id="tasks-list">
      {tasks.map(task => (
        <li key={task._id} className={`task-item${task.completed ? ' completed' : ''}`}>
          <input
            type="checkbox"
            className="task-status"
            checked={task.completed}
            onChange={() => onUpdate(task._id, !task.completed)}
          />
          <span style={{ margin: '0 10px' }}>{task.name}</span>
          <button className="delete-task" onClick={() => onDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
