import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import './styles.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { removeHTMLTags } from '../helper';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

export default function SidebarItemComponent({ _index, _note, 
    selectedNoteIndex, selectNote, deleteNote,isDarkMode}) {
    
    const substringa = (title) => {
        if(title.length>12){
            return title.substring(0,12)+'...';
        }
        else return title;
      };
    
    return (
            <div key = {_index}>
                
                <ListItem
                    className = {"listItem"+isDarkMode}
                    selected={selectedNoteIndex===_index}
                    alignItems='flex-start'>

                        <ArrowRightIcon className='openArrow'/>
                        <InsertDriveFileIcon className="fileIcon"/>

                    <div className="textSection"
                        onClick={()=>selectNote(_note,_index)}>
                            <ListItemText
                                primary={substringa(_note.title)}
                                >
                            </ListItemText>
                    </div>

                    <MoreHorizIcon className='threeDots'/>
                     <NoteAddIcon className='addIcon'/>

                    <DeleteIcon
                        onClick={()=>{
                            // if(window.confirm(`Are you sure you want to delete: ${_note.title}`)){
                           deleteNote(_note) 
                            // }
                        } }
                        className="deleteIcon">
                    </DeleteIcon>
                    
                </ListItem>
            </div>
    )
}

