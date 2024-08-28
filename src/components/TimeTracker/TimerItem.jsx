import React, { useState, useEffect } from "react";

const TimerItem = ({ timer, updateTimer, deleteTimer }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

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

  const handleContinue = () => {
    const now = new Date();
    setStartTime(now);
    setIsRunning(true);

    // Add the new session to the existing sessions
    const updatedSessions = [...timer.sessions, { startTime: now }];
    updateTimer(timer.id, {
      ...timer,
      sessions: updatedSessions,
      isRunning: true,
    });
  };

  const handleStop = () => {
    const now = new Date();
    const updatedSessions = timer.sessions.map((session, index) => {
      if (index === timer.sessions.length - 1 && !session.endTime) {
        return { ...session, endTime: now };
      }
      return session;
    });
    updateTimer(timer.id, {
      ...timer,
      sessions: updatedSessions,
      isRunning: false,
    });
    setIsRunning(false);
  };

  const formatElapsedTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}h ` : ""}${mins > 0 ? `${mins}m ` : ""}${secs}s`;
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}h ` : ""}${mins > 0 ? `${mins}m ` : ""}${secs}s`;
  };

  return (
    <div className="time-tracker-item">
      <h3>{timer.description}</h3>
      {timer.job && <p>Job: {timer.job}</p>}
      <p>Total Duration: {formatDuration(timer.totalDuration)}</p>
      <div>
        <h4 className="timerSessions">Sessions:</h4>
        <ul>
          {timer.sessions.map((session, index) => (
            <li key={index}>
              Start: {formatTime(session.startTime)}, End:{" "}
              {session.endTime ? formatTime(session.endTime) : "Ongoing"}
            </li>
          ))}
        </ul>
      </div>
      {isRunning && (
        <div className="running-timer">
          <p>Running Time: {formatElapsedTime(elapsedTime)}</p>
          <button className="time-tracker-item-button" onClick={handleStop}>
            Stop Timer
          </button>
        </div>
      )}
      <div className="timer-actions">
        {!isRunning && (
          <>
            <button
              className="time-tracker-item-button"
              onClick={handleContinue}
            >
              Continue
            </button>
            <button
              className="time-tracker-item-button"
              onClick={() => deleteTimer(timer.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TimerItem;
