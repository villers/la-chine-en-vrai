import { 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  where 
} from 'firebase/firestore';
import { db } from './config';

// Interface moderne pour les demandes de voyage
export interface TravelRequest {
  id?: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  duration: string;
  startDate: string;
  travelers: number;
  budget: string;
  interests: string[];
  accommodationType: string;
  transportPreference: string;
  specialRequests?: string;
  status: 'new' | 'processed';
  createdAt?: any;
  updatedAt?: any;
}

// Interface legacy pour compatibilité
export interface LegacyTravelRequest {
  id?: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    message?: string;
  };
  destination: string[];
  travelType: string[];
  budget: string;
  duration: string;
  travelers: string;
  interests: string[];
  accommodation: string;
  createdAt?: any;
  status?: 'new' | 'in_progress' | 'quoted' | 'confirmed' | 'completed';
  estimatedPrice?: number;
  notes?: string;
}

/**
 * Crée une nouvelle demande de voyage
 */
export async function createTravelRequest(travelData: Omit<TravelRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (!db) {
    throw new Error('Firebase not initialized - use API endpoints instead');
  }

  try {
    const docRef = await addDoc(collection(db, 'travelRequests'), {
      ...travelData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    console.log('Demande de voyage créée avec l\'ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création de la demande de voyage:', error);
    throw error;
  }
}

/**
 * Récupère les demandes de voyage récentes
 */
export async function getRecentTravelRequests(limitCount: number = 50): Promise<TravelRequest[]> {
  if (!db) {
    throw new Error('Firebase not initialized - use API endpoints instead');
  }

  try {
    const requestsRef = collection(db, 'travelRequests');
    const q = query(
      requestsRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const requests: TravelRequest[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      requests.push({
        id: doc.id,
        ...data,
        // Convertir les Timestamps Firebase en Date JavaScript
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt
      } as TravelRequest);
    });

    return requests;
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes de voyage:', error);
    throw error;
  }
}

/**
 * Récupère les demandes de voyage par statut
 */
export async function getTravelRequestsByStatus(status: string): Promise<TravelRequest[]> {
  if (!db) {
    throw new Error('Firebase not initialized - use API endpoints instead');
  }

  try {
    const requestsRef = collection(db, 'travelRequests');
    const q = query(
      requestsRef,
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const requests: TravelRequest[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      requests.push({
        id: doc.id,
        ...data,
        // Convertir les Timestamps Firebase en Date JavaScript
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt
      } as TravelRequest);
    });

    return requests;
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes par statut:', error);
    throw error;
  }
}