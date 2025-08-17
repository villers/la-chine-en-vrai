import TravelForm from '@/components/forms/TravelForm';

export default function CustomTravel() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Voyage sur mesure</h1>
          <p className="text-xl text-red-100">
            Concevons ensemble votre voyage idéal en Chine
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TravelForm />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Exprimez vos envies</h3>
              <p className="text-gray-600">
                Remplissez notre formulaire détaillé pour nous faire part de vos souhaits, contraintes et rêves de voyage.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Nous concevons</h3>
              <p className="text-gray-600">
                Nos experts créent un itinéraire personnalisé adapté à vos goûts, votre budget et vos dates.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vous partez</h3>
              <p className="text-gray-600">
                Une fois le programme validé, nous nous occupons de tout et vous accompagnons durant votre voyage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}