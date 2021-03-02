import "./App.css";
import SidebarComponent from "./sidebar/sidebar.jsx";
import EditorComponent, { TempEditor } from "./editor/editor.jsx";
import SubSidebar from './subSidebar/subSidebar'
import React, { useState, useEffect, useRef } from "react";
import { firebase } from "@firebase/app";

function App() {
  //data holders
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);
  // switches
  const [closeSidebar, setCloseSidebar] = useState(true);
  const [closeSettingModal, setCloseSettingModal] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const notesRef = useRef();
  let a = null;

  //get data from DB
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
        setNotes(notesFromDB);
        notesRef.current=notesFromDB;
      });
      
      // get color from DB
      firebase
      .firestore()
      .collection("Color")
      .onSnapshot((serverUpdate) => {
        const colorFromDB = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        setIsDarkMode(colorFromDB[0].isDark);
      });
  }, []);


  //sidebar close/open
  const sidebarClose = () => {
    setCloseSidebar(!closeSidebar)
  };
 
  //setting modal close/open
  const settingModalClose = () => {
    setCloseSettingModal(!closeSettingModal)
  };
 
  //dark mode on/off
  const isDarkModeFunc = (bool) => {
    firebase.firestore().collection("Color").doc('j1ZT24ZiyBohd31wpoNI').update({
      isDark: bool
    });
    setIsDarkMode(bool)
  }
  
  //selecting note
  const selectNote = (note, index) => {
    setSelectedNoteIndex(index);    
    setSelectedNote(note);          
  };

  //updating note when editor updated
  const noteUpdate = (id, noteObj) => {
    console.table(noteObj.body);
    firebase.firestore().collection("Notion").doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
      selectNote(noteObj, selectedNoteIndex);
  };

  //deleting a note 
  const deleteNote = async (note) => {
    firebase.firestore().collection("Notion").doc(note.id).delete();
    selectNote(null, null);
  };

  //creating a new note
  const newNote = async () => {

    const note = {
      title: "[Untitled]",
      body: ['<p>1</p>']
    };
    
    //add a new note to the DB
    const newFromDB = await firebase.firestore().collection("Notion").add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    
    //set a new note to the useState
    const newArray = [...notes];
    note.id = newFromDB.id //assign new ID from DB
    newArray.push(note);
    setNotes(newArray);
  
    //get index of new note
    let index = notesRef.current.findIndex(item => item.id === newFromDB.id)

    selectNote(note, index);
  };


  

  return (
    <div className="App">

      {/* --subside bar --*/}
      <SubSidebar
        sidebarClose={sidebarClose}
        closeSidebar={closeSidebar}
        closeSettingModal={closeSettingModal}
        settingModalClose={settingModalClose}
        isDarkMode={isDarkMode}
        isDarkModeFunc={isDarkModeFunc}
      />

      {/* --sidebar close/open-- */}
      {closeSidebar ? (<SidebarComponent
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        selectNote={selectNote}
        deleteNote={deleteNote}
        newNote={newNote}
        sidebarClose={sidebarClose}
        isDarkMode={isDarkMode}
      />) : null}

      {/* EditorComponent open/close Version or default page */}
      {selectedNote
        ? (closeSidebar
          ? (<EditorComponent
            selectedNote={selectedNote}
            selectedNoteIndex={selectedNoteIndex}
            notes={notes}
            noteUpdate={noteUpdate}
            classNameForSize='left320'
            isDarkMode={isDarkMode}
          />)
          : (<EditorComponent
            selectedNote={selectedNote}
            selectedNoteIndex={selectedNoteIndex}
            notes={notes}
            noteUpdate={noteUpdate}
            classNameForSize='left50'
            isDarkMode={isDarkMode}
          />))
        : <TempEditor isDarkMode={isDarkMode} />}

    </div>
  );
}

export default App;



