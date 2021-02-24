import "./App.css";
import SidebarComponent from "./sidebar/sidebar.jsx";
import EditorComponent,{TempEditor} from "./editor/editor.jsx";
import SubSidebar from './subSidebar/subSidebar'
import React, { useState, useEffect } from "react";
import { firebase } from "@firebase/app";

function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);
  const [closeSidebar,setCloseSidebar] = useState(true);

  //get all the data from firebase and store in useState
  useEffect(() => {
    firebase
      .firestore()
      .collection("Notion")
      .onSnapshot((serverUpdate) => {
        const notesFromDB = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        // notesFromDB.sort(function(x,y){
        //   return x.timestamp -y.timestamp;
        // })
        setNotes(notesFromDB);
      });
  }, []);
  

  
  //sidebar close/open
  const sidebarClose = () => {
    setCloseSidebar(!closeSidebar)
  };
    
  
  //selecting note
  const selectNote = (note, index) => {
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  };

  //updating note when editor updated
  const noteUpdate = (id, noteObj) => {
    firebase.firestore().collection("Notion").doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  
  //creating a new note
  const newNote = async () => {
    const note = {
      title: "[Untitled]",
      body: "",
    };
    const newFromDB = await firebase.firestore().collection("Notion").add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // this is fucking not working at all
    await setNotes([...notes, note]);

    console.table(notes);
    const newNoteIndex = notes.indexOf(
      {id:newFromDB.id})
    
    console.log(notes[newNoteIndex]?notes[newNoteIndex].title:newNoteIndex);
    selectNote(notes[newNoteIndex],newNoteIndex)
    
  };
  

  //deleting a note 
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
      <SubSidebar sidebarClose={sidebarClose}
      closeSidebar={closeSidebar}/>

      {closeSidebar?(<SidebarComponent
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        selectNote={selectNote}
        deleteNote={deleteNote}
        newNote={newNote}
        sidebarClose={sidebarClose}
      />):null}

      {selectedNote ? (
        // when sidebar is closed
        closeSidebar?(<EditorComponent
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}
          classNameForSize='left320'
        />):
        // when sidebar is opened
        (<EditorComponent
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}
          classNameForSize='left50'
        />)
        ) : <TempEditor/>}

    </div>
  );
}

export default App;



