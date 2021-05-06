import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACUJy9XV12g3WB8J6Vx84vkxnbXu29ixo",
  authDomain: "hgss-a6fa7.firebaseapp.com",
  databaseURL: "https://hgss-a6fa7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hgss-a6fa7",
  storageBucket: "hgss-a6fa7.appspot.com",
  messagingSenderId: "290416776526",
  appId: "1:290416776526:web:1e3ba3cb2a35bffa6a3a1f",
  measurementId: "G-0NRJVTVXX7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.database();