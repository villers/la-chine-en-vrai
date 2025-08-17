import Hero from '@/components/ui/Hero';
import Card from '@/components/ui/Card';
import TestimonialDisplay from '@/components/ui/TestimonialDisplay';
import { images } from '@/lib/data/images';

export default function Home() {
  return (
    <div>
      <Hero
        title="Découvrez la Chine Authentique"
        subtitle="Voyages sur mesure conçus par nos experts passionnés de l'Empire du Milieu"
        ctaText="Créer mon voyage personnalisé"
        ctaLink="/custom-travel"
        backgroundImage={images.hero.main}
      />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir nos voyages ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expertise unique pour vous faire vivre la Chine comme un local
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="Expertise Locale"
              description="Plus de 10 ans d'expérience en Chine avec des guides locaux passionnés qui connaissent chaque recoin de l'Empire du Milieu."
              image={images.decorative.chineseArt}
            />
            <Card
              title="Sur Mesure"
              description="Chaque voyage est unique, conçu selon vos envies, votre budget et vos centres d'intérêt pour une expérience inoubliable."
              image={images.decorative.calligraphy}
            />
            <Card
              title="Accompagnement 24/7"
              description="Support complet avant, pendant et après votre voyage. Notre équipe reste disponible pour vous accompagner."
              image={images.decorative.temple}
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos inspirations de voyages
            </h2>
            <p className="text-xl text-gray-600">
              Quelques idées pour votre prochaine aventure chinoise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              title="Gastronomie & Saveurs"
              description="Découvrez les cuisines régionales authentiques, des marchés de rue aux restaurants étoilés."
              image={images.inspirations.gastronomie}
              link="/inspirations#gastronomie"
              ctaText="Explorer"
            />
            <Card
              title="Culture & Traditions"
              description="Immergez-vous dans l'art, la calligraphie, les temples et les festivals traditionnels."
              image={images.inspirations.culture}
              link="/inspirations#culture"
              ctaText="Découvrir"
            />
            <Card
              title="Nature & Paysages"
              description="Des rizières de Guilin aux montagnes du Tibet, explorez la diversité naturelle chinoise."
              image={images.inspirations.nature}
              link="/inspirations#nature"
              ctaText="Explorer"
            />
            <Card
              title="Grandes Métropoles"
              description="Shanghai, Pékin, Shenzhen : plongez dans la modernité et l'effervescence urbaine."
              image={images.inspirations.villes}
              link="/inspirations#villes"
              ctaText="Découvrir"
            />
            <Card
              title="Routes Secrètes"
              description="Sortez des sentiers battus et découvrez la Chine hors des circuits touristiques."
              image={images.inspirations.secrets}
              link="/inspirations#secrets"
              ctaText="Explorer"
            />
            <Card
              title="Voyage Familial"
              description="Des expériences adaptées à toute la famille pour découvrir la Chine ensemble."
              image={images.inspirations.famille}
              link="/inspirations#famille"
              ctaText="Planifier"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos voyageurs
            </h2>
            <p className="text-xl text-gray-600">
              Des expériences qui marquent une vie
            </p>
          </div>

          <TestimonialDisplay />
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt pour votre aventure chinoise ?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Contactez nos experts pour créer ensemble le voyage de vos rêves
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/custom-travel"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Créer mon voyage
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
