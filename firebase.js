// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "reddit-clone-d9ca9.firebaseapp.com",
  projectId: "reddit-clone-d9ca9",
  storageBucket: "reddit-clone-d9ca9.appspot.com",
  messagingSenderId: "431938206575",
  appId: "1:431938206575:web:b9ebd9a7a3cd2ea22e469a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)



export {db}