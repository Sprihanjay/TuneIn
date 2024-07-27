// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuHns_GjefDspguu2QTM9q2LMt882cFrw",
  authDomain: "tunein-37dd3.firebaseapp.com",
  projectId: "tunein-37dd3",
  storageBucket: "tunein-37dd3.appspot.com",
  messagingSenderId: "528488911121",
  appId: "1:528488911121:web:5404e93133bbd3bfc37cb0",
  measurementId: "G-DHTVB3J9R0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
const db = getFirestore(app);

export { app, analytics, auth, db };
