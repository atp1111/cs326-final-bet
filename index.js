// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC541LYnRncuB5f-589Mf40N97JL1PA9DE",
  authDomain: "closetswap-ee052.firebaseapp.com",
  projectId: "closetswap-ee052",
  storageBucket: "closetswap-ee052.appspot.com",
  messagingSenderId: "716090807885",
  appId: "1:716090807885:web:8f8b1240fafefdb97d6e04",
  measurementId: "G-PEQW4H5QNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);