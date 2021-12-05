// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAke4AGVqSY_qVPQ8wUZIdrttigKYxCCX8",
  authDomain: "chat-application-852a9.firebaseapp.com",
  databaseURL: "https://chat-application-852a9.firebaseio.com",
  projectId: "chat-application-852a9",
  storageBucket: "chat-application-852a9.appspot.com",
  messagingSenderId: "513615512128",
  appId: "1:513615512128:web:3dbbf5246d1981d95995a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export { auth, db, storage }