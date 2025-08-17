import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // Validation basique
    if (!formData.personalInfo.firstName || !formData.personalInfo.lastName || !formData.personalInfo.email) {
      return NextResponse.json(
        { error: 'Les champs prénom, nom et email sont obligatoires' },
        { status: 400 }
      );
    }

    // Ici, vous pouvez intégrer avec un service email (SendGrid, Resend, etc.)
    // ou sauvegarder en base de données
    console.log('Nouvelle demande de voyage:', {
      personalInfo: formData.personalInfo,
      destination: formData.destination,
      travelType: formData.travelType,
      budget: formData.budget,
      duration: formData.duration,
      travelers: formData.travelers,
      interests: formData.interests,
      accommodation: formData.accommodation,
    });

    // Simulation d'envoi d'email
    const emailContent = `
      Nouvelle demande de voyage sur mesure:
      
      Client: ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}
      Email: ${formData.personalInfo.email}
      Téléphone: ${formData.personalInfo.phone || 'Non renseigné'}
      
      Destinations souhaitées: ${formData.destination.join(', ')}
      Types de voyage: ${formData.travelType.join(', ')}
      Budget: ${formData.budget}
      Durée: ${formData.duration}
      Nombre de voyageurs: ${formData.travelers}
      Hébergement: ${formData.accommodation}
      Centres d'intérêt: ${formData.interests.join(', ')}
      
      Message: ${formData.personalInfo.message || 'Aucun message spécifique'}
    `;

    // TODO: Intégrer avec votre service d'email préféré
    // await sendEmail({
    //   to: 'contact@votre-agence.com',
    //   subject: 'Nouvelle demande de voyage sur mesure',
    //   text: emailContent
    // });

    return NextResponse.json({
      success: true,
      message: 'Votre demande a été envoyée avec succès'
    });

  } catch (error) {
    console.error('Erreur lors du traitement de la demande:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre demande' },
      { status: 500 }
    );
  }
}