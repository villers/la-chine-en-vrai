import { db, auth, storage } from './config';

export function ensureFirebaseInitialized() {
  if (!db) {
    throw new Error('Firebase not initialized - use API endpoints instead');
  }
}

export function getFirebaseServices() {
  ensureFirebaseInitialized();
  return { db, auth, storage };
}