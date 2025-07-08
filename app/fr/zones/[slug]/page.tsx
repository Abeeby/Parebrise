import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Types
interface PageProps {
  params: {
    slug: string;
  };
}

// Génération statique des routes
export async function generateStaticParams() {
  const pages = ['pare-brise-carouge'];
  return pages.map(slug => ({ slug }));
}

// Génération des métadonnées
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const titles: Record<string, string> = {
    'pare-brise-carouge': 'Remplacement et Réparation de Pare-brise à Carouge'
  };
  
  const title = titles[params.slug] || 'PareBrise Genève Pro';
  
  return {
    title,
    description: `Service professionnel de ${title.toLowerCase()}`,
  };
}

export default function LocalZonePage({ params }: PageProps) {
  if (params.slug !== 'pare-brise-carouge') {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">
            Remplacement et Réparation de Pare-brise à Carouge
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Service professionnel de pare-brise pour les habitants de Carouge. 
            Intervention rapide, prix compétitifs et garantie constructeur.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="tel:0221234567" className="btn-primary">
              📞 Appeler maintenant
            </a>
            <a href="#contact" className="btn-secondary">
              📅 Prendre rendez-vous
            </a>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-white py-6 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <span className="text-2xl font-bold text-blue-600">30 min</span>
              <p className="text-sm text-slate-600">Délai d&apos;intervention</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-green-600">24/7</span>
              <p className="text-sm text-slate-600">Service urgence</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-blue-600">4.8/5</span>
              <p className="text-sm text-slate-600">Note clients</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-green-600">100%</span>
              <p className="text-sm text-slate-600">Agréé assurances</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Services disponibles à Carouge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">🚗 Remplacement express</h3>
              <p className="text-slate-600 mb-4">
                Remplacement complet de votre pare-brise en moins d&apos;une heure
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Verre de qualité OEM certifié constructeur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Installation par techniciens certifiés</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Garantie à vie sur l&apos;installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Nettoyage complet du véhicule inclus</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-semibold text-blue-800">Prix dès CHF 450.-</p>
              </div>
            </div>

            <div className="card p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-green-600">🔧 Réparation économique</h3>
              <p className="text-slate-600 mb-4">
                Réparation d&apos;impacts et fissures sans remplacement
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Intervention en 30 minutes seulement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Résine haute performance invisible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Évite la propagation des fissures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Sans franchise avec la plupart des assurances</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-semibold text-green-800">Prix dès CHF 80.-</p>
              </div>
            </div>

            <div className="card p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-purple-600">📡 Calibrage high-tech</h3>
              <p className="text-slate-600 mb-4">
                Recalibrage des systèmes ADAS après remplacement
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Équipement de calibrage dernière génération</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Techniciens formés constructeur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Rapport de calibrage détaillé</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Test de validation sur route</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-semibold text-purple-800">Prix dès CHF 200.-</p>
              </div>
            </div>

            <div className="card p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-orange-600">🏠 Service à domicile</h3>
              <p className="text-slate-600 mb-4">
                Intervention directement chez vous ou au bureau
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Camion-atelier entièrement équipé</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Pas de frais de déplacement à Carouge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Intervention même en parking souterrain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Horaires flexibles 7j/7</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                <p className="text-sm font-semibold text-orange-800">Sans supplément</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 bg-gray-50" id="contact">
        <div className="container mx-auto px-4 max-w-2xl">
          <h3 className="text-2xl font-bold mb-6 text-center">Demande de rendez-vous</h3>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <form className="space-y-4">
              <input type="text" placeholder="Nom complet" className="form-input" />
              <input type="tel" placeholder="Téléphone" className="form-input" />
              <input type="email" placeholder="Email" className="form-input" />
              <select className="form-input">
                <option>Type de service</option>
                <option>Remplacement pare-brise</option>
                <option>Réparation impact</option>
                <option>Vitre latérale</option>
                <option>Lunette arrière</option>
                <option>Calibrage ADAS</option>
              </select>
              <textarea placeholder="Message (optionnel)" className="form-input" rows={3}></textarea>
              <button type="submit" className="btn-primary w-full">
                Envoyer la demande
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Zone Coverage Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Notre zone d&apos;intervention à Carouge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-100 rounded-lg p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl">🗺️</span>
                  <p className="mt-4 text-slate-600">Carte interactive bientôt disponible</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quartiers desservis</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { name: 'Carouge Centre', time: '15 min', urgent: true },
                  { name: 'Vieux-Carouge', time: '15 min', urgent: true },
                  { name: 'Les Acacias', time: '20 min', urgent: true },
                  { name: 'La Praille', time: '25 min', urgent: false },
                  { name: 'Rondeau de Carouge', time: '15 min', urgent: true },
                  { name: 'Pinchat', time: '30 min', urgent: false },
                ].map((zone) => (
                  <div key={zone.name} className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-semibold text-sm">{zone.name}</p>
                    <p className="text-xs text-slate-600">{zone.time}</p>
                    {zone.urgent && <span className="text-xs text-green-600">✓ Urgence 24/7</span>}
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📍 Atelier principal</h4>
                <p className="text-sm text-slate-600">
                  Route de Veyrier 123<br />
                  1227 Carouge<br />
                  <span className="font-semibold">Parking gratuit disponible</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eco-Friendly Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">🌱 Engagement écologique</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-3">♻️</div>
                <h3 className="font-semibold mb-2">100% Recyclage</h3>
                <p className="text-sm text-gray-600">
                  Tous les pare-brises remplacés sont recyclés
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-3">🚗</div>
                <h3 className="font-semibold mb-2">Flotte électrique</h3>
                <p className="text-sm text-gray-600">
                  50% de nos véhicules sont électriques
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl mb-3">🌳</div>
                <h3 className="font-semibold mb-2">1 arbre planté</h3>
                <p className="text-sm text-gray-600">
                  Pour chaque pare-brise remplacé
                </p>
              </div>
            </div>
            <div className="mt-8 bg-green-100 rounded-lg p-4 inline-block">
              <p className="text-green-800 font-semibold">
                🌍 Déjà 2,847 arbres plantés cette année!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Portal Access */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">🔐 Espace client sécurisé</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Historique complet des interventions</li>
                    <li>• Factures téléchargeables</li>
                    <li>• Garanties actives</li>
                    <li>• Photos avant/après</li>
                    <li>• Rappels d&apos;entretien</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <input type="email" placeholder="Email" className="form-input mb-3" />
                    <input type="password" placeholder="Mot de passe" className="form-input mb-4" />
                    <button className="btn-primary w-full">
                      Se connecter
                    </button>
                    <p className="text-sm text-gray-600 mt-3">
                      Pas encore de compte? 
                      <a href="#" className="text-blue-600"> Créer un compte</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Offres spéciales Carouge</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-blue-200">
              <div className="text-center mb-4">
                <span className="text-4xl">🎁</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Première visite</h3>
              <p className="text-center text-2xl font-bold text-blue-600 mb-2">-10%</p>
              <p className="text-sm text-slate-600 text-center">
                Sur tous nos services pour les nouveaux clients de Carouge
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-green-200">
              <div className="text-center mb-4">
                <span className="text-4xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Parrainage</h3>
              <p className="text-center text-2xl font-bold text-green-600 mb-2">CHF 50.-</p>
              <p className="text-sm text-slate-600 text-center">
                Offerts pour vous et votre filleul
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-purple-200">
              <div className="text-center mb-4">
                <span className="text-4xl">🚗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Flotte entreprise</h3>
              <p className="text-center text-2xl font-bold text-purple-600 mb-2">-20%</p>
              <p className="text-sm text-slate-600 text-center">
                Tarifs préférentiels dès 3 véhicules
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Intervention rapide à Carouge</h2>
          <p className="text-xl mb-8 opacity-90">
            Nos techniciens peuvent intervenir en moins de 30 minutes
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:0221234567" className="btn-primary bg-white text-slate-800 hover:bg-gray-100 text-lg">
              📞 022 123 45 67
            </a>
            <a href="tel:0794567890" className="btn-primary bg-red-600 hover:bg-red-700 text-lg">
              🚨 079 456 78 90 (Urgence)
            </a>
            <a href="/fr" className="btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-slate-800 text-lg">
              ← Retour à l&apos;accueil
            </a>
          </div>
          <div className="mt-8 flex justify-center gap-6 text-sm opacity-80">
            <span>✓ Devis gratuit</span>
            <span>✓ Sans engagement</span>
            <span>✓ Prix transparents</span>
          </div>
        </div>
      </section>
    </>
  );
}