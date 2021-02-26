import React, { useState } from 'react'
import './styles.css'
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import './styles.css'

export default function CustomQuill({ body, updateBody, isDarkMode }) {

  let modules = {
    toolbar: {
      container: "#toolbar",

    }
  };

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

  // Add fonts to whitelist and register them
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

  // Add sizes to whitelist and register them
  const Size = Quill.import("formats/size");
  Size.whitelist = ["extra-small", "small", "medium", "large"];
  Quill.register(Size, true);

  return (
    <div className="CustomQuill">
      {/* <CustomToolbar /> */}
      <div id="toolbar">

        <select className="ql-font">
          <option value="arial" selected>Arial</option>
          <option value="comic-sans">Comic Sans</option>
          <option value="courier-new">Courier New</option>
          <option value="georgia">Georgia</option>
          <option value="helvetica">Helvetica</option>
          <option value="lucida">Lucida</option>
        </select>

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
