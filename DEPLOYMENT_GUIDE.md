# Guide de Déploiement - MoneyFlow

## 🚀 Options de Déploiement Recommandées

### Option 1: Railway (Recommandé)

Railway est parfait pour les applications full-stack Node.js avec base de données.

#### Étapes :

1. **Créer un compte** sur [railway.app](https://railway.app)

2. **Nouveau projet** :
   - Cliquez "New Project"
   - Sélectionnez "Deploy from GitHub repo"
   - Connectez ce repository

3. **Ajouter PostgreSQL** :
   - Dans le projet, cliquez "New"
   - Sélectionnez "Database" → "PostgreSQL"
   - Railway génère automatiquement `DATABASE_URL`

4. **Variables d'environnement** :
   ```
   NODE_ENV=production
   SESSION_SECRET=votre-clé-secrète-très-longue-minimum-32-caractères
   ```

5. **Déploiement automatique** :
   - Railway détecte `railway.json`
   - Build et déploiement automatiques
   - URL générée automatiquement

### Option 2: Render.com

Alternative gratuite avec limitations.

#### Étapes :

1. **Compte** sur [render.com](https://render.com)
2. **Web Service** depuis GitHub
3. **PostgreSQL Database** (plan gratuit disponible)
4. **Variables d'environnement** configurées automatiquement via `render.yaml`

### Option 3: Heroku

Pour les utilisateurs expérimentés.

#### Commandes :
```bash
# Installer Heroku CLI
npm install -g heroku

# Login et création
heroku login
heroku create moneyflow-app

# Ajouter PostgreSQL
heroku addons:create heroku-postgresql:mini

# Variables d'environnement
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=votre-clé-secrète

# Déploiement
git push heroku main
```

## ⚠️ Plateformes NON Compatibles

- **Netlify** : Sites statiques uniquement
- **Vercel** : Serverless, pas de sessions persistantes
- **GitHub Pages** : Sites statiques uniquement

## 🔧 Configuration Requise

### Variables d'environnement obligatoires :
- `DATABASE_URL` : Connexion PostgreSQL (auto-générée)
- `SESSION_SECRET` : Clé de session (minimum 32 caractères)
- `NODE_ENV=production`

### Ports :
- L'application écoute sur `process.env.PORT || 5000`
- Compatible avec tous les hébergeurs

## 🗄️ Base de Données

La synchronisation se fait automatiquement au déploiement via `postbuild` script.

### Tables créées :
- `users` : Comptes utilisateur
- `loan_applications` : Demandes de prêt (processus 7 étapes)
- `sessions` : Gestion des sessions

## ✅ Test de Déploiement

Une fois déployé, testez :
1. Page d'accueil accessible
2. Création de compte utilisateur
3. Simulation de prêt
4. Soumission de demande
5. Suivi du processus 7 étapes

## 🆘 Dépannage

### Erreur de base de données :
- Vérifiez `DATABASE_URL` dans les variables d'environnement
- Assurez-vous que PostgreSQL est provisionné

### Erreur de session :
- Vérifiez `SESSION_SECRET` (minimum 32 caractères)

### Build échoue :
- Vérifiez que toutes les dépendances sont dans `package.json`
- Consultez les logs de build de votre plateforme

## 📞 Support

En cas de problème, vérifiez :
1. Les logs de votre plateforme de déploiement
2. Les variables d'environnement
3. La connexion à la base de données