import React from 'react';
import './styles.css';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

export default function SidebarComponent({ notes, selectedNoteIndex,
    newNote, selectNote, deleteNote, isDarkMode }) {

    if (notes) {
        return (
            <div className={"sidebarContainer" + isDarkMode}>

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
                                    deleteNote={deleteNote}
                                    isDarkMode={isDarkMode}
                                >
                                </SidebarItemComponent>
                                <Divider></Divider>
                            </div>
                        )
                    })}
                </List>
            </div>
        )
    } else return null;
}
