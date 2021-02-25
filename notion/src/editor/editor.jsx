import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import debounce from '../helper'
import BorderColorIcon from '@material-ui/icons/BorderColor'
// import { withStyles } from '@material-ui/core/styles'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import "react-quill/dist/quill.snow.css";
import './styles.css'
import CustomQuill from '../CustomQuill/CustomQuill'


export default function EditorComponent({classNameForSize, selectedNote, selectedNoteIndex, notes, noteUpdate }) {
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
        console.log(val);
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
    })

    if(id){
       return (
        <div className={classNameForSize}>
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

            <CustomQuill
                body={body}
                updateBody={updateBody} />
        </div>
    ) 
    }else{
        return null;
    }
}    

export function TempEditor() {
    return (
        <div className='left50_temp'>
            <div className='welcomePage'>WELCOME PAGE<InsertEmoticonIcon/></div>
        </div>
    )
}








// const {classes} = this.props
// export default withStyles(styles)(EditorComponent)

//export default withStyles(injectCSS)(intoThisComponent)
// and call  'const {classes} = this.props' in component
// use classes as className={classes.cssVariable}