import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from '@/lib/middleware/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Vérification de l'authentification
  const { valid } = await verifyFirebaseToken(request);
  if (!valid) {
    return NextResponse.json(
      { error: 'Non autorisé - Authentification requise' },
      { status: 401 }
    );
  }

  try {
    const { id } = params;

    const subscriberRef = doc(db, 'newsletter', id);
    await deleteDoc(subscriberRef);
    
    return NextResponse.json({
      success: true,
      message: 'Abonné supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression de l\'abonné:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la suppression' },
      { status: 500 }
    );
  }
}