'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { subscribeToNewsletter, setEmail, clearStatus } from '@/lib/features/newsletter/newsletterSlice';

interface NewsletterFormProps {
  className?: string;
  placeholder?: string;
  buttonText?: string;
  inline?: boolean;
}

export default function NewsletterForm({ 
  className = '', 
  placeholder = 'Votre email',
  buttonText = 'S\'abonner',
  inline = true 
}: NewsletterFormProps) {
  const dispatch = useAppDispatch();
  const { email, isSubscribing, subscriptionStatus, message } = useAppSelector(state => state.newsletter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      return;
    }

    dispatch(subscribeToNewsletter(email));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
    if (subscriptionStatus !== 'idle') {
      dispatch(clearStatus());
    }
  };

  if (subscriptionStatus === 'success') {
    return (
      <div className={`${className}`}>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {message}
        </div>
      </div>
    );
  }

  if (inline) {
    return (
      <form onSubmit={handleSubmit} className={`${className}`}>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400"
            required
          />
          <button
            type="submit"
            disabled={isSubscribing || !email}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSubscribing ? 'Envoi...' : buttonText}
          </button>
        </div>
        
        {subscriptionStatus === 'error' && (
          <div className="mt-2 text-red-400 text-sm">
            {message}
          </div>
        )}
      </form>
    );
  }

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubscribing || !email}
          className="w-full bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubscribing ? 'Inscription en cours...' : buttonText}
        </button>
        
        {subscriptionStatus === 'error' && (
          <div className="text-red-600 text-sm">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}