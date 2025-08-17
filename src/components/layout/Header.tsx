'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-red-700">
              中国之旅
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-700 px-3 py-2 text-sm font-medium transition-colors">
                Accueil
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-700 px-3 py-2 text-sm font-medium transition-colors">
                À propos
              </Link>
              <Link href="/inspirations" className="text-gray-700 hover:text-red-700 px-3 py-2 text-sm font-medium transition-colors">
                Inspirations
              </Link>
              <Link href="/custom-travel" className="bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-800 transition-colors">
                Voyage sur mesure
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-red-700 px-3 py-2 text-sm font-medium transition-colors">
                Blog
              </Link>
              <Link href="/testimonials" className="text-gray-700 hover:text-red-700 px-3 py-2 text-sm font-medium transition-colors">
                Témoignages
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-700 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-700 focus:outline-none focus:text-red-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="text-gray-700 hover:text-red-700 block px-3 py-2 text-base font-medium">
                Accueil
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-700 block px-3 py-2 text-base font-medium">
                À propos
              </Link>
              <Link href="/inspirations" className="text-gray-700 hover:text-red-700 block px-3 py-2 text-base font-medium">
                Inspirations
              </Link>
              <Link href="/custom-travel" className="bg-red-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                Voyage sur mesure
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-red-700 block px-3 py-2 text-base font-medium">
                Blog
              </Link>
              <Link href="/testimonials" className="text-gray-700 hover:text-red-700 block px-3 py-2 text-base font-medium">
                Témoignages
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-700 block px-3 py-2 text-base font-medium">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}