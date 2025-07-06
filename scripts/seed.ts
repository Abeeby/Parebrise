import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

// Vérifier si le flag --with-test-data est présent
const withTestData = process.argv.includes('--with-test-data');

// Données des zones d'intervention
const ZONES_DATA = [
  {
    slug: 'pare-brise-carouge',
    name: 'Carouge',
    locale: 'fr',
    metaTitle: 'Pare-brise Carouge - Remplacement Express et Réparation | PareBrise Genève Pro',
    metaDescription: 'Service de remplacement et réparation de pare-brise à Carouge. Intervention rapide dans tout le quartier, devis gratuit. ✓ Garantie à vie ✓ Prise en charge assurance.',
    coordinates: { lat: 46.1810, lng: 6.1390 },
    featuredImage: '/images/zones/carouge-pare-brise.jpg',
  },
  {
    slug: 'pare-brise-lancy',
    name: 'Lancy',
    locale: 'fr',
    metaTitle: 'Pare-brise Lancy - Service Mobile Grand-Lancy et Petit-Lancy | PareBrise Genève Pro',
    metaDescription: 'Expert pare-brise à Lancy : remplacement et réparation à domicile. Intervention rapide Grand-Lancy et Petit-Lancy. ✓ Sans franchise ✓ Garantie constructeur.',
    coordinates: { lat: 46.1897, lng: 6.1191 },
    featuredImage: '/images/zones/lancy-pare-brise.jpg',
  },
  {
    slug: 'pare-brise-meyrin',
    name: 'Meyrin',
    locale: 'fr',
    metaTitle: 'Pare-brise Meyrin - Réparation Express Zone Aéroport | PareBrise Genève Pro',
    metaDescription: 'Spécialiste pare-brise à Meyrin et zone aéroport. Remplacement rapide, calibrage ADAS inclus. Service entreprises disponible. ✓ Devis immédiat ✓ 7j/7.',
    coordinates: { lat: 46.2340, lng: 6.0810 },
    featuredImage: '/images/zones/meyrin-pare-brise.jpg',
  },
  {
    slug: 'pare-brise-vernier',
    name: 'Vernier',
    locale: 'fr',
    metaTitle: 'Pare-brise Vernier - Intervention Rapide Zone Industrielle | PareBrise Genève Pro',
    metaDescription: 'Remplacement pare-brise à Vernier. Service mobile dans les zones industrielles et résidentielles. Techniciens certifiés, prix transparents.',
    coordinates: { lat: 46.2170, lng: 6.0840 },
    featuredImage: '/images/zones/vernier-pare-brise.jpg',
  },
];

// Données FAQ globales
const FAQ_DATA = [
  {
    question: 'Combien coûte le remplacement d\'un pare-brise ?',
    answer: 'Le prix dépend du modèle de votre véhicule et des options (capteurs ADAS, pare-brise chauffant). Nos tarifs commencent à 350 CHF pour une citadine standard. Utilisez notre calculateur en ligne pour obtenir un prix exact en 30 secondes.',
    category: 'pricing',
    locale: 'fr',
    order: 1,
  },
  {
    question: 'Ma franchise d\'assurance sera-t-elle appliquée ?',
    answer: 'Pour les réparations d\'impacts (éclats, fissures de moins de 10cm), la plupart des assurances suisses ne demandent pas de franchise. Pour un remplacement complet, la franchise dépend de votre contrat. Nous gérons directement les démarches avec votre assurance.',
    category: 'insurance',
    locale: 'fr',
    order: 2,
  },
  {
    question: 'Combien de temps dure l\'intervention ?',
    answer: 'Une réparation d\'impact prend environ 30 minutes. Un remplacement complet nécessite 2 heures, incluant le temps de séchage. Si votre véhicule a des capteurs ADAS, comptez 45 minutes supplémentaires pour le calibrage.',
    category: 'service',
    locale: 'fr',
    order: 3,
  },
  {
    question: 'Puis-je conduire immédiatement après le remplacement ?',
    answer: 'Oui, vous pouvez reprendre la route immédiatement. Nous utilisons des colles haute performance qui polymérisent rapidement. Nous recommandons simplement d\'éviter les lavages haute pression pendant 24h.',
    category: 'service',
    locale: 'fr',
    order: 4,
  },
  {
    question: 'Quelle est la garantie sur vos interventions ?',
    answer: 'Nous offrons une garantie à vie sur les remplacements de pare-brise (étanchéité et installation), 2 ans sur les réparations, et une certification constructeur pour les calibrages ADAS. La garantie couvre les défauts d\'installation et d\'étanchéité.',
    category: 'warranty',
    locale: 'fr',
    order: 5,
  },
];

// Données des témoignages
const TESTIMONIALS_DATA = [
  {
    author: 'Marc Dubois',
    location: 'Eaux-Vives',
    rating: 5,
    date: new Date('2024-01-15'),
    content: 'Service impeccable ! J\'ai appelé pour un impact sur mon pare-brise, et le technicien est arrivé dans l\'heure. Réparation rapide et invisible, prix très correct. Je recommande vivement PareBrise Genève Pro.',
    serviceType: 'repair',
    vehicleBrand: 'Audi',
    locale: 'fr',
  },
  {
    author: 'Sophie Müller',
    location: 'Champel',
    rating: 5,
    date: new Date('2024-01-20'),
    content: 'Excellente expérience du début à la fin. Devis en ligne précis, intervention à domicile parfaite. Le technicien a même calibré mes capteurs ADAS. Très professionnel !',
    serviceType: 'replacement',
    vehicleBrand: 'Mercedes',
    locale: 'fr',
  },
  {
    author: 'Jean-Pierre Favre',
    location: 'Plainpalais',
    rating: 5,
    date: new Date('2024-01-25'),
    content: 'Suite à un gros impact, j\'ai dû remplacer mon pare-brise en urgence. Intervention le jour même, travail soigné, et ils ont géré directement avec mon assurance. Vraiment top !',
    serviceType: 'replacement',
    vehicleBrand: 'Volkswagen',
    locale: 'fr',
  },
];

