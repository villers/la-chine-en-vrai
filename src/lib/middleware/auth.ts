import { NextRequest, NextResponse } from 'next/server';

export async function verifyFirebaseToken(request: NextRequest): Promise<{ valid: boolean; uid?: string; email?: string }> {
  try {
    // Récupérer le token depuis le header Authorization ou cookies
    const authHeader = request.headers.get('authorization');
    const adminTokenCookie = request.cookies.get('admin-token')?.value;
    
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : adminTokenCookie;

    if (!token) {
      return { valid: false };
    }

    // En développement avec l'émulateur, vérification simplifiée
    if (process.env.NODE_ENV === 'development') {
      // Vérification basique du format du token Firebase
      const parts = token.split('.');
      if (parts.length === 3 && token.length > 50) {
        return { 
          valid: true, 
          uid: 'admin-dev', 
          email: 'admin@chine-en-vrai.com' 
        };
      }
      return { valid: false };
    }

    // En production, utiliser Firebase Admin SDK pour vérifier le token
    try {
      const { verifyIdToken, verifyAdminUser } = await import('@/lib/firebase/admin');
      const tokenResult = await verifyIdToken(token);
      
      if (!tokenResult.valid || !tokenResult.uid) {
        return { valid: false };
      }
      
      // Vérifier que l'utilisateur a les droits admin
      const isAdmin = await verifyAdminUser(tokenResult.uid);
      if (!isAdmin) {
        return { valid: false };
      }
      
      return {
        valid: true,
        uid: tokenResult.uid,
        email: tokenResult.email
      };
    } catch (adminError) {
      console.error('Erreur Firebase Admin:', adminError);
      return { valid: false };
    }
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