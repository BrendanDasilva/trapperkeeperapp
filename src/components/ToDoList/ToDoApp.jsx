import React, { useState } from "react";
import "../../assets/css/App.css";
import Navbar from "../Navbar";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import Footer from "../Footer";

function App() {
  const [items, setItems] = useState([]);
  const [hideCheckedItems, setHideCheckedItems] = useState(false);

  function addItem(inputText) {
    if (inputText.trim() === "") {
      alert("Cannot add an empty item.");
      return;
    }
    setItems((prevItems) => {
      return [
        ...prevItems,
        { text: inputText, id: Date.now(), checked: false },
      ];
    });
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  }

  function toggleCheck(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function clearCheckedItems() {
    setItems((prevItems) => prevItems.filter((item) => !item.checked));
  }

  function toggleHideCheckedItems() {
    setHideCheckedItems(!hideCheckedItems);
  }

  const displayedItems = hideCheckedItems
    ? items.filter((item) => !item.checked)
    : items;

  const sortedItems = displayedItems.sort((a, b) => a.checked - b.checked);

  return (
    <div className="full-page-container">
      <Navbar />
      <div className="container">
        <div className="heading">
          <h1>To-Do List</h1>
        </div>
        <InputArea onAdd={addItem} />
        <div className="todo-controls">
          <button onClick={toggleHideCheckedItems}>
            {hideCheckedItems ? "Show Checked Items" : "Hide Checked Items"}
          </button>
          <button onClick={clearCheckedItems}>Clear Checked Items</button>
        </div>
        <div>
          <ul>
            {sortedItems.map((todoItem) => (
              <ToDoItem
                key={todoItem.id}
                id={todoItem.id}
                text={todoItem.text}
                checked={todoItem.checked}
                onChecked={toggleCheck}
                onDelete={deleteItem}
              />
            ))}
          </ul>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
