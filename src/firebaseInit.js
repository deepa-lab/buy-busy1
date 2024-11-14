// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs_icgzky7g6GUJVwZQqdUPaxruPgs1-w",
  authDomain: "buybusy-59a67.firebaseapp.com",
  projectId: "buybusy-59a67",
  storageBucket: "buybusy-59a67.firebasestorage.app",
  messagingSenderId: "417728578680",
  appId: "1:417728578680:web:d0d949924f3c796724d98d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);