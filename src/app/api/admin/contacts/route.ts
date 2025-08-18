import { NextResponse } from 'next/server';
import { getRecentContacts } from '@/lib/firebase/contacts';

export async function GET(request: Request) {
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