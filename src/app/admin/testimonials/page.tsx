'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '@/lib/hooks/useAuth';
import { RootState, AppDispatch } from '@/lib/store/store';
import { 
  fetchTestimonials, 
  updateTestimonial, 
  deleteTestimonial as deleteTestimonialAction 
} from '@/lib/features/admin/adminSlice';
import Link from 'next/link';

export default function AdminTestimonials() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  const { testimonials, testimonialsLoading: loadingData } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/admin/login');
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchTestimonials());
    }
  }, [isAdmin, dispatch]);

  const togglePublished = async (id: string, currentStatus: boolean) => {
    await dispatch(updateTestimonial({ id, updates: { isPublished: !currentStatus } }));
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
      return;
    }

    await dispatch(deleteTestimonialAction(id));
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
                Gestion des témoignages
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
              <div className="text-2xl font-bold text-gray-900">{testimonials.length}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500">Publiés</div>
              <div className="text-2xl font-bold text-green-600">
                {testimonials.filter(t => t.isPublished).length}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500">En attente</div>
              <div className="text-2xl font-bold text-yellow-600">
                {testimonials.filter(t => !t.isPublished).length}
              </div>
            </div>
          </div>

          {/* Liste des témoignages */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {testimonials.map((testimonial) => (
                <li key={testimonial.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">
                            {testimonial.name}
                          </h3>
                          <span className="ml-2 text-sm text-gray-500">
                            ({testimonial.location})
                          </span>
                          <div className="ml-4 flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            testimonial.isPublished 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {testimonial.isPublished ? 'Publié' : 'En attente'}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600 line-clamp-3">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {testimonial.createdAt && new Date(testimonial.createdAt.seconds * 1000).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => togglePublished(testimonial.id, testimonial.isPublished)}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          testimonial.isPublished
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {testimonial.isPublished ? 'Masquer' : 'Publier'}
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
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

          {testimonials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun témoignage trouvé</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}