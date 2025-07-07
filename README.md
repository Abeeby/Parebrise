# PareBrise Genève Pro

Site web pour le service de remplacement et réparation de pare-brise à Genève et environs.

## 🚀 Déploiement sur Vercel

### Option 1: Déploiement via l'interface Vercel

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous
2. Cliquez sur "Add New..." → "Project"
3. Importez votre repository Git
4. Vercel détectera automatiquement qu'il s'agit d'un projet Next.js
5. Cliquez sur "Deploy"

### Option 2: Déploiement via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel
```

## 🛠️ Installation locale

```bash
# Cloner le repository
git clone [votre-repo]
cd parebrise

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Le site sera accessible sur http://localhost:3000

## 📁 Structure du projet

```
├── app/
│   ├── [locale]/           # Pages avec support multilingue
│   │   ├── page.tsx        # Page d'accueil locale
│   │   └── zones/          # Pages des zones d'intervention
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx           # Redirection vers /fr
│   └── globals.css        # Styles globaux
├── components/            # Composants React
├── content/              # Contenu MDX
├── prisma/              # Schema base de données
├── package.json         # Dépendances
└── next.config.js       # Configuration Next.js
```

## 🌍 URLs disponibles

- `/` → Redirige vers `/fr`
- `/fr` → Page d'accueil en français
- `/fr/zones/pare-brise-carouge` → Page Carouge

## ⚠️ Configuration requise pour Vercel

Le projet est déjà configuré avec:
- ✅ `package.json` avec toutes les dépendances
- ✅ `next.config.js` pour Next.js
- ✅ `vercel.json` pour la configuration de build
- ✅ Structure de dossiers Next.js 13+ (app directory)

## 🐛 Résolution de problèmes

Si vous rencontrez l'erreur 404 après le déploiement:

1. Vérifiez que le build s'est bien passé dans les logs Vercel
2. Assurez-vous que les variables d'environnement sont configurées (si nécessaire)
3. Vérifiez que le domaine est bien configuré

## 📞 Support

Pour toute question sur le déploiement, consultez la [documentation Vercel](https://vercel.com/docs).