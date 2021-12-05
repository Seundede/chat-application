import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import MessageInput from "../components/MessageInput";
import Messages from "../components/Messages";

import User from "../components/User";
import { auth, db, storage } from "../firebase";

const Home = () => {
  const user1 = auth.currentUser.uid;
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [msgs, setMsgs] = useState([]);
  useEffect(() => {
    const userRef = collection(db, "users");
    //Query object
    const q = query(userRef, where("uid", "not-in", [auth.currentUser.uid]));
    //Execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);
  const selectUser = async (user) => {
    setChat(user);
    const user2 = user.uid;
    const user1 = auth.currentUser.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgRef = collection(db, "messages", id, "chat");
    const q = query(msgRef, orderBy("createdAt", "asc"));
    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, "lastMsg", id), {
        unread: false,
      });
    }
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    const id =
      auth.currentUser.uid > chat.uid
        ? `${auth.currentUser.uid + chat.uid}`
        : `${chat.uid + auth.currentUser.uid}`;
    let upload = null;
    if (image) {
      const imageRef = ref(
        storage,
        `images/${new Date().getTime()} - ${image.name}`
      );
      const snap = await uploadBytes(imageRef, image);
      upload = await getDownloadURL(ref(storage, snap.ref.fullPath));
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: auth.currentUser.uid,
      to: chat.uid,
      createdAt: Timestamp.fromDate(new Date()),
      media: upload || "",
    });
    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: auth.currentUser.uid,
      to: chat.uid,
      createdAt: Timestamp.fromDate(new Date()),
      media: upload || "",
      unread: true,
    });
    setText("");
    setImage("");
  };
  return (
    <div className="home__container">
      <div className="user__container">
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </div>
      <div className="message__container">
        {chat ? (
          <>
            <div className="message__user">
              <h3>{chat.name}</h3>
              <div className="messages">
                {msgs.length
                  ? msgs.map((msg, i) => (
                      <Messages key={i} msg={msg} user1={user1} />
                    ))
                  : null}
              </div>
              <MessageInput
                submitMessage={submitMessage}
                text={text}
                setText={setText}
                setImage={setImage}
              />
            </div>
          </>
        ) : (
          <h3 className="no__message">Select a user to start conversation </h3>
        )}
      </div>
    </div>
  );
};

export default Home;
