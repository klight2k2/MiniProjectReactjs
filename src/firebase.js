import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAPSoxqYXwN9iUhxHH9_IYou846xcmgiig",
  authDomain: "instagram-clone-react-7f39f.firebaseapp.com",
  projectId: "instagram-clone-react-7f39f",
  storageBucket: "instagram-clone-react-7f39f.appspot.com",
  messagingSenderId: "155537798316",
  appId: "1:155537798316:web:f61a8e19a739a330fddb09",
  measurementId: "G-E6NWRQM1WE",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
