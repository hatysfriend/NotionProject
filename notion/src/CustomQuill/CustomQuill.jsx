import React, { useState } from 'react'
import './styles.css'
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import './styles.css'
import ToolbarModal,{modules, formats} from '../Modals/ToolbarModal';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import 'react-quill/dist/quill.bubble.css'

export default function CustomQuill({ body, updateBody, isDarkMode,index }) {

  const [settingsModalBool, setSettingsModalBool] = useState(false);
  const toggleToolbar = () => {
    setSettingsModalBool(!settingsModalBool);
  }

  const update = (val) =>{
    console.log(val +' '+index);
    updateBody(val, index);
  }

  return (
    
    <div className="CustomQuill">

      {/* <button className="settingsButton" onClick={toggleToolbar}><DragIndicatorIcon/></button> */}

      
      
      
       
       <ToolbarModal/>
         <ReactQuill
        value={body}
        onChange={update}
        modules={modules}
        formats={formats}
        theme="bubble"
        >
      </ReactQuill>
        
       
       
      
      
    </div>

  )
}

 