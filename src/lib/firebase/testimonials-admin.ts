import { getFirestore } from 'firebase-admin/firestore';
import { initializeFirebaseAdmin } from './admin';

const COLLECTION_NAME = 'testimonials';

export interface AdminTestimonial {
  id?: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  travelType: string;
  travelDate: string;
  isVerified: boolean;
  isPublished: boolean;
  createdAt: any;
  updatedAt: any;
  avatar?: string;
  images?: string[];
}

export interface CreateTestimonialData {
  name: string;
  location: string;
  text: string;
  rating: number;
  travelType: string;
  travelDate: string;
  avatar?: string;
  images?: string[];
  isVerified?: boolean;
  isPublished?: boolean;
}

export class TestimonialsAdminService {
  private static db = getFirestore(initializeFirebaseAdmin());

  /**
   * Récupère tous les témoignages avec pagination
   */
  static async getAllTestimonials(
    includeUnpublished = true, 
    limit = 50, 
    offset = 0
  ): Promise<AdminTestimonial[]> {
    try {
      const testimonialsRef = this.db.collection(COLLECTION_NAME);
      let query = testimonialsRef.orderBy('createdAt', 'desc');

      if (!includeUnpublished) {
        query = query.where('isPublished', '==', true);
      }

      if (limit > 0) {
        query = query.limit(limit);
      }

      if (offset > 0) {
        query = query.offset(offset);
      }

      const snapshot = await query.get();
      const testimonials: AdminTestimonial[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        testimonials.push({
          id: doc.id,
          name: data.name || '',
          location: data.location || '',
          text: data.text || '',
          rating: data.rating || 5,
          travelType: data.travelType || '',
          travelDate: data.travelDate || '',
          isVerified: data.isVerified || false,
          isPublished: data.isPublished || false,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          avatar: data.avatar || '',
          images: data.images || []
        });
      });

      return testimonials;
    } catch (error) {
      console.error('Erreur lors de la récupération des témoignages (admin):', error);
      throw error;
    }
  }

  /**
   * Récupère un témoignage par ID
   */
  static async getTestimonialById(id: string): Promise<AdminTestimonial | null> {
    try {
      const doc = await this.db.collection(COLLECTION_NAME).doc(id).get();
      
      if (!doc.exists) {
        return null;
      }

      const data = doc.data()!;
      return {
        id: doc.id,
        name: data.name || '',
        location: data.location || '',
        text: data.text || '',
        rating: data.rating || 5,
        travelType: data.travelType || '',
        travelDate: data.travelDate || '',
        isVerified: data.isVerified || false,
        isPublished: data.isPublished || false,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        avatar: data.avatar || '',
        images: data.images || []
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du témoignage:', error);
      throw error;
    }
  }

  /**
   * Crée un nouveau témoignage
   */
  static async createTestimonial(data: CreateTestimonialData): Promise<string> {
    try {
      const now = new Date();
      const testimonialData = {
        ...data,
        isVerified: data.isVerified || false,
        isPublished: data.isPublished || false,
        createdAt: now,
        updatedAt: now
      };

      const docRef = await this.db.collection(COLLECTION_NAME).add(testimonialData);
      return docRef.id;
    } catch (error) {
      console.error('Erreur lors de la création du témoignage:', error);
      throw error;
    }
  }

  /**
   * Met à jour un témoignage
   */
  static async updateTestimonial(id: string, data: Partial<AdminTestimonial>): Promise<void> {
    try {
      const updateData = {
        ...data,
        updatedAt: new Date()
      };
      
      delete updateData.id;
      delete updateData.createdAt;

      await this.db.collection(COLLECTION_NAME).doc(id).update(updateData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du témoignage:', error);
      throw error;
    }
  }

  /**
   * Supprime un témoignage
   */
  static async deleteTestimonial(id: string): Promise<void> {
    try {
      await this.db.collection(COLLECTION_NAME).doc(id).delete();
    } catch (error) {
      console.error('Erreur lors de la suppression du témoignage:', error);
      throw error;
    }
  }

  /**
   * Met à jour le statut de publication d'un témoignage
   */
  static async updatePublishStatus(id: string, isPublished: boolean): Promise<void> {
    try {
      await this.db.collection(COLLECTION_NAME).doc(id).update({
        isPublished,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de publication:', error);
      throw error;
    }
  }

  /**
   * Met à jour le statut de vérification d'un témoignage
   */
  static async updateVerificationStatus(id: string, isVerified: boolean): Promise<void> {
    try {
      await this.db.collection(COLLECTION_NAME).doc(id).update({
        isVerified,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de vérification:', error);
      throw error;
    }
  }

  /**
   * Récupère les statistiques des témoignages
   */
  static async getTestimonialsStats(): Promise<{
    total: number;
    published: number;
    verified: number;
    pending: number;
  }> {
    try {
      const testimonialsRef = this.db.collection(COLLECTION_NAME);
      
      const [totalSnapshot, publishedSnapshot, verifiedSnapshot, pendingSnapshot] = await Promise.all([
        testimonialsRef.get(),
        testimonialsRef.where('isPublished', '==', true).get(),
        testimonialsRef.where('isVerified', '==', true).get(),
        testimonialsRef.where('isPublished', '==', false).get()
      ]);

      return {
        total: totalSnapshot.size,
        published: publishedSnapshot.size,
        verified: verifiedSnapshot.size,
        pending: pendingSnapshot.size
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }
}