import firebase from "firebase/app";
import { FBConfig } from "../config/info";
import "firebase/firestore";
import "firebase/analytics";
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(FBConfig);
firebase.analytics();
const db = firebaseApp.firestore();

export {
    db
}