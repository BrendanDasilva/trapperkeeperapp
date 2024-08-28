import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleComplete, deleteTask, editTask }) => {
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))
      ) : (
        <p className="no-tasks-message">No tasks added yet.</p>
      )}
    </div>
  );
};

export default TaskList;
