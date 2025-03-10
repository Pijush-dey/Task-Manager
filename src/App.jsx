import React, { useState } from "react";
import "./App.css"; // Import the CSS file

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState({ id: null, text: "" });
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: Date.now(),
      text: newTask,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Start editing a task
  const startEdit = (id, text) => {
    setEditTask({ id, text });
  };

  // Save the edited task
  const saveEdit = () => {
    if (editTask.text.trim() === "") return;
    setTasks(
      tasks.map((task) =>
        task.id === editTask.id ? { ...task, text: editTask.text } : task
      )
    );
    setEditTask({ id: null, text: "" });
  };

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
          className="search-input"
        />
      </div>

      {/* Input for adding a new task */}
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="input"
        />
        <button onClick={addTask} className="add-button">
          Add Task
        </button>
      </div>

      {/* List of tasks */}
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            {editTask.id === task.id ? (
              // Edit mode for the task
              <div className="edit-container">
                <input
                  type="text"
                  value={editTask.text}
                  onChange={(e) =>
                    setEditTask({ ...editTask, text: e.target.value })
                  }
                  className="edit-input"
                />
                <button onClick={saveEdit} className="save-button">
                  Save
                </button>
              </div>
            ) : (
              // Display mode for the task
              <div className="task-content">
                <span className="task-text">{task.text}</span>
                <div className="task-actions">
                  <button
                    onClick={() => startEdit(task.id, task.text)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;