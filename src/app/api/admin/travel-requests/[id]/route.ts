import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from '@/lib/middleware/auth';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export async function PATCH(
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
    const updates = await request.json();

    const travelRequestRef = doc(db, 'travelRequests', id);
    await updateDoc(travelRequestRef, {
      ...updates,
      updatedAt: new Date()
    });
    
    return NextResponse.json({
      success: true,
      message: 'Demande de voyage mise à jour avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la demande:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la mise à jour' },
      { status: 500 }
    );
  }
}

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

    const travelRequestRef = doc(db, 'travelRequests', id);
    await deleteDoc(travelRequestRef);
    
    return NextResponse.json({
      success: true,
      message: 'Demande de voyage supprimée avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression de la demande:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la suppression' },
      { status: 500 }
    );
  }
}