import { NextResponse } from 'next/server';
import { createContact } from '@/lib/firebase/contacts';

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

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Validation de la longueur du message
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Le message doit contenir au moins 10 caractères' },
        { status: 400 }
      );
    }

    // Sauvegarder le message de contact dans Firebase
    const contactId = await createContact({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message
    });

    // Log de la demande de contact
    console.log('Nouvelle demande de contact sauvegardée:', {
      id: contactId,
      firstName,
      lastName,
      email,
      subject
    });

    return NextResponse.json({
      success: true,
      message: 'Votre message a été envoyé avec succès',
      id: contactId
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre message' },
      { status: 500 }
    );
  }
}