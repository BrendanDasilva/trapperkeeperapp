import React, { useState } from "react";
import TimerForm from "./TimerForm";
import TimerList from "./TimerList";
import "../../assets/css/App.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

function TimeTrackerApp() {
  const [timers, setTimers] = useState([]);

  const addTimer = (timer) => {
    setTimers([...timers, { ...timer, id: timers.length + 1 }]);
  };

  const updateTimer = (id, updatedTimer) => {
    setTimers(
      timers.map((timer) =>
        timer.id === id ? { ...timer, ...updatedTimer } : timer
      )
    );
  };

  const deleteTimer = (id) => {
    setTimers(timers.filter((timer) => timer.id !== id));
  };

  return (
    <div>
      <Navbar />
      <div className="time-tracker-container">
        <div className="form-container">
          <h2 className="timeTrackerTitle">Time Tracker</h2>
          <TimerForm addTimer={addTimer} />
        </div>
        <h3 className="current-timers-title">Current Timers</h3>
        <TimerList
          timers={timers}
          updateTimer={updateTimer}
          deleteTimer={deleteTimer}
        />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default TimeTrackerApp;
