import React,{useState} from 'react'
import './styles.css'
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import './styles.css'

export default function CustomQuill({body,updateBody}) {

  let modules = {
    toolbar: {
      container: "#toolbar",
      
    }
  };

  let formats = [
    "header",
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
  
  // Add sizes to whitelist and register them
  const Size = Quill.import("formats/size");
  Size.whitelist = ["extra-small", "small", "medium", "large"];
  Quill.register(Size, true);

return (
      <div className="CustomQuill">
        {/* <CustomToolbar /> */}
        <div id="toolbar">
        
    <select className="ql-size">
      <option value="extra-small">extra-small</option>
      <option value="small" selected>small</option>
      <option value="medium">medium</option>
      <option value="large">large</option>
    </select>
    <select className="ql-color" />
    
        </div>
        <ReactQuill
           value={body}
           onChange={updateBody}
        //   placeholder={this.props.placeholder}
          modules={modules}
          formats={formats}>
           
        </ReactQuill>
      </div>
      
    )
}
