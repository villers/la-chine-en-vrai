import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-chine-en-vrai.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-chine-en-vrai",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-chine-en-vrai.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:demo"
};

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