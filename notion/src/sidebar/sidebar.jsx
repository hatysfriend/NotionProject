import React from 'react';
import './styles.css';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

export default function SidebarComponent({ notes, selectedNoteIndex, newNote, selectNote, deleteNote }) {


    if (notes) {
        return (
            <div className="sidebarContainer">

                <Button
                    className="newNoteBtn"
                    variant="contained"
                    color="primary"
                    onClick={newNote}>
                    New note
                </Button>

                <List>
                    {notes.map((_note, _index) => {
                        return (
                            <div key={_index}>
                                <SidebarItemComponent
                                    _note={_note}
                                    _index={_index}
                                    selectedNoteIndex={selectedNoteIndex}
                                    selectNote={selectNote}
                                    deleteNote={deleteNote}>
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
    else return null;
}
