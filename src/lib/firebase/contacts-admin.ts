import { getFirestore } from 'firebase-admin/firestore';
import { initializeFirebaseAdmin } from './admin';

const COLLECTION_NAME = 'contacts';

export interface AdminContactMessage {
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

export class ContactsAdminService {
  private static getDb() {
    const app = initializeFirebaseAdmin();
    if (!app) {
      throw new Error('Firebase Admin n\'est pas initialisé');
    }
    return getFirestore(app);
  }

  /**
   * Crée un nouveau message de contact
   */
  static async createContact(contactData: Omit<AdminContactMessage, 'id' | 'createdAt' | 'status'>): Promise<string> {
    try {
      const docRef = this.getDb().collection(COLLECTION_NAME).doc();
      await docRef.set({
        ...contactData,
        createdAt: new Date(),
        status: 'new'
      });

      console.log('Message de contact créé avec l\'ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Erreur lors de la création du message de contact (admin):', error);
      throw error;
    }
  }

  /**
   * Récupère tous les messages de contact avec pagination
   */
  static async getAllContacts(limit = 50, offset = 0): Promise<AdminContactMessage[]> {
    try {
      const contactsRef = this.getDb().collection(COLLECTION_NAME);
      let query = contactsRef
        .orderBy('createdAt', 'desc');

      if (limit > 0) {
        query = query.limit(limit);
      }

      if (offset > 0) {
        query = query.offset(offset);
      }

      const snapshot = await query.get();
      const contacts: AdminContactMessage[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        contacts.push({
          id: doc.id,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          subject: data.subject || '',
          message: data.message || '',
          createdAt: data.createdAt,
          status: data.status || 'new'
        });
      });

      return contacts;
    } catch (error) {
      console.error('Erreur lors de la récupération des contacts (admin):', error);
      throw error;
    }
  }

  /**
   * Récupère un contact par ID
   */
  static async getContactById(id: string): Promise<AdminContactMessage | null> {
    try {
      const doc = await this.getDb().collection(COLLECTION_NAME).doc(id).get();
      
      if (!doc.exists) {
        return null;
      }

      const data = doc.data()!;
      return {
        id: doc.id,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        subject: data.subject || '',
        message: data.message || '',
        createdAt: data.createdAt,
        status: data.status || 'new'
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du contact:', error);
      throw error;
    }
  }

  /**
   * Met à jour le statut d'un contact
   */
  static async updateContactStatus(id: string, status: 'new' | 'in_progress' | 'resolved'): Promise<void> {
    try {
      await this.getDb().collection(COLLECTION_NAME).doc(id).update({
        status,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      throw error;
    }
  }

  /**
   * Supprime un contact
   */
  static async deleteContact(id: string): Promise<void> {
    try {
      await this.getDb().collection(COLLECTION_NAME).doc(id).delete();
    } catch (error) {
      console.error('Erreur lors de la suppression du contact:', error);
      throw error;
    }
  }

  /**
   * Récupère les statistiques des contacts
   */
  static async getContactsStats(): Promise<{
    total: number;
    new: number;
    in_progress: number;
    resolved: number;
  }> {
    try {
      const contactsRef = this.getDb().collection(COLLECTION_NAME);
      
      const [totalSnapshot, newSnapshot, inProgressSnapshot, resolvedSnapshot] = await Promise.all([
        contactsRef.get(),
        contactsRef.where('status', '==', 'new').get(),
        contactsRef.where('status', '==', 'in_progress').get(),
        contactsRef.where('status', '==', 'resolved').get()
      ]);

      return {
        total: totalSnapshot.size,
        new: newSnapshot.size,
        in_progress: inProgressSnapshot.size,
        resolved: resolvedSnapshot.size
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }
}