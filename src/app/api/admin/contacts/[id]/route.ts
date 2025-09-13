import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from '@/lib/middleware/auth';
import { ContactsAdminService } from '@/lib/firebase/contacts-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Vérification de l'authentification
  const { valid } = await verifyFirebaseToken(request);
  if (!valid) {
    return NextResponse.json(
      { error: 'Non autorisé - Authentification requise' },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const contact = await ContactsAdminService.getContactById(id);
    
    if (!contact) {
      return NextResponse.json(
        { error: 'Contact non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      contact
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du contact:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Vérification de l'authentification
  const { valid } = await verifyFirebaseToken(request);
  if (!valid) {
    return NextResponse.json(
      { error: 'Non autorisé - Authentification requise' },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const updates = await request.json();

    // Si on met à jour seulement le statut
    if (updates.status && Object.keys(updates).length === 1) {
      await ContactsAdminService.updateContactStatus(id, updates.status);
    } else {
      // Mise à jour générale (non implémentée dans le service, peut être ajoutée si nécessaire)
      return NextResponse.json(
        { error: 'Mise à jour générale non supportée, utilisez updateContactStatus' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Contact mis à jour avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du contact:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la mise à jour' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Vérification de l'authentification
  const { valid } = await verifyFirebaseToken(request);
  if (!valid) {
    return NextResponse.json(
      { error: 'Non autorisé - Authentification requise' },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    await ContactsAdminService.deleteContact(id);
    
    return NextResponse.json({
      success: true,
      message: 'Contact supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du contact:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la suppression' },
      { status: 500 }
    );
  }
}