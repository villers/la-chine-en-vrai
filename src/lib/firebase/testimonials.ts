import { collection, addDoc, getDocs, query, orderBy, limit, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './config';

export interface Testimonial {
  id?: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  travelType: string;
  travelDate: string;
  isVerified: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
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
}

const COLLECTION_NAME = 'testimonials';

// Ajouter un témoignage
export async function createTestimonial(data: CreateTestimonialData): Promise<string> {
  try {
    const testimonial: Omit<Testimonial, 'id'> = {
      ...data,
      isVerified: false,
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), testimonial);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création du témoignage:', error);
    throw error;
  }
}

// Récupérer tous les témoignages publiés
export async function getPublishedTestimonials(limitCount: number = 10): Promise<Testimonial[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Testimonial[];
  } catch (error) {
    console.error('Erreur lors de la récupération des témoignages:', error);
    throw error;
  }
}

// Récupérer tous les témoignages (admin)
export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Testimonial[];
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les témoignages:', error);
    throw error;
  }
}

// Mettre à jour un témoignage
export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<void> {
  try {
    const testimonialRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(testimonialRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du témoignage:', error);
    throw error;
  }
}

// Publier un témoignage
export async function publishTestimonial(id: string): Promise<void> {
  try {
    await updateTestimonial(id, { isPublished: true, isVerified: true });
  } catch (error) {
    console.error('Erreur lors de la publication du témoignage:', error);
    throw error;
  }
}

// Dépublier un témoignage
export async function unpublishTestimonial(id: string): Promise<void> {
  try {
    await updateTestimonial(id, { isPublished: false });
  } catch (error) {
    console.error('Erreur lors de la dépublication du témoignage:', error);
    throw error;
  }
}

// Supprimer un témoignage
export async function deleteTestimonial(id: string): Promise<void> {
  try {
    const testimonialRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(testimonialRef);
  } catch (error) {
    console.error('Erreur lors de la suppression du témoignage:', error);
    throw error;
  }
}

// Récupérer les témoignages par type de voyage
export async function getTestimonialsByTravelType(travelType: string, limitCount: number = 5): Promise<Testimonial[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isPublished', '==', true),
      where('travelType', '==', travelType),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Testimonial[];
  } catch (error) {
    console.error('Erreur lors de la récupération des témoignages par type:', error);
    throw error;
  }
}

// Récupérer les statistiques des témoignages
export async function getTestimonialsStats(): Promise<{
  total: number;
  published: number;
  pending: number;
  averageRating: number;
}> {
  try {
    const allTestimonials = await getAllTestimonials();
    const published = allTestimonials.filter(t => t.isPublished);
    const pending = allTestimonials.filter(t => !t.isPublished);
    
    const averageRating = published.length > 0 
      ? published.reduce((sum, t) => sum + t.rating, 0) / published.length 
      : 0;

    return {
      total: allTestimonials.length,
      published: published.length,
      pending: pending.length,
      averageRating: Math.round(averageRating * 10) / 10,
    };
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error);
    throw error;
  }
}