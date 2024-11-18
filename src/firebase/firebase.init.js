import firebaseConfig from "./firebase.config";
import { initializeApp } from "firebase/app";

const firebaseInitialization = () => {
  initializeApp(firebaseConfig);
};

export default firebaseInitialization;
