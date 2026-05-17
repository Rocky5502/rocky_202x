import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase web config is safe to ship in client code.
// Security is enforced by Firestore Rules in the Firebase console.
// Replace the placeholders below with your Rocky202X project's values:
//   Firebase Console → Project settings → Your apps → Web app </>
const firebaseConfig = {
  apiKey: "AIzaSyAIyi4eSV1C6dh3UEHaqg0S1CzeBtdLvVI",
  authDomain: "rocky202x.firebaseapp.com",
  projectId: "rocky202x",
  storageBucket: "rocky202x.firebasestorage.app",
  messagingSenderId: "702057886326",
  appId: "1:702057886326:web:c0d9883b934a056c0ea557",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
