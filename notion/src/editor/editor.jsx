import React, { useState, useEffect } from 'react'
import debounce from '../helper'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import "react-quill/dist/quill.snow.css";
import './styles.css'
import CustomQuill from '../CustomQuill/CustomQuill'


export default function EditorComponent({ classNameForSize, selectedNote,
    selectedNoteIndex, notes, noteUpdate, isDarkMode }) {
    const [body, SetBody] = useState('');
    const [title, Settitle] = useState('');
    const [id, SetId] = useState('');

    useEffect(() => {
        SetBody(selectedNote.body);
        Settitle(selectedNote.title);
        SetId(selectedNote.id);
    }, [selectedNote.body, selectedNote.id, selectedNote.title]);

    const updateBody = async (val) => {
        SetBody(val);
        update('', val)
    }

    const updateTitle = async (txt) => {
        Settitle(txt);
        update(txt, '')
    }

    //update
    const update = debounce((newtitle, newbody) => {

        if (!newtitle && newbody) {//updating body
            noteUpdate(selectedNote.id,
                {
                    id: selectedNote.id,
                    title: selectedNote.title,
                    body: newbody
                })
        }
        if (newtitle && !newbody) { //updating title
            noteUpdate(selectedNote.id,
                {
                    id: selectedNote.id,
                    title: newtitle,
                    body: selectedNote.body
                })
        }
    })


    //render
    if (id) {
        return (
            <div className={classNameForSize + isDarkMode}>
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
                    updateBody={updateBody}
                    isDarkMode={isDarkMode} />
            </div>
        )
    } else { return null; }
}



export function TempEditor({ isDarkMode }) {
    return (
        <div className={'left50_temp' + isDarkMode}>
            <div className='welcomePage'>WELCOME PAGE<InsertEmoticonIcon /></div>
        </div>
    )
}








// const {classes} = this.props
// export default withStyles(styles)(EditorComponent)

//export default withStyles(injectCSS)(intoThisComponent)
// and call  'const {classes} = this.props' in component
// use classes as className={classes.cssVariable}