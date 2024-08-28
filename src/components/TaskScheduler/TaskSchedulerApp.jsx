import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "../../assets/css/App.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

function TaskSchedulerApp() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  return (
    <div>
      <Navbar />
      <div className="task-scheduler-container">
        <div className="form-container">
          <h2 className="scheduleFormTitle">Task Scheduler</h2>
          <TaskForm addTask={addTask} />
        </div>
        <h3 className="current-tasks-title">Current Tasks</h3>
        <TaskList
          tasks={tasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default TaskSchedulerApp;
