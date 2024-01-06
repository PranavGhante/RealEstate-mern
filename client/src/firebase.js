// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBmeJviVbGScR3cmoak027JLpX33H4d4M",
    authDomain: "mern-estate-e4b5b.firebaseapp.com",
    projectId: "mern-estate-e4b5b",
    storageBucket: "mern-estate-e4b5b.appspot.com",
    messagingSenderId: "321163530881",
    appId: "1:321163530881:web:c815b990f72ee901b2f380"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);