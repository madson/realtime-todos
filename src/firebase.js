import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import * as CONFIG from "./firebase-config";

var firebaseConfig = {
  apiKey: CONFIG.apiKey,
  authDomain: CONFIG.authDomain,
  projectId: CONFIG.projectId,
  storageBucket: CONFIG.storageBucket,
  messagingSenderId: CONFIG.messagingSenderId,
  appId: CONFIG.appId,
  measurementId: CONFIG.measurementId,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
