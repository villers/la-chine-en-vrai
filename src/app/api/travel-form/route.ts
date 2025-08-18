import { NextResponse } from 'next/server';
import { createTravelRequest } from '@/lib/firebase/travelRequests';

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

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.personalInfo.email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Validation des champs obligatoires
    if (!formData.destination || formData.destination.length === 0) {
      return NextResponse.json(
        { error: 'Veuillez sélectionner au moins une destination' },
        { status: 400 }
      );
    }

    if (!formData.travelType || formData.travelType.length === 0) {
      return NextResponse.json(
        { error: 'Veuillez sélectionner au moins un type de voyage' },
        { status: 400 }
      );
    }

    // Sauvegarder la demande de voyage dans Firebase
    const travelRequestId = await createTravelRequest({
      personalInfo: formData.personalInfo,
      destination: formData.destination,
      travelType: formData.travelType,
      budget: formData.budget,
      duration: formData.duration,
      travelers: formData.travelers,
      interests: formData.interests,
      accommodation: formData.accommodation,
    });

    // Log de la demande de voyage
    console.log('Nouvelle demande de voyage sauvegardée:', {
      id: travelRequestId,
      client: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
      email: formData.personalInfo.email,
      destinations: formData.destination,
      budget: formData.budget
    });

    return NextResponse.json({
      success: true,
      message: 'Votre demande a été envoyée avec succès',
      id: travelRequestId
    });

  } catch (error) {
    console.error('Erreur lors du traitement de la demande:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre demande' },
      { status: 500 }
    );
  }
}