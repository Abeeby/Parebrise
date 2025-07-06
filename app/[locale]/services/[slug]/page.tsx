import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getServiceBySlug, getAllServices } from '@/lib/api/services';
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
  const services = await getAllServices();
  const locales = ['fr', 'en', 'de'];
  
  return locales.flatMap(locale =>
    services.map(service => ({
      locale,
      slug: service.slug
    }))
  );
}

// Génération des métadonnées
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug, params.locale);
  
  if (!service) return {};
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://parebrise-geneve-pro.ch';
  const url = `${baseUrl}/${params.locale}/services/${params.slug}`;
  
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        'fr': `${baseUrl}/fr/services/${params.slug}`,
        'en': `${baseUrl}/en/services/${params.slug}`,
        'de': `${baseUrl}/de/services/${params.slug}`,
      }
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      siteName: 'PareBrise Genève Pro',
      locale: params.locale,
      type: 'website',
      images: [{
        url: service.featuredImage || '/images/default-service.jpg',
        width: 1200,
        height: 630,
        alt: service.name
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.featuredImage || '/images/default-service.jpg']
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
  h4: (props: any) => <h4 className="text-xl font-medium mt-3 mb-2" {...props} />,
  p: (props: any) => <p className="text-lg leading-relaxed mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="text-lg" {...props} />,
  strong: (props: any) => <strong className="font-semibold text-primary" {...props} />,
};

export default async function ServicePage({ params }: PageProps) {
  const t = await getTranslations('services');
  const service = await getServiceBySlug(params.slug, params.locale);
  
  if (!service) {
    notFound();
  }

  // Générer le JSON-LD
  const jsonLd = generateJsonLd({
    type: 'Service',
    name: service.name,
    description: service.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'PareBrise Genève Pro',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Genève',
        addressCountry: 'CH'
      }
    },
    areaServed: {
      '@type': 'City',
      name: 'Genève'
    },
    url: `https://parebrise-geneve-pro.ch/${params.locale}/services/${params.slug}`,
    priceRange: service.basePrice ? `CHF ${service.basePrice}+` : 'CHF'
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
          source={service.content} 
          components={mdxComponents}
        />
      </article>
    </>
  );
} 