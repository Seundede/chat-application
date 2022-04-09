import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import avatar from "../image/github avatar.png";
const User = ({ user, selectUser, user1, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState();
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, );

  return (
    <>
      <div
        className={`user__wrapper ${
          chat.name === user.name && "selected__user"
        }`}
        onClick={() => {
          selectUser(user);
        }}
      >
        <div className="user__info">
          <div className="user__detail">
            <img
              src={user.avatar || avatar}
              alt="Avatar"
              className="user__avatar"
            />
            <h4>{user.name}</h4>
            {data?.from !== user1 && data?.unread && (
              <small className="unread">New</small>
            )}
          </div>
          <div
            className={`user__status ${user.isOnline ? "online" : "offline"}`}
          ></div>
        </div>
      </div>
      <div
        onClick={() => selectUser(user)}
        className={`small__container ${
          chat.name === user.name && "selected__user"
        }`}
      >
        <img
          src={user.avatar || avatar}
          alt="Avatar"
          className="user__avatar small__screen"
        />
      </div>
    </>
  );
};

export default User;
