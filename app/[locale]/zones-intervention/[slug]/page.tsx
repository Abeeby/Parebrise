import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getLocalPageBySlug, getAllLocalPages } from '@/lib/api/local-pages';
import { generateJsonLd } from '@/lib/seo/json-ld';

// Composants réutilisables pour MDX
import Hero from '@/components/zones/Hero';
import ServicesList from '@/components/zones/ServicesList';
import TestimonialCard from '@/components/zones/TestimonialCard';
import LocalFAQ from '@/components/zones/LocalFAQ';
import CTASection from '@/components/zones/CTASection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Types
interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Génération statique des routes
export async function generateStaticParams() {
  const pages = await getAllLocalPages();
  const locales = ['fr', 'en', 'de'];
  
  return locales.flatMap(locale =>
    pages.map(page => ({
      locale,
      slug: page.slug
    }))
  );
}

// Génération des métadonnées
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getLocalPageBySlug(params.slug, params.locale);
  
  if (!page) return {};
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://parebrise-geneve-pro.ch';
  const url = `${baseUrl}/${params.locale}/zones-intervention/${params.slug}`;
  
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        'fr': `${baseUrl}/fr/zones-intervention/${params.slug}`,
        'en': `${baseUrl}/en/zones-intervention/${params.slug}`,
        'de': `${baseUrl}/de/zones-intervention/${params.slug}`,
      }
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: 'PareBrise Genève Pro',
      locale: params.locale,
      type: 'website',
      images: [{
        url: page.featuredImage || '/images/default-zone.jpg',
        width: 1200,
        height: 630,
        alt: page.name
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
      images: [page.featuredImage || '/images/default-zone.jpg']
    }
  };
}

// Composants disponibles dans MDX
const mdxComponents = {
  Hero,
  ServicesList,
  TestimonialCard,
  LocalFAQ,
  CTASection,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-medium mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="text-lg leading-relaxed mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="text-lg" {...props} />,
  strong: (props: any) => <strong className="font-semibold text-primary" {...props} />,
};

export default async function LocalZonePage({ params }: PageProps) {
  const t = await getTranslations('zones');
  const page = await getLocalPageBySlug(params.slug, params.locale);
  
  if (!page) {
    notFound();
  }

  // Générer le JSON-LD
  const jsonLd = generateJsonLd({
    type: 'LocalBusiness',
    name: `PareBrise Genève Pro - ${page.name}`,
    description: page.metaDescription,
    areaServed: {
      '@type': 'City',
      name: page.name
    },
    url: `https://parebrise-geneve-pro.ch/${params.locale}/zones-intervention/${params.slug}`
  });

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Contenu MDX */}
      <article className="min-h-screen">
        <MDXRemote 
          source={page.content} 
          components={mdxComponents}
        />
      </article>
    </>
  );
} 