import React from "react";

function ToDoItem({ id, text, checked, onChecked, onDelete }) {
  function handleCheckboxClick() {
    onChecked(id);
  }

  return (
    <div className={`todo-item ${checked ? "checked" : ""}`}>
      <input type="checkbox" checked={checked} onChange={handleCheckboxClick} />
      <li>{text}</li>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export default ToDoItem;
