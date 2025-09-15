import axios from 'axios';

// Configuration de l'instance axios globale
const getBaseURL = () => {
  // En production, utilise l'URL configurée ou une URL relative si on est sur le même domaine
  if (process.env.NODE_ENV === 'production') {
    // Si on est côté client et qu'aucune API_URL n'est définie, utilise une URL relative
    if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_API_URL) {
      return `${window.location.protocol}//${window.location.host}`;
    }
    return process.env.NEXT_PUBLIC_API_URL || 'https://la-chine-en-vrai-713924757566.europe-west9.run.app';
  }

  // En développement, utilise l'URL courante si on est côté client
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }

  // Côté serveur, utilise localhost avec le port par défaut
  return 'http://localhost:3000';
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Inclure les cookies automatiquement
});

// Intercepteur pour les requêtes
apiClient.interceptors.request.use(
  async (config) => {
    // Log des requêtes en développement
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    // Ajouter automatiquement le token Firebase pour les routes admin ou les routes avec preview
    const isAdminRoute = config.url?.includes('/api/admin/');
    const isPreviewRoute = config.url?.includes('preview=true') || 
                          (config.params && config.params.preview === 'true');
    
    if (isAdminRoute || isPreviewRoute) {
      try {
        // Import dynamique pour éviter les erreurs SSR
        const { auth } = await import('@/lib/firebase/config');
        const user = auth.currentUser;
        
        if (user) {
          const idToken = await user.getIdToken();
          config.headers.Authorization = `Bearer ${idToken}`;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du token:', error);
      }
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