import React from 'react';

// Types pour les différents schemas
export interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  '@id'?: string;
  name: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  image?: string | string[];
  priceRange?: string;
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string | string[];
    opens: string;
    closes: string;
  }>;
  sameAs?: string[];
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    ratingCount: string;
    bestRating?: string;
    worstRating?: string;
  };
  areaServed?: any;
  hasOfferCatalog?: any;
}

export interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description?: string;
  provider: LocalBusinessSchema | { '@type': 'LocalBusiness'; name: string };
  areaServed?: any;
  hasOfferCatalog?: any;
  aggregateRating?: any;
  offers?: any;
  serviceType?: string;
  termsOfService?: string;
  category?: string;
  availableChannel?: any;
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface WebPageSchema {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  '@id'?: string;
  url?: string;
  name: string;
  description?: string;
  breadcrumb?: BreadcrumbSchema;
  isPartOf?: {
    '@type': 'WebSite';
    '@id': string;
    name: string;
    url: string;
  };
  primaryImageOfPage?: {
    '@type': 'ImageObject';
    url: string;
  };
  datePublished?: string;
  dateModified?: string;
}

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  '@id'?: string;
  name: string;
  url: string;
  logo?: string;
  image?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: any;
  sameAs?: string[];
  founder?: any;
  foundingDate?: string;
  contactPoint?: Array<{
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    areaServed?: string | string[];
    availableLanguage?: string | string[];
  }>;
}

// Types pour les props du composant
type StructuredDataType = 
  | LocalBusinessSchema
  | ServiceSchema
  | BreadcrumbSchema
  | FAQSchema
  | WebPageSchema
  | OrganizationSchema
  | any;

interface StructuredDataProps {
  data: StructuredDataType | StructuredDataType[];
}

/**
 * Composant pour injecter des données structurées JSON-LD
 * @param {StructuredDataProps} props - Les données structurées à injecter
 */
export default function StructuredData({ data }: StructuredDataProps) {
  // Assurer que les données ont toujours @context
  const processData = (item: any) => {
    if (!item['@context']) {
      return {
        '@context': 'https://schema.org',
        ...item
      };
    }
    return item;
  };

  // Traiter les données (simple ou array)
  const processedData = Array.isArray(data) 
    ? data.map(processData)
    : processData(data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(processedData)
      }}
    />
  );
}

// Helpers pour créer des schemas courants
export const createLocalBusinessSchema = (
  business: Partial<LocalBusinessSchema>
): LocalBusinessSchema => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'PareBrise Genève Pro',
  description: 'Service de réparation et remplacement de pare-brise à Genève',
  url: 'https://parebrise-geneve-pro.ch',
  telephone: '+41789999999',
  email: 'contact@parebrise-geneve-pro.ch',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Genève',
    addressCountry: 'CH'
  },
  priceRange: 'CHF',
  ...business
});

export const createServiceSchema = (
  service: Partial<ServiceSchema>
): ServiceSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: {
    '@type': 'LocalBusiness',
    name: 'PareBrise Genève Pro'
  },
  areaServed: {
    '@type': 'City',
    name: 'Genève'
  },
  ...service
});

export const createBreadcrumbSchema = (
  items: Array<{ name: string; url?: string }>
): BreadcrumbSchema => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    ...(item.url && index < items.length - 1 ? { item: item.url } : {})
  }))
});

export const createFAQSchema = (
  questions: Array<{ question: string; answer: string }>
): FAQSchema => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
}); 