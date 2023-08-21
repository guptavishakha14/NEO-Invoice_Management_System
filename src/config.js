// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB20hZLTK2-jmmW8Lv0USw_tQX2sKbq_w8",
  authDomain: "billing-system-530c3.firebaseapp.com",
  projectId: "billing-system-530c3",
  storageBucket: "billing-system-530c3.appspot.com",
  messagingSenderId: "433155199991",
  appId: "1:433155199991:web:0e7b5f1327d3e0b958d4f2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();