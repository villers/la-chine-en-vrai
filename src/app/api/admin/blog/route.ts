import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from '@/lib/middleware/auth';
import { BlogAdminService } from '@/lib/firebase/blog-admin';

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
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';

    const posts = await BlogAdminService.getAllPosts(includeUnpublished);
    
    return NextResponse.json({
      success: true,
      posts,
      count: posts.length
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Une erreur est survenue lors de la récupération des articles' },
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
    const body = await request.json();
    
    // Validation des données requises
    const { title, excerpt, content, author, category, tags = [], readingTime } = body;
    
    if (!title || !excerpt || !content || !author || !category) {
      return NextResponse.json(
        { error: 'Données manquantes - title, excerpt, content, author et category sont requis' },
        { status: 400 }
      );
    }

    const postData = {
      title,
      excerpt,
      content,
      author,
      category,
      tags: Array.isArray(tags) ? tags : [],
      readingTime: readingTime || '5 min',
      image: body.image || '',
      isPublished: body.isPublished || false,
    };

    const post = await BlogAdminService.createPost(postData);

    return NextResponse.json({
      success: true,
      message: 'Article créé avec succès',
      post
    });

  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Une erreur est survenue lors de la création de l\'article' },
      { status: 500 }
    );
  }
}