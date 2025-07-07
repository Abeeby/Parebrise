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
  // For now, just return Carouge as an example
  const pages = ['pare-brise-carouge'];
  
  return pages.map(slug => ({
    slug
  }));
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

export default async function LocalZonePage({ params }: PageProps) {
  // Simple content for Carouge page
  if (params.slug !== 'pare-brise-carouge') {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Remplacement et Réparation de Pare-brise à Carouge
          </h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Service professionnel de pare-brise pour les habitants de Carouge. 
            Intervention rapide, prix compétitifs et garantie constructeur.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Services disponibles à Carouge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">🚗 Remplacement de pare-brise</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Toutes marques de véhicules</li>
                <li>✓ Pare-brise certifiés constructeur</li>
                <li>✓ Installation professionnelle</li>
                <li>✓ Garantie 2 ans</li>
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">🔧 Réparation d&apos;impacts</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Réparation d&apos;éclats et fissures</li>
                <li>✓ Intervention en 30 minutes</li>
                <li>✓ Évite le remplacement complet</li>
                <li>✓ Résultat invisible</li>
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">📡 Calibrage ADAS</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Caméras et capteurs</li>
                <li>✓ Aide au stationnement</li>
                <li>✓ Détection de ligne</li>
                <li>✓ Freinage d&apos;urgence</li>
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">🏠 Service mobile</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Intervention à domicile</li>
                <li>✓ Sur votre lieu de travail</li>
                <li>✓ Horaires flexibles</li>
                <li>✓ Sans frais supplémentaires</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Zone Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Zones d&apos;intervention à Carouge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-6">
                Nous intervenons rapidement dans tous les quartiers de Carouge et environs pour 
                le remplacement et la réparation de vos pare-brises.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">📍 Carouge Centre</h4>
                  <p className="text-sm text-gray-600">Intervention en 30 min</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">📍 Vieux-Carouge</h4>
                  <p className="text-sm text-gray-600">Intervention en 30 min</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">📍 Les Acacias</h4>
                  <p className="text-sm text-gray-600">Intervention en 45 min</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">📍 La Praille</h4>
                  <p className="text-sm text-gray-600">Intervention en 45 min</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">🕐 Horaires d&apos;intervention</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Lundi - Vendredi:</span>
                  <span className="font-semibold">7h00 - 19h00</span>
                </li>
                <li className="flex justify-between">
                  <span>Samedi:</span>
                  <span className="font-semibold">8h00 - 17h00</span>
                </li>
                <li className="flex justify-between">
                  <span>Dimanche:</span>
                  <span className="font-semibold">Urgences uniquement</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  🚨 Service d&apos;urgence 24/7 disponible avec supplément
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Tarifs indicatifs</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Service</th>
                    <th className="px-6 py-4 text-right">Prix dès</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">Réparation impact (petit)</td>
                    <td className="px-6 py-4 text-right font-semibold">CHF 80.-</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">Réparation fissure</td>
                    <td className="px-6 py-4 text-right font-semibold">CHF 120.-</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Remplacement pare-brise (citadine)</td>
                    <td className="px-6 py-4 text-right font-semibold">CHF 450.-</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">Remplacement pare-brise (berline)</td>
                    <td className="px-6 py-4 text-right font-semibold">CHF 550.-</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Calibrage ADAS</td>
                    <td className="px-6 py-4 text-right font-semibold">CHF 200.-</td>
                  </tr>
                </tbody>
              </table>
              <div className="p-4 bg-gray-100 text-center text-sm text-gray-600">
                * Prix indicatifs, devis gratuit sur demande
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d&apos;un pare-brise à Carouge?</h2>
          <p className="text-xl mb-8">
            Contactez-nous dès maintenant pour une intervention rapide
          </p>
          <div className="flex gap-4 justify-center">
            <a href="tel:0221234567" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg">
              📞 022 123 45 67
            </a>
            <a href="/" className="btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-lg">
              ← Retour à l&apos;accueil
            </a>
          </div>
        </div>
      </section>
    </>
  );
}