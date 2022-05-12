// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMRwpHNd79VdGfTaVnjnElXxnptg967xw",
  authDomain: "react-context-8ddd9.firebaseapp.com",
  projectId: "react-context-8ddd9",
  storageBucket: "react-context-8ddd9.appspot.com",
  messagingSenderId: "201712407857",
  appId: "1:201712407857:web:fa4d4c4b35e64e50798c10",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

const provider = new GoogleAuthProvider();

export { db, auth, provider };
