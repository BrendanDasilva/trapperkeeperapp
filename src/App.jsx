import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./assets/css/App.css";
import Navbar from "./components/Navbar";
import ToDoList from "./components/ToDoList/ToDoApp";
import NotesApp from "./components/Notes/NotesApp";
import WeatherApp from "./components/Weather/WeatherApp";
import PomodoroApp from "./components/Pomodoro/PomodoroApp";
import TaskSchedulerApp from "./components/TaskScheduler/TaskSchedulerApp";
import HabitTrackerApp from "./components/HabitTracker/HabitTrackerApp";
import TimeTrackerApp from "./components/TimeTracker/TimeTrackerApp";
import ExpenseTrackerApp from "./components/ExpenseTracker/ExpenseTrackerApp";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";

function Home() {
  return (
    <div className="full-page-container">
      <Navbar />

      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to Trapper Keeper</h1>
        <p>Your ultimate productivity hub, all in one place.</p>
        <div className="hero-buttons">
          <Link to="/register" className="link">
            <button className="hero-button register-button">Register</button>
          </Link>
          <Link to="/login" className="link">
            <button className="hero-button login-button">Login</button>
          </Link>
        </div>
      </div>

      {/* Sticky Note Buttons */}
      <div className="app">
        <div className="main-content">
          <Link to="/todo" className="link">
            <button className="app-button">
              <span>To Do List</span>
              <div className="curl"></div>
            </button>
          </Link>
          <Link to="/notes" className="link">
            <button className="app-button">
              <span>Notes</span>
              <div className="curl"></div>
            </button>
          </Link>
          <Link to="/weather" className="link">
            <button className="app-button">
              <span>Weather</span>
              <div className="curl"></div>
            </button>
          </Link>
          <Link to="/pomodoro" className="link">
            <button className="app-button">
              <span>Pomodoro Timer</span>
              <div className="curl"></div>
            </button>
          </Link>
          <Link to="https://brendandasilva.github.io/Games/" className="link">
            <button className="app-button">
              <span>Games</span>
              <div className="curl"></div>
            </button>
          </Link>
          <Link to="/task-scheduler" className="link">
            <button className="app-button">
              <span>Task Scheduler</span>
              <div className="curl"></div>
            </button>
          </Link>
          <Link to="/habit-tracker" className="link">
            <button className="app-button">
              <span>Habit Tracker</span>
              <div className="curl"></div>
            </button>
          </Link>
          <Link to="/time-tracker" className="link">
            <button className="app-button">
              <span>Time Tracker</span>
              <div className="curl"></div>
            </button>
          </Link>
          <Link to="/expense-tracker" className="link">
            <button className="app-button">
              <span>Expense Tracker</span>
              <div className="curl"></div>
            </button>
          </Link>
        </div>
      </div>

      {/* Feature Highlights Section */}
      {/* <section className="feature-highlights">
        <h2>Why Choose Trapper Keeper?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Comprehensive Organization</h3>
            <p>All your tools in one place: tasks, notes, timers, and more.</p>
          </div>
          <div className="feature-item">
            <h3>User-Friendly Interface</h3>
            <p>A simple and intuitive design to maximize productivity.</p>
          </div>
          <div className="feature-item">
            <h3>Customizable Experience</h3>
            <p>Adapt the tools to suit your needs and workflow.</p>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<ToDoList />} />
      <Route path="/notes" element={<NotesApp />} />
      <Route path="/weather" element={<WeatherApp />} />
      <Route path="/pomodoro" element={<PomodoroApp />} />
      <Route path="/task-scheduler" element={<TaskSchedulerApp />} />
      <Route path="/habit-tracker" element={<HabitTrackerApp />} />
      <Route path="/time-tracker" element={<TimeTrackerApp />} />
      <Route path="/expense-tracker" element={<ExpenseTrackerApp />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
