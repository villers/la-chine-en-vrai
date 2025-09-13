import apiClient from './client';

// API spécialisée pour la gestion des témoignages admin
// L'authentification est gérée automatiquement par l'intercepteur axios
export const adminTestimonialsApi = {
  // Récupérer tous les témoignages (publiés et non publiés)
  getAllTestimonials: async (includeUnpublished = true, limit = 50, offset = 0) => {
    const response = await apiClient.get('/api/admin/testimonials', {
      params: { includeUnpublished, limit, offset }
    });
    return response.data;
  },

  // Récupérer les statistiques des témoignages
  getTestimonialsStats: async () => {
    const response = await apiClient.get('/api/admin/testimonials', {
      params: { stats: true }
    });
    return response.data;
  },

  // Récupérer un témoignage par ID
  getTestimonialById: async (id: string) => {
    const response = await apiClient.get(`/api/admin/testimonials/${id}`);
    return response.data;
  },

  // Créer un nouveau témoignage
  createTestimonial: async (testimonialData: any) => {
    const response = await apiClient.post('/api/admin/testimonials', testimonialData);
    return response.data;
  },

  // Mettre à jour un témoignage
  updateTestimonial: async (id: string, updates: any) => {
    const response = await apiClient.patch(`/api/admin/testimonials/${id}`, updates);
    return response.data;
  },

  // Mettre à jour le statut de publication
  updatePublishStatus: async (id: string, isPublished: boolean) => {
    const response = await apiClient.patch(`/api/admin/testimonials/${id}`, {
      isPublished
    });
    return response.data;
  },

  // Mettre à jour le statut de vérification
  updateVerificationStatus: async (id: string, isVerified: boolean) => {
    const response = await apiClient.patch(`/api/admin/testimonials/${id}`, {
      isVerified
    });
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
  getAllContacts: async (limit = 50, offset = 0) => {
    const response = await apiClient.get('/api/admin/contacts', {
      params: { limit, offset }
    });
    return response.data;
  },

  // Récupérer les statistiques des contacts
  getContactsStats: async () => {
    const response = await apiClient.get('/api/admin/contacts', {
      params: { stats: true }
    });
    return response.data;
  },

  // Récupérer un contact par ID
  getContactById: async (id: string) => {
    const response = await apiClient.get(`/api/admin/contacts/${id}`);
    return response.data;
  },

  // Mettre à jour le statut d'un contact
  updateContactStatus: async (id: string, status: 'new' | 'in_progress' | 'resolved') => {
    const response = await apiClient.patch(`/api/admin/contacts/${id}`, {
      status
    });
    return response.data;
  },

  // Marquer un contact comme traité (pour compatibilité)
  markContactAsProcessed: async (id: string) => {
    return await adminContactsApi.updateContactStatus(id, 'resolved');
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
  getAllSubscribers: async (includeInactive = false, limit = 50, offset = 0) => {
    const response = await apiClient.get('/api/admin/newsletter', {
      params: { includeInactive, limit, offset }
    });
    return response.data;
  },

  // Récupérer les statistiques des abonnés
  getSubscribersStats: async () => {
    const response = await apiClient.get('/api/admin/newsletter', {
      params: { stats: true }
    });
    return response.data;
  },

  // Récupérer un abonné par ID
  getSubscriberById: async (id: string) => {
    const response = await apiClient.get(`/api/admin/newsletter/${id}`);
    return response.data;
  },

  // Mettre à jour le statut d'un abonné
  updateSubscriberStatus: async (id: string, isActive: boolean) => {
    const response = await apiClient.patch(`/api/admin/newsletter/${id}`, {
      isActive
    });
    return response.data;
  },

  // Exporter les abonnés actifs
  exportActiveSubscribers: async () => {
    const response = await apiClient.get('/api/admin/newsletter/export');
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
  getAllTravelRequests: async (status?: string, limit = 50, offset = 0) => {
    const response = await apiClient.get('/api/admin/travel-requests', {
      params: { status, limit, offset }
    });
    return response.data;
  },

  // Récupérer les statistiques des demandes
  getTravelRequestsStats: async () => {
    const response = await apiClient.get('/api/admin/travel-requests', {
      params: { stats: true }
    });
    return response.data;
  },

  // Récupérer une demande par ID
  getTravelRequestById: async (id: string) => {
    const response = await apiClient.get(`/api/admin/travel-requests/${id}`);
    return response.data;
  },

  // Mettre à jour le statut d'une demande
  updateTravelRequestStatus: async (id: string, status: 'new' | 'in_progress' | 'processed' | 'cancelled') => {
    const response = await apiClient.patch(`/api/admin/travel-requests/${id}`, {
      status
    });
    return response.data;
  },

  // Assigner une demande à un agent
  assignTravelRequest: async (id: string, assignedTo: string) => {
    const response = await apiClient.patch(`/api/admin/travel-requests/${id}`, {
      assignedTo,
      status: 'in_progress'
    });
    return response.data;
  },

  // Mettre à jour les notes d'une demande
  updateTravelRequestNotes: async (id: string, notes: string) => {
    const response = await apiClient.patch(`/api/admin/travel-requests/${id}`, {
      notes
    });
    return response.data;
  },

  // Marquer une demande comme traitée (pour compatibilité)
  markTravelRequestAsProcessed: async (id: string) => {
    return await adminTravelRequestsApi.updateTravelRequestStatus(id, 'processed');
  },

  // Supprimer une demande de voyage
  deleteTravelRequest: async (id: string) => {
    const response = await apiClient.delete(`/api/admin/travel-requests/${id}`);
    return response.data;
  },
};

// API pour la gestion des articles de blog admin
export const adminBlogApi = {
  // Récupérer tous les articles (publiés et non publiés)
  getAllPosts: async (includeUnpublished = true) => {
    const response = await apiClient.get('/api/admin/blog', {
      params: { includeUnpublished }
    });
    return response.data;
  },

  // Récupérer un article par ID
  getPostById: async (id: string) => {
    const response = await apiClient.get(`/api/admin/blog/${id}`);
    return response.data.post;
  },

  // Créer un nouvel article
  createPost: async (postData: any) => {
    const response = await apiClient.post('/api/admin/blog', postData);
    return response.data;
  },

  // Mettre à jour un article
  updatePost: async (id: string, updates: any) => {
    const response = await apiClient.patch(`/api/admin/blog/${id}`, updates);
    return response.data;
  },

  // Supprimer un article
  deletePost: async (id: string) => {
    const response = await apiClient.delete(`/api/admin/blog/${id}`);
    return response.data;
  },
};