import React, { useState } from 'react'
import './styles.css'
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import './styles.css';
import {removeHTMLTags} from '../helper';
import ToolbarModal,{modules, formats} from '../Modals/ToolbarModal';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import 'react-quill/dist/quill.bubble.css'

export default function CustomQuill({ body, updateBody, deleteBlock, isDarkMode, index}) {

  const [settingsModalBool, setSettingsModalBool] = useState(false);
  const toggleToolbar = () => {
    setSettingsModalBool(!settingsModalBool);
  }

  const update = (val) =>{
    updateBody(val, index);
  }

 const onKeyDownHandler = (e)=>{
  if(removeHTMLTags(body).length === 0){
    if(e.key ==='Backspace'){  
      e.preventDefault();
      deleteBlock(index);
   }
  }
   
 }

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
        onKeyDown={onKeyDownHandler}
        theme="bubble"
        >
      </ReactQuill>
              
    </div>

  )
}

 