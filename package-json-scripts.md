# Scripts à ajouter dans package.json

Ajoutez ces scripts dans votre `package.json` :

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "db:push": "prisma db push",
    "db:seed": "tsx scripts/seed.ts",
    "db:reset": "prisma db push --force-reset && npm run db:seed",
    "db:studio": "prisma studio",
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:report": "playwright show-report"
  },
  "prisma": {
    "seed": "tsx scripts/seed.ts"
  }
}
```

## Utilisation

### Base de données
```bash
# Initialiser la DB
npm run db:push

# Seed normal
npm run db:seed

# Seed avec données de test
npm run db:seed -- --with-test-data

# Reset complet
npm run db:reset

# Interface graphique Prisma
npm run db:studio
```

### Tests
```bash
# Lancer tous les tests
npm run test

# Mode UI interactif
npm run test:ui

# Mode debug
npm run test:debug

# Voir le rapport HTML
npm run test:report
```

### Développement
```bash
# Serveur de dev
npm run dev

# Build de production
npm run build

# Lancer la production
npm run start

# Vérifier les types
npm run type-check
``` 