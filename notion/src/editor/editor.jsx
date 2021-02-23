import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import debounce from '../helper'
import BorderColorIcon from '@material-ui/icons/BorderColor'
// import { withStyles } from '@material-ui/core/styles'
import "react-quill/dist/quill.snow.css";
// import './styles.css'


export default function EditorComponent({ selectedNote, selectedNoteIndex, notes, noteUpdate }) {
    const [body, SetBody] = useState('');
    const [title, Settitle] = useState('');
    const [id, SetId] = useState('');

    useEffect(() => {
        SetBody(selectedNote.body);
        Settitle(selectedNote.title);
        SetId(selectedNote.id);
    }, [selectedNote.body, selectedNote.id, selectedNote.title]);

    useEffect(() => {
        if (selectedNote.id !== id) {
            SetBody(selectedNote.body);
            Settitle(selectedNote.title);
            SetId(selectedNote.id);
        }
    }, [id, selectedNote.body, selectedNote.id, selectedNote.title]);

    const updateBody = async (val) => {
        await SetBody(val)
        update()
    }

    const updateTitle = async (txt) => {
        await Settitle(txt)
        update()
    }
    //update every 1.5 sec
    const update = debounce(() => {
        noteUpdate(id,
        {
            title: title,
            body: body
        })
    }, 1500)

    if(id){
       return (
        <div className="editorContainer">
            <BorderColorIcon
                className="editIcon">
            </BorderColorIcon>
            {/* title */}
            <input
                className="titleInput"
                placeholder={'Note title..'}
                value={title ? title : ''}
                onChange={(e) => updateTitle(e.target.value)}>
            </input>

            {/* note body */}
            <ReactQuill
                value={body}
                onChange={updateBody} />
        </div>
    ) 
    }else{
        return null;
    }
    
}







// const {classes} = this.props
// export default withStyles(styles)(EditorComponent)

//export default withStyles(injectCSS)(intoThisComponent)
// and call  'const {classes} = this.props' in component
// use classes as className={classes.cssVariable}