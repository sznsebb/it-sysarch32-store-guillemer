// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8sqRysl53ACvsoLkvZg8p7E6CrklqCfM",
  authDomain: "it-sysarch32-store-guillemer.firebaseapp.com",
  projectId: "it-sysarch32-store-guillemer",
  storageBucket: "it-sysarch32-store-guillemer.appspot.com",
  messagingSenderId: "720832719479",
  appId: "1:720832719479:web:5c729ea35cc58ffec43472",
  measurementId: "G-93V65JS1VK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);