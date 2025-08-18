import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug manquant' },
        { status: 400 }
      );
    }

    // Import dynamique pour éviter les erreurs côté serveur
    const { getBlogPostBySlug } = await import('@/lib/firebase/blog');
    
    const blogPost = await getBlogPostBySlug(slug);
    
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