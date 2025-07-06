import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

// Types
interface PageData {
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  parentSlug?: string;
}

interface ServiceData {
  name: string;
  slug: string;
  description: string;
  price: string;
  duration: string;
  warranty: string;
}

interface TestimonialData {
  author: string;
  location: string;
  content: string;
  rating: number;
}

interface LocalPageData {
  name: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
}

// Seed data
const services: ServiceData[] = [
  {
    name: 'Remplacement Pare-brise',
    slug: 'remplacement-pare-brise-geneve',
    description: 'Changement complet avec calibrage ADAS inclus',
    price: 'Dès 280 CHF',
    duration: '2 heures',
    warranty: 'Garantie à vie'
  },
  {
    name: 'Réparation Impact',
    slug: 'reparation-impact-pare-brise',
    description: 'Réparation invisible en 30 minutes',
    price: 'Dès 89 CHF',
    duration: '30 minutes',
    warranty: 'Garantie 2 ans'
  },
  {
    name: 'Calibrage ADAS',
    slug: 'calibrage-camera-adas-geneve',
    description: 'Recalibrage certifié toutes marques',
    price: 'Dès 180 CHF',
    duration: '45 minutes',
    warranty: 'Certification constructeur'
  },
  {
    name: 'Rénovation Phares',
    slug: 'renovation-phares-voiture',
    description: 'Polissage professionnel garantie 3 ans',
    price: 'Dès 120 CHF',
    duration: '1 heure',
    warranty: 'Garantie 3 ans'
  }
];

const testimonials: TestimonialData[] = [
  {
    author: 'Marc Dubois',
    location: 'Eaux-Vives',
    content: 'Impact réparé en 25 minutes chrono ! Service impeccable, je recommande vivement.',
    rating: 5
  },
  {
    author: 'Sophie Müller',
    location: 'Champel',
    content: 'Remplacement pare-brise BMW avec calibrage ADAS parfait. Prix très correct pour Genève.',
    rating: 5
  },
  {
    author: 'Jean-Pierre Favre',
    location: 'Plainpalais',
    content: 'Intervention d\'urgence un dimanche. Équipe professionnelle et rapide. Merci !',
    rating: 5
  }
];

const localPages: LocalPageData[] = [
  {
    name: 'Carouge',
    slug: 'pare-brise-carouge',
    content: '', // Will be loaded from file
    metaTitle: 'Pare-brise Carouge - Remplacement Express et Réparation | PareBrise Genève Pro',
    metaDescription: 'Service de remplacement et réparation de pare-brise à Carouge. Intervention rapide dans tout le quartier, devis gratuit.'
  },
  {
    name: 'Lancy',
    slug: 'pare-brise-lancy',
    content: '', // Will be loaded from file
    metaTitle: 'Pare-brise Lancy - Expert Vitrage Auto Grand-Lancy et Petit-Lancy | PareBrise Genève Pro',
    metaDescription: 'Spécialiste du pare-brise à Lancy. Remplacement et réparation rapide à Grand-Lancy et Petit-Lancy.'
  },
  {
    name: 'Vernier',
    slug: 'pare-brise-vernier',
    content: '',
    metaTitle: 'Pare-brise Vernier - Service Mobile Vitrage Auto | PareBrise Genève Pro',
    metaDescription: 'Remplacement et réparation de pare-brise à Vernier. Intervention express, devis gratuit, garantie à vie.'
  },
  {
    name: 'Meyrin',
    slug: 'pare-brise-meyrin',
    content: '',
    metaTitle: 'Pare-brise Meyrin - Réparation et Remplacement Express | PareBrise Genève Pro',
    metaDescription: 'Service pare-brise à Meyrin et zone aéroportuaire. Intervention rapide, calibrage ADAS, tous véhicules.'
  }
];

