// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrq7-Wgo1qfbUFO3CXjqil4upiIkygRew",
  authDomain: "manager-nail.firebaseapp.com",
  projectId: "manager-nail",
  storageBucket: "manager-nail.appspot.com",
  messagingSenderId: "491484074044",
  appId: "1:491484074044:web:5b0a0d9b1941c00d597339",
  measurementId: "G-41RK2LHRP9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
