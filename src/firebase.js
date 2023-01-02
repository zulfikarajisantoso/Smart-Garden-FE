import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXcx58x7d2SZ2e0gSGNTlVpGCIYvPmjqQ",
  authDomain: "nodemcu-4b494.firebaseapp.com",
  databaseURL:
    "https://nodemcu-4b494-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nodemcu-4b494",
  storageBucket: "nodemcu-4b494.appspot.com",
  messagingSenderId: "879299863829",
  appId: "1:879299863829:web:de29424d8e828aaffcf51c",
  measurementId: "G-814NKEGVVN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, storage, provider, auth };