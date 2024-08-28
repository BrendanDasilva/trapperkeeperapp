import React from "react";

const ProgressVisualization = ({ completed, goal }) => {
  const progressPercentage = Math.min((completed / goal) * 100, 100); // Calculate the progress percentage

  return (
    <div className="progress-visualization-container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p>
        {completed} / {goal} completed
      </p>
    </div>
  );
};

export default ProgressVisualization;
