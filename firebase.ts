import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
console.log("asd");
const firebaseConfig = {
    apiKey: "AIzaSyAQ7qeSW5IUhqbIOE-yByK220m0HdLRjpA",
    authDomain: "restaurant-suggestions-5773c.firebaseapp.com",
    projectId: "restaurant-suggestions-5773c",
    storageBucket: "restaurant-suggestions-5773c.firebasestorage.app",
    messagingSenderId: "537801810686",
    appId: "1:537801810686:web:a2f5fef3a42765d19d7baf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };