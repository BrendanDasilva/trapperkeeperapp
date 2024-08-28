import React, { useState } from "react";

const HabitForm = ({ addHabit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [trackingDuration, setTrackingDuration] = useState("ongoing");

  const determineGoal = () => {
    if (frequency === "daily") {
      if (trackingDuration === "week") return 7;
      if (trackingDuration === "month") return 30;
      return "-"; // For ongoing, we use "-" and increase it daily
    }
    if (frequency === "weekly") {
      if (trackingDuration === "week") return 1;
      if (trackingDuration === "month") return 4;
      return "-"; // For ongoing, we use "-" and increase it weekly
    }
    return "-"; // Default case, though it shouldn’t be needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHabit = {
      name,
      description,
      frequency,
      trackingDuration,
      completed: 0,
      goal: determineGoal(),
    };
    addHabit(newHabit);
    setName("");
    setDescription("");
    setFrequency("daily");
    setTrackingDuration("ongoing");
  };

  return (
    <form className="habit-form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="habit-form-input"
        placeholder="Habit Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        className="habit-form-textarea"
        placeholder="Habit Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <select
        className="habit-form-select"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <select
        className="habit-form-select"
        value={trackingDuration}
        onChange={(e) => setTrackingDuration(e.target.value)}
      >
        <option value="ongoing">Ongoing</option>
        <option value="week">Track for a Week</option>
        <option value="month">Track for a Month</option>
      </select>
      <button className="habit-form-button" type="submit">
        Add Habit
      </button>
    </form>
  );
};

export default HabitForm;
