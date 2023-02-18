// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; //Firebase SDK for initializing the app
import { getFirestore } from "firebase/firestore"; // Firebase SDK for Cloud Firestore
import { getAuth } from "firebase/auth"; // Firebase SDK for Authentication
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlZ3Vo-HP4oWqmOQM3YX7XIR3fdEUccaY",
  authDomain: "simple-crud-ee194.firebaseapp.com",
  projectId: "simple-crud-ee194",
  storageBucket: "simple-crud-ee194.appspot.com",
  messagingSenderId: "432127670236",
  appId: "1:432127670236:web:4d3d5578a086c863ee0119",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initualize Firestore
const db = getFirestore(app);
// Initialize Authentication
const auth = getAuth(app);

export { db, auth };

