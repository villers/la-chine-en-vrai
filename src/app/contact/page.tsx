import ContactForm from '@/components/forms/ContactForm';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact</h1>
          <p className="text-xl text-red-100">
            Nos experts sont là pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contactez-nous
              </h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Informations pratiques
              </h2>

              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Adresse</h3>
                      <p className="text-gray-600">
                        123 Avenue de Chine<br />
                        75001 Paris, France
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Téléphone</h3>
                      <p className="text-gray-600">
                        +33 1 23 45 67 89<br />
                        Lun-Ven : 9h-18h<br />
                        Sam : 9h-17h
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                      <p className="text-gray-600">
                        contact@chine-en-vrai.fr<br />
                        Réponse sous 24h
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Urgence voyage</h3>
                      <p className="text-gray-600">
                        +33 6 12 34 56 78<br />
                        24h/24 pendant votre voyage<br />
                        (uniquement pour nos clients)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Quel est le délai pour organiser un voyage ?
                </h3>
                <p className="text-gray-600">
                  Nous recommandons un délai minimum de 6 semaines pour un voyage sur mesure. 
                  Cependant, nous pouvons organiser des voyages en urgence selon les disponibilités.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Proposez-vous des voyages en groupe ?
                </h3>
                <p className="text-gray-600">
                  Oui, nous organisons des voyages pour tous types de groupes : 
                  familles, amis, entreprises, associations. Contactez-nous pour un devis personnalisé.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Quelles sont vos conditions d'annulation ?
                </h3>
                <p className="text-gray-600">
                  Nos conditions varient selon le type de voyage et la date de départ. 
                  Nous proposons également des assurances annulation pour plus de sérénité.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Parlez-vous chinois ?
                </h3>
                <p className="text-gray-600">
                  Oui, notre équipe comprend des experts parlant couramment chinois. 
                  Nos guides locaux sont tous francophones ou anglophones.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Aidez-vous pour les formalités visa ?
                </h3>
                <p className="text-gray-600">
                  Absolument ! Nous vous accompagnons dans toutes les démarches : 
                  visa, assurances, conseils santé et vaccination.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Que se passe-t-il en cas de problème sur place ?
                </h3>
                <p className="text-gray-600">
                  Notre équipe locale et notre service d'urgence 24h/24 sont là 
                  pour résoudre tout problème durant votre voyage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Prêt à partir ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Créez votre voyage sur mesure en quelques clics
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