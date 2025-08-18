import apiClient from './client';

// API spécialisée pour la gestion des témoignages admin
// L'authentification est gérée automatiquement par l'intercepteur axios
export const adminTestimonialsApi = {
  // Récupérer tous les témoignages (publiés et non publiés)
  getAllTestimonials: async () => {
    const response = await apiClient.get<any[]>('/api/testimonials', {
      params: { includeUnpublished: true }
    });
    return response.data;
  },

  // Mettre à jour un témoignage
  updateTestimonial: async (id: string, updates: { isPublished?: boolean }) => {
    const response = await apiClient.patch(`/api/admin/testimonials/${id}`, updates);
    return response.data;
  },

  // Supprimer un témoignage
  deleteTestimonial: async (id: string) => {
    const response = await apiClient.delete(`/api/admin/testimonials/${id}`);
    return response.data;
  },
};