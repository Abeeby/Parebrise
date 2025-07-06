# Commandes pour le Seed Prisma

## Configuration initiale

1. **Ajouter le script seed dans `package.json`** :
```json
{
  "scripts": {
    "db:push": "prisma db push",
    "db:seed": "tsx scripts/seed.ts",
    "db:reset": "prisma db push --force-reset && npm run db:seed",
    "db:studio": "prisma studio"
  },
  "prisma": {
    "seed": "tsx scripts/seed.ts"
  }
}
```

2. **Installer les dépendances** :
```bash
npm install -D tsx @types/node
npm install @prisma/client
```

## Commandes d'exécution

### Première initialisation
```bash
# 1. Créer/mettre à jour le schéma de base de données
npx prisma db push

# 2. Générer le client Prisma
npx prisma generate

# 3. Exécuter le seed
npm run db:seed
```

### Reset complet (développement)
```bash
# Réinitialise la DB et relance le seed
npm run db:reset
```

### Visualiser les données
```bash
# Ouvre Prisma Studio dans le navigateur
npm run db:studio
```

## Variables d'environnement requises

Dans `.env` :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/parebrise_geneve?schema=public"
```

Pour Vercel/Production :
```env
DATABASE_URL="postgresql://..."
```

## Structure attendue

Le script de seed va :
1. Nettoyer toutes les tables
2. Créer 4 services (remplacement, réparation, ADAS, phares)
3. Créer 4 zones d'intervention (Carouge, Lancy, Meyrin, Vernier)
4. Importer le contenu MDX depuis `/content/zones/*.mdx`
5. Créer 5 FAQ générales
6. Créer 3 témoignages clients
7. Créer 3 statistiques d'affichage

## Dépannage

### Erreur "Cannot find module"
```bash
npm install -D tsx @types/node
```

### Erreur Prisma Client
```bash
npx prisma generate
```

### Erreur de connexion DB
Vérifier `DATABASE_URL` dans `.env`

### Fichiers MDX non trouvés
Le seed continuera avec du contenu par défaut si les fichiers MDX n'existent pas encore. 