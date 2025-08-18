import { NextRequest, NextResponse } from 'next/server';
import { getRecentContacts } from '@/lib/firebase/contacts';
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
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 50;

    const contacts = await getRecentContacts(limit);
    
    return NextResponse.json({
      success: true,
      contacts,
      count: contacts.length
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des contacts:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des contacts' },
      { status: 500 }
    );
  }
}