import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyC0WETWi3aUXRTeME3_dngvM1mW7cFWVzY",
  authDomain: "student-dashboard-a4a93.firebaseapp.com",
  projectId: "student-dashboard-a4a93",
  storageBucket: "student-dashboard-a4a93.firebasestorage.app",
  messagingSenderId: "417040045909",
  appId: "1:417040045909:web:351ed56390ac56e50c41dc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
