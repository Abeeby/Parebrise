# Notes Hreflang & Sitemap Multilingue

## Configuration Hreflang

### Dans le HTML (Head)
```html
<!-- Page d'accueil -->
<link rel="alternate" hreflang="fr-CH" href="https://parebrise-geneve-pro.ch/" />
<link rel="alternate" hreflang="en" href="https://parebrise-geneve-pro.ch/en/" />
<link rel="alternate" hreflang="de-CH" href="https://parebrise-geneve-pro.ch/de/" />
<link rel="alternate" hreflang="x-default" href="https://parebrise-geneve-pro.ch/" />

<!-- Page service (exemple) -->
<link rel="alternate" hreflang="fr-CH" href="https://parebrise-geneve-pro.ch/services/remplacement-pare-brise-geneve" />
<link rel="alternate" hreflang="en" href="https://parebrise-geneve-pro.ch/en/services/windshield-replacement-geneva" />
<link rel="alternate" hreflang="de-CH" href="https://parebrise-geneve-pro.ch/de/services/windschutzscheiben-austausch-genf" />
```

### Next.js Implementation
```typescript
// components/Hreflang.tsx
import Head from 'next/head';
import { useRouter } from 'next/router';

const hreflangMappings = {
  '/': {
    'fr-CH': '/',
    'en': '/en/',
    'de-CH': '/de/'
  },
  '/services/remplacement-pare-brise-geneve': {
    'fr-CH': '/services/remplacement-pare-brise-geneve',
    'en': '/en/services/windshield-replacement-geneva',
    'de-CH': '/de/services/windschutzscheiben-austausch-genf'
  },
  // ... autres mappings
};

export default function Hreflang() {
  const router = useRouter();
  const { pathname, locale } = router;
  
  const baseUrl = 'https://parebrise-geneve-pro.ch';
  const mappings = hreflangMappings[pathname] || {};
  
  return (
    <Head>
      {Object.entries(mappings).map(([lang, path]) => (
        <link
          key={lang}
          rel="alternate"
          hreflang={lang}
          href={`${baseUrl}${path}`}
        />
      ))}
      <link
        rel="alternate"
        hreflang="x-default"
        href={`${baseUrl}${mappings['fr-CH'] || '/'}`}
      />
    </Head>
  );
}
```

## Sitemap Multilingue

### Structure sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Page d'accueil -->
  <url>
    <loc>https://parebrise-geneve-pro.ch/</loc>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://parebrise-geneve-pro.ch/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://parebrise-geneve-pro.ch/en/"/>
    <xhtml:link rel="alternate" hreflang="de-CH" href="https://parebrise-geneve-pro.ch/de/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://parebrise-geneve-pro.ch/"/>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Services FR -->
  <url>
    <loc>https://parebrise-geneve-pro.ch/services/remplacement-pare-brise-geneve</loc>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://parebrise-geneve-pro.ch/services/remplacement-pare-brise-geneve"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://parebrise-geneve-pro.ch/en/services/windshield-replacement-geneva"/>
    <xhtml:link rel="alternate" hreflang="de-CH" href="https://parebrise-geneve-pro.ch/de/services/windschutzscheiben-austausch-genf"/>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Services EN -->
  <url>
    <loc>https://parebrise-geneve-pro.ch/en/services/windshield-replacement-geneva</loc>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://parebrise-geneve-pro.ch/services/remplacement-pare-brise-geneve"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://parebrise-geneve-pro.ch/en/services/windshield-replacement-geneva"/>
    <xhtml:link rel="alternate" hreflang="de-CH" href="https://parebrise-geneve-pro.ch/de/services/windschutzscheiben-austausch-genf"/>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Services DE -->
  <url>
    <loc>https://parebrise-geneve-pro.ch/de/services/windschutzscheiben-austausch-genf</loc>
    <xhtml:link rel="alternate" hreflang="fr-CH" href="https://parebrise-geneve-pro.ch/services/remplacement-pare-brise-geneve"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://parebrise-geneve-pro.ch/en/services/windshield-replacement-geneva"/>
    <xhtml:link rel="alternate" hreflang="de-CH" href="https://parebrise-geneve-pro.ch/de/services/windschutzscheiben-austausch-genf"/>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Pages locales (uniquement en FR pour le moment) -->
  <url>
    <loc>https://parebrise-geneve-pro.ch/zones-intervention/pare-brise-carouge</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

### Génération Dynamique Next.js
```typescript
// pages/sitemap.xml.tsx
import { GetServerSideProps } from 'next';
import { getAllPages, getAllServices, getAllLocalPages } from '../lib/api';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://parebrise-geneve-pro.ch';
  const locales = ['fr-CH', 'en', 'de-CH'];
  
  // Récupérer toutes les pages
  const pages = await getAllPages();
  const services = await getAllServices();
  const localPages = await getAllLocalPages();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${generateUrlSet(pages, services, localPages, baseUrl, locales)}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
};

function generateUrlSet(pages, services, localPages, baseUrl, locales) {
  // Logique de génération des URLs avec hreflang
  return urls.join('\n');
}

export default Sitemap;
```

## WordPress Implementation

### Plugin WPML Configuration
```php
// functions.php
add_filter('wpml_hreflangs', function($hreflangs) {
    // Personnaliser les hreflangs si nécessaire
    return $hreflangs;
});

// Sitemap multilingue avec Yoast + WPML
add_filter('wpseo_sitemap_url', function($url, $post) {
    // Ajouter les liens hreflang au sitemap
    return $url;
}, 10, 2);
```

## Index Sitemaps
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://parebrise-geneve-pro.ch/sitemap-pages.xml</loc>
    <lastmod>2024-01-15</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://parebrise-geneve-pro.ch/sitemap-services.xml</loc>
    <lastmod>2024-01-15</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://parebrise-geneve-pro.ch/sitemap-local.xml</loc>
    <lastmod>2024-01-15</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://parebrise-geneve-pro.ch/sitemap-blog.xml</loc>
    <lastmod>2024-01-15</lastmod>
  </sitemap>
</sitemapindex>
```

## Robots.txt
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /*.json$
Disallow: /*?*

# Sitemaps
Sitemap: https://parebrise-geneve-pro.ch/sitemap.xml
Sitemap: https://parebrise-geneve-pro.ch/sitemap-index.xml

# Crawl-delay pour bots agressifs
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10
```

## Balises Meta Multilingues
```html
<!-- Open Graph multilingue -->
<meta property="og:locale" content="fr_CH" />
<meta property="og:locale:alternate" content="en_US" />
<meta property="og:locale:alternate" content="de_CH" />

<!-- Twitter Card avec langue -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@PareBriseGeneve" />
```

## Validation
- Google Search Console : Soumettre sitemap pour chaque propriété linguistique
- Tester avec hreflang Tags Testing Tool
- Vérifier dans GSC la section "International Targeting" 