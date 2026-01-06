import { initializeApp } from "firebase/app";
// import { getAnalytics , getToken } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAfEOOtBi9rbNrV8mnIoPD-uIvCmkvnXY4",
  authDomain: "smart-stay-7da3c.firebaseapp.com",
  projectId: "smart-stay-7da3c",
  storageBucket: "smart-stay-7da3c.firebasestorage.app",
  messagingSenderId: "251194789789",
  appId: "1:251194789789:web:ce464d9ab1b6e888272974",
  measurementId: "G-R17ZQ1WK8K"
};
 

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);



export const onMessageListener = (callback) => {
  const unsubscribe = onMessage(messaging, (payload) => {
    callback(payload);
  });

  return unsubscribe; 
};