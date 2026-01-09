import { initializeApp } from "firebase/app";
// import { getAnalytics , getToken } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging";

const firebaseConfig= {
  apiKey: "AIzaSyAfEOOtBi9rbNrV8mnIoPD-uIvCmkvnXY4",
  authDomain: "smart-stay-7da3c.firebaseapp.com",
  projectId: "smart-stay-7da3c",
  storageBucket: "smart-stay-7da3c.firebasestorage.app",
  messagingSenderId: "251194789789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENTID
};





const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);


// App OPEN (Foreground)
export const onMessageListener = (callback) => {
  const unsubscribe = onMessage(messaging, (payload) => {
    callback(payload);
  });

  return unsubscribe; 
};