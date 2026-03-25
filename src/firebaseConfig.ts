
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJsNRQcSjjc764MmFiAUIsR6vn-meP_jA",
  authDomain: "authwith-9a483.firebaseapp.com",
  projectId: "authwith-9a483",
  storageBucket: "authwith-9a483.appspot.co",
  messagingSenderId: "467343947871",
  appId: "1:467343947871:android:f5cb4f3e44d2edcd0ac3ea",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
