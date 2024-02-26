import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "blog-dd724.firebaseapp.com",
  projectId: "blog-dd724",
  storageBucket: "blog-dd724.appspot.com",
  messagingSenderId: "623409967271",
  appId: "1:623409967271:web:da092c737a6ef8fde46b82",
  measurementId: "G-81E10PF83W",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
