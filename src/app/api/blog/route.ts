import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const categoryParam = searchParams.get('category');
    const limit = limitParam ? parseInt(limitParam) : 10;

    // Import dynamique pour éviter les erreurs côté serveur
    const { getPublishedBlogPosts, getBlogPostsByCategory } = await import('@/lib/firebase/blog');
    
    let blogPosts;
    
    if (categoryParam && categoryParam !== 'Tous') {
      blogPosts = await getBlogPostsByCategory(categoryParam, limit);
    } else {
      blogPosts = await getPublishedBlogPosts(limit);
    }
    
    return NextResponse.json({
      success: true,
      blogPosts,
      count: blogPosts.length
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const blogPostData = await request.json();
    
    // Validation basique
    if (!blogPostData.title || !blogPostData.content || !blogPostData.author || !blogPostData.category) {
      return NextResponse.json(
        { error: 'Les champs titre, contenu, auteur et catégorie sont obligatoires' },
        { status: 400 }
      );
    }

    // Validation de la longueur du contenu
    if (blogPostData.content.length < 100) {
      return NextResponse.json(
        { error: 'Le contenu doit contenir au moins 100 caractères' },
        { status: 400 }
      );
    }

    // Générer un slug basé sur le titre
    const slug = blogPostData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
      .replace(/[^a-z0-9\s-]/g, '') // Garder uniquement lettres, chiffres, espaces et tirets
      .replace(/\s+/g, '-') // Remplacer espaces par tirets
      .replace(/-+/g, '-') // Éviter les tirets multiples
      .trim();

    // Import dynamique
    const { createBlogPost } = await import('@/lib/firebase/blog');

    // Créer l'article dans Firebase
    const blogPostId = await createBlogPost({
      ...blogPostData,
      slug,
      excerpt: blogPostData.excerpt || blogPostData.content.substring(0, 200) + '...',
      readingTime: blogPostData.readingTime || `${Math.ceil(blogPostData.content.length / 1000)} min`,
      tags: blogPostData.tags || [],
    });

    // Log pour le suivi
    console.log('Nouvel article créé:', {
      id: blogPostId,
      title: blogPostData.title,
      author: blogPostData.author,
      category: blogPostData.category
    });

    return NextResponse.json({
      success: true,
      message: 'Article créé avec succès',
      id: blogPostId
    });

  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création de l\'article' },
      { status: 500 }
    );
  }
}