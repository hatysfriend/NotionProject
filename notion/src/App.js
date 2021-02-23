import "./App.css";
import SidebarComponent from "./sidebar/sidebar.jsx";
import EditorComponent from "./editor/editor.jsx";
import React, { useState, useEffect } from "react";
import { firebase } from "@firebase/app";

function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    console.log("a");
    firebase
      .firestore()
      .collection("Notion")
      .onSnapshot((serverUpdate) => {
        const notesFromDB = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        setNotes(notesFromDB);
        console.log("b");
      });
  }, []);

  const selectNote = (note, index) => {
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  };

  const noteUpdate = (id, noteObj) => {
    firebase.firestore().collection("Notion").doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const newNote = async () => {
    const note = {
      title: "",
      body: "",
    };

    const newFromDB = await firebase.firestore().collection("Notion").add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    const newID = newFromDB.id;
    await setNotes([...notes, note]);
    const newNoteIndex = notes.indexOf(
      notes.filter((_note) => _note.id === newID)[0]
    );
    selectNote(notes[newNoteIndex],newNoteIndex)
    
  };

  const deleteNote = async (note) => {
    const noteIndex = notes.indexOf(note);
    await setNotes(notes.filter((_note) => _note !== note));
    if (selectedNoteIndex === noteIndex) {
      selectNote(null , null)
    } else {
      notes.length > 1
        ?selectNote(notes[selectedNoteIndex - 1],selectedNoteIndex - 1)
        :selectNote(null, null)
    }
    firebase.firestore().collection("Notion").doc(note.id).delete();
  };

  return (
    <div className="App">
      <SidebarComponent
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        selectNote={selectNote}
        deleteNote={deleteNote}
        newNote={newNote}
      />
      {selectedNote ? (
        <EditorComponent
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}
        />
      ) : null}
    </div>
  );
}

export default App;
