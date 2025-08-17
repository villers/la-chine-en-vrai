import Image from 'next/image';
import { images } from '@/lib/data/images';

export default function About() {
  return (
    <div>
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">À propos de nous</h1>
          <p className="text-xl text-red-100">
            Votre passerelle vers l'authenticité chinoise
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre Vision
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Depuis plus de 10 ans, nous nous passionnons pour la Chine et sa richesse culturelle extraordinaire. 
                Notre mission est de vous faire découvrir le véritable visage de l'Empire du Milieu, 
                au-delà des clichés et des circuits touristiques traditionnels.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Nous croyons que chaque voyage doit être une expérience transformatrice, 
                une rencontre authentique avec une culture millénaire qui continue d'évoluer 
                et de surprendre le monde entier.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={images.decorative.temple}
                alt="Temple traditionnel chinois"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-4xl font-bold mb-2">中国之旅</div>
                <div className="text-lg">Découvrez la Chine authentique</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Authenticité</h3>
              <p className="text-gray-600">
                Nous privilégions les expériences locales authentiques, 
                loin du tourisme de masse, pour vous faire vivre la vraie Chine.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expertise</h3>
              <p className="text-gray-600">
                Notre équipe de spécialistes vit ou a vécu en Chine, 
                garantissant une connaissance approfondie du pays et de sa culture.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                Chaque détail compte. Nous nous engageons à vous offrir 
                un service irréprochable pour un voyage parfaitement orchestré.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Expertise Chinoise
            </h2>
            <p className="text-xl text-gray-600">
              Une connaissance approfondie forgée par l'expérience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                🏮 Culture & Traditions
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Festivals traditionnels et célébrations locales</li>
                <li>• Art de la calligraphie et peinture chinoise</li>
                <li>• Philosophies et spiritualités anciennes</li>
                <li>• Architecture traditionnelle et jardins</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                🥢 Gastronomie
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Cuisines régionales authentiques</li>
                <li>• Marchés locaux et street food</li>
                <li>• Cours de cuisine avec des chefs locaux</li>
                <li>• Cérémonie du thé traditionnelle</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                🏔️ Géographie & Nature
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Montagnes sacrées et paysages spectaculaires</li>
                <li>• Parcs nationaux et réserves naturelles</li>
                <li>• Rivières et lacs légendaires</li>
                <li>• Biodiversité unique (pandas, etc.)</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                🏙️ Modernité
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Mégalopoles et architecture futuriste</li>
                <li>• Innovation technologique et startups</li>
                <li>• Art contemporain et scène culturelle</li>
                <li>• Économie et business en Chine</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Prêt à découvrir la vraie Chine ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Laissez-nous créer ensemble votre voyage sur mesure
          </p>
          <a
            href="/custom-travel"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            Créer mon voyage personnalisé
          </a>
        </div>
      </section>
    </div>
  );
}