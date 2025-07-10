# MoneyFlow - Plateforme de Prêt Personnel

Application web complète pour la simulation et demande de prêts personnels.

## 🚀 Déploiement sur Railway

Cette application est optimisée pour Railway avec support PostgreSQL.

### Déploiement Rapide

1. **Créer un compte** sur [railway.app](https://railway.app)
2. **Nouveau projet** → "Deploy from GitHub repo"
3. **Ajouter PostgreSQL** → "New" → "Database" → "PostgreSQL"
4. **Variables d'environnement** :
   ```
   new_db=${{ Postgres.DATABASE_URL }}
   SESSION_SECRET=votre-clé-secrète-très-longue
   NODE_ENV=production
   ```
5. **Déployer** automatiquement

### URL de l'application déployée
Votre application sera disponible sur : `https://votre-app.up.railway.app`

## Fonctionnalités

- 🔐 Authentification sécurisée (email/mot de passe)
- 💰 Simulateur de prêt en temps réel
- 📋 Formulaire de demande en 3 étapes
- 📊 Suivi du processus en 7 étapes
- 👨‍💼 Panel d'administration
- 📱 Interface responsive

## Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Base de données**: PostgreSQL avec Drizzle ORM
- **Authentification**: Sessions avec bcrypt

## Développement Local

```bash
# Installation
npm install

# Variables d'environnement
cp .env.example .env
# Configurez DATABASE_URL dans .env

# Synchroniser la base de données
npm run db:push

# Démarrer en développement
npm run dev
```

## Scripts disponibles

- `npm run dev`: Développement local
- `npm run build`: Construction pour production
- `npm run start`: Démarrage en production
- `npm run db:push`: Synchronisation du schéma de base de données

## Structure du projet

```
├── client/          # Frontend React
├── server/          # Backend Express
├── shared/          # Schémas partagés
├── dist/           # Build de production
└── migrations/     # Migrations de base de données
```

## Pourquoi Railway ?

- ✅ Support Node.js + PostgreSQL
- ✅ Déploiement automatique depuis GitHub
- ✅ Variables d'environnement intégrées
- ✅ SSL automatique
- ✅ Scaling automatique

## Alternatives de Déploiement

- **Render.com** : Alternative gratuite
- **Heroku** : Pour utilisateurs expérimentés
- ❌ **Netlify** : Sites statiques uniquement (incompatible)
- ❌ **Vercel** : Serverless (sessions non persistantes)

## Support

Pour déployer votre application :
1. Suivez le guide dans `RAILWAY_DEPLOYMENT.md`
2. Consultez `DEPLOYMENT_GUIDE.md` pour d'autres options
3. Vérifiez `RAILWAY_FIX.md` en cas de problème