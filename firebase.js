import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5hufbHHPEjFKyYIlmBMIfSYmcieSK_8c",
  authDomain: "dermai-297f5.firebaseapp.com",
  projectId: "dermai-297f5",
  storageBucket: "dermai-297f5.appspot.com",
  messagingSenderId: "703364639202",
  appId: "1:703364639202:web:6af157239a8959aec3b1bb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
