import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  where, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

export interface Itinerary {
  title: string;
  duration: string;
  highlights: string[];
  description: string;
  price: string;
}

export interface InspirationCategory {
  id?: string;
  categoryId: string;
  title: string;
  description: string;
  image: string;
  itineraries: Itinerary[];
  isActive: boolean;
  order: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface CreateInspirationData {
  categoryId: string;
  title: string;
  description: string;
  image: string;
  itineraries: Itinerary[];
  order: number;
}

const COLLECTION_NAME = 'inspirations';

/**
 * Crée une nouvelle catégorie d'inspiration
 */
export async function createInspiration(data: CreateInspirationData): Promise<string> {
  try {
    const inspiration: Omit<InspirationCategory, 'id'> = {
      ...data,
      isActive: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), inspiration);
    console.log('Inspiration créée avec l\'ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création de l\'inspiration:', error);
    throw error;
  }
}

/**
 * Crée une inspiration déjà active (pour les données de démo)
 */
export async function createActiveInspiration(data: CreateInspirationData): Promise<string> {
  try {
    const inspiration: Omit<InspirationCategory, 'id'> = {
      ...data,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), inspiration);
    console.log('Inspiration active créée avec l\'ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création de l\'inspiration active:', error);
    throw error;
  }
}

/**
 * Récupère toutes les inspirations actives
 */
export async function getActiveInspirations(): Promise<InspirationCategory[]> {
  try {
    const inspirationsRef = collection(db, COLLECTION_NAME);
    const q = query(
      inspirationsRef,
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as InspirationCategory[];
  } catch (error) {
    console.error('Erreur lors de la récupération des inspirations actives:', error);
    throw error;
  }
}

/**
 * Récupère une inspiration par son categoryId
 */
export async function getInspirationByCategory(categoryId: string): Promise<InspirationCategory | null> {
  try {
    const inspirationsRef = collection(db, COLLECTION_NAME);
    const q = query(
      inspirationsRef,
      where('categoryId', '==', categoryId),
      where('isActive', '==', true)
    );

    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    } as InspirationCategory;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'inspiration par catégorie:', error);
    throw error;
  }
}

/**
 * Récupère toutes les inspirations (pour l'admin)
 */
export async function getAllInspirations(): Promise<InspirationCategory[]> {
  try {
    const inspirationsRef = collection(db, COLLECTION_NAME);
    const q = query(
      inspirationsRef,
      orderBy('order', 'asc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as InspirationCategory[];
  } catch (error) {
    console.error('Erreur lors de la récupération de toutes les inspirations:', error);
    throw error;
  }
}

/**
 * Met à jour une inspiration
 */
export async function updateInspiration(id: string, updates: Partial<InspirationCategory>): Promise<void> {
  try {
    const inspirationRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(inspirationRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    console.log('Inspiration mise à jour:', id);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'inspiration:', error);
    throw error;
  }
}

/**
 * Active une inspiration
 */
export async function activateInspiration(id: string): Promise<void> {
  try {
    const inspirationRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(inspirationRef, {
      isActive: true,
      updatedAt: serverTimestamp(),
    });
    console.log('Inspiration activée:', id);
  } catch (error) {
    console.error('Erreur lors de l\'activation de l\'inspiration:', error);
    throw error;
  }
}

/**
 * Désactive une inspiration
 */
export async function deactivateInspiration(id: string): Promise<void> {
  try {
    const inspirationRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(inspirationRef, {
      isActive: false,
      updatedAt: serverTimestamp(),
    });
    console.log('Inspiration désactivée:', id);
  } catch (error) {
    console.error('Erreur lors de la désactivation de l\'inspiration:', error);
    throw error;
  }
}

/**
 * Supprime une inspiration
 */
export async function deleteInspiration(id: string): Promise<void> {
  try {
    const inspirationRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(inspirationRef);
    console.log('Inspiration supprimée:', id);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'inspiration:', error);
    throw error;
  }
}

/**
 * Récupère les statistiques des inspirations
 */
export async function getInspirationStats(): Promise<{
  totalInspirations: number;
  activeInspirations: number;
  totalItineraries: number;
}> {
  try {
    const inspirationsRef = collection(db, COLLECTION_NAME);
    const querySnapshot = await getDocs(inspirationsRef);
    
    let totalInspirations = 0;
    let activeInspirations = 0;
    let totalItineraries = 0;
    
    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      totalInspirations++;
      
      if (data.isActive) {
        activeInspirations++;
      }
      
      totalItineraries += data.itineraries?.length || 0;
    });
    
    return { totalInspirations, activeInspirations, totalItineraries };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques d\'inspirations:', error);
    throw error;
  }
}