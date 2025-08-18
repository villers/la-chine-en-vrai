import apiClient from './client';

export interface Testimonial {
  id?: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  travelType: string;
  travelDate: string;
  isPublished?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface TestimonialsResponse {
  success: boolean;
  testimonials: Testimonial[];
  count: number;
}

export const testimonialsApi = {
  // Récupérer tous les témoignages
  getTestimonials: async (limit: number = 6): Promise<Testimonial[]> => {
    const response = await apiClient.get<TestimonialsResponse>('/api/testimonials', {
      params: { limit }
    });
    return response.data.testimonials;
  },

  // Créer un nouveau témoignage
  createTestimonial: async (testimonialData: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ id: string }> => {
    const response = await apiClient.post('/api/testimonials', testimonialData);
    return response.data;
  }
};