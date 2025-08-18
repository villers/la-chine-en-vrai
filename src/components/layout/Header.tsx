'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Fonction pour déterminer si un lien est actif
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Fonction pour obtenir les classes CSS d'un lien
  const getLinkClasses = (path: string) => {
    // Style uniforme pour tous les liens
    return isActive(path)
      ? 'px-3 py-2 text-sm font-medium transition-colors text-red-600 font-semibold relative after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-red-600'
      : 'px-3 py-2 text-sm font-medium transition-colors text-gray-700 hover:text-red-600';
  };

  // Fonction pour les classes mobile
  const getMobileLinkClasses = (path: string) => {
    // Style uniforme pour mobile aussi
    return isActive(path)
      ? 'block px-3 py-2 text-base font-medium text-red-600 font-semibold bg-red-50 rounded'
      : 'block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded';
  };

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
              <Link href="/" className={getLinkClasses('/')}>
                Accueil
              </Link>
              <Link href="/about" className={getLinkClasses('/about')}>
                À propos
              </Link>
              <Link href="/inspirations" className={getLinkClasses('/inspirations')}>
                Inspirations
              </Link>
              <Link href="/custom-travel" className={getLinkClasses('/custom-travel')}>
                Voyage sur mesure
              </Link>
              <Link href="/blog" className={getLinkClasses('/blog')}>
                Blog
              </Link>
              <Link href="/testimonials" className={getLinkClasses('/testimonials')}>
                Témoignages
              </Link>
              <Link href="/contact" className={getLinkClasses('/contact')}>
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
              <Link href="/" className={getMobileLinkClasses('/')}>
                Accueil
              </Link>
              <Link href="/about" className={getMobileLinkClasses('/about')}>
                À propos
              </Link>
              <Link href="/inspirations" className={getMobileLinkClasses('/inspirations')}>
                Inspirations
              </Link>
              <Link href="/custom-travel" className={getMobileLinkClasses('/custom-travel')}>
                Voyage sur mesure
              </Link>
              <Link href="/blog" className={getMobileLinkClasses('/blog')}>
                Blog
              </Link>
              <Link href="/testimonials" className={getMobileLinkClasses('/testimonials')}>
                Témoignages
              </Link>
              <Link href="/contact" className={getMobileLinkClasses('/contact')}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}