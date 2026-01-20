import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import Store from './Store';
import { Provider } from 'react-redux';
import { HelmetProvider } from "react-helmet-async";
import "./Utils/FirebaseNotification";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<Provider store={Store}>
<HelmetProvider>
<App />
</HelmetProvider>


</Provider>
  </React.StrictMode>
);



if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("FCM Service Worker registered");
      console.log("scope:", registration.scope);
      console.log("active:", registration.active);
    })
    .catch((err) => {
      console.error(" SW registration failed", err);
    });
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




