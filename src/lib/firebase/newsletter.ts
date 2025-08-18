import { 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  limit 
} from 'firebase/firestore';
import { db } from './config';

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  createdAt?: any;
  isActive?: boolean;
  source?: string; // D'où vient l'inscription (footer, popup, etc.)
}

/**
 * Ajoute un abonné à la newsletter
 */
export async function addNewsletterSubscriber(email: string, source: string = 'website'): Promise<string> {
  try {
    // Vérifier si l'email existe déjà
    const existing = await checkEmailExists(email);
    if (existing) {
      throw new Error('Cette adresse email est déjà inscrite à la newsletter');
    }

    const docRef = await addDoc(collection(db, 'newsletter'), {
      email: email.toLowerCase().trim(),
      createdAt: serverTimestamp(),
      isActive: true,
      source
    });
    
    console.log('Abonné newsletter créé avec l\'ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de l\'ajout à la newsletter:', error);
    throw error;
  }
}

/**
 * Vérifie si un email existe déjà dans la newsletter
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const newsletterRef = collection(db, 'newsletter');
    const q = query(
      newsletterRef,
      where('email', '==', email.toLowerCase().trim())
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'email:', error);
    return false;
  }
}

/**
 * Récupère tous les abonnés actifs
 */
export async function getActiveSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    const newsletterRef = collection(db, 'newsletter');
    const q = query(
      newsletterRef,
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const subscribers: NewsletterSubscriber[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      subscribers.push({
        id: doc.id,
        ...data,
        // Convertir le Timestamp Firebase en Date JavaScript
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
      } as NewsletterSubscriber);
    });
    
    return subscribers;
  } catch (error) {
    console.error('Erreur lors de la récupération des abonnés:', error);
    throw error;
  }
}

/**
 * Récupère les derniers abonnés
 */
export async function getRecentSubscribers(limitCount: number = 100): Promise<NewsletterSubscriber[]> {
  try {
    const newsletterRef = collection(db, 'newsletter');
    const q = query(
      newsletterRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const subscribers: NewsletterSubscriber[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      subscribers.push({
        id: doc.id,
        ...data,
        // Convertir le Timestamp Firebase en Date JavaScript
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
      } as NewsletterSubscriber);
    });
    
    return subscribers;
  } catch (error) {
    console.error('Erreur lors de la récupération des abonnés récents:', error);
    throw error;
  }
}