import React, { useState } from "react";

function InputArea(props) {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
    if (newValue.trim() !== "") {
      setError(""); // Clear error when there is valid input
    }
  }

  function handleClick() {
    if (inputText.trim() === "") {
      setError("Cannot add an empty item.");
    } else {
      props.onAdd(inputText);
      setInputText("");
      setError("");
    }
  }

  function handleDismiss() {
    setError("");
  }

  return (
    <div className="form">
      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button className="dismiss-button" onClick={handleDismiss}>
            x
          </button>
        </div>
      )}
      <input onChange={handleChange} type="text" value={inputText} />
      <button onClick={handleClick}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
