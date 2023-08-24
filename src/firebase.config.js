import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrJ5TGK29ubdONQzjnJ3rPZoxJwq59Ub8",
  authDomain: "house-marketplace-27829.firebaseapp.com",
  projectId: "house-marketplace-27829",
  storageBucket: "house-marketplace-27829.appspot.com",
  messagingSenderId: "499342553254",
  appId: "1:499342553254:web:7d722ec64e3d89ef304467"
};

// Initialize Firebase
 initializeApp(firebaseConfig);

 export const db= getFirestore()