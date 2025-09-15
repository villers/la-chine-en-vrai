import { getFirestore } from 'firebase-admin/firestore';
import { initializeFirebaseAdmin } from './admin';

const COLLECTION_NAME = 'travelRequests';

export interface AdminTravelRequest {
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
  status: 'new' | 'in_progress' | 'processed' | 'cancelled';
  createdAt: any;
  updatedAt?: any;
  assignedTo?: string; // ID de l'agent assigné
  notes?: string; // Notes internes
}

export class TravelRequestsAdminService {
  private static getDb() {
    const app = initializeFirebaseAdmin();
    if (!app) {
      throw new Error('Firebase Admin n\'est pas initialisé');
    }
    return getFirestore(app);
  }

  /**
   * Crée une nouvelle demande de voyage
   */
  static async createTravelRequest(travelData: Omit<AdminTravelRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = this.getDb().collection(COLLECTION_NAME).doc();
      await docRef.set({
        ...travelData,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      console.log('Demande de voyage créée avec l\'ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Erreur lors de la création de la demande de voyage (admin):', error);
      throw error;
    }
  }

  /**
   * Récupère toutes les demandes de voyage avec pagination
   */
  static async getAllTravelRequests(
    status?: string,
    limit = 50, 
    offset = 0
  ): Promise<AdminTravelRequest[]> {
    try {
      const requestsRef = this.getDb().collection(COLLECTION_NAME);
      let query = requestsRef.orderBy('createdAt', 'desc');

      if (status) {
        query = query.where('status', '==', status);
      }

      if (limit > 0) {
        query = query.limit(limit);
      }

      if (offset > 0) {
        query = query.offset(offset);
      }

      const snapshot = await query.get();
      const requests: AdminTravelRequest[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        requests.push({
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          destination: data.destination || '',
          duration: data.duration || '',
          startDate: data.startDate || '',
          travelers: data.travelers || 1,
          budget: data.budget || '',
          interests: data.interests || [],
          accommodationType: data.accommodationType || '',
          transportPreference: data.transportPreference || '',
          specialRequests: data.specialRequests || '',
          status: data.status || 'new',
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          assignedTo: data.assignedTo,
          notes: data.notes
        });
      });

      return requests;
    } catch (error) {
      console.error('Erreur lors de la récupération des demandes de voyage (admin):', error);
      throw error;
    }
  }

  /**
   * Récupère une demande de voyage par ID
   */
  static async getTravelRequestById(id: string): Promise<AdminTravelRequest | null> {
    try {
      const doc = await this.getDb().collection(COLLECTION_NAME).doc(id).get();
      
      if (!doc.exists) {
        return null;
      }

      const data = doc.data()!;
      return {
        id: doc.id,
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        destination: data.destination || '',
        duration: data.duration || '',
        startDate: data.startDate || '',
        travelers: data.travelers || 1,
        budget: data.budget || '',
        interests: data.interests || [],
        accommodationType: data.accommodationType || '',
        transportPreference: data.transportPreference || '',
        specialRequests: data.specialRequests || '',
        status: data.status || 'new',
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        assignedTo: data.assignedTo,
        notes: data.notes
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de la demande de voyage:', error);
      throw error;
    }
  }

  /**
   * Met à jour le statut d'une demande de voyage
   */
  static async updateTravelRequestStatus(
    id: string, 
    status: 'new' | 'in_progress' | 'processed' | 'cancelled'
  ): Promise<void> {
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
   * Assigne une demande de voyage à un agent
   */
  static async assignTravelRequest(id: string, assignedTo: string): Promise<void> {
    try {
      await this.getDb().collection(COLLECTION_NAME).doc(id).update({
        assignedTo,
        status: 'in_progress',
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de l\'assignation:', error);
      throw error;
    }
  }

  /**
   * Ajoute des notes internes à une demande
   */
  static async updateTravelRequestNotes(id: string, notes: string): Promise<void> {
    try {
      await this.getDb().collection(COLLECTION_NAME).doc(id).update({
        notes,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour des notes:', error);
      throw error;
    }
  }

  /**
   * Met à jour une demande de voyage complète
   */
  static async updateTravelRequest(id: string, data: Partial<AdminTravelRequest>): Promise<void> {
    try {
      const updateData = {
        ...data,
        updatedAt: new Date()
      };
      
      delete updateData.id;
      delete updateData.createdAt;

      await this.getDb().collection(COLLECTION_NAME).doc(id).update(updateData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la demande de voyage:', error);
      throw error;
    }
  }

  /**
   * Supprime une demande de voyage
   */
  static async deleteTravelRequest(id: string): Promise<void> {
    try {
      await this.getDb().collection(COLLECTION_NAME).doc(id).delete();
    } catch (error) {
      console.error('Erreur lors de la suppression de la demande de voyage:', error);
      throw error;
    }
  }

  /**
   * Récupère les statistiques des demandes de voyage
   */
  static async getTravelRequestsStats(): Promise<{
    total: number;
    new: number;
    in_progress: number;
    processed: number;
    cancelled: number;
    recentRequests: number; // Derniers 30 jours
  }> {
    try {
      const requestsRef = this.getDb().collection(COLLECTION_NAME);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const [
        totalSnapshot, 
        newSnapshot, 
        inProgressSnapshot, 
        processedSnapshot, 
        cancelledSnapshot,
        recentSnapshot
      ] = await Promise.all([
        requestsRef.get(),
        requestsRef.where('status', '==', 'new').get(),
        requestsRef.where('status', '==', 'in_progress').get(),
        requestsRef.where('status', '==', 'processed').get(),
        requestsRef.where('status', '==', 'cancelled').get(),
        requestsRef.where('createdAt', '>=', thirtyDaysAgo).get()
      ]);

      return {
        total: totalSnapshot.size,
        new: newSnapshot.size,
        in_progress: inProgressSnapshot.size,
        processed: processedSnapshot.size,
        cancelled: cancelledSnapshot.size,
        recentRequests: recentSnapshot.size
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }

  /**
   * Récupère les demandes par destination
   */
  static async getRequestsByDestination(): Promise<{ destination: string; count: number }[]> {
    try {
      const snapshot = await this.getDb().collection(COLLECTION_NAME).get();
      const destinationCounts: { [key: string]: number } = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        const destination = data.destination || 'Non spécifié';
        destinationCounts[destination] = (destinationCounts[destination] || 0) + 1;
      });

      return Object.entries(destinationCounts)
        .map(([destination, count]) => ({ destination, count }))
        .sort((a, b) => b.count - a.count);
    } catch (error) {
      console.error('Erreur lors de la récupération des stats par destination:', error);
      throw error;
    }
  }
}