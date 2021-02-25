import "./App.css";
import SidebarComponent from "./sidebar/sidebar.jsx";
import EditorComponent, { TempEditor } from "./editor/editor.jsx";
import SubSidebar from './subSidebar/subSidebar'
import React, { useState, useEffect } from "react";
import { firebase } from "@firebase/app";

function App() {
  //data holders
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);
  // switches
  const [closeSidebar, setCloseSidebar] = useState(true);
  const [closeSettingModal,setCloseSettingModal] = useState(false)
  const [isDarkMode,setIsDarkMode] = useState(true);

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
        setNotes(notesFromDB);
      });
  }, []);


  //sidebar close/open
  const sidebarClose = () => {
    setCloseSidebar(!closeSidebar)
  };
  const settingModalClose = () => {
    setCloseSettingModal(!closeSettingModal)
  };
  const isDarkModeFunc = (bool)=>{
    setIsDarkMode(bool)
  }


  //selecting note
  const selectNote = (note, index) => {
    setSelectedNoteIndex(index); //     if this works
    setSelectedNote(note);            //this shouldnt work
  };

  //updating note when editor updated
  const noteUpdate = (id, noteObj) => {
    firebase.firestore().collection("Notion").doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setCloseSidebar(closeSidebar);
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
    const newArray = [...notes];
    note.id = newFromDB.id
    newArray.push(note);
    setNotes(newArray);
    console.log(newFromDB);
    let index = null;
    firebase
      .firestore()
      .collection("Notion")
      .onSnapshot((serverUpdate) => {
        const notesFromDB = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        console.table(notesFromDB)
        index = notesFromDB.findIndex(item => item.id === newFromDB.id)
        console.log(index)
      })
      selectNote(note,index);
  };


  //deleting a note 
  const deleteNote = async (note) => {
    firebase.firestore().collection("Notion").doc(note.id).delete();
    selectNote(null, null);
  };

  return (
    <div className="App">
      <SubSidebar 
      sidebarClose={sidebarClose}
        closeSidebar={closeSidebar}
        closeSettingModal={closeSettingModal}
        settingModalClose={settingModalClose}
        isDarkMode={isDarkMode}
        isDarkModeFunc={isDarkModeFunc}

        />

      {closeSidebar ? (<SidebarComponent
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        selectNote={selectNote}
        deleteNote={deleteNote}
        newNote={newNote}
        sidebarClose={sidebarClose}
        isDarkMode={isDarkMode}
      />) : null}

      {selectedNote ? (
        // when sidebar is closed
        closeSidebar ? (<EditorComponent
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}
          classNameForSize='left320'
          isDarkMode={isDarkMode}
        />) :
          // when sidebar is opened
          (<EditorComponent
            selectedNote={selectedNote}
            selectedNoteIndex={selectedNoteIndex}
            notes={notes}
            noteUpdate={noteUpdate}
            classNameForSize='left50'
            isDarkMode={isDarkMode}
          />)
      ) : <TempEditor isDarkMode={isDarkMode}/>}

    </div>
  );
}

export default App;



