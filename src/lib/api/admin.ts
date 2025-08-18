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

// API pour la gestion des contacts admin
export const adminContactsApi = {
  // Récupérer tous les contacts
  getAllContacts: async (limit = 50) => {
    const response = await apiClient.get('/api/admin/contacts', {
      params: { limit }
    });
    return response.data;
  },

  // Marquer un contact comme traité
  markContactAsProcessed: async (id: string) => {
    const response = await apiClient.patch(`/api/admin/contacts/${id}`, {
      status: 'processed'
    });
    return response.data;
  },

  // Supprimer un contact
  deleteContact: async (id: string) => {
    const response = await apiClient.delete(`/api/admin/contacts/${id}`);
    return response.data;
  },
};

// API pour la gestion de la newsletter admin
export const adminNewsletterApi = {
  // Récupérer tous les abonnés
  getAllSubscribers: async () => {
    const response = await apiClient.get('/api/admin/newsletter');
    return response.data;
  },

  // Supprimer un abonné
  deleteSubscriber: async (id: string) => {
    const response = await apiClient.delete(`/api/admin/newsletter/${id}`);
    return response.data;
  },
};

// API pour la gestion des demandes de voyage admin
export const adminTravelRequestsApi = {
  // Récupérer toutes les demandes de voyage
  getAllTravelRequests: async () => {
    const response = await apiClient.get('/api/admin/travel-requests');
    return response.data;
  },

  // Marquer une demande comme traitée
  markTravelRequestAsProcessed: async (id: string) => {
    const response = await apiClient.patch(`/api/admin/travel-requests/${id}`, {
      status: 'processed'
    });
    return response.data;
  },

  // Supprimer une demande de voyage
  deleteTravelRequest: async (id: string) => {
    const response = await apiClient.delete(`/api/admin/travel-requests/${id}`);
    return response.data;
  },
};