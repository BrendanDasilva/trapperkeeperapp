import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/App.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="hamburger" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </div>
        <Link to="/" className="navbar-title-link">
          <div className="navbar-title">Trapper Keeper</div>
        </Link>
      </nav>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">Trapper Keeper</div>
          <i className="fas fa-times" onClick={toggleMenu}></i>
        </div>
        <hr />
        <ul>
          <li>
            <Link to="/" onClick={toggleMenu}>
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/todo" onClick={toggleMenu}>
              <i className="fas fa-list"></i> To Do List
            </Link>
          </li>
          <li>
            <Link to="/notes" onClick={toggleMenu}>
              <i className="fas fa-sticky-note"></i> Notes
            </Link>
          </li>
          <li>
            <Link to="/weather" onClick={toggleMenu}>
              <i className="fas fa-cloud-sun"></i> Weather
            </Link>
          </li>
          <li>
            <Link to="/pomodoro" onClick={toggleMenu}>
              <i className="fas fa-clock"></i> Pomodoro Timer
            </Link>
          </li>
          <li>
            <a
              href="https://brendandasilva.github.io/Games/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
            >
              <i className="fas fa-gamepad"></i> Games
            </a>
          </li>
          <li>
            <Link to="/task-scheduler" onClick={toggleMenu}>
              <i className="fas fa-calendar-alt"></i> Task Scheduler
            </Link>
          </li>
          <li>
            <Link to="/habit-tracker" onClick={toggleMenu}>
              <i className="fas fa-check"></i> Habit Tracker
            </Link>
          </li>
          <li>
            <Link to="/time-tracker" onClick={toggleMenu}>
              <i className="fas fa-stopwatch"></i> Time Tracker
            </Link>
          </li>
          <li>
            <Link to="/expense-tracker" onClick={toggleMenu}>
              <i className="fas fa-wallet"></i> Expense Tracker
            </Link>
          </li>
        </ul>
        <hr />
        <ul className="sidebar-links sidebar-auth">
          <li>
            <Link to="/register" onClick={toggleMenu}>
              <i className="fas fa-user-plus"></i> Register
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={toggleMenu}>
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          </li>
        </ul>
      </div>
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      ></div>
    </>
  );
}

export default Navbar;
