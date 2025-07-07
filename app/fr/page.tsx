'use client'
import { useState } from 'react'

export default function FrenchHomePage() {
  const [showCalculator, setShowCalculator] = useState(false)
  const [carType, setCarType] = useState('')
  const [glassType, setGlassType] = useState('')
  const [hasADAS, setHasADAS] = useState(false)

  const calculatePrice = () => {
    let basePrice = 0
    if (glassType === 'windshield') basePrice = carType === 'sedan' ? 550 : carType === 'suv' ? 750 : 450
    if (glassType === 'side') basePrice = 250
    if (glassType === 'rear') basePrice = 350
    if (hasADAS) basePrice += 200
    return basePrice
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 text-slate-800">
                PareBrise Genève Pro
              </h1>
              <p className="text-2xl mb-8 text-slate-600">
                Expert en remplacement et réparation de pare-brise depuis 2010
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:0221234567" className="btn-primary">
                  📞 Appel gratuit
                </a>
                <button onClick={() => setShowCalculator(true)} className="btn-secondary">
                  💰 Calculer mon prix
                </button>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="text-green-500">✓</span> Agréé toutes assurances
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="text-green-500">✓</span> Intervention en 2h
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="text-green-500">✓</span> Garantie à vie
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="text-green-500">✓</span> Devis gratuit
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Demande de rappel immédiat</h3>
                <form className="space-y-4">
                  <input type="text" placeholder="Votre nom" className="form-input" />
                  <input type="tel" placeholder="Votre téléphone" className="form-input" />
                  <select className="form-input">
                    <option>Type d&apos;intervention</option>
                    <option>Remplacement pare-brise</option>
                    <option>Réparation impact</option>
                    <option>Vitre latérale</option>
                    <option>Lunette arrière</option>
                  </select>
                  <button type="submit" className="btn-primary w-full">
                    Demander un rappel →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">4.9/5</div>
              <div className="text-sm text-slate-600">500+ avis Google</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">15k+</div>
              <div className="text-sm text-slate-600">Pare-brises remplacés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-slate-600">Service d&apos;urgence</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">2h</div>
              <div className="text-sm text-slate-600">Délai d&apos;intervention</div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-4">Calculateur de prix</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Type de véhicule</label>
                <select className="form-input" value={carType} onChange={(e) => setCarType(e.target.value)}>
                  <option value="">Sélectionnez</option>
                  <option value="compact">Citadine</option>
                  <option value="sedan">Berline</option>
                  <option value="suv">SUV/4x4</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Type de vitre</label>
                <select className="form-input" value={glassType} onChange={(e) => setGlassType(e.target.value)}>
                  <option value="">Sélectionnez</option>
                  <option value="windshield">Pare-brise</option>
                  <option value="side">Vitre latérale</option>
                  <option value="rear">Lunette arrière</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={hasADAS} onChange={(e) => setHasADAS(e.target.checked)} />
                  <span>Véhicule avec ADAS (caméras, capteurs)</span>
                </label>
              </div>
              {carType && glassType && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-600">Prix estimé:</p>
                  <p className="text-3xl font-bold text-blue-600">CHF {calculatePrice()}.-</p>
                  <p className="text-xs text-slate-500 mt-2">*Prix indicatif, devis final sur place</p>
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setShowCalculator(false)} className="btn-secondary flex-1">
                Fermer
              </button>
              <a href="tel:0221234567" className="btn-primary flex-1">
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Services Section */}
      <section className="py-16 bg-gray-50" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Nos Services Complets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold mb-2">Pare-brise</h3>
              <p className="text-slate-600 mb-4">Remplacement complet avec garantie à vie</p>
              <ul className="text-sm text-slate-500 space-y-1">
                <li>• Verre OEM certifié</li>
                <li>• Pose en 45 minutes</li>
                <li>• Nettoyage inclus</li>
              </ul>
            </div>
            <div className="card p-6">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold mb-2">Réparation impact</h3>
              <p className="text-slate-600 mb-4">Réparation invisible en 30 minutes</p>
              <ul className="text-sm text-slate-500 space-y-1">
                <li>• Jusqu&apos;à 3cm de diamètre</li>
                <li>• Résine haute qualité</li>
                <li>• Garantie 5 ans</li>
              </ul>
            </div>
            <div className="card p-6">
              <div className="text-4xl mb-4">📡</div>
              <h3 className="text-xl font-semibold mb-2">Calibrage ADAS</h3>
              <p className="text-slate-600 mb-4">Recalibrage des systèmes d&apos;aide</p>
              <ul className="text-sm text-slate-500 space-y-1">
                <li>• Caméras frontales</li>
                <li>• Capteurs de pluie</li>
                <li>• Lane assist</li>
              </ul>
            </div>
            <div className="card p-6">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Service mobile</h3>
              <p className="text-slate-600 mb-4">Intervention sur site</p>
              <ul className="text-sm text-slate-500 space-y-1">
                <li>• À domicile</li>
                <li>• Au bureau</li>
                <li>• Parking couvert requis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Partners */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Agréé par toutes les assurances</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {['AXA', 'Allianz', 'Zurich', 'Generali', 'Helvetia', 'La Mobilière'].map((insurance) => (
              <div key={insurance} className="text-center">
                <div className="bg-gray-100 rounded-lg p-4 h-20 flex items-center justify-center">
                  <span className="text-xl font-semibold text-slate-600">{insurance}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-slate-600 mb-4">Prise en charge directe avec votre assurance</p>
            <button className="btn-secondary">
              🔍 Vérifier ma couverture
            </button>
          </div>
        </div>
      </section>

      {/* Car Brands */}
      <section className="py-16 bg-gray-50" id="marques">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Toutes marques de véhicules</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {['BMW', 'Mercedes', 'Audi', 'VW', 'Toyota', 'Renault', 'Peugeot', 'Ford', 'Opel', 'Nissan', 'Mazda', 'Honda'].map((brand) => (
              <div key={brand} className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <span className="font-semibold text-slate-700">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Notre processus simple</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-sm text-slate-600">Appelez-nous ou réservez en ligne</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Diagnostic</h3>
              <p className="text-sm text-slate-600">Évaluation gratuite des dégâts</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Intervention</h3>
              <p className="text-sm text-slate-600">Réparation ou remplacement rapide</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Garantie</h3>
              <p className="text-sm text-slate-600">Certificat de garantie remis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ils nous font confiance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-slate-600 mb-4">
                &quot;Service impeccable! Mon pare-brise a été remplacé en moins d&apos;une heure. 
                L&apos;équipe est professionnelle et les prix sont transparents.&quot;
              </p>
              <p className="font-semibold">Marc D.</p>
              <p className="text-sm text-slate-500">BMW X5, Carouge</p>
            </div>
            <div className="card p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-slate-600 mb-4">
                &quot;Réparation d&apos;impact parfaite, on ne voit plus rien! 
                Prise en charge directe avec mon assurance, très pratique.&quot;
              </p>
              <p className="font-semibold">Sophie L.</p>
              <p className="text-sm text-slate-500">Audi A3, Genève</p>
            </div>
            <div className="card p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-slate-600 mb-4">
                &quot;Intervention à domicile très appréciée. Technicien ponctuel 
                et travail soigné. Je recommande vivement!&quot;
              </p>
              <p className="font-semibold">Pierre M.</p>
              <p className="text-sm text-slate-500">Mercedes Classe C, Meyrin</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white" id="faq">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
          <div className="space-y-4">
            <details className="card p-6 cursor-pointer">
              <summary className="font-semibold">Combien de temps prend un remplacement de pare-brise?</summary>
              <p className="mt-4 text-slate-600">
                Un remplacement standard prend entre 45 minutes et 1 heure. 
                Le véhicule doit ensuite rester immobile pendant 1 heure pour le séchage de la colle.
              </p>
            </details>
            <details className="card p-6 cursor-pointer">
              <summary className="font-semibold">Ma franchise d&apos;assurance s&apos;applique-t-elle?</summary>
              <p className="mt-4 text-slate-600">
                Pour une réparation d&apos;impact, la plupart des assurances ne facturent pas de franchise. 
                Pour un remplacement, la franchise s&apos;applique selon votre contrat (généralement CHF 0 à 300).
              </p>
            </details>
            <details className="card p-6 cursor-pointer">
              <summary className="font-semibold">Utilisez-vous des pare-brises d&apos;origine?</summary>
              <p className="mt-4 text-slate-600">
                Oui, nous utilisons exclusivement des verres certifiés OEM (Original Equipment Manufacturer) 
                qui répondent aux normes du constructeur de votre véhicule.
              </p>
            </details>
            <details className="card p-6 cursor-pointer">
              <summary className="font-semibold">Peut-on réparer tous les impacts?</summary>
              <p className="mt-4 text-slate-600">
                Les impacts jusqu&apos;à 3cm de diamètre peuvent généralement être réparés, 
                sauf s&apos;ils sont dans le champ de vision du conducteur ou trop près du bord.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Zones Section */}
      <section className="py-16 bg-gray-50" id="zones">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Intervention rapide dans tout Genève</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <a href="/fr/zones/pare-brise-carouge" className="card p-4 hover:border-blue-500 border-2 border-transparent">
              <h3 className="font-semibold">📍 Carouge</h3>
              <p className="text-sm text-slate-600">30 min</p>
            </a>
            <div className="card p-4 opacity-75">
              <h3 className="font-semibold">📍 Genève Centre</h3>
              <p className="text-sm text-slate-600">20 min</p>
            </div>
            <div className="card p-4 opacity-75">
              <h3 className="font-semibold">📍 Meyrin</h3>
              <p className="text-sm text-slate-600">25 min</p>
            </div>
            <div className="card p-4 opacity-75">
              <h3 className="font-semibold">📍 Lancy</h3>
              <p className="text-sm text-slate-600">30 min</p>
            </div>
            <div className="card p-4 opacity-75">
              <h3 className="font-semibold">📍 Vernier</h3>
              <p className="text-sm text-slate-600">35 min</p>
            </div>
            <div className="card p-4 opacity-75">
              <h3 className="font-semibold">📍 Onex</h3>
              <p className="text-sm text-slate-600">35 min</p>
            </div>
            <div className="card p-4 opacity-75">
              <h3 className="font-semibold">📍 Thônex</h3>
              <p className="text-sm text-slate-600">40 min</p>
            </div>
            <div className="card p-4 opacity-75">
              <h3 className="font-semibold">📍 Plan-les-Ouates</h3>
              <p className="text-sm text-slate-600">35 min</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center" id="devis">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Besoin d&apos;une intervention rapide?</h2>
          <p className="text-xl mb-8">
            Nos experts sont disponibles 7j/7 pour vous dépanner
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:0221234567" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg">
              📞 022 123 45 67
            </a>
            <button className="btn-primary bg-green-500 hover:bg-green-600 text-lg">
              💬 Chat en direct
            </button>
            <button className="btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-lg">
              📅 Prendre RDV
            </button>
          </div>
          <p className="mt-8 text-sm opacity-90">
            Devis gratuit • Sans engagement • Réponse immédiate
          </p>
        </div>
      </section>
    </>
  )
}