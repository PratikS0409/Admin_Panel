import axios from "axios";
import config from "../config.js";

// Initial values for device details
let lat = "",
  lng = "",
  token_no = "",
  phone_uid = "",
  mobile_hardware = "",
  mobile_name = "",
  mobile_os = "",
  mobile_type = "";

// Initialize headers dynamically
(async function initializeDeviceDetails() {
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const { requestPermission } = await import("../firebase.jsx");
  window.fcm_token = await requestPermission();

  async function getDeviceDetails() {
    if ("geolocation" in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      } catch (error) {
        console.warn("⚠️ Geolocation permission denied:", error);
      }
    }

    function getCookie(name) {
      const cookieString = document.cookie;
      const cookies = cookieString.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    }

    phone_uid = getCookie("phone_uid") || generateUUID();
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + 24 * 60 * 60 * 1000);
    document.cookie = `phone_uid=${phone_uid}; expires=${expireDate.toUTCString()}; path=/`;

    mobile_hardware = navigator.platform || "Unknown";
    mobile_name = navigator.userAgent;
    mobile_os = /Android/i.test(navigator.userAgent)
      ? "Android"
      : /iPhone|iPad|iPod/i.test(navigator.userAgent)
      ? "iOS"
      : "Unknown";
    mobile_type = /iPhone|iPad|iPod/.test(navigator.userAgent)
      ? "ios"
      : "android";

    token_no = getCookie("token_no") || "";
  }

  await getDeviceDetails();

  console.log("✅ getAuthHeaders initialized");
  document.dispatchEvent(new Event("authHeadersReady"));
})();

// Reusable cookie function
function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
// Create axios instance (headers set in interceptor)
const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    app_ver: "4.6",
    bundle_id: "com.fantafeat.app",
    comp_id: 2,
    user_header_key: "FF00FIFA",
    device_type: "web",
  },
});

// Interceptor for dynamic headers
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.lat = lat;
    config.headers.lng = lng;
    config.headers.token_no = getCookie("token_no") || token_no;
    config.headers.mobile_hardware = mobile_hardware;
    config.headers.mobile_name = mobile_name;
    config.headers.mobile_os = mobile_os;
    config.headers.mobile_type = mobile_type;
    config.headers.phone_uid = phone_uid;
    config.headers.request_time = Math.floor(Date.now() / 1000);
    config.headers.fcm_id = window.fcm_token || "";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
