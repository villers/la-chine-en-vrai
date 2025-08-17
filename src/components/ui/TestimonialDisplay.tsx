'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchTestimonials } from '@/lib/features/testimonials/testimonialsSlice';
import { images } from '@/lib/data/images';

export default function TestimonialDisplay() {
  const dispatch = useAppDispatch();
  const { testimonials, loading, error } = useAppSelector(state => state.testimonials);

  useEffect(() => {
    dispatch(fetchTestimonials(6));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-20 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Erreur lors du chargement des témoignages</p>
        <button
          onClick={() => dispatch(fetchTestimonials(6))}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Aucun témoignage disponible pour le moment.</p>
      </div>
    );
  }

  const getAvatarImage = (index: number) => {
    const avatarKeys = Object.keys(images.avatars);
    return images.avatars[avatarKeys[index % avatarKeys.length] as keyof typeof images.avatars];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <div key={testimonial.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              {testimonial.isVerified && (
                <div className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Vérifié
                </div>
              )}
            </div>
            
            <blockquote className="text-gray-700 mb-6 italic leading-relaxed text-lg">
              "{testimonial.text}"
            </blockquote>
            
            <div className="flex items-center pt-4 border-t border-gray-100">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                <Image
                  src={getAvatarImage(index)}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.location}</div>
                {testimonial.travelType && (
                  <div className="text-sm text-red-600 mt-1">{testimonial.travelType}</div>
                )}
                {testimonial.travelDate && (
                  <div className="text-xs text-gray-500 mt-1">
                    Voyage en {new Date(testimonial.travelDate).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}