// Import the functions you need from the SDKs you need
import app from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyU_PWBBMl_mmdcoopLqTxKTWtp6LFEBU",
  authDomain: "auth-firebase-e1843.firebaseapp.com",
  projectId: "auth-firebase-e1843",
  storageBucket: "auth-firebase-e1843.appspot.com",
  messagingSenderId: "1022642813898",
  appId: "1:1022642813898:web:9b9f7c2736a219d98cad33",
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore();

const auth = app.auth();

export { db, auth };
