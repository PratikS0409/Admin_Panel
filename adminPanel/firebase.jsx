
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getMessaging,
  getToken,
  onMessage,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";


// 🔥 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBWDtzIxaFqszNaJI8_q70B5mjGNWgFcQE",
  authDomain: "ludoxpert-2170e.firebaseapp.com",
  projectId: "ludoxpert-2170e",
  storageBucket: "ludoxpert-2170e.firebasestorage.app",
  messagingSenderId: "241211518055",
  appId: "1:241211518055:web:b5699c67797df6fdf1b8c2",
  measurementId: "G-4B9KW57KJP"
};

const app = initializeApp(firebaseConfig);
let messaging = null;

// ✅ Register Service Worker (if supported)
async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
      return registration;
    } catch (error) {
      console.error("❌ Service Worker registration failed:", error);
      return null;
    }
  } else {
    console.warn("⚠️ Service Worker is not supported in this browser.");
    return null;
  }
}

// ✅ Init messaging (only once)
async function initMessaging() {
  if (!messaging) {
    const registration = await registerServiceWorker();
    if (registration && "PushManager" in window) {
      messaging = getMessaging(app);
    } else {
      console.warn("⚠️ Firebase Messaging is not supported in this browser.");
    }
  }
}

export async function requestPermission() {
  try {
    await initMessaging();

    if (!messaging) {
      console.error("❌ Firebase Messaging is not initialized!");
      return null;
    }

    if (Notification.permission === "denied") {
      console.warn("❌ Notifications were previously denied by the user.");
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BAphLRyYWwXJB7kKLPhPVlqmSsnHZrxLXq1efdApIJHckTPfGrW00yq-fOtSldiwoFsszsY3nYa7UoKao5EOUx8",
      });
      console.log("✅ FCM Token:", token);
      return token;
    } else {
      console.warn("❌ Notification permission denied!");
      return null;
    }
  } catch (error) {
    console.error("❌ Error getting token:", error);
    return null;
  }
}


initMessaging().then(() => {
  if (messaging) {
    onMessage(messaging, (payload) => {
      console.log("📩 Foreground message received:", payload);

      if (Notification.permission === "granted") {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: payload.notification.icon || "/icon.png",
        });
      }
    });
  }
});
