import Link from 'next/link';
import NewsletterForm from '@/components/forms/NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-red-400 mb-4">中国之旅</h3>
            <p className="text-gray-300 text-sm">
              Votre spécialiste des voyages sur mesure en Chine. 
              Découvrez l'Empire du Milieu avec nos experts passionnés.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-red-400 transition-colors">Accueil</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-red-400 transition-colors">À propos</Link></li>
              <li><Link href="/inspirations" className="text-gray-300 hover:text-red-400 transition-colors">Inspirations</Link></li>
              <li><Link href="/custom-travel" className="text-gray-300 hover:text-red-400 transition-colors">Voyage sur mesure</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-300 hover:text-red-400 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-red-400 transition-colors">Contact</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-red-400 transition-colors">Conditions générales</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-red-400 transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 text-sm mb-4">
              Recevez nos conseils et inspirations pour votre prochain voyage en Chine.
            </p>
            <NewsletterForm inline={false} />
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 中国之旅. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}