import { initializeApp } from "firebase/app";
import { getFirestore } from "fireabase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-w5hBmu4PdWp7QdfQYd-9QOPegyzyCz4",
  authDomain: "dumps-mvp.firebaseapp.com",
  projectId: "dumps-mvp",
  storageBucket: "dumps-mvp.appspot.com",
  messagingSenderId: "706324734253",
  appId: "1:706324734253:web:ed40d79a1dc56105cb33a4"
};

const firebaseApp = initializeApp(firebaseConfig);