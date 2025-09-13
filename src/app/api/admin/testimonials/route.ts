import { NextRequest, NextResponse } from 'next/server';
import { TestimonialsAdminService } from '@/lib/firebase/testimonials-admin';
import { verifyFirebaseToken } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  // Vérification de l'authentification
  const { valid } = await verifyFirebaseToken(request);
  if (!valid) {
    return NextResponse.json(
      { error: 'Non autorisé - Authentification requise' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const includeUnpublishedParam = searchParams.get('includeUnpublished');
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    const statsParam = searchParams.get('stats');
    
    const includeUnpublished = includeUnpublishedParam !== 'false';
    const limit = limitParam ? parseInt(limitParam) : 50;
    const offset = offsetParam ? parseInt(offsetParam) : 0;

    if (statsParam === 'true') {
      const stats = await TestimonialsAdminService.getTestimonialsStats();
      return NextResponse.json({
        success: true,
        stats
      });
    }

    const testimonials = await TestimonialsAdminService.getAllTestimonials(
      includeUnpublished, 
      limit, 
      offset
    );
    
    return NextResponse.json({
      success: true,
      testimonials,
      count: testimonials.length
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des témoignages:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des témoignages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Vérification de l'authentification
  const { valid } = await verifyFirebaseToken(request);
  if (!valid) {
    return NextResponse.json(
      { error: 'Non autorisé - Authentification requise' },
      { status: 401 }
    );
  }

  try {
    const testimonialData = await request.json();
    const id = await TestimonialsAdminService.createTestimonial(testimonialData);
    
    return NextResponse.json({
      success: true,
      message: 'Témoignage créé avec succès',
      id
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création du témoignage:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création du témoignage' },
      { status: 500 }
    );
  }
}