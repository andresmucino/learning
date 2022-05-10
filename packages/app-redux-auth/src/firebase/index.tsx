import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtfblrdNjiN1BhR_kCcQPpvIupFKDeY7c",
  authDomain: "react-redux-51bb2.firebaseapp.com",
  projectId: "react-redux-51bb2",
  storageBucket: "react-redux-51bb2.appspot.com",
  messagingSenderId: "520472971832",
  appId: "1:520472971832:web:7428131310534cb10eb4cd",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { firebase, auth, db, storage };
