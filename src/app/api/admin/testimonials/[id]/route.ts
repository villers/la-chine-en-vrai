import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from '@/lib/middleware/auth';
import { TestimonialsAdminService } from '@/lib/firebase/testimonials-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    const { id } = await params;
    const testimonial = await TestimonialsAdminService.getTestimonialById(id);
    
    if (!testimonial) {
      return NextResponse.json(
        { error: 'Témoignage non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      testimonial
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du témoignage:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    const { id } = await params;
    const updates = await request.json();

    await TestimonialsAdminService.updateTestimonial(id, updates);
    
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
  { params }: { params: Promise<{ id: string }> }
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
    const { id } = await params;

    await TestimonialsAdminService.deleteTestimonial(id);
    
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