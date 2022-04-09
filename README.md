# YouChat

YouChat is a  chat appication that makes it easy to communicate with people anywhere in the world by sending and receiving messages in real time. It is built with react, react router and firebase.

# [Demo](https://chat-react-ap.netlify.app/)

<img width="1680" alt="Screenshot 2022-04-10 at 00 12 45" src="https://user-images.githubusercontent.com/63148200/162594707-b4c47535-bf74-4b35-ad6d-83b629c1e672.png">

## Technology stack

- React
- Firebase
- React router dom
- Netlify (deployment)

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

The following software is required to be installed on your system:
- Node
- Npm

Type the following commands in the terminal to verify your node and npm versions
```bash
npm -v
node -v
```
1. Clone the repo

```bash
git clone https://github.com/Seundede/chat-application.git
node -v
```

```bash
npm -v
node -v
```
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
