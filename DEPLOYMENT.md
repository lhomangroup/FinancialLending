# Déploiement sur Railway

## Étapes pour déployer sur Railway

1. **Créer un compte Railway**
   - Allez sur [railway.app](https://railway.app)
   - Connectez-vous avec GitHub

2. **Créer un nouveau projet**
   - Cliquez sur "New Project"
   - Sélectionnez "Deploy from GitHub repo"
   - Choisissez ce repository

3. **Ajouter une base de données PostgreSQL**
   - Dans votre projet Railway, cliquez sur "New"
   - Sélectionnez "Database" → "PostgreSQL"
   - Railway génère automatiquement DATABASE_URL

4. **Configurer les variables d'environnement**
   - Dans les paramètres du service, ajoutez :
   ```
   NODE_ENV=production
   SESSION_SECRET=votre-clé-secrète-très-longue-et-sécurisée-minimum-32-caractères
   ```
   - DATABASE_URL sera automatiquement configurée

5. **Déployer**
   - Railway détecte automatiquement Node.js
   - Le déploiement se lance automatiquement
   - Votre app sera disponible sur une URL Railway

## Alternative : Render.com

1. Créer un compte sur [render.com](https://render.com)
2. Connecter votre repository GitHub
3. Créer un "Web Service"
4. Ajouter une base de données PostgreSQL
5. Configurer les variables d'environnement

## Pourquoi pas Netlify ?

Netlify est conçu pour les sites statiques uniquement. Votre application nécessite :
- Un serveur Node.js/Express
- Une base de données PostgreSQL
- La gestion des sessions côté serveur

Ces fonctionnalités ne sont pas supportées par Netlify.