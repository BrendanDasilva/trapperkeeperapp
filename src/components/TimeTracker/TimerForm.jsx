import React, { useState, useEffect } from "react";

const TimerForm = ({ addTimer }) => {
  const [description, setDescription] = useState("");
  const [job, setJob] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessions, setSessions] = useState([]); // Track multiple sessions

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const now = new Date();
        setElapsedTime(Math.round((now - startTime) / 1000));
      }, 1000);
    } else if (!isRunning && elapsedTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const handleStartStop = () => {
    if (isRunning) {
      const now = new Date();
      setEndTime(now);
      setSessions([...sessions, { startTime, endTime: now }]);
      setIsRunning(false);
    } else {
      setStartTime(new Date());
      setEndTime(null);
      setIsRunning(true);
    }
  };

  const handleSaveTimer = () => {
    const totalDuration = sessions.reduce(
      (acc, session) =>
        acc + Math.round((session.endTime - session.startTime) / 1000),
      0
    );
    addTimer({ description, job, totalDuration, sessions });
    resetForm();
  };

  const resetForm = () => {
    setDescription("");
    setJob("");
    setIsRunning(false);
    setElapsedTime(0);
    setSessions([]);
  };

  const formatElapsedTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}h ` : ""}${mins > 0 ? `${mins}m ` : ""}${secs}s`;
  };

  return (
    <div className="timer-form-container">
      <input
        type="text"
        className="time-tracker-form-input"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        className="time-tracker-form-input"
        placeholder="Job (Optional)"
        value={job}
        onChange={(e) => setJob(e.target.value)}
      />
      <button className="time-tracker-form-button" onClick={handleStartStop}>
        {isRunning ? "Stop Timer" : "Start Timer"}
      </button>
      {isRunning && (
        <div className="running-timer">
          <p>Time: {formatElapsedTime(elapsedTime)}</p>
        </div>
      )}
      {!isRunning && sessions.length > 0 && (
        <div className="timer-actions">
          <button
            className="time-tracker-form-button"
            onClick={handleStartStop}
          >
            Continue
          </button>
          <button
            className="time-tracker-form-button"
            onClick={handleSaveTimer}
          >
            Save Timer
          </button>
          <button className="time-tracker-form-button" onClick={resetForm}>
            Delete Timer
          </button>
        </div>
      )}
    </div>
  );
};

export default TimerForm;
