import firebase from "firebase/app";
import "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyAf8Lax6c8QkmYvzHsgmjMxxDzRhdreb9k",
//   authDomain: "battlerockets-5c6fc.firebaseapp.com",
//   databaseURL: "https://battlerockets-5c6fc-default-rtdb.firebaseio.com",
//   projectId: "battlerockets-5c6fc",
//   storageBucket: "battlerockets-5c6fc.appspot.com",
//   messagingSenderId: "827425225449",
//   appId: "1:827425225449:web:82c0909517ed32e07dce78",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

var firebaseConfig = {
  apiKey: "AIzaSyAKNQyNZpusmZV2YPOEbkro6thxmtP9gYI",
  authDomain: "cakebiscuitlollipop.firebaseapp.com",
  databaseURL: "https://cakebiscuitlollipop-default-rtdb.firebaseio.com",
  projectId: "cakebiscuitlollipop",
  storageBucket: "cakebiscuitlollipop.appspot.com",
  messagingSenderId: "90017343404",
  appId: "1:90017343404:web:1929789b50a4150b073c09",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
