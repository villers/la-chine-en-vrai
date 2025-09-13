import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Configuration Firebase Admin
const initAdmin = () => {
  try {
    // Vérifier si une app admin existe déjà
    if (getApps().length === 0) {
      // En production, utiliser les variables d'environnement pour la clé de service
      if (process.env.NODE_ENV === 'production') {
        if (!process.env.FIREBASE_ADMIN_PRIVATE_KEY || 
            !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 
            !process.env.FIREBASE_ADMIN_PROJECT_ID) {
          throw new Error('Variables d\'environnement Firebase Admin manquantes');
        }
        
        // Si c'est une clé de build dummy, ne pas initialiser
        if (process.env.FIREBASE_ADMIN_PRIVATE_KEY.includes('BUILD_DUMMY_KEY')) {
          return null;
        }

        const serviceAccount = {
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
        };

        initializeApp({
          credential: cert(serviceAccount),
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        });
      } else {
        // En développement, utiliser l'émulateur
        process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
        process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
        
        // Utiliser le même project ID que l'application
        const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-chine-en-vrai';
        
        initializeApp({
          projectId: projectId,
        });
      }
    }

    return getAuth();
  } catch (error) {
    console.error('Erreur lors de l\'initialisation Firebase Admin:', error);
    throw error;
  }
};

// Instance globale de Firebase Admin Auth
let adminAuth: ReturnType<typeof getAuth> | null = null;
let adminApp: any = null;

export const getAdminAuth = () => {
  if (!adminAuth) {
    adminAuth = initAdmin();
    // Si l'initialisation retourne null (pendant le build), créer un mock
    if (!adminAuth) {
      return null;
    }
  }
  return adminAuth;
};

export const initializeFirebaseAdmin = () => {
  if (!adminApp) {
    // Réutiliser la logique de initAdmin mais retourner l'app
    if (getApps().length === 0) {
      if (process.env.NODE_ENV === 'production') {
        if (!process.env.FIREBASE_ADMIN_PRIVATE_KEY || 
            !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 
            !process.env.FIREBASE_ADMIN_PROJECT_ID) {
          throw new Error('Variables d\'environnement Firebase Admin manquantes');
        }

        const serviceAccount = {
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
        };

        adminApp = initializeApp({
          credential: cert(serviceAccount),
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        });
      } else {
        // En développement, utiliser l'émulateur
        adminApp = initializeApp({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
        });
      }
    } else {
      adminApp = getApps()[0];
    }
  }
  return adminApp;
};

/**
 * Vérifie un token Firebase ID côté serveur
 */
export async function verifyIdToken(idToken: string) {
  try {
    const auth = getAdminAuth();
    if (!auth) {
      throw new Error('Firebase Admin non initialisé');
    }
    const decodedToken = await auth.verifyIdToken(idToken);
    return {
      valid: true,
      uid: decodedToken.uid,
      email: decodedToken.email || null,
      claims: decodedToken
    };
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return {
      valid: false,
      uid: null,
      email: null,
      claims: null
    };
  }
}

/**
 * Vérifie si un utilisateur a les droits admin
 */
export async function verifyAdminUser(uid: string) {
  try {
    const auth = getAdminAuth();
    if (!auth) {
      throw new Error('Firebase Admin non initialisé');
    }
    const user = await auth.getUser(uid);
    
    // Vérifier les custom claims ou autres critères d'admin
    return user.customClaims?.admin === true || 
           user.email === 'admin@chine-en-vrai.com'; // Email admin par défaut
  } catch (error) {
    console.error('Erreur lors de la vérification admin:', error);
    return false;
  }
}

/**
 * Définir les droits admin pour un utilisateur
 */
export async function setAdminClaims(uid: string, isAdmin: boolean = true) {
  try {
    const auth = getAdminAuth();
    if (!auth) {
      throw new Error('Firebase Admin non initialisé');
    }
    await auth.setCustomUserClaims(uid, { admin: isAdmin });
    return true;
  } catch (error) {
    console.error('Erreur lors de la définition des claims admin:', error);
    return false;
  }
}