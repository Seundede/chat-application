import React, { useEffect, useState } from "react";
import Camera from "../components/Camera";
import image_one from "../image/github avatar.png";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [image, setImage] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (image) {
      const uploadImage = async () => {
        const imageRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${image.name}`
        );
        try {
          if(user.avatarPath){
            await deleteObject(ref(storage, user.avatarPath))
          }
          const snap = await uploadBytes(imageRef, image);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImage("");
        } catch (err) {
          console.log(err.meassage);
        }
      };
      uploadImage();
    }
  }, [image, user.avatarPath]);
  return user ? (
    <section>
      <div className="profile_container">
        <div className="image_container">
          <img src={user.avatar ||image_one} alt="Avatar" />
          <div className="overlay">
            <label htmlFor="photo">
              <Camera />
            </label>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="photo"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
        <div className="text_container">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
          <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
