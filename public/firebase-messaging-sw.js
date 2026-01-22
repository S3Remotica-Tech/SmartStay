
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
  console.log('SW Background message received', payload);

  const notificationTitle = payload.data?.title || 'New Notification';
  const notificationOptions = {
    body: payload.data?.description || 'You have a new message',
    icon: '/icon.png',
     data: {
      url: payload.data?.url || 'https://dev.qbatz.com/', 
    },
      };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


// self.addEventListener('notificationclick', function (event) {
//   console.log('Notification clicked', event);

//   event.notification.close();

//   const redirectUrl = event.notification.data?.url || 'https://dev.qbatz.com/';

//   event.waitUntil(
//     clients.openWindow(redirectUrl)
//   );
// });



