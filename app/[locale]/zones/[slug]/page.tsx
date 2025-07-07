import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Types
interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Génération statique des routes
export async function generateStaticParams() {
  // For now, just return Carouge as an example
  const locales = ['fr', 'en', 'de'];
  const pages = ['pare-brise-carouge'];
  
  return locales.flatMap(locale =>
    pages.map(slug => ({
      locale,
      slug
    }))
  );
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
    <article className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Remplacement et Réparation de Pare-brise à Carouge
        </h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Services disponibles</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Remplacement de pare-brise toutes marques</li>
            <li>Réparation d'impacts et fissures</li>
            <li>Calibrage ADAS</li>
            <li>Service mobile à domicile</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Zone d'intervention</h2>
          <p className="text-lg mb-4">
            Nous intervenons rapidement à Carouge et dans les quartiers environnants:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Carouge Centre</li>
            <li>Vieux-Carouge</li>
            <li>Les Acacias</li>
            <li>La Praille</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-lg">
            Appelez-nous au <strong>022 123 45 67</strong> pour un devis gratuit.
          </p>
        </section>
      </div>
    </article>
  );
}