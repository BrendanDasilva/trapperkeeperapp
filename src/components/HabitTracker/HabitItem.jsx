import React, { useEffect, useState } from "react";
import ProgressVisualization from "./ProgressVisualization";

const HabitItem = ({ habit, updateHabit, deleteHabit }) => {
  const [dynamicGoal, setDynamicGoal] = useState(habit.goal);

  useEffect(() => {
    if (habit.trackingDuration === "ongoing") {
      const interval = setInterval(
        () => {
          if (habit.frequency === "daily") {
            setDynamicGoal((prevGoal) => (prevGoal === "-" ? 1 : prevGoal + 1));
          } else if (habit.frequency === "weekly") {
            setDynamicGoal((prevGoal) => (prevGoal === "-" ? 1 : prevGoal + 1));
          }
        },
        habit.frequency === "daily" ? 86400000 : 604800000
      ); // 1 day or 1 week
      return () => clearInterval(interval);
    }
  }, [habit.frequency, habit.trackingDuration]);

  const markComplete = () => {
    const updatedHabit = {
      ...habit,
      completed: habit.completed + 1,
    };
    updateHabit(habit.id, updatedHabit);
  };

  const isHabitComplete =
    habit.trackingDuration !== "ongoing" && habit.completed >= dynamicGoal;

  return (
    <div className={`habit-item ${isHabitComplete ? "habit-complete" : ""}`}>
      <h3>{habit.name}</h3>
      <p>{habit.description}</p>
      <p>
        Frequency:{" "}
        {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
      </p>
      <p>
        Progress: {habit.completed} / {dynamicGoal}
      </p>
      <ProgressVisualization completed={habit.completed} goal={dynamicGoal} />
      <div className="habit-actions">
        <button
          className="habit-item-button"
          onClick={markComplete}
          disabled={isHabitComplete}
        >
          {isHabitComplete ? "Goal Met" : "Mark as Complete"}
        </button>
        <button
          className="habit-item-button"
          onClick={() => deleteHabit(habit.id)}
        >
          Delete Habit
        </button>
      </div>
    </div>
  );
};

export default HabitItem;
