'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { images } from '@/lib/data/images';

const inspirationCategories = [
  {
    id: 'gastronomie',
    title: 'Gastronomie & Saveurs',
    description: 'Un voyage culinaire à travers les 8 grandes cuisines chinoises',
    image: images.inspirations.gastronomie,
    itineraries: [
      {
        title: 'Route des Saveurs du Sichuan',
        duration: '10 jours',
        highlights: ['Chengdu', 'Leshan', 'Emeishan'],
        description: 'Découvrez la cuisine épicée du Sichuan, rencontrez des chefs locaux et apprenez à cuisiner le mapo tofu authentique.',
        price: 'À partir de 2 200€'
      },
      {
        title: 'Marché de Canton & Dim Sum',
        duration: '7 jours',
        highlights: ['Canton', 'Shunde', 'Foshan'],
        description: 'Explorez les marchés traditionnels et maîtrisez l\'art du dim sum avec des maîtres cuisiniers.',
        price: 'À partir de 1 800€'
      }
    ]
  },
  {
    id: 'culture',
    title: 'Culture & Traditions',
    description: 'Plongez dans 5000 ans d\'histoire et de traditions',
    image: images.inspirations.culture,
    itineraries: [
      {
        title: 'Capitales Impériales',
        duration: '12 jours',
        highlights: ['Pékin', 'Xi\'an', 'Luoyang'],
        description: 'Visitez la Cité Interdite, l\'Armée de Terre Cuite et les grottes de Longmen.',
        price: 'À partir de 2 800€'
      },
      {
        title: 'Route de la Soie',
        duration: '15 jours',
        highlights: ['Dunhuang', 'Turpan', 'Kashgar'],
        description: 'Suivez les traces de Marco Polo sur l\'ancienne Route de la Soie.',
        price: 'À partir de 3 200€'
      }
    ]
  },
  {
    id: 'nature',
    title: 'Nature & Paysages',
    description: 'Des rizières aux sommets enneigés',
    image: images.inspirations.nature,
    itineraries: [
      {
        title: 'Merveilles de Guilin',
        duration: '8 jours',
        highlights: ['Guilin', 'Yangshuo', 'Longji'],
        description: 'Naviguez sur la rivière Li et découvrez les rizières en terrasses.',
        price: 'À partir de 1 900€'
      },
      {
        title: 'Tibet & Montagnes Sacrées',
        duration: '14 jours',
        highlights: ['Lhassa', 'Shigatse', 'Camp de base Everest'],
        description: 'Une expérience spirituelle unique sur le toit du monde.',
        price: 'À partir de 3 800€'
      }
    ]
  },
  {
    id: 'villes',
    title: 'Grandes Métropoles',
    description: 'L\'effervescence de la Chine moderne',
    image: images.inspirations.villes,
    itineraries: [
      {
        title: 'Triangle d\'Or : Pékin-Shanghai-Hong Kong',
        duration: '10 jours',
        highlights: ['Pékin', 'Shanghai', 'Hong Kong'],
        description: 'Découvrez trois facettes de la Chine : traditionnelle, moderne et cosmopolite.',
        price: 'À partir de 2 600€'
      },
      {
        title: 'Innovation & Tech Tour',
        duration: '8 jours',
        highlights: ['Shenzhen', 'Hangzhou', 'Shanghai'],
        description: 'Explorez l\'écosystème tech chinois et visitez les sièges de Tencent, Alibaba.',
        price: 'À partir de 2 400€'
      }
    ]
  },
  {
    id: 'secrets',
    title: 'Routes Secrètes',
    description: 'Hors des sentiers battus',
    image: images.inspirations.secrets,
    itineraries: [
      {
        title: 'Villages Hakka du Fujian',
        duration: '9 jours',
        highlights: ['Tulou', 'Yongding', 'Nanjing'],
        description: 'Découvrez l\'architecture unique des maisons rondes Hakka.',
        price: 'À partir de 2 100€'
      },
      {
        title: 'Minorités du Yunnan',
        duration: '12 jours',
        highlights: ['Kunming', 'Dali', 'Lijiang', 'Shangri-La'],
        description: 'Rencontrez les 25 minorités ethniques du Yunnan.',
        price: 'À partir de 2 700€'
      }
    ]
  },
  {
    id: 'famille',
    title: 'Voyage Familial',
    description: 'Des aventures pour petits et grands',
    image: images.inspirations.famille,
    itineraries: [
      {
        title: 'Pandas & Merveilles',
        duration: '10 jours',
        highlights: ['Chengdu', 'Xi\'an', 'Pékin'],
        description: 'Rencontrez les pandas géants et explorez la Grande Muraille en famille.',
        price: 'À partir de 2 400€'
      },
      {
        title: 'Aventure à Shanghai',
        duration: '6 jours',
        highlights: ['Shanghai', 'Suzhou'],
        description: 'Gratte-ciels, parcs d\'attractions et jardins traditionnels.',
        price: 'À partir de 1 600€'
      }
    ]
  }
];

export default function Inspirations() {
  const [selectedCategory, setSelectedCategory] = useState('gastronomie');

  const currentCategory = inspirationCategories.find(cat => cat.id === selectedCategory);

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
          <div className="flex flex-wrap justify-center gap-4">
            {inspirationCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-700'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentCategory && (
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
                        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                          Personnaliser
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-600 mb-6">
                  Tous nos voyages sont entièrement personnalisables selon vos envies
                </p>
                <a
                  href="/custom-travel"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
                >
                  Créer mon voyage sur mesure
                </a>
              </div>
            </>
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