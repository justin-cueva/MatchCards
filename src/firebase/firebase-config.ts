import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApqZn3ya9aV4WRO1UhN6XJWp9ctFUdRCo",
  authDomain: "match-cards-fc1b9.firebaseapp.com",
  projectId: "match-cards-fc1b9",
  storageBucket: "match-cards-fc1b9.appspot.com",
  messagingSenderId: "895950353793",
  appId: "1:895950353793:web:c686454c02d32b76d1e480",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
