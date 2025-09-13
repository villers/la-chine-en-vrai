import { NextResponse } from 'next/server';
import { createTravelRequest } from '@/lib/firebase/travelRequests';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    console.log('Données reçues:', formData);
    
    // Validation basique - adaptation au format reçu
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return NextResponse.json(
        { error: 'Les champs prénom, nom et email sont obligatoires' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Validation des champs obligatoires
    if (!formData.destinations || formData.destinations.length === 0) {
      return NextResponse.json(
        { error: 'Veuillez sélectionner au moins une destination' },
        { status: 400 }
      );
    }

    // Adapter le format des données pour Firebase
    const travelRequestData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone || '',
      destination: formData.destinations.join(', '),
      duration: formData.duration,
      startDate: formData.departureDate || new Date().toISOString().split('T')[0],
      travelers: formData.travelers || 1,
      budget: formData.budget,
      interests: formData.interests || [],
      accommodationType: formData.accommodationType || 'standard',
      transportPreference: formData.transportPreference || 'Flexible',
      specialRequests: formData.specialRequests || '',
      status: 'new' as const
    };

    // Sauvegarder la demande de voyage dans Firebase
    const travelRequestId = await createTravelRequest(travelRequestData);

    // Log de la demande de voyage
    console.log('Nouvelle demande de voyage sauvegardée:', {
      id: travelRequestId,
      client: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      destinations: formData.destinations,
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