// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoxME1NA3rtVk7uIh8KK8KYvmC_WDYLbI",
  authDomain: "parknest1.firebaseapp.com",
  projectId: "parknest1",
  storageBucket: "parknest1.appspot.com",
  messagingSenderId: "751499042743",
  appId: "1:751499042743:web:6033d70e5a7be354d8d232",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// initializing storage
const storage = getStorage();

export { firebase, storage};
