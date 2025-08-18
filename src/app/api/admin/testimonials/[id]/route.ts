import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from '@/lib/middleware/auth';
import { updateTestimonial, deleteTestimonial } from '@/lib/firebase/testimonials';

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

    await updateTestimonial(id, updates);
    
    return NextResponse.json({
      success: true,
      message: 'Témoignage mis à jour avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du témoignage:', error);
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

    await deleteTestimonial(id);
    
    return NextResponse.json({
      success: true,
      message: 'Témoignage supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du témoignage:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la suppression' },
      { status: 500 }
    );
  }
}