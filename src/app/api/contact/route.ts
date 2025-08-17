import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, subject, message } = await request.json();
    
    // Validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Les champs prénom, nom, email et message sont obligatoires' },
        { status: 400 }
      );
    }

    // Log de la demande de contact
    console.log('Nouvelle demande de contact:', {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message
    });

    // Simulation d'envoi d'email
    const emailContent = `
      Nouvelle demande de contact:
      
      Nom: ${firstName} ${lastName}
      Email: ${email}
      Téléphone: ${phone || 'Non renseigné'}
      Sujet: ${subject || 'Demande générale'}
      
      Message:
      ${message}
    `;

    // TODO: Intégrer avec votre service d'email
    // await sendEmail({
    //   to: 'contact@votre-agence.com',
    //   subject: `Nouvelle demande: ${subject || 'Contact général'}`,
    //   text: emailContent
    // });

    return NextResponse.json({
      success: true,
      message: 'Votre message a été envoyé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre message' },
      { status: 500 }
    );
  }
}