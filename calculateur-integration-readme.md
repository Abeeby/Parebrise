# Guide d'Intégration - Calculateur de Prix PareBrise Genève Pro

## Vue d'ensemble

Le calculateur de prix est composé de :
- **Route API** : `/app/api/calculate-price/route.ts` - Server Action Next.js
- **Composant Client** : `/components/calculateur/PriceCalculator.tsx` - Interface React
- **Types** : TypeScript complet avec validation Zod

## 🚀 Installation

### 1. Dépendances requises

```bash
npm install zod lucide-react
# Si vous utilisez shadcn/ui (recommandé)
npx shadcn-ui@latest add button card select checkbox label alert
```

### 2. Structure des fichiers

```
/app
  /api
    /calculate-price
      route.ts          # Route API (Server Action)
/components
  /calculateur
    PriceCalculator.tsx # Composant client
  /ui
    # Composants shadcn/ui
```

## 📊 Base de données des prix

Les prix sont définis dans `PRICE_DATABASE` avec la structure :
```typescript
{
  marque: {
    modele: {
      replacement: number,  // Prix remplacement (CHF)
      repair: number,      // Prix réparation
      headlight: number    // Prix rénovation phares
    }
  }
}
```

### Marques/Modèles supportés
- **Audi** : A3, A4, Q5, Q7
- **BMW** : Série 1, Série 3, X3, X5
- **Mercedes** : Classe A, C, GLC, GLE
- **Volkswagen** : Golf, Passat, Tiguan, Touareg
- **Tesla** : Model 3, Model Y, Model S, Model X
- **Porsche** : Cayenne, Macan, 911, Panamera

## 🔧 Utilisation

### 1. Intégration simple

```tsx
import PriceCalculator from '@/components/calculateur/PriceCalculator';

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <PriceCalculator />
    </div>
  );
}
```

### 2. Avec callback sur calcul

```tsx
<PriceCalculator 
  onPriceCalculated={(price) => {
    console.log('Prix calculé:', price);
    // Déclencher une action (ex: ouvrir modal de réservation)
  }}
/>
```

### 3. Personnalisation du style

```tsx
<PriceCalculator className="max-w-lg mx-auto shadow-xl" />
```

## 📡 API Endpoints

### POST /api/calculate-price
Calcule le prix selon les paramètres.

**Request Body:**
```json
{
  "brand": "audi",
  "model": "a4",
  "serviceType": "replacement",
  "hasADAS": true,
  "isUrgent": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "basePrice": 450,
    "finalPrice": 630,
    "savings": 157,
    "competitorPrice": 787,
    "breakdown": {
      "service": 450,
      "adas": 180
    },
    "estimatedDuration": "2 heures",
    "warranty": "Garantie à vie"
  }
}
```

### GET /api/calculate-price
Retourne les options disponibles (marques, modèles, services).

## 🎨 Personnalisation

### Modifier les prix

Éditez `PRICE_DATABASE` dans `/app/api/calculate-price/route.ts` :

```typescript
const PRICE_DATABASE = {
  nouvellemarque: {
    modele1: { replacement: 400, repair: 89, headlight: 130 }
  }
};
```

### Ajouter des suppléments

```typescript
const ADAS_CALIBRATION_PRICE = 180;        // Prix calibrage ADAS
const URGENCY_SUPPLEMENT_PERCENT = 20;     // % supplément urgence
const COMPETITOR_MARKUP_PERCENT = 25;      // % au-dessus de nos prix
```

### Modifier les durées/garanties

```typescript
const SERVICE_DURATIONS = {
  replacement: '2 heures',
  repair: '30 minutes',
  // ...
};
```

## 📈 Tracking Analytics

Le calculateur envoie automatiquement des événements GA4 :

```javascript
gtag('event', 'price_calculated', {
  brand: 'audi',
  model: 'a4',
  service_type: 'replacement',
  final_price: 630,
  has_adas: true,
  is_urgent: false
});
```

### Configuration GA4 requise

Dans votre `layout.tsx` :
```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `}
</Script>
```

## 🌍 Internationalisation

Le calculateur utilise les traductions du système next-intl. Pour ajouter des langues :

1. Créer les traductions dans `/i18n/{locale}.json`
2. Adapter les labels dans le composant
3. Localiser les messages d'erreur dans l'API

## 🔒 Sécurité

- Validation côté serveur avec Zod
- Protection CSRF native Next.js
- Pas de données sensibles exposées
- Rate limiting recommandé en production

## 📱 Responsive Design

Le calculateur est entièrement responsive :
- Mobile : Disposition verticale optimisée
- Tablette : Ajustements automatiques
- Desktop : Largeur maximale contrôlée

## 🐛 Debugging

Pour activer les logs de développement :

```typescript
// Dans route.ts
console.log('Price calculation:', {
  brand,
  model,
  serviceType,
  finalPrice,
  timestamp: new Date().toISOString(),
});
```

## 🚨 Gestion d'erreurs

Le composant gère :
- Erreurs de validation
- Erreurs réseau
- Timeouts API
- États de chargement

Messages d'erreur personnalisables dans le composant.

## ⚡ Optimisations

1. **Cache API** : Implémenter un cache Redis pour les prix fréquents
2. **Debounce** : Éviter les appels API multiples
3. **Prefetch** : Charger les options au SSR pour performance optimale

## 🤝 Support

Pour toute question d'intégration :
- Documentation API : `/app/api/calculate-price/route.ts`
- Composant UI : `/components/calculateur/PriceCalculator.tsx`
- Types TypeScript : Exportés depuis la route API

---

**Note** : Ce calculateur est prêt pour la production mais nécessite l'installation des dépendances UI (shadcn/ui ou équivalent) et la configuration GA4 pour le tracking complet. 