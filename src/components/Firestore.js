import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBW3FhozlyvQ7wH7V6n7w5JWzw19A0yoMs",
    authDomain: "weddingplanner-2bbf3.firebaseapp.com",
    databaseURL: "https://weddingplanner-2bbf3.firebaseio.com",
    projectId: "weddingplanner-2bbf3",
    storageBucket: "weddingplanner-2bbf3.appspot.com",
    messagingSenderId: "287921631468",
    appId: "1:287921631468:web:1052519115cf5795b635c9",
    measurementId: "G-6JHMXG4N29"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;