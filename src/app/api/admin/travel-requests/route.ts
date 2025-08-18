import { NextResponse } from 'next/server';
import { getRecentTravelRequests, getTravelRequestsByStatus } from '@/lib/firebase/travelRequests';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const statusParam = searchParams.get('status');
    const limit = limitParam ? parseInt(limitParam) : 50;

    let travelRequests;
    
    if (statusParam) {
      travelRequests = await getTravelRequestsByStatus(statusParam);
    } else {
      travelRequests = await getRecentTravelRequests(limit);
    }
    
    return NextResponse.json({
      success: true,
      travelRequests,
      count: travelRequests.length
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des demandes de voyage:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des demandes' },
      { status: 500 }
    );
  }
}