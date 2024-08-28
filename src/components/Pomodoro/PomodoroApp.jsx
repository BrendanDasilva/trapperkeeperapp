import React, { useState } from "react";
import "../../assets/css/App.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

function PomodoroApp() {
  const [mode, setMode] = useState("pomodoro");
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState([]);

  function handleModeChange(newMode) {
    setMode(newMode);
    if (newMode === "pomodoro") setTime(1500); // 25 minutes
    if (newMode === "shortBreak") setTime(300); // 5 minutes
    if (newMode === "longBreak") setTime(900); // 15 minutes
    setIsActive(false); // Stop the timer when mode changes
  }

  function handleStart() {
    setIsActive(!isActive);
  }

  function handleAddTask(task) {
    setTasks([...tasks, { text: task, completed: false }]);
  }

  function handleToggleTask(index) {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  }

  return (
    <div className={`pomodoro-app ${mode}`}>
      <Navbar />
      <div className="content">
        <div className="mode-buttons">
          <button onClick={() => handleModeChange("pomodoro")}>Pomodoro</button>
          <button onClick={() => handleModeChange("shortBreak")}>
            Short Break
          </button>
          <button onClick={() => handleModeChange("longBreak")}>
            Long Break
          </button>
        </div>
        <Timer time={time} isActive={isActive} setTime={setTime} />
        <button className="start-button" onClick={handleStart}>
          {isActive ? "Pause" : "Start"}
        </button>
        <TaskList
          tasks={tasks}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
        />
      </div>
    </div>
  );
}

function Timer({ time, isActive, setTime }) {
  React.useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, setTime]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="timer">
      <h1>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
    </div>
  );
}

function TaskList({ tasks, onAddTask, onToggleTask }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task);
      setTask("");
    }
  }

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add Task"
        />
        <button type="submit">+</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(index)}
            />
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PomodoroApp;
