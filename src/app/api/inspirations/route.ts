import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get('category');

    // Import dynamique pour éviter les erreurs côté serveur
    const { getActiveInspirations, getInspirationByCategory } = await import('@/lib/firebase/inspirations');
    
    let inspirations;
    
    if (categoryParam) {
      const inspiration = await getInspirationByCategory(categoryParam);
      inspirations = inspiration ? [inspiration] : [];
    } else {
      inspirations = await getActiveInspirations();
    }
    
    return NextResponse.json({
      success: true,
      inspirations,
      count: inspirations.length
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des inspirations:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des inspirations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const inspirationData = await request.json();
    
    // Validation basique
    if (!inspirationData.categoryId || !inspirationData.title || !inspirationData.description) {
      return NextResponse.json(
        { error: 'Les champs categoryId, titre et description sont obligatoires' },
        { status: 400 }
      );
    }

    // Validation des itinéraires
    if (!inspirationData.itineraries || !Array.isArray(inspirationData.itineraries) || inspirationData.itineraries.length === 0) {
      return NextResponse.json(
        { error: 'Au moins un itinéraire est obligatoire' },
        { status: 400 }
      );
    }

    // Validation de chaque itinéraire
    for (const itinerary of inspirationData.itineraries) {
      if (!itinerary.title || !itinerary.description || !itinerary.duration || !itinerary.price) {
        return NextResponse.json(
          { error: 'Chaque itinéraire doit avoir un titre, une description, une durée et un prix' },
          { status: 400 }
        );
      }
    }

    // Import dynamique
    const { createInspiration } = await import('@/lib/firebase/inspirations');

    // Créer l'inspiration dans Firebase
    const inspirationId = await createInspiration({
      categoryId: inspirationData.categoryId,
      title: inspirationData.title,
      description: inspirationData.description,
      image: inspirationData.image || '',
      itineraries: inspirationData.itineraries,
      order: inspirationData.order || 0,
    });

    // Log pour le suivi
    console.log('Nouvelle inspiration créée:', {
      id: inspirationId,
      categoryId: inspirationData.categoryId,
      title: inspirationData.title,
      itinerariesCount: inspirationData.itineraries.length
    });

    return NextResponse.json({
      success: true,
      message: 'Inspiration créée avec succès',
      id: inspirationId
    });

  } catch (error) {
    console.error('Erreur lors de la création de l\'inspiration:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création de l\'inspiration' },
      { status: 500 }
    );
  }
}