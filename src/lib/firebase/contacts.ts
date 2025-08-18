import { 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs 
} from 'firebase/firestore';
import { db } from './config';

export interface ContactMessage {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt?: any;
  status?: 'new' | 'in_progress' | 'resolved';
}

/**
 * Crée un nouveau message de contact
 */
export async function createContact(contactData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...contactData,
      createdAt: serverTimestamp(),
      status: 'new'
    });
    
    console.log('Message de contact créé avec l\'ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création du message de contact:', error);
    throw error;
  }
}

/**
 * Récupère les messages de contact récents
 */
export async function getRecentContacts(limitCount: number = 50): Promise<ContactMessage[]> {
  try {
    const contactsRef = collection(db, 'contacts');
    const q = query(
      contactsRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const contacts: ContactMessage[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      contacts.push({
        id: doc.id,
        ...data,
        // Convertir le Timestamp Firebase en Date JavaScript
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
      } as ContactMessage);
    });
    
    return contacts;
  } catch (error) {
    console.error('Erreur lors de la récupération des contacts:', error);
    throw error;
  }
}