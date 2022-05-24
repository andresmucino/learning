// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq6a0Shce7T4lSp1xxayPIVpziYsClf0M",
  authDomain: "roles-udemy-6fae2.firebaseapp.com",
  projectId: "roles-udemy-6fae2",
  storageBucket: "roles-udemy-6fae2.appspot.com",
  messagingSenderId: "193641767547",
  appId: "1:193641767547:web:8974d4a7f7e53926b378de",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();

export { db, auth, firebase, functions };
