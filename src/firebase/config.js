import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFcW7obLFgBaDWzXPP7_Ejt6-VElyMiYE",
  authDomain: "taptune-b3b03.firebaseapp.com",
  projectId: "taptune-b3b03",
  storageBucket: "taptune-b3b03.appspot.com",
  messagingSenderId: "111563637110",
  appId: "1:111563637110:web:7806de7a7a8374b3b17a57",
  measurementId: "G-EX7R0LXCWT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
