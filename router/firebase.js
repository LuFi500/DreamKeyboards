// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_vwPCXNqu_xom9LQCPWhEtK46-mq2a7o",
  authDomain: "dreamkeyboards-5da26.firebaseapp.com",
  projectId: "dreamkeyboards-5da26",
  storageBucket: "dreamkeyboards-5da26.appspot.com",
  messagingSenderId: "521463307759",
  appId: "1:521463307759:web:70a688c17524ddb134ea1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore and export it
const db = getFirestore(app);


export { auth, db }; // Export both auth and db
export default app;
