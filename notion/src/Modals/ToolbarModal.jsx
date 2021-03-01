import React, { useState } from 'react'
import './toolbarModal.css'
import ReactQuill, { Quill } from 'react-quill';

export default function ToolbarModal() {
  
  getModuls({
    toolbar: {
      container: "#a"
    }
  });

  // let formats = [
  //   "header",
  //   "font",
  //   "size",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "list",
  //   "bullet",
  //   "indent",
  //   "link",
  //   "image",
  //   "color"
  // ];

  // Add sizes to whitelist and register them
  // const Size = Quill.import("formats/size");
  // Size.whitelist = ["extra-small", "small", "medium", "large"];
  // Quill.register(Size, true);

  return (
    <div className="toolbar" id='a'>
      <select className="ql-size" defaultValue="large">
        <option value="extra-small">extra-small</option>
        <option value="small" >small</option>
        <option value="medium">medium</option>
        <option value="large">large</option>
      </select>

      <select className="ql-color" />

      <button className="ql-bold"></button>

      <button className="ql-italic"></button>

      <button className="ql-underline"></button>
      
      <button className="ql-strike"></button>
    </div>

  )
}

// export const getModuls=()=>
// {
//   return 
//   {toolbar: {
//     container: "#a"
//   }}
// };