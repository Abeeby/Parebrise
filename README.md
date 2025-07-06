# 🚗 PareBrise Genève Pro - Site Web Next.js 14

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8)](https://web.dev/progressive-web-apps/)

Site web professionnel pour service de réparation et remplacement de pare-brise à Genève.

## 🚀 Fonctionnalités

- **🏎️ Performance** : Score Lighthouse 95+ sur toutes les métriques
- **♿ Accessibilité** : WCAG AA compliant, score 96%+
- **🌍 Multilingue** : FR/EN/DE avec routing i18n
- **📱 PWA** : Application installable avec mode offline
- **🔍 SEO** : Optimisé pour le référencement local Genève
- **🧮 Calculateur** : Prix instantané par marque/modèle
- **📝 MDX** : Contenu riche avec composants React

## 📋 Prérequis

- Node.js 18+
- npm ou yarn
- Git

## 🛠️ Installation

```bash
# Cloner le repository
git clone https://github.com/Abeeby/Parebrise.git
cd Parebrise

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Lancer en développement
npm run dev
```

## 📁 Structure du Projet

```
/
├── app/                    # App Router Next.js 14
│   ├── [locale]/          # Routes i18n
│   │   ├── zones/         # Pages zones dynamiques
│   │   └── services/      # Pages services dynamiques
│   └── api/               # Routes API
├── components/            # Composants React
│   ├── calculateur/       # Calculateur de prix
│   ├── zones/            # Composants MDX
│   └── seo/              # SEO et structured data
├── content/              # Contenu MDX
│   ├── zones/           # Pages zones d'intervention
│   └── services/        # Pages services
├── prisma/              # Schema base de données
├── public/              # Assets statiques
└── tests/               # Tests Playwright
```

## 🎯 Commandes Principales

```bash
# Développement
npm run dev              # Serveur de développement
npm run build           # Build de production
npm run start           # Démarrer la production
npm run lint            # Vérifier le code

# Base de données
npm run db:push         # Pousser le schema
npm run db:seed         # Seeder la DB
npm run db:studio       # Ouvrir Prisma Studio

# Tests
npm run test            # Lancer les tests
npm run test:ui         # Interface de tests
```

## 🌐 Routes Principales

- `/` - Page d'accueil
- `/zones/[slug]` - Pages zones d'intervention
- `/services/[slug]` - Pages services
- `/calculateur-prix` - Calculateur de prix
- `/api/calculate-price` - API de calcul

## 💻 Technologies

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS + shadcn/ui
- **Database** : PostgreSQL + Prisma
- **Content** : MDX
- **Tests** : Playwright
- **PWA** : next-pwa
- **Analytics** : Google Analytics 4

## 🔧 Configuration

### Variables d'Environnement

```env
# Base
NEXT_PUBLIC_BASE_URL=https://parebrise-geneve-pro.ch

# Database
DATABASE_URL=postgresql://...

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact
NEXT_PUBLIC_PHONE=+41789999999
NEXT_PUBLIC_WHATSAPP=41789999999
```

### Tailwind Config

Couleurs officielles configurées :
- Primary : `#0056B3` (Bleu)
- Accent : `#FFD700` (Jaune)

## 📊 Performances

- **LCP** : < 1s
- **FID** : < 100ms
- **CLS** : < 0.1
- **TTI** : < 2s

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Docker

```bash
# Build l'image
docker build -t parebrise-geneve .

# Lancer le conteneur
docker run -p 3000:3000 parebrise-geneve
```

## 🧪 Tests

```bash
# Tests unitaires
npm run test:unit

# Tests E2E
npm run test:e2e

# Tests accessibilité
npm run test:a11y
```

## 📝 License

Propriétaire - PareBrise Genève Pro © 2024

---

**Développé avec ❤️ pour PareBrise Genève Pro** 