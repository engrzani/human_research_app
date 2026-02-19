// Firebase Configuration
// 
// IMPORTANT: Replace these values with your actual Firebase project credentials
// 
// To find your credentials:
// 1. Go to https://console.firebase.google.com/
// 2. Select your project
// 3. Click the gear icon (Project Settings)
// 4. Scroll to "Your apps" section
// 5. Click on your web app or create a new one
// 6. Copy the configuration values below
//
// See FIREBASE_SETUP_GUIDE.md for detailed instructions

import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGtaU0eoRqyeaI0BoVk6fSQsc7A_R5huY",
  authDomain: "human-research-app.firebaseapp.com",
  projectId: "human-research-app",
  storageBucket: "human-research-app.appspot.com",
  messagingSenderId: "312317016332",
  appId: "1:312317016332:android:6a8d7a1c9e7f8b0d"
};

// Initialize Firebase
let app = null;
let auth = null;
let db = null;
let storage = null;

try {
  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  
  // Get Auth instance with AsyncStorage persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  db = getFirestore(app);
  storage = getStorage(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  console.log('Please configure Firebase credentials in src/config/firebase.js');
}

// Export Firebase services
export { auth, db, storage };
export default app;
