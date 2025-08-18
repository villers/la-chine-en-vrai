import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';
import { CreateTestimonialData, Testimonial } from './testimonials';

const COLLECTION_NAME = 'testimonials';

/**
 * Crée un témoignage déjà publié et vérifié (pour les données de démo)
 */
export async function createPublishedTestimonial(data: CreateTestimonialData): Promise<string> {
  try {
    const testimonial: Omit<Testimonial, 'id'> = {
      ...data,
      isVerified: true,  // Vérifié
      isPublished: true, // Publié
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), testimonial);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création du témoignage publié:', error);
    throw error;
  }
}