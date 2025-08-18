'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '@/lib/hooks/useAuth';
import { RootState, AppDispatch } from '@/lib/store/store';
import { 
  fetchContacts, 
  markContactAsProcessed, 
  deleteContact as deleteContactAction 
} from '@/lib/features/admin/adminSlice';
import Link from 'next/link';

export default function AdminContacts() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  const { contacts, contactsLoading: loadingData } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchContacts());
    }
  }, [isAdmin, dispatch]);

  const handleMarkAsProcessed = async (id: string) => {
    await dispatch(markContactAsProcessed(id));
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      return;
    }

    await dispatch(deleteContactAction(id));
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
                Gestion des contacts
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
              <div className="text-2xl font-bold text-gray-900">{contacts.length}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500">Nouveaux</div>
              <div className="text-2xl font-bold text-orange-600">
                {contacts.filter(c => c.status === 'new').length}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500">Traités</div>
              <div className="text-2xl font-bold text-green-600">
                {contacts.filter(c => c.status === 'processed').length}
              </div>
            </div>
          </div>

          {/* Liste des contacts */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <li key={contact.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">
                            {contact.name}
                          </h3>
                          <span className="ml-2 text-sm text-gray-500">
                            ({contact.email})
                          </span>
                          <div className="ml-4 flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              contact.status === 'new'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {contact.status === 'new' ? 'Nouveau' : 'Traité'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="text-sm text-gray-600">
                          <strong>Sujet:</strong> {contact.subject}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Téléphone:</strong> {contact.phone}
                        </div>
                        <p className="mt-2 text-gray-600 line-clamp-3">
                          {contact.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {contact.createdAt && new Date(contact.createdAt.seconds * 1000).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex space-x-2">
                      {contact.status === 'new' && (
                        <button
                          onClick={() => handleMarkAsProcessed(contact.id)}
                          className="px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200 rounded text-sm font-medium"
                        >
                          Marquer comme traité
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
                        className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 rounded text-sm font-medium"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {contacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun contact trouvé</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}