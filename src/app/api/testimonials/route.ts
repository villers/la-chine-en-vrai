import { NextResponse } from 'next/server';
import { createTestimonial } from '@/lib/firebase/testimonials';

export async function POST(request: Request) {
  try {
    const testimonialData = await request.json();
    
    // Validation basique
    if (!testimonialData.name || !testimonialData.location || !testimonialData.text || !testimonialData.rating) {
      return NextResponse.json(
        { error: 'Les champs nom, localisation, témoignage et note sont obligatoires' },
        { status: 400 }
      );
    }

    // Validation de la longueur du témoignage
    if (testimonialData.text.length < 50) {
      return NextResponse.json(
        { error: 'Le témoignage doit contenir au moins 50 caractères' },
        { status: 400 }
      );
    }

    // Validation de la note
    if (testimonialData.rating < 1 || testimonialData.rating > 5) {
      return NextResponse.json(
        { error: 'La note doit être comprise entre 1 et 5' },
        { status: 400 }
      );
    }

    // Créer le témoignage dans Firebase
    const testimonialId = await createTestimonial(testimonialData);

    // Log pour le suivi
    console.log('Nouveau témoignage créé:', {
      id: testimonialId,
      name: testimonialData.name,
      rating: testimonialData.rating,
      travelType: testimonialData.travelType
    });

    return NextResponse.json({
      success: true,
      message: 'Témoignage envoyé avec succès',
      id: testimonialId
    });

  } catch (error) {
    console.error('Erreur lors de la création du témoignage:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du témoignage' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Utilisez POST pour envoyer un témoignage' },
    { status: 405 }
  );
}