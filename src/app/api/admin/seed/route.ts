import { NextResponse } from 'next/server';
import { initializeDemoData } from '@/lib/firebase/seedData';

export async function POST() {
  try {
    const result = await initializeDemoData();
    
    return NextResponse.json(result);

  } catch (error) {
    console.error('Erreur lors de l\'initialisation des données de démo:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'initialisation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Utilisez POST pour initialiser les données de démo',
    endpoints: {
      'POST /api/admin/seed': 'Initialise les données de démo',
      'GET /api/admin/contacts': 'Récupère les messages de contact',
      'GET /api/admin/travel-requests': 'Récupère les demandes de voyage',
      'GET /api/admin/newsletter': 'Récupère les abonnés newsletter'
    }
  });
}