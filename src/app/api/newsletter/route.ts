import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Validation de l'email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Ici, vous pouvez intégrer avec un service de newsletter
    // (Mailchimp, ConvertKit, SendGrid, etc.)
    console.log('Nouvelle inscription newsletter:', email);

    // TODO: Intégrer avec votre service de newsletter
    // await addToNewsletter(email);

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie à la newsletter'
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription newsletter:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
}