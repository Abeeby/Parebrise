export default function PriceComparison() {
  const competitors = [
    { name: 'PareBrise Genève Pro', price: 450, features: ['✓ Garantie à vie', '✓ Verre OEM', '✓ Service mobile', '✓ Sans franchise'], highlight: true },
    { name: 'Concurrent A', price: 520, features: ['✓ Garantie 2 ans', '✗ Verre aftermarket', '✗ Atelier uniquement', '✓ Sans franchise'], highlight: false },
    { name: 'Concurrent B', price: 480, features: ['✓ Garantie 5 ans', '✓ Verre OEM', '✗ Atelier uniquement', '✗ Franchise 100.-'], highlight: false },
    { name: 'Garage classique', price: 650, features: ['✗ Garantie 1 an', '?? Qualité variable', '✗ Délai 3-5 jours', '✗ Franchise complète'], highlight: false },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Comparaison transparente des prix</h2>
        <p className="text-center text-gray-600 mb-12">
          Nous affichons nos prix en toute transparence
        </p>
        
        <div className="grid md:grid-cols-4 gap-6">
          {competitors.map((company) => (
            <div 
              key={company.name}
              className={`rounded-lg p-6 ${
                company.highlight 
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-500 transform scale-105' 
                  : 'bg-gray-50'
              }`}
            >
              {company.highlight && (
                <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                  MEILLEUR CHOIX
                </div>
              )}
              <h3 className="font-bold text-lg mb-2">{company.name}</h3>
              <div className="text-3xl font-bold mb-4">
                CHF {company.price}.-
              </div>
              <ul className="space-y-2 text-sm">
                {company.features.map((feature, idx) => (
                  <li key={idx} className={feature.includes('✗') ? 'text-red-600' : feature.includes('??') ? 'text-gray-400' : 'text-green-600'}>
                    {feature}
                  </li>
                ))}
              </ul>
              {company.highlight && (
                <button className="btn-primary w-full mt-4">
                  Choisir
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}