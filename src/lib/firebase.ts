import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase web config is safe to ship in client code.
// Security is enforced by Firestore Rules in the Firebase console.
// Replace the placeholders below with your Rocky202X project's values:
//   Firebase Console → Project settings → Your apps → Web app </>
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
