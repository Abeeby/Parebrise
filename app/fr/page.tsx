export default function FrenchHomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              PareBrise Genève Pro
            </h1>
            <p className="text-2xl mb-8 opacity-90">
              Service professionnel de remplacement et réparation de pare-brise à Genève et environs
            </p>
            <div className="flex gap-4">
              <a href="tel:0221234567" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                📞 Appeler maintenant
              </a>
              <a href="#devis" className="btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-blue-600">
                Devis gratuit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold mb-2">Remplacement pare-brise</h3>
              <p className="text-gray-600">Toutes marques et modèles</p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold mb-2">Réparation impacts</h3>
              <p className="text-gray-600">Réparation rapide des éclats</p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl mb-4">📡</div>
              <h3 className="text-xl font-semibold mb-2">Calibrage ADAS</h3>
              <p className="text-gray-600">Systèmes d&apos;aide à la conduite</p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Service mobile</h3>
              <p className="text-gray-600">Intervention à domicile</p>
            </div>
          </div>
        </div>
      </section>

      {/* Zones Section */}
      <section className="py-16" id="zones">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Zones d&apos;intervention</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a 
              href="/fr/zones/pare-brise-carouge"
              className="card p-6 hover:border-blue-500 border-2 border-transparent"
            >
              <h3 className="text-2xl font-semibold mb-2">📍 Carouge</h3>
              <p className="text-gray-600">Service rapide à Carouge et environs</p>
              <span className="text-blue-600 font-semibold mt-2 inline-block">En savoir plus →</span>
            </a>
            <div className="card p-6 opacity-60">
              <h3 className="text-2xl font-semibold mb-2">📍 Meyrin</h3>
              <p className="text-gray-600">Bientôt disponible</p>
            </div>
            <div className="card p-6 opacity-60">
              <h3 className="text-2xl font-semibold mb-2">📍 Lancy</h3>
              <p className="text-gray-600">Bientôt disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Pourquoi nous choisir?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Intervention rapide</h3>
              <p className="text-gray-600">Service dans la journée</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Garantie qualité</h3>
              <p className="text-gray-600">Pièces certifiées constructeur</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Prix compétitifs</h3>
              <p className="text-gray-600">Devis gratuit et transparent</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white text-center" id="devis">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Besoin d&apos;un pare-brise?</h2>
          <p className="text-xl mb-8">Contactez-nous dès maintenant pour un devis gratuit</p>
          <div className="flex gap-4 justify-center">
            <a href="tel:0221234567" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg">
              📞 022 123 45 67
            </a>
            <a href="mailto:contact@parebrise-geneve.ch" className="btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-lg">
              ✉️ Email
            </a>
          </div>
        </div>
      </section>
    </>
  )
}