import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase/config';

export async function verifyFirebaseToken(request: NextRequest): Promise<{ valid: boolean; uid?: string; email?: string }> {
  try {
    // Récupérer le token depuis le header Authorization ou cookies
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : request.cookies.get('admin-token')?.value;

    if (!token) {
      console.log('❌ Pas de token trouvé');
      return { valid: false };
    }

    // En développement avec l'émulateur, on accepte tous les tokens Firebase valides
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Vérification du token en développement:', token.substring(0, 20) + '...');
      
      // Vérification basique du format du token Firebase
      // Les tokens Firebase ont un format JWT avec 3 parties séparées par des points
      const parts = token.split('.');
      if (parts.length === 3 && token.length > 50) {
        console.log('✅ Token valide en développement');
        return { 
          valid: true, 
          uid: 'admin-dev', 
          email: 'admin@chine-en-vrai.com' 
        };
      }
      
      console.log('❌ Format de token invalide');
    }

    // En production, ici on utiliserait Firebase Admin SDK pour vérifier le token
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // return { valid: true, uid: decodedToken.uid, email: decodedToken.email };

    return { valid: false };
  } catch (error) {
    console.error('Erreur de vérification du token:', error);
    return { valid: false };
  }
}

export function createAuthMiddleware() {
  return async function authMiddleware(request: NextRequest) {
    const { valid } = await verifyFirebaseToken(request);

    if (!valid) {
      return NextResponse.json(
        { error: 'Non autorisé - Token invalide ou manquant' },
        { status: 401 }
      );
    }

    // Si l'authentification est valide, continuer vers l'API
    return NextResponse.next();
  };
}