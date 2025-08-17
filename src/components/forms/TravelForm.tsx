'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  updateFormData,
  updatePersonalInfo,
  nextStep,
  previousStep,
  submitTravelForm,
  resetForm,
  clearSubmitStatus,
} from '@/lib/features/travelForm/travelFormSlice';

const destinations = [
  'Pékin', 'Shanghai', 'Xi\'an', 'Guilin', 'Chengdu', 'Lhassa', 'Canton', 'Hangzhou',
  'Suzhou', 'Lijiang', 'Dali', 'Yangshuo', 'Pingyao', 'Zhangjiajie', 'Huangshan'
];

const travelTypes = [
  'Culture & Histoire', 'Gastronomie', 'Nature & Paysages', 'Aventure', 'Détente & Spa',
  'Business', 'Photographie', 'Spiritualité', 'Art & Artisanat', 'Architecture'
];

const interests = [
  'Temples & Monuments', 'Cuisine locale', 'Marchés traditionnels', 'Calligraphie',
  'Arts martiaux', 'Médecine traditionnelle', 'Festivals', 'Jardins', 'Musées',
  'Vie nocturne', 'Shopping', 'Randonnée', 'Photographie', 'Rencontres locales'
];

export default function TravelForm() {
  const dispatch = useAppDispatch();
  const { formData, currentStep, isSubmitting, submitStatus, submitMessage } = useAppSelector(
    (state) => state.travelForm
  );

  const handleDestinationChange = (destination: string) => {
    const updatedDestinations = formData.destination.includes(destination)
      ? formData.destination.filter(d => d !== destination)
      : [...formData.destination, destination];
    dispatch(updateFormData({ destination: updatedDestinations }));
  };

  const handleTravelTypeChange = (type: string) => {
    const updatedTypes = formData.travelType.includes(type)
      ? formData.travelType.filter(t => t !== type)
      : [...formData.travelType, type];
    dispatch(updateFormData({ travelType: updatedTypes }));
  };

  const handleInterestChange = (interest: string) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    dispatch(updateFormData({ interests: updatedInterests }));
  };

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitTravelForm(formData));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Quelles destinations vous intéressent ?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {destinations.map((destination) => (
                <label key={destination} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.destination.includes(destination)}
                    onChange={() => handleDestinationChange(destination)}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-gray-700">{destination}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Quel type de voyage souhaitez-vous ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {travelTypes.map((type) => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.travelType.includes(type)}
                    onChange={() => handleTravelTypeChange(type)}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Détails de votre voyage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (par personne)
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => dispatch(updateFormData({ budget: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Sélectionnez un budget</option>
                  <option value="1000-2000">1 000€ - 2 000€</option>
                  <option value="2000-3000">2 000€ - 3 000€</option>
                  <option value="3000-4000">3 000€ - 4 000€</option>
                  <option value="4000+">Plus de 4 000€</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée du voyage
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => dispatch(updateFormData({ duration: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Sélectionnez une durée</option>
                  <option value="3-5">3-5 jours</option>
                  <option value="6-10">6-10 jours</option>
                  <option value="11-15">11-15 jours</option>
                  <option value="16+">Plus de 16 jours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de voyageurs
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.travelers}
                  onChange={(e) => dispatch(updateFormData({ travelers: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hébergement préféré
                </label>
                <select
                  value={formData.accommodation}
                  onChange={(e) => dispatch(updateFormData({ accommodation: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="luxury">Hôtels de luxe</option>
                  <option value="boutique">Hôtels boutique</option>
                  <option value="standard">Hôtels standards</option>
                  <option value="traditional">Hébergements traditionnels</option>
                  <option value="mixed">Mélange</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Quels sont vos centres d'intérêt ?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interests.map((interest) => (
                <label key={interest} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Vos coordonnées
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.firstName}
                  onChange={(e) => dispatch(updatePersonalInfo({ firstName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.lastName}
                  onChange={(e) => dispatch(updatePersonalInfo({ lastName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.personalInfo.email}
                  onChange={(e) => dispatch(updatePersonalInfo({ email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => dispatch(updatePersonalInfo({ phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (demandes spéciales, questions...)
              </label>
              <textarea
                rows={4}
                value={formData.personalInfo.message}
                onChange={(e) => dispatch(updatePersonalInfo({ message: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Décrivez vos envies, contraintes ou questions particulières..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {submitMessage}
        </div>
        <button
          onClick={() => {
            dispatch(resetForm());
            dispatch(clearSubmitStatus());
          }}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Créer un nouveau voyage
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Créez votre voyage sur mesure</h1>
          <span className="text-sm text-gray-600">Étape {currentStep} sur 5</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-red-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        {renderStep()}

        {submitStatus === 'error' && (
          <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {submitMessage}
          </div>
        )}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Précédent
            </button>
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}