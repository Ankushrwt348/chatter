// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa4lnQDDHRxYoyIvcCk10m1qIWXN27m90",
  authDomain: "ankushrawatt-77bb9.firebaseapp.com",
  projectId: "ankushrawatt-77bb9",
  storageBucket: "ankushrawatt-77bb9.appspot.com",
  messagingSenderId: "509914815056",
  appId: "1:509914815056:web:e377b51bba1bcef7ebcf55",
  measurementId: "G-DZE4RREZVP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);