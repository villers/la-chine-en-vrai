'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchInspirations } from '@/lib/features/inspirations/inspirationsSlice';
import { images } from '@/lib/data/images';

export default function Inspirations() {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector((state) => state.inspirations);
  const [selectedCategory, setSelectedCategory] = useState('gastronomie');

  useEffect(() => {
    dispatch(fetchInspirations());
  }, [dispatch]);

  // Set default category when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].categoryId);
    }
  }, [categories, selectedCategory]);

  const currentCategory = categories.find(cat => cat.categoryId === selectedCategory);

  return (
    <div>
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Inspirations de voyages</h1>
          <p className="text-xl text-red-100">
            Découvrez nos itinéraires conçus par nos experts
          </p>
        </div>
      </section>

      <section className="py-8 bg-white sticky top-16 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-4">
              <p className="text-red-600 mb-2">Erreur: {error}</p>
              <button
                onClick={() => dispatch(fetchInspirations())}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Réessayer
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.categoryId}
                  onClick={() => setSelectedCategory(category.categoryId)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.categoryId
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-700'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!loading && !error && currentCategory && (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {currentCategory.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {currentCategory.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {currentCategory.itineraries.map((itinerary, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-semibold text-gray-900">{itinerary.title}</h3>
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                          {itinerary.duration}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{itinerary.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Points forts :</h4>
                        <div className="flex flex-wrap gap-2">
                          {itinerary.highlights.map((highlight, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-red-600">
                          {itinerary.price}
                        </span>
                        <Link 
                          href="/custom-travel"
                          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Personnaliser
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-600 mb-6">
                  Tous nos voyages sont entièrement personnalisables selon vos envies
                </p>
                <Link
                  href="/custom-travel"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
                >
                  Créer mon voyage sur mesure
                </Link>
              </div>
            </>
          )}

          {!loading && !error && !currentCategory && categories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Aucune inspiration disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir nos itinéraires ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expertise Locale</h3>
              <p className="text-gray-600">
                Nos guides locaux partagent leurs secrets et vous font découvrir la vraie Chine.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexibilité Totale</h3>
              <p className="text-gray-600">
                Adaptez chaque itinéraire selon vos envies, votre rythme et vos centres d'intérêt.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expériences Uniques</h3>
              <p className="text-gray-600">
                Vivez des moments authentiques impossibles à trouver dans les guides touristiques.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}