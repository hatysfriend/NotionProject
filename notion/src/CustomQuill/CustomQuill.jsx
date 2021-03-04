import React, { useState, useRef } from "react";
import "./styles.css";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import { removeHTMLTags } from "../helper";
import ToolbarModal, { modules, formats } from "../Modals/ToolbarModal";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

import "react-quill/dist/quill.bubble.css";

export default function CustomQuill({
  body,
  updateBody,
  deleteBlock,
  isDarkMode,
  index,
}) {
  // const bodyRef = useRef(body); //1
  // const keyRef = useRef("");
  // let b = body;
  // let k = '';

  //
 
  //it's called when value changed
  const update = (val) => {
    console.log('onchanged triggered ')
    // bodyRef.current = val;
    if (removeHTMLTags(val).length === 0) {  
      console.log('is this going to infinite loop?(1)')
      deleteBlock(index);
    }
  if (removeHTMLTags(val).length !== 0 ){
    updateBody(val, index);
    console.log('is this going to infinite loop?(2)')
  }
  
  };
  //it's called when any keyboard is clicked
  // const onKeyDownHandler = (e) => {
  //   keyRef.current = e.key;
  //   // fun();
  // };
  
  // identifying if should call delatebock() or updatebody
  // const fun = () => {
  //   if (removeHTMLTags(bodyRef.current).length === 0) {
      
  //       deleteBlock(index);
      
  //   }
  //   if (removeHTMLTags(bodyRef.current).length !== 0 &&
  //     ;
  //     updateBody(bodyRef.current, index);
  //   }
  // };

  return (
    <div className="CustomQuill">
      {/* <button className="settingsButton" onClick={toggleToolbar}><DragIndicatorIcon/></button> */}

      {/* <ToolbarModal/> */}
      <ReactQuill
        value={body}
        onChange={update}
        // modules={modules}
        // formats={formats}
        // placeholder="/this is a new block"
        // onKeyDown={onKeyDownHandler}
        theme="bubble"
      ></ReactQuill>
    </div>
  );
} 