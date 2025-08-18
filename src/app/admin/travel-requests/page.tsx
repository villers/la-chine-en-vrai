'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { useAppDispatch } from '@/lib/store/hooks';
import { 
  fetchTravelRequests, 
  markTravelRequestAsProcessed, 
  deleteTravelRequest as deleteTravelRequestAction,
  useTravelRequests,
  useTravelRequestsLoading,
  useNewTravelRequests,
  useProcessedTravelRequests
} from '@/lib/features/admin/travelRequestsSlice';
import { formatDate } from '@/lib/utils/dateUtils';
import Link from 'next/link';

export default function AdminTravelRequests() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const travelRequests = useTravelRequests();
  const loadingData = useTravelRequestsLoading();
  const newTravelRequests = useNewTravelRequests();
  const processedTravelRequests = useProcessedTravelRequests();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchTravelRequests());
    }
  }, [isAdmin, dispatch]);

  const handleMarkAsProcessed = async (id: string) => {
    await dispatch(markTravelRequestAsProcessed(id));
  };

  const handleDeleteTravelRequest = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande de voyage ?')) {
      return;
    }

    await dispatch(deleteTravelRequestAction(id));
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-red-600 hover:text-red-500">
                ← Retour au dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Demandes de voyage sur mesure
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-2xl font-bold text-gray-900">{travelRequests.length}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500">Nouvelles</div>
              <div className="text-2xl font-bold text-orange-600">
                {newTravelRequests.length}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500">Traitées</div>
              <div className="text-2xl font-bold text-green-600">
                {processedTravelRequests.length}
              </div>
            </div>
          </div>

          {/* Liste des demandes */}
          <div className="space-y-6">
            {travelRequests.map((request) => (
              <div key={request.id} className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {request.name}
                    </h3>
                    <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      request.status === 'new'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {request.status === 'new' ? 'Nouvelle' : 'Traitée'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(request.createdAt)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Informations contact */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Contact</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><strong>Email:</strong> {request.email}</div>
                      <div><strong>Téléphone:</strong> {request.phone}</div>
                    </div>
                  </div>

                  {/* Informations voyage */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Voyage</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><strong>Destination:</strong> {request.destination}</div>
                      <div><strong>Durée:</strong> {request.duration}</div>
                      <div><strong>Date de départ:</strong> {new Date(request.startDate).toLocaleDateString('fr-FR')}</div>
                      <div><strong>Voyageurs:</strong> {request.travelers} personne(s)</div>
                      <div><strong>Budget:</strong> {request.budget}</div>
                    </div>
                  </div>
                </div>

                {/* Préférences */}
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Préférences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <strong>Intérêts:</strong> {request.interests?.join(', ') || 'Non spécifié'}
                    </div>
                    <div>
                      <strong>Hébergement:</strong> {request.accommodationType}
                    </div>
                    <div>
                      <strong>Transport:</strong> {request.transportPreference}
                    </div>
                  </div>
                  {request.specialRequests && (
                    <div className="mt-2">
                      <strong className="text-sm text-gray-900">Demandes spéciales:</strong>
                      <p className="text-sm text-gray-600 mt-1">{request.specialRequests}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end space-x-3">
                  {request.status === 'new' && (
                    <button
                      onClick={() => handleMarkAsProcessed(request.id)}
                      className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded text-sm font-medium"
                    >
                      Marquer comme traitée
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTravelRequest(request.id)}
                    className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded text-sm font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          {travelRequests.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune demande</h3>
              <p className="mt-1 text-sm text-gray-500">
                Aucune demande de voyage sur mesure pour le moment.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}