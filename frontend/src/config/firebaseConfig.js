// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSLYZl_hV0c6NVHmcxdePJ9AVF-l6ZMRM",
  authDomain: "suppliers-management-e282f.firebaseapp.com",
  projectId: "suppliers-management-e282f",
  storageBucket: "suppliers-management-e282f.appspot.com",
  messagingSenderId: "782416707780",
  appId: "1:782416707780:web:95dd8d256c18ca6fa9c991",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
