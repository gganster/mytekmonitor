
const config = {
  lang: "fr",
  driver: "firebase", //["firebase", "strapi"]
  firebase: {
    apiKey: "AIzaSyC1WNQBBOh72DpYnpxYAyvELiPMZ7fKzeo",
    authDomain: "wstf-showcase-001.firebaseapp.com",
    projectId: "wstf-showcase-001",
    storageBucket: "wstf-showcase-001.appspot.com",
    messagingSenderId: "50857859657",
    appId: "1:50857859657:web:f9bf7c6f02a716999d7d98",
    measurementId: "G-BKQ11XWZM8",
    enabledPersistence: false,
  },
  strapi: {
    apiUrl: "http://localhost:1337",
  },
  debug: true,
}

export default config;