import React, { useState } from "react";
import HabitForm from "./HabitForm";
import HabitList from "./HabitList";
import "../../assets/css/App.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

function HabitTrackerApp() {
  const [habits, setHabits] = useState([]);

  const addHabit = (habit) => {
    setHabits([...habits, { ...habit, id: habits.length + 1 }]);
  };

  const updateHabit = (id, updatedHabit) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, ...updatedHabit } : habit
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <div>
      <Navbar />
      <div className="habit-tracker-container">
        <div className="form-container">
          <h2>Habit Tracker</h2>
          <HabitForm addHabit={addHabit} />
        </div>
        <h3 className="current-habits-title">Your Habits</h3>
        <HabitList
          habits={habits}
          updateHabit={updateHabit}
          deleteHabit={deleteHabit}
        />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default HabitTrackerApp;
