import { NextResponse } from 'next/server';
import { getRecentSubscribers, getActiveSubscribers } from '@/lib/firebase/newsletter';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const activeOnlyParam = searchParams.get('activeOnly');
    const limit = limitParam ? parseInt(limitParam) : 100;
    const activeOnly = activeOnlyParam === 'true';

    let subscribers;
    
    if (activeOnly) {
      subscribers = await getActiveSubscribers();
    } else {
      subscribers = await getRecentSubscribers(limit);
    }
    
    return NextResponse.json({
      success: true,
      subscribers,
      count: subscribers.length
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des abonnés:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des abonnés' },
      { status: 500 }
    );
  }
}