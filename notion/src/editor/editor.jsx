import React, { useState, useEffect } from "react";
import debounce from "../helper";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import CustomQuill from "../CustomQuill/CustomQuill";
import ReactQuill from "react-quill";
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';

export default function EditorComponent({
  classNameForSize,
  selectedNote,
  selectedNoteIndex,
  notes,
  noteUpdate,
  isDarkMode,
}) {
  const [body, SetBody] = useState("");
  const [title, Settitle] = useState("");
  const [id, SetId] = useState("");

  useEffect(() => {
    SetBody(selectedNote.body);
    Settitle(selectedNote.title);
    SetId(selectedNote.id);
  }, [selectedNote.body, selectedNote.id, selectedNote.title]);

  const addBlock = () =>{
      const newBlock = '';
      const arr = [...selectedNote.body];
      arr.push(newBlock);
      SetBody(arr);
      noteUpdate(selectedNote.id, {
        id: selectedNote.id,
        title: selectedNote.title,
        body: arr,
      });
  }

  const deleteBlock = (index)=>{
    let arr = [...selectedNote.body];
    console.log(arr)
    console.log(index)
    arr.splice(index,1);
    console.log(arr)

    // splice with return  => add
    // splice with no return => remove
    
      SetBody(arr);
      
      noteUpdate(selectedNote.id, {
        id: selectedNote.id,
        title: selectedNote.title,
        body: arr,
      });
  }

  // const updateBody = async (val) => {
    //     SetBody(val);
    //     update('', val)
    // }
    
  const updateBody = (val, index) => { // [123,345,678]
    const arr = [...selectedNote.body]
    arr[index] = val;
    SetBody(arr);
    update("", val, index);
  };

  const updateTitle = (txt) => {
    Settitle(txt);
    update(txt, "",'');
  };

  //update
  const update = debounce((newtitle, newbody, index) => {
    const nbody = [...selectedNote.body]
    nbody[index]= newbody
    
    if(!newtitle && newbody) {
      
      //updating body
      noteUpdate(selectedNote.id, {
        id: selectedNote.id,
        title: selectedNote.title,
        body: nbody,
      }); 
      console.log('body updated');
    }

    if (newtitle && !newbody) {
      //updating title
      noteUpdate(selectedNote.id, {
        id: selectedNote.id,
        title: newtitle,
        body: selectedNote.body,
      });
      console.log('title updated');
    }
  });


  //render
  if (selectedNote.id) {
    return (
      <div className={classNameForSize + isDarkMode}>
        <BorderColorIcon className="editIcon"></BorderColorIcon>

        {/* title */}
        <input
          className="titleInput"
          placeholder={"Note title.."}
          value={title ? title : ""}
          onChange={(e) => updateTitle(e.target.value)}
        ></input>

        {/* note body */}
        
        {selectedNote.body.map((block, index) => {
          return (
              <CustomQuill
              key = {index} 
              index = {index}
              body={block}
              updateBody={updateBody}
              deleteBlock={deleteBlock}
              isDarkMode={isDarkMode}
              />
          );
        })} 
         
        <div className='addNewBlock' onClick={addBlock}><AddIcon/><CreateIcon/></div> 
        {/* calse 1 : if body has no block => wanna make this body[0] */}
        {/* case 2: else body[body.length]   //[a,b ,c] body[3] */}
        {/* <CustomQuill
              index = '0'
              body={body[0]}
              updateBody={updateBody}
              isDarkMode={isDarkMode}
            /> */}
      </div>
    );
  } else {
    return null;
  }
}

export function TempEditor({ isDarkMode }) {
  return (
    <div className={"left50_temp" + isDarkMode}>
      <div className="welcomePage">
        WELCOME PAGE
        <InsertEmoticonIcon />
      </div>
    </div>
  );
}

// const {classes} = this.props
// export default withStyles(styles)(EditorComponent)

//export default withStyles(injectCSS)(intoThisComponent)
// and call  'const {classes} = this.props' in component
// use classes as className={classes.cssVariable}