// Main seed function
async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data
    await prisma.$transaction([
      prisma.testimonial.deleteMany(),
      prisma.localPage.deleteMany(),
      prisma.service.deleteMany(),
      prisma.page.deleteMany(),
      prisma.siteSettings.deleteMany(),
    ]);

    console.log('✅ Cleared existing data');

    // 1. Site Settings
    await prisma.siteSettings.create({
      data: {
        siteName: 'PareBrise Genève Pro',
        tagline: 'N°1 du pare-brise à Genève - Service Express',
        logo: '/images/logo.png',
        favicon: '/favicon.ico',
        phone: '078 999 99 99',
        email: 'contact@parebrise-geneve-pro.ch',
        address: 'Rue du Stand 60, 1204 Genève',
        businessHours: {
          monday: '07:00-19:00',
          tuesday: '07:00-19:00',
          wednesday: '07:00-19:00',
          thursday: '07:00-19:00',
          friday: '07:00-19:00',
          saturday: '08:00-17:00',
          sunday: '09:00-17:00'
        },
        socialLinks: {
          facebook: 'https://facebook.com/parebrisgenevepro',
          instagram: 'https://instagram.com/parebrisgenevepro',
          linkedin: 'https://linkedin.com/company/parebrise-geneve-pro'
        }
      }
    });

    console.log('✅ Created site settings');

    // 2. Services
    for (const service of services) {
      await prisma.service.create({
        data: {
          name: service.name,
          slug: service.slug,
          description: service.description,
          price: service.price,
          duration: service.duration,
          warranty: service.warranty,
          featured: true,
          order: services.indexOf(service)
        }
      });
    }

    console.log('✅ Created services');

    // 3. Testimonials
    for (const testimonial of testimonials) {
      await prisma.testimonial.create({
        data: {
          author: testimonial.author,
          location: testimonial.location,
          content: testimonial.content,
          rating: testimonial.rating,
          verified: true,
          featured: true
        }
      });
    }

    console.log('✅ Created testimonials');

    // 4. Local Pages
    for (const localPage of localPages) {
      // Try to load content from file
      let content = localPage.content;
      try {
        const filePath = path.join(process.cwd(), 'pages-quartiers', `${localPage.slug}.html`);
        content = await fs.readFile(filePath, 'utf-8');
      } catch (error) {
        console.warn(`Could not load content for ${localPage.slug}`);
      }

      await prisma.localPage.create({
        data: {
          name: localPage.name,
          slug: localPage.slug,
          content: content,
          metaTitle: localPage.metaTitle,
          metaDescription: localPage.metaDescription,
          published: true
        }
      });
    }

    console.log('✅ Created local pages');

    // 5. Main Pages
    const mainPages: PageData[] = [
      {
        title: 'Accueil',
        slug: 'home',
        content: '<h1>Bienvenue chez PareBrise Genève Pro</h1>',
        metaTitle: 'Remplacement Pare-brise Genève - N°1 Service Express | PareBrise Genève Pro',
        metaDescription: 'Spécialiste n°1 du remplacement et réparation de pare-brise à Genève. ✓ Intervention 2h ✓ Calibrage ADAS certifié ✓ Garantie à vie.'
      },
      {
        title: 'À propos',
        slug: 'a-propos',
        content: '<h1>À propos de PareBrise Genève Pro</h1><p>Leader du vitrage automobile à Genève depuis 2015.</p>',
        metaTitle: 'À propos - PareBrise Genève Pro',
        metaDescription: 'Découvrez PareBrise Genève Pro, votre expert en vitrage automobile à Genève depuis 2015.'
      },
      {
        title: 'Contact',
        slug: 'contact',
        content: '<h1>Contactez-nous</h1>',
        metaTitle: 'Contact - PareBrise Genève Pro',
        metaDescription: 'Contactez PareBrise Genève Pro pour tous vos besoins en pare-brise à Genève.'
      }
    ];

    for (const page of mainPages) {
      await prisma.page.create({
        data: {
          title: page.title,
          slug: page.slug,
          content: page.content,
          metaTitle: page.metaTitle,
          metaDescription: page.metaDescription,
          published: true
        }
      });
    }

    console.log('✅ Created main pages');

    // 6. Create sample blog posts
    const blogPosts = [
      {
        title: 'Fissure pare-brise : réparer ou remplacer ? Guide 2024',
        slug: 'fissure-pare-brise-reparer-remplacer-guide-2024',
        excerpt: 'Découvrez quand une fissure peut être réparée et quand le remplacement est nécessaire.',
        content: '<p>Guide complet sur les fissures de pare-brise...</p>',
        author: 'Jean Dupont',
        categories: ['Conseils', 'Réparation'],
        tags: ['fissure', 'réparation', 'pare-brise'],
        featuredImage: '/images/blog/fissure-pare-brise.jpg'
      },
      {
        title: 'Calibrage ADAS : pourquoi c\'est crucial après un remplacement',
        slug: 'calibrage-adas-crucial-apres-remplacement',
        excerpt: 'L\'importance du calibrage des systèmes d\'aide à la conduite après un changement de pare-brise.',
        content: '<p>Les systèmes ADAS sont essentiels pour votre sécurité...</p>',
        author: 'Marie Martin',
        categories: ['Technologie', 'Sécurité'],
        tags: ['ADAS', 'calibrage', 'sécurité'],
        featuredImage: '/images/blog/calibrage-adas.jpg'
      }
    ];

    console.log('✅ Database seeded successfully!');

    // 7. Generate sitemap
    await generateSitemap();

    // 8. Create redirects
    await createRedirects();

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Generate sitemap
async function generateSitemap() {
  const baseUrl = 'https://parebrise-geneve-pro.ch';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/"/>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${services.map(service => `
  <url>
    <loc>${baseUrl}/services/${service.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  ${localPages.map(page => `
  <url>
    <loc>${baseUrl}/zones-intervention/${page.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('✅ Generated sitemap.xml');
}

// Create redirects
async function createRedirects() {
  const redirects = `
# Redirects for SEO
/pare-brise-geneve.html /services/remplacement-pare-brise-geneve 301
/contact.php /contact 301
/devis.html /devis-gratuit-en-ligne 301

# Language redirects
/fr/* / 301
/en/* /en/ 301
/de/* /de/ 301
`;

  await fs.writeFile(path.join(process.cwd(), 'public', '_redirects'), redirects);
  console.log('✅ Created redirects file');
}

// Execute seed
main()
  .then(() => {
    console.log('🎉 Seed completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seed failed:', error);
    process.exit(1);
  }); 