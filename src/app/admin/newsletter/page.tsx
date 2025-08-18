'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { useAppDispatch } from '@/lib/store/hooks';
import { 
  fetchSubscribers, 
  deleteSubscriber as deleteSubscriberAction,
  useSubscribers,
  useNewsletterLoading,
  useSubscribersThisMonth
} from '@/lib/features/admin/newsletterSlice';
import { formatDate } from '@/lib/utils/dateUtils';
import Link from 'next/link';

export default function AdminNewsletter() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const subscribers = useSubscribers();
  const loadingData = useNewsletterLoading();
  const subscribersThisMonth = useSubscribersThisMonth();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchSubscribers());
    }
  }, [isAdmin, dispatch]);

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) {
      return;
    }

    await dispatch(deleteSubscriberAction(id));
  };

  const exportEmails = () => {
    const emails = subscribers.map(s => s.email).join('\n');
    const blob = new Blob([emails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                Gestion de la newsletter
              </h1>
            </div>
            <button
              onClick={exportEmails}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Exporter les emails
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500">Total d'abonnés</div>
              <div className="text-2xl font-bold text-gray-900">{subscribers.length}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500">Nouveaux ce mois</div>
              <div className="text-2xl font-bold text-green-600">
                {subscribersThisMonth.length}
              </div>
            </div>
          </div>

          {/* Liste des abonnés */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Abonnés à la newsletter
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Liste de tous les abonnés à la newsletter
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              {subscribers.map((subscriber) => (
                <li key={subscriber.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {subscriber.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            Inscrit le {formatDate(subscriber.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleDeleteSubscriber(subscriber.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {subscribers.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun abonné</h3>
              <p className="mt-1 text-sm text-gray-500">
                Aucun abonné à la newsletter pour le moment.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}