import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './styles.css';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

export default function SidebarComponent({notes, selectedNoteIndex, newNote, selectNote, deleteNote}) {
   
    
    
    if(notes){
        return(
            <div className="sidebarContainer">
                <Button
                onClick = {newNote}
                className = "newNoteBtn">
                    New Note
                </Button>
                
                <List>
                    {
                        notes.map((_note,_index) => {
                            return(
                                <div key={_index}>
                                    <SidebarItemComponent
                                        _note={_note}
                                        _index={_index}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote = {selectNote}
                                        deleteNote = {deleteNote}>
                                    </SidebarItemComponent>
                                    <Divider></Divider>
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
    else {
        return(<div>Loading</div>)
    }
}
