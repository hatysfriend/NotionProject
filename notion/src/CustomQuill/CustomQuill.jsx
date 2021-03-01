import React, { useState } from 'react'
import './styles.css'
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import './styles.css'
import ToolbarModal,{getModuls} from '../Modals/ToolbarModal';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

export default function CustomQuill({ body, updateBody, isDarkMode }) {

  const [settingsModalBool, setSettingsModalBool] = useState(false);
  const toggleToolbar = () => {
    setSettingsModalBool(!settingsModalBool);
  }
  let modules = getModuls;

 
  // let modules = {
  //   toolbar: {
  //     container: "#a",
  //   }
  // }
  // // };

  let formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color"
  ];

  // // Add fonts to whitelist and register them
  const Font = Quill.import("formats/font");
  Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida"
  ];
  Quill.register(Font, true);

  // // Add sizes to whitelist and register them
  const Size = Quill.import("formats/size");
  Size.whitelist = ["extra-small", "small", "medium", "large"];
  Quill.register(Size, true);

  

  return (
    
    <div className="CustomQuill">

      <button className="" onClick={toggleToolbar}><DragIndicatorIcon/></button>
      {settingsModalBool && <ToolbarModal />}

      {/* <CustomToolbar /> */}
      
      

       {modules!==null?
       <ReactQuill
       value= {body}
       onChange={updateBody}
       //   placeholder={this.props.placeholder}
       modules={modules}
       formats={formats}>

     </ReactQuill>
       :null}
      
    </div>

  )
}

 