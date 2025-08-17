'use client';

import { useState } from 'react';
import { seedTestimonials } from '@/lib/firebase/seedData';

export default function AdminPage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string>('');

  const handleSeedData = async () => {
    setIsSeeding(true);
    setSeedResult('');
    
    try {
      await seedTestimonials();
      setSeedResult('✅ Données de test ajoutées avec succès !');
    } catch (error) {
      setSeedResult('❌ Erreur lors de l\'ajout des données : ' + (error as Error).message);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            🔧 Administration - Développement
          </h1>

          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">
                ⚠️ Page d'administration de développement
              </h2>
              <p className="text-yellow-700">
                Cette page est destinée au développement local uniquement. 
                Elle ne devrait pas être accessible en production.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Firebase Emulator
              </h3>
              <p className="text-blue-700 mb-4">
                Pour utiliser l'émulateur Firebase, exécutez dans un terminal séparé :
              </p>
              <code className="bg-blue-100 text-blue-800 px-3 py-2 rounded block">
                firebase emulators:start
              </code>
              <p className="text-blue-700 mt-2 text-sm">
                L'interface d'administration sera disponible sur http://localhost:4000
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-900 mb-4">
                Données de test
              </h3>
              <p className="text-green-700 mb-4">
                Ajoutez des témoignages de démonstration à la base de données locale :
              </p>
              
              <button
                onClick={handleSeedData}
                disabled={isSeeding}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSeeding ? 'Ajout en cours...' : 'Ajouter des données de test'}
              </button>

              {seedResult && (
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm">{seedResult}</p>
                </div>
              )}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Liens utiles
              </h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="http://localhost:4000" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    📊 Firebase Emulator UI
                  </a>
                </li>
                <li>
                  <a 
                    href="/testimonials" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    💬 Page des témoignages
                  </a>
                </li>
                <li>
                  <a 
                    href="/custom-travel" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    ✈️ Formulaire de voyage
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-900 mb-4">
                🔒 Sécurité
              </h3>
              <p className="text-red-700">
                Cette page doit être supprimée ou protégée avant le déploiement en production.
                Elle expose des fonctionnalités d'administration qui ne doivent pas être accessibles publiquement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}