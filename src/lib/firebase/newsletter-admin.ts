import { getFirestore } from 'firebase-admin/firestore';
import { initializeFirebaseAdmin } from './admin';

const COLLECTION_NAME = 'newsletter';

export interface AdminNewsletterSubscriber {
  id?: string;
  email: string;
  createdAt: any;
  isActive: boolean;
  source?: string;
  unsubscribedAt?: any;
}

export class NewsletterAdminService {
  private static db = getFirestore(initializeFirebaseAdmin());

  /**
   * Récupère tous les abonnés avec pagination
   */
  static async getAllSubscribers(
    includeInactive = false, 
    limit = 50, 
    offset = 0
  ): Promise<AdminNewsletterSubscriber[]> {
    try {
      const subscribersRef = this.db.collection(COLLECTION_NAME);
      let query = subscribersRef.orderBy('createdAt', 'desc');

      if (!includeInactive) {
        query = query.where('isActive', '==', true);
      }

      if (limit > 0) {
        query = query.limit(limit);
      }

      if (offset > 0) {
        query = query.offset(offset);
      }

      const snapshot = await query.get();
      const subscribers: AdminNewsletterSubscriber[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        subscribers.push({
          id: doc.id,
          email: data.email || '',
          createdAt: data.createdAt,
          isActive: data.isActive || false,
          source: data.source || 'website',
          unsubscribedAt: data.unsubscribedAt
        });
      });

      return subscribers;
    } catch (error) {
      console.error('Erreur lors de la récupération des abonnés (admin):', error);
      throw error;
    }
  }

  /**
   * Récupère un abonné par ID
   */
  static async getSubscriberById(id: string): Promise<AdminNewsletterSubscriber | null> {
    try {
      const doc = await this.db.collection(COLLECTION_NAME).doc(id).get();
      
      if (!doc.exists) {
        return null;
      }

      const data = doc.data()!;
      return {
        id: doc.id,
        email: data.email || '',
        createdAt: data.createdAt,
        isActive: data.isActive || false,
        source: data.source || 'website',
        unsubscribedAt: data.unsubscribedAt
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'abonné:', error);
      throw error;
    }
  }

  /**
   * Récupère un abonné par email
   */
  static async getSubscriberByEmail(email: string): Promise<AdminNewsletterSubscriber | null> {
    try {
      const snapshot = await this.db.collection(COLLECTION_NAME)
        .where('email', '==', email)
        .limit(1)
        .get();
      
      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email || '',
        createdAt: data.createdAt,
        isActive: data.isActive || false,
        source: data.source || 'website',
        unsubscribedAt: data.unsubscribedAt
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'abonné par email:', error);
      throw error;
    }
  }

  /**
   * Active ou désactive un abonné
   */
  static async updateSubscriberStatus(id: string, isActive: boolean): Promise<void> {
    try {
      const updateData: any = {
        isActive,
        updatedAt: new Date()
      };

      if (!isActive) {
        updateData.unsubscribedAt = new Date();
      } else {
        updateData.unsubscribedAt = null;
      }

      await this.db.collection(COLLECTION_NAME).doc(id).update(updateData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de l\'abonné:', error);
      throw error;
    }
  }

  /**
   * Supprime un abonné
   */
  static async deleteSubscriber(id: string): Promise<void> {
    try {
      await this.db.collection(COLLECTION_NAME).doc(id).delete();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'abonné:', error);
      throw error;
    }
  }

  /**
   * Exporte tous les abonnés actifs
   */
  static async exportActiveSubscribers(): Promise<{ email: string; createdAt: any; source?: string }[]> {
    try {
      const snapshot = await this.db.collection(COLLECTION_NAME)
        .where('isActive', '==', true)
        .orderBy('createdAt', 'desc')
        .get();

      const subscribers: { email: string; createdAt: any; source?: string }[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        subscribers.push({
          email: data.email,
          createdAt: data.createdAt,
          source: data.source
        });
      });

      return subscribers;
    } catch (error) {
      console.error('Erreur lors de l\'export des abonnés:', error);
      throw error;
    }
  }

  /**
   * Récupère les statistiques des abonnés
   */
  static async getSubscribersStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    recentSubscriptions: number; // Derniers 30 jours
  }> {
    try {
      const subscribersRef = this.db.collection(COLLECTION_NAME);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const [totalSnapshot, activeSnapshot, inactiveSnapshot, recentSnapshot] = await Promise.all([
        subscribersRef.get(),
        subscribersRef.where('isActive', '==', true).get(),
        subscribersRef.where('isActive', '==', false).get(),
        subscribersRef.where('createdAt', '>=', thirtyDaysAgo).get()
      ]);

      return {
        total: totalSnapshot.size,
        active: activeSnapshot.size,
        inactive: inactiveSnapshot.size,
        recentSubscriptions: recentSnapshot.size
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }
}