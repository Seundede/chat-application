import React, { useEffect, useRef } from "react";
import Moment from "react-moment";

const Messages = ({ msg, user1 }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <div
      className={`message__wrapper ${msg.from === user1 ? "own" : "other"}`}
      ref={scrollRef}
    >
      <div className={msg.from === user1 ? "me" : "friend"}>
        <>{msg.media ? <img src={msg.media} alt={msg.text} /> : null}</>
        <p>{msg.text}</p>
        <br />
        <small>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </div>
    </div>
  );
};

export default Messages;
