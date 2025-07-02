# MoneyFlow - Plateforme de Prêt Personnel

Application web complète pour la simulation et demande de prêts personnels.

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

## Déploiement sur Railway

### 1. Préparer le projet

```bash
# Construire l'application
npm run build

# Vérifier que tout fonctionne
npm run start
```

### 2. Déployer sur Railway

1. **Créer un compte** sur [Railway.app](https://railway.app)

2. **Connecter GitHub** et importer ce repository

3. **Ajouter une base de données PostgreSQL** :
   - Dans le dashboard Railway, cliquer sur "New Project"
   - Sélectionner "Provision PostgreSQL"
   - Railway génère automatiquement `DATABASE_URL`

4. **Configurer les variables d'environnement** :
   ```
   NODE_ENV=production
   SESSION_SECRET=votre-clé-secrète-très-longue-et-sécurisée
   DATABASE_URL=postgresql://... (automatique avec Railway)
   ```

5. **Déployer** :
   - Railway détecte automatiquement Node.js
   - Le build et déploiement se lancent automatiquement
   - L'application sera disponible sur une URL Railway

### 3. Configuration post-déploiement

1. **Migrations de base de données** :
   ```bash
   # Railway exécute automatiquement
   npm run db:push
   ```

2. **Tester l'application** :
   - Créer un compte utilisateur
   - Tester la simulation de prêt
   - Vérifier le processus complet

## Variables d'environnement requises

- `DATABASE_URL`: URL de connexion PostgreSQL
- `SESSION_SECRET`: Clé secrète pour les sessions (minimum 32 caractères)
- `NODE_ENV`: `production` pour la production

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

## Support

Pour toute question ou problème, consultez la documentation ou créez une issue.