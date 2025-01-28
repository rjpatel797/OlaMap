importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyD4XUicGEssUiXciIiTAYfB3U8cUSGsoVQ",
    authDomain: "https://krishtrack-1d350.firebaseio.com",
    projectId: "krishtrack-1d350",
    messagingSenderId: "655489206659",
    appId: "1:655489206659:android:2cc151714018504edb4eb6"
});

const messaging = firebase.messaging();

// Add service worker activation event
self.addEventListener('activate', event => {
    console.log('Service Worker activated');
    event.waitUntil(self.clients.claim());
});

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);
    const { title, body, icon } = payload.notification;
    
    return self.registration.showNotification(title, {
        body,
        icon
    });
});