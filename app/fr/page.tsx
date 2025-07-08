'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamic imports for client components
const WeatherAlert = dynamic(() => import('@/components/WeatherAlert'), { ssr: false })
const PriceEstimator = dynamic(() => import('@/components/PriceEstimator'), { ssr: false })
const VideoConsultation = dynamic(() => import('@/components/VideoConsultation'), { ssr: false })
const LoyaltyCard = dynamic(() => import('@/components/LoyaltyCard'), { ssr: false })
const PriceComparison = dynamic(() => import('@/components/PriceComparison'), { ssr: false })

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
      {/* Weather Alert */}
      <WeatherAlert />
      
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

      {/* Innovative Services Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Services innovants 🚀</h2>
          <p className="text-center text-gray-600 mb-12">
            Première entreprise en Suisse avec ces technologies
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PriceEstimator />
            <VideoConsultation />
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

      {/* Price Comparison */}
      <PriceComparison />

      {/* Digital Warranty Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">🔐 Garantie digitale blockchain</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">📱</div>
                  <h3 className="font-semibold mb-2">100% Digital</h3>
                  <p className="text-sm text-gray-600">Votre garantie toujours avec vous sur votre smartphone</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🔗</div>
                  <h3 className="font-semibold mb-2">Infalsifiable</h3>
                  <p className="text-sm text-gray-600">Technologie blockchain pour une sécurité maximale</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">♾️</div>
                  <h3 className="font-semibold mb-2">À vie</h3>
                  <p className="text-sm text-gray-600">Transférable au nouveau propriétaire du véhicule</p>
                </div>
              </div>
              <button className="btn-primary mt-6">
                En savoir plus sur la garantie blockchain
              </button>
            </div>
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

      {/* Real-time Stats */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Statistiques en temps réel</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-blue-400">3</div>
              <p className="text-gray-300">Techniciens disponibles</p>
              <p className="text-green-400 text-sm mt-1">● En ligne</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-purple-400">12</div>
              <p className="text-gray-300">Interventions aujourd&apos;hui</p>
              <p className="text-sm mt-1 text-gray-400">Moyenne: 45 min</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-green-400">98%</div>
              <p className="text-gray-300">Satisfaction du jour</p>
              <p className="text-sm mt-1 text-gray-400">Sur 24 avis</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-orange-400">25min</div>
              <p className="text-gray-300">Délai moyen actuel</p>
              <p className="text-sm mt-1 text-gray-400">Zone: Genève</p>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">🎁 Programme de parrainage VIP</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Gagnez jusqu&apos;à CHF 500.-</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <div>
                        <strong>CHF 50.-</strong> pour vous et votre filleul
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <div>
                        <strong>Bonus x2</strong> après 5 parrainages
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <div>
                        <strong>Statut VIP</strong> après 10 parrainages
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-gray-100 p-8 rounded-lg inline-block">
                    <div className="w-48 h-48 bg-gray-300 mb-4"></div>
                    <p className="text-sm text-gray-600">Votre QR code personnel</p>
                  </div>
                  <button className="btn-primary mt-4">
                    Obtenir mon QR code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">🤖 Assistant IA PareBrise</h2>
                  <p className="mb-6">
                    Notre assistant intelligent répond à toutes vos questions 24/7
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Diagnostic automatique par description</li>
                    <li>• Estimation de prix instantanée</li>
                    <li>• Prise de RDV assistée</li>
                    <li>• Conseils personnalisés</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="bg-white/20 rounded-lg p-3 text-sm">
                      <p className="font-semibold mb-1">Vous:</p>
                      <p>J&apos;ai un impact sur mon pare-brise</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-sm">
                      <p className="font-semibold mb-1">Assistant IA:</p>
                      <p>Je comprends. Pouvez-vous me dire la taille de l&apos;impact? Est-il plus grand qu&apos;une pièce de 2 CHF?</p>
                    </div>
                  </div>
                  <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100 w-full mt-4">
                    Démarrer une conversation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50" id="faq">
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

      {/* Mobile App Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">📱 Application mobile PareBrise Pro</h2>
                <p className="text-gray-600 mb-6">
                  Gérez tout depuis votre smartphone
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="text-green-500">✓</span>
                    <span>Suivi en temps réel de votre réparation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-500">✓</span>
                    <span>Historique complet des interventions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-500">✓</span>
                    <span>Carte de fidélité digitale</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-500">✓</span>
                    <span>Notifications push pour les offres</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-500">✓</span>
                    <span>Paiement sécurisé intégré</span>
                  </li>
                </ul>
                <div className="flex gap-4 mt-6">
                  <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
                    <span>🍎</span> App Store
                  </button>
                  <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2">
                    <span>🤖</span> Google Play
                  </button>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-3xl p-8 inline-block">
                  <div className="w-64 h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-6xl">📱</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Options */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">♿ Accessibilité et personnalisation</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="font-semibold mb-2">Taille du texte</h3>
                <div className="flex gap-2 justify-center">
                  <button className="px-3 py-1 bg-gray-200 rounded text-sm">A</button>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded">A+</button>
                  <button className="px-3 py-1 bg-gray-200 rounded text-lg">A++</button>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">🌓</div>
                <h3 className="font-semibold mb-2">Mode sombre</h3>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm">
                  Activer
                </button>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">🗣️</div>
                <h3 className="font-semibold mb-2">Lecture vocale</h3>
                <button className="px-4 py-2 bg-green-500 text-white rounded-full text-sm">
                  Écouter
                </button>
              </div>
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

      {/* Loyalty Card Widget */}
      <LoyaltyCard />
    </>
  )
}