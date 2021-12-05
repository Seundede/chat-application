import React from "react";
import Upload from "./Upload";
const MessageInput = ({submitMessage, text, setText, setImage}) => {
  return (
    <form className="message__form" onSubmit={ submitMessage}>
      <label htmlFor="img">
        <Upload />
      </label>
      <input
      onChange = {(e) => setImage(e.target.files[0])}
        type="file"
        id="img"
        accept="image/*"
        style={{ display: "none" }}
      />
      <div>
          <input type="text" placeholder='Enter message' value ={text} onChange= {e =>setText(e.target.value)}/>
      </div>
      <div>
          <button className='btn'>Send</button>
      </div>
    </form>
  );
};

export default MessageInput;
