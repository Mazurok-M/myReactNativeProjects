import "firebase/auth";
import "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyD6lU_lyn7RIdTXN8QUwlnR3_OjYzPY904",
  authDomain: "myreactnativeprojects.firebaseapp.com",
  projectId: "myreactnativeprojects",
  storageBucket: "myreactnativeprojects.appspot.com",
  messagingSenderId: "389061900068",
  appId: "1:389061900068:web:474e90e7998cfd78ff65b1",
  measurementId: "G-E3L00GTMM6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

const storage = getStorage(app);

export { auth, storage, db };
