import { initializeApp } from "firebase/app"

const firebaseConfig= {
    apiKey: "AIzaSyAGe0GAGtyzQDgdfYDBFYk5otNwpYJ2ITM",
    authDomain: "front-yard-c31a2.firebaseapp.com",
    databaseURL: "https://front-yard-c31a2-default-rtdb.firebaseio.com",
    projectId: "front-yard-c31a2",
    storageBucket: "front-yard-c31a2.appspot.com",
    messagingSenderId: "595102969707",
    appId: "1:595102969707:web:8973e8a7a67ab6355aa62e",
    measurementId: "G-C28R9DHNXT"
  };

  const app = initializeApp(firebaseConfig);


export { app };