import { NextResponse } from 'next/server';
import { addNewsletterSubscriber } from '@/lib/firebase/newsletter';

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Ajouter l'abonné à la newsletter dans Firebase
    const subscriberId = await addNewsletterSubscriber(email, source || 'website');

    console.log('Nouvelle inscription newsletter sauvegardée:', {
      id: subscriberId,
      email,
      source: source || 'website'
    });

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie à la newsletter',
      id: subscriberId
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription newsletter:', error);
    
    // Gestion spécifique de l'erreur d'email déjà existant
    if (error instanceof Error && error.message.includes('déjà inscrite')) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 } // Conflict
      );
    }
    
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
}