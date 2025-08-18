import axios from 'axios';

// Configuration de l'instance axios globale
const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_API_URL || 'https://your-domain.com'
    : 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes
apiClient.interceptors.request.use(
  (config) => {
    // Log des requêtes en développement
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('❌ Erreur de requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
apiClient.interceptors.response.use(
  (response) => {
    // Log des réponses en développement
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.error || error.message || 'Une erreur est survenue';
    console.error('❌ Erreur de réponse:', {
      status: error.response?.status,
      message,
      url: error.config?.url
    });
    return Promise.reject(new Error(message));
  }
);

export default apiClient;