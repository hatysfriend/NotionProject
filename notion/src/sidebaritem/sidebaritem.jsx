import React, { useState, use} from 'react';
import { withStyles } from '@material-ui/core/styles';
import './styles.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helper';

export default function SidebarItemComponent({ _index, _note, selectedNoteIndex, selectNote, deleteNote}) {
    
    
    return (
            <div key = {_index}>
                <ListItem
                    className = "listItem"
                    selected={selectedNoteIndex===_index}
                    alignItems='flex-start'>
                    <div
                        className="textSection"
                        onClick={()=>selectNote(_note,_index)}>
                            <ListItemText
                                primary={_note.title}
                                secondary={removeHTMLTags(_note.body.substring(0,30))+'...'}>
                            </ListItemText>
                    </div>
                    <DeleteIcon
                        onClick={()=>{
                            if(window.confirm(`Are you sure you want to delete: ${_note.title}`)){
                           deleteNote(_note) 
                            }
                        }}
                        className="deleteIcon">
                    </DeleteIcon>
                </ListItem>
            </div>
    )
}

