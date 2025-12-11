// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqIiYtMwX5X4zLxE36-xeF3PHa-YsuBSk",
  authDomain: "rvs-registration-form.firebaseapp.com",
  projectId: "rvs-registration-form",
  storageBucket: "rvs-registration-form.firebasestorage.app",
  messagingSenderId: "37350095452",
  appId: "1:37350095452:web:88230a86c4b317823a8499",
  measurementId: "G-GW0TD5KFHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Export analytics for use in components that need it
export { analytics };

export default app;
