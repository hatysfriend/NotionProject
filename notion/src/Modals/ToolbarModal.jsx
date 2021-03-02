import React, { useState } from 'react'
import './toolbarModal.css'
import { Quill } from 'react-quill';
// import hljs from 'highlight.js'

// hljs.configure({
//   languages: ['javascript', 'ruby', 'python', 'rust'],
// })

export default function ToolbarModal() {
  
  const Size = Quill.import("formats/size");
  Size.whitelist = ["extra-small", "small", "medium", "large"];
  Quill.register(Size, true);

  return (
    <div id='toolbar'>
      <select className="ql-size">
        <option value="extra-small">extra-small</option>
        <option value="small" >small</option>
        <option value="medium" >medium</option>
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

export const modules = {
  // syntax: {
  //   highlight: text => hljs.highlightAuto(text).value,
  // },
  toolbar: {
    container: "#toolbar"
  },
  // clipboard: {
  //   matchVisual: false,
  // },
};

export const formats = [
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
  "color",
  "code-block"
];