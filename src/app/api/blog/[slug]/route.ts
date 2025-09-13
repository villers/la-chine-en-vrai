import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const preview = searchParams.get('preview') === 'true';

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug manquant' },
        { status: 400 }
      );
    }

    // Si le mode preview est demandé, vérifier l'authentification admin
    if (preview) {
      const { verifyFirebaseToken } = await import('@/lib/middleware/auth');
      const { valid } = await verifyFirebaseToken(request);
      
      if (!valid) {
        return NextResponse.json(
          { error: 'Accès non autorisé - Authentification admin requise pour la prévisualisation' },
          { status: 401 }
        );
      }
    }

    // Import dynamique pour éviter les erreurs côté serveur
    const { getBlogPostBySlug } = await import('@/lib/firebase/blog');
    
    const blogPost = await getBlogPostBySlug(slug, preview);
    
    if (!blogPost) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      blogPost
    });

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération de l\'article' },
      { status: 500 }
    );
  }
}