// Données de test supplémentaires (activées avec --with-test-data)
const TEST_TESTIMONIALS = [
  {
    author: 'Test User 1',
    location: 'Test Location',
    rating: 4,
    date: new Date(),
    content: 'Ceci est un témoignage de test pour le développement. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    serviceType: 'repair',
    vehicleBrand: 'Toyota',
    locale: 'fr',
    featured: true,
  },
  {
    author: 'Test User 2',
    location: 'Dev Environment',
    rating: 5,
    date: new Date(),
    content: 'Autre témoignage fictif pour tester l\'affichage et le tri. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    serviceType: 'replacement',
    vehicleBrand: 'Tesla',
    locale: 'fr',
    featured: true,
  },
];

// Données des services
const SERVICES_DATA = [
  {
    slug: 'remplacement-pare-brise',
    name: 'Remplacement de Pare-brise',
    shortDescription: 'Remplacement complet avec garantie à vie',
    icon: '🚗',
    basePrice: 350,
    locale: 'fr',
    order: 1,
  },
  {
    slug: 'reparation-impact',
    name: 'Réparation d\'Impact',
    shortDescription: 'Réparation invisible en 30 minutes',
    icon: '🔧',
    basePrice: 89,
    locale: 'fr',
    order: 2,
  },
  {
    slug: 'calibrage-adas',
    name: 'Calibrage ADAS',
    shortDescription: 'Recalibrage des systèmes d\'aide à la conduite',
    icon: '📡',
    basePrice: 180,
    locale: 'fr',
    order: 3,
  },
  {
    slug: 'renovation-phares',
    name: 'Rénovation de Phares',
    shortDescription: 'Polissage et protection UV',
    icon: '💡',
    basePrice: 110,
    locale: 'fr',
    order: 4,
  },
];

async function main() {
  console.log('🌱 Début du seed de la base de données...');
  if (withTestData) {
    console.log('📊 Mode test activé - ajout de données fictives');
  }

  // Nettoyer la base de données
  await prisma.$transaction([
    prisma.testimonial.deleteMany(),
    prisma.faq.deleteMany(),
    prisma.localPage.deleteMany(),
    prisma.service.deleteMany(),
    prisma.stat.deleteMany(),
    prisma.priceConfig.deleteMany(),
  ]);

  console.log('🧹 Base de données nettoyée');

  // Créer les services
  for (const service of SERVICES_DATA) {
    await prisma.service.create({
      data: service,
    });
  }
  console.log('✅ Services créés');

  // Créer les zones d'intervention
  for (const zone of ZONES_DATA) {
    // Lire le contenu MDX depuis le fichier
    let content = '';
    try {
      const mdxPath = join(process.cwd(), 'content', 'zones', `${zone.slug}.mdx`);
      const mdxContent = readFileSync(mdxPath, 'utf-8');
      // Extraire le contenu après le frontmatter
      const contentMatch = mdxContent.match(/---[\s\S]*?---\n([\s\S]*)/);
      content = contentMatch ? contentMatch[1].trim() : '';
    } catch (error) {
      console.warn(`⚠️ Fichier MDX non trouvé pour ${zone.slug}, utilisation du contenu par défaut`);
      content = `# ${zone.name}\n\nContenu à venir...`;
    }

    await prisma.localPage.create({
      data: {
        ...zone,
        content,
      },
    });
  }
  console.log('✅ Zones d\'intervention créées');

  // Créer les FAQ
  for (const faq of FAQ_DATA) {
    await prisma.faq.create({
      data: faq,
    });
  }
  console.log('✅ FAQ créées');

  // Créer les témoignages
  const testimonialsToCreate = withTestData 
    ? [...TESTIMONIALS_DATA, ...TEST_TESTIMONIALS]
    : TESTIMONIALS_DATA;

  for (const testimonial of testimonialsToCreate) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }
  console.log(`✅ ${testimonialsToCreate.length} témoignages créés`);

  // Créer quelques statistiques
  await prisma.stat.create({
    data: {
      key: 'total_interventions',
      value: withTestData ? 99999 : 15420,
      label: 'Interventions réalisées',
      locale: 'fr',
    },
  });

  await prisma.stat.create({
    data: {
      key: 'average_rating',
      value: 4.9,
      label: 'Note moyenne',
      locale: 'fr',
    },
  });

  await prisma.stat.create({
    data: {
      key: 'response_time',
      value: withTestData ? 15 : 45,
      label: 'Temps de réponse moyen (min)',
      locale: 'fr',
    },
  });

  console.log('✅ Statistiques créées');

  // Créer quelques configurations de prix (pour les nouvelles marques)
  if (withTestData) {
    const testPrices = [
      { brand: 'TOYOTA', model: 'yaris', serviceType: 'REPLACEMENT', price: 320 },
      { brand: 'TOYOTA', model: 'yaris', serviceType: 'REPAIR', price: 89 },
      { brand: 'VOLVO', model: 'xc60', serviceType: 'REPLACEMENT', price: 620 },
      { brand: 'VOLVO', model: 'xc60', serviceType: 'REPAIR', price: 89 },
    ];

    for (const priceConfig of testPrices) {
      await prisma.priceConfig.create({
        data: priceConfig,
      });
    }
    console.log('✅ Configurations de prix test créées');
  }

  console.log('🎉 Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 