import React, { useState, useEffect } from "react";
import debounce from "../helper";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import CustomQuill from "../CustomQuill/CustomQuill";

export default function EditorComponent({
  classNameForSize,
  selectedNote,
  selectedNoteIndex,
  notes,
  noteUpdate,
  isDarkMode,
}) {
  const [body, SetBody] = useState(selectedNote.body);
  const [title, Settitle] = useState("");
  const [id, SetId] = useState("");

  useEffect(() => {
    SetBody(selectedNote.body);
    Settitle(selectedNote.title);
    SetId(selectedNote.id);
  }, [selectedNote.body, selectedNote.id, selectedNote.title]);

  const addBlock = () =>{
      const newBlock = '';
      const arr = [...body];
      arr.push(newBlock);
      SetBody(arr);
      noteUpdate(selectedNote.id, {
        id: selectedNote.id,
        title: selectedNote.title,
        body: arr,
      });
  }

  const updateBody = (val, index) => { // [123,345,678]
    const arr = [...body]
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
    const nbody = [...body]
    nbody[index]= newbody
    
    if (!newtitle && newbody) {
      //updating body
      noteUpdate(selectedNote.id, {
        id: selectedNote.id,
        title: selectedNote.title,
        body: nbody,
      });
    }

    if (newtitle && !newbody) {
      //updating title
      noteUpdate(selectedNote.id, {
        id: selectedNote.id,
        title: newtitle,
        body: selectedNote.body,
      });
    }
  });


  //render
  if (id) {
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
        
        {body.map((block, index) => {
            console.log(block);
          return (
            <CustomQuill
              key={index}  
              index = {index}
              body={block}
              updateBody={updateBody}
              isDarkMode={isDarkMode}
            />
          );
        })} 
         
        <div onClick={addBlock} placeholder="/New block goes here...">ADD NEW BLOCK</div> 
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
