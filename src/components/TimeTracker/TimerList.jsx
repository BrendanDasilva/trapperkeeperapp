import React from "react";
import TimerItem from "./TimerItem";

const TimerList = ({ timers, updateTimer, deleteTimer }) => {
  return (
    <div>
      {timers.length > 0 ? (
        timers.map((timer) => (
          <TimerItem
            key={timer.id}
            timer={timer}
            updateTimer={updateTimer}
            deleteTimer={deleteTimer}
          />
        ))
      ) : (
        <p className="no-timers-message">No time entries yet.</p>
      )}
    </div>
  );
};

export default TimerList;
