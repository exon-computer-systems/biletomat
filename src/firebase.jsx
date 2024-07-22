// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxf4CKngqPJW6ynftGh0m0XD6WE0H9oXk",
    authDomain: "exon-biletomat.firebaseapp.com",
    projectId: "exon-biletomat",
    storageBucket: "exon-biletomat.appspot.com",
    messagingSenderId: "693269463611",
    appId: "1:693269463611:web:7212a310c1c338fcf5921e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
