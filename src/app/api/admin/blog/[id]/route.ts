import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from '@/lib/middleware/auth';
import { BlogAdminService } from '@/lib/firebase/blog-admin';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
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
    
    const post = await BlogAdminService.getPostById(id);
    
    return NextResponse.json({
      success: true,
      post
    });

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    
    if (error instanceof Error && error.message === 'Article non trouvé') {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération de l\'article' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
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
    const body = await request.json();
    
    await BlogAdminService.updatePost(id, body);
    
    return NextResponse.json({
      success: true,
      message: 'Article mis à jour avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    
    if (error instanceof Error && error.message === 'Article non trouvé') {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Une erreur est survenue lors de la mise à jour de l\'article' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
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
    
    await BlogAdminService.deletePost(id);
    
    return NextResponse.json({
      success: true,
      message: 'Article supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    
    if (error instanceof Error && error.message === 'Article non trouvé') {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Une erreur est survenue lors de la suppression de l\'article' },
      { status: 500 }
    );
  }
}