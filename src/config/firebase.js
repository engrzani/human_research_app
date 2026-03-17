// Firebase Configuration

import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCGtaU0eoRqyeaI0BoVk6fSQsc7A_R5huY",
  authDomain: "human-research-app.firebaseapp.com",
  projectId: "human-research-app",
  storageBucket: "human-research-app.appspot.com",
  messagingSenderId: "312317016332",
  appId: "1:312317016332:ios:5f00e363a32336dc1ff129"
};

let app = null;
let auth = null;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
  } catch (authError) {
    auth = getAuth(app);
  }
} catch (error) {
  // Firebase init failed — app will work in guest mode
  console.log('Firebase unavailable — running in guest mode');
}

export { auth };
export default app;
