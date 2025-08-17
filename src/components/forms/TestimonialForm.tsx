'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { submitTestimonial, clearSubmitStatus } from '@/lib/features/testimonials/testimonialsSlice';

interface TestimonialFormData {
  name: string;
  location: string;
  text: string;
  rating: number;
  travelType: string;
  travelDate: string;
}

const travelTypes = [
  'Culture & Histoire',
  'Gastronomie',
  'Nature & Paysages',
  'Aventure',
  'Détente & Spa',
  'Business',
  'Voyage familial',
  'Voyage romantique',
  'Circuit sur mesure',
  'Autre'
];

export default function TestimonialForm() {
  const dispatch = useAppDispatch();
  const { submitting, submitStatus, submitMessage } = useAppSelector(state => state.testimonials);

  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    location: '',
    text: '',
    rating: 5,
    travelType: '',
    travelDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.text || !formData.travelType) {
      return;
    }

    dispatch(submitTestimonial(formData));
  };

  const handleReset = () => {
    setFormData({
      name: '',
      location: '',
      text: '',
      rating: 5,
      travelType: '',
      travelDate: '',
    });
    dispatch(clearSubmitStatus());
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {submitMessage}
        </div>
        <button
          onClick={handleReset}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Laisser un autre témoignage
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Partagez votre expérience
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Votre nom et prénom"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Ville de résidence *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Paris, Lyon, Marseille..."
          />
        </div>

        <div>
          <label htmlFor="travelType" className="block text-sm font-medium text-gray-700 mb-2">
            Type de voyage *
          </label>
          <select
            id="travelType"
            name="travelType"
            required
            value={formData.travelType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Sélectionnez le type de voyage</option>
            {travelTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700 mb-2">
            Date de voyage
          </label>
          <input
            type="month"
            id="travelDate"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
          Note globale *
        </label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
              className={`text-2xl ${
                star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
              } hover:text-yellow-400 transition-colors`}
            >
              ★
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {formData.rating}/5 étoiles
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
          Votre témoignage *
        </label>
        <textarea
          id="text"
          name="text"
          rows={6}
          required
          value={formData.text}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Racontez-nous votre expérience : ce qui vous a marqué, surpris, ému... Vos conseils pour futurs voyageurs sont également les bienvenus !"
        />
        <p className="text-sm text-gray-500 mt-1">
          Minimum 50 caractères ({formData.text.length}/50)
        </p>
      </div>

      {submitStatus === 'error' && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {submitMessage}
        </div>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={submitting || formData.text.length < 50}
          className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Envoi en cours...' : 'Publier mon témoignage'}
        </button>
        <p className="text-sm text-gray-500 mt-3">
          Votre témoignage sera modéré avant publication
        </p>
      </div>
    </form>
  );
}