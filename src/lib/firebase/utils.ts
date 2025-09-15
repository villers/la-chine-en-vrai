import { db, auth, storage } from './config';
import { DocumentSnapshot } from 'firebase/firestore';

export function ensureFirebaseInitialized() {
  if (!db) {
    throw new Error('Firebase not initialized - use API endpoints instead');
  }
}

export function getFirebaseServices() {
  ensureFirebaseInitialized();
  return { db, auth, storage };
}

/**
 * Convertit un document Firestore en objet JavaScript
 * avec conversion des Timestamps et ajout de l'ID
 */
export function convertFirebaseDoc(doc: DocumentSnapshot): any {
  if (!doc.exists()) {
    return null;
  }

  const data = doc.data();
  if (!data) {
    return null;
  }

  // Convertir les Timestamps Firebase en Date JavaScript
  const convertedData: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
      convertedData[key] = value.toDate();
    } else {
      convertedData[key] = value;
    }
  }

  return {
    id: doc.id,
    ...convertedData
  };
}