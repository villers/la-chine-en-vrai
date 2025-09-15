import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || (process.env.NODE_ENV === 'development' ? "demo-api-key" : undefined),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || (process.env.NODE_ENV === 'development' ? "demo-chine-en-vrai.firebaseapp.com" : undefined),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || (process.env.NODE_ENV === 'development' ? "demo-chine-en-vrai" : undefined),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || (process.env.NODE_ENV === 'development' ? "demo-chine-en-vrai.appspot.com" : undefined),
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || (process.env.NODE_ENV === 'development' ? "123456789" : undefined),
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || (process.env.NODE_ENV === 'development' ? "1:123456789:web:demo" : undefined)
};

// Firebase configuration will be validated at runtime when used

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Storage
export const storage = getStorage(app);

if (process.env.NODE_ENV === 'development') {
  try {
    // Utilise l'IP de la machine hôte ou localhost selon l'environnement
    const emulatorHost = typeof window !== 'undefined' 
      ? window.location.hostname 
      : process.env.NEXT_PUBLIC_EMULATOR_HOST || '127.0.0.1';
    
    connectFirestoreEmulator(db, emulatorHost, 8080);
    connectAuthEmulator(auth, `http://${emulatorHost}:9099`);
    connectStorageEmulator(storage, emulatorHost, 9199);
    console.log(`🔥 Connected to Firebase emulators at ${emulatorHost}`);
  } catch (error) {
    console.log('⚠️ Firebase emulator connection failed:', error);
  }
}

export default app;