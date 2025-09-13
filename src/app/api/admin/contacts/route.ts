import { NextRequest, NextResponse } from 'next/server';
import { ContactsAdminService } from '@/lib/firebase/contacts-admin';
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
    const offsetParam = searchParams.get('offset');
    const statsParam = searchParams.get('stats');
    
    const limit = limitParam ? parseInt(limitParam) : 50;
    const offset = offsetParam ? parseInt(offsetParam) : 0;

    if (statsParam === 'true') {
      const stats = await ContactsAdminService.getContactsStats();
      return NextResponse.json({
        success: true,
        stats
      });
    }

    const contacts = await ContactsAdminService.getAllContacts(limit, offset);
    
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