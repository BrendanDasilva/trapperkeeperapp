import React, { useState } from "react";
import "../../assets/css/App.css";
import Navbar from "../Navbar";
import CreateArea from "./CreateArea";
import Note from "./Note";
import Footer from "../Footer";

function NotesApp() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Navbar />
      <div className="notes-page-container">
        <div className="create-area">
          <CreateArea onAdd={addNote} />
        </div>
        <div className="notes-container">
          {notes.map((noteItem, index) => (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default NotesApp;
