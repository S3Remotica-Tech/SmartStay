
/* eslint-disable no-undef */

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAfEOOtBi9rbNrV8mnIoPD-uIvCmkvnXY4",
  authDomain: "smart-stay-7da3c.firebaseapp.com",
  projectId: "smart-stay-7da3c",
  storageBucket: "smart-stay-7da3c.firebasestorage.app",
  messagingSenderId: "251194789789",
  appId: "1:251194789789:web:ce464d9ab1b6e888272974",
});

const messaging = firebase.messaging();

// App CLOSED / Background
messaging.onBackgroundMessage((payload) => {
  console.log("Background message", payload);

  const title =
    payload?.notification?.title ||
    payload?.data?.title ||
    "New Notification";

  const options = {
    body:
      payload?.notification?.body ||
      payload?.data?.body ||
      "You have a new message",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(title, options);
});