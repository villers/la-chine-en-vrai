import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 10) + '...',
  typeof: typeof window
});

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || (process.env.NODE_ENV === 'development' ? "demo-api-key" : undefined),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || (process.env.NODE_ENV === 'development' ? "demo-chine-en-vrai.firebaseapp.com" : undefined),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || (process.env.NODE_ENV === 'development' ? "demo-chine-en-vrai" : undefined),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || (process.env.NODE_ENV === 'development' ? "demo-chine-en-vrai.appspot.com" : undefined),
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || (process.env.NODE_ENV === 'development' ? "123456789" : undefined),
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || (process.env.NODE_ENV === 'development' ? "1:123456789:web:demo" : undefined)
};

// Check if we have valid Firebase config before initializing
const hasValidConfig = firebaseConfig.apiKey &&
                      firebaseConfig.authDomain &&
                      firebaseConfig.projectId &&
                      firebaseConfig.storageBucket &&
                      firebaseConfig.messagingSenderId &&
                      firebaseConfig.appId;

console.log('Firebase config validation:', {
  hasValidConfig,
  config: {
    apiKey: firebaseConfig.apiKey ? firebaseConfig.apiKey.substring(0, 10) + '...' : 'missing',
    authDomain: firebaseConfig.authDomain || 'missing',
    projectId: firebaseConfig.projectId || 'missing',
    storageBucket: firebaseConfig.storageBucket || 'missing',
    messagingSenderId: firebaseConfig.messagingSenderId || 'missing',
    appId: firebaseConfig.appId ? firebaseConfig.appId.substring(0, 20) + '...' : 'missing'
  }
});

let app: any = null;
let db: any = null;
let auth: any = null;
let storage: any = null;

if (hasValidConfig) {
  // Initialize Firebase only if we have valid config
  app = initializeApp(firebaseConfig);

  // Initialize Firestore
  db = getFirestore(app);

  // Initialize Auth
  auth = getAuth(app);

  // Initialize Storage
  storage = getStorage(app);

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
}

// Export Firebase services (they will be null if config is invalid)
export { db, auth, storage };
export default app;