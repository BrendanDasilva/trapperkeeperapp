import React from "react";
import HabitItem from "./HabitItem";

const HabitList = ({ habits, updateHabit, deleteHabit }) => {
  return (
    <div className="habit-list-container">
      {habits.length > 0 ? (
        habits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            updateHabit={updateHabit}
            deleteHabit={deleteHabit}
          />
        ))
      ) : (
        <p className="no-habits-message">No habits added yet.</p>
      )}
    </div>
  );
};

export default HabitList;
