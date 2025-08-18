import apiClient from './client';
import { InspirationCategory } from '@/lib/features/inspirations/inspirationsSlice';

export interface InspirationsResponse {
  success: boolean;
  inspirations: InspirationCategory[];
  count: number;
}

export const inspirationsApi = {
  // Récupérer toutes les catégories d'inspirations
  getCategories: async (): Promise<InspirationCategory[]> => {
    const response = await apiClient.get<InspirationsResponse>('/api/inspirations');
    return response.data.inspirations;
  },

  // Récupérer une catégorie par ID
  getCategoryById: async (categoryId: string): Promise<InspirationCategory | null> => {
    const response = await apiClient.get<InspirationsResponse>(`/api/inspirations?category=${categoryId}`);
    return response.data.inspirations[0] || null;
  },

  // Créer une nouvelle inspiration
  createInspiration: async (inspirationData: Partial<InspirationCategory>): Promise<{ id: string }> => {
    const response = await apiClient.post('/api/inspirations', inspirationData);
    return response.data;
  }
};