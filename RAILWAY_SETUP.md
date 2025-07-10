# 🚀 Configuration Railway avec new_db

## Variables d'Environnement Railway

Dans Railway, configurez ces variables dans votre service web :

### Variables Requises :

```bash
# Base de données (syntaxe Railway)
new_db=${{ Postgres.DATABASE_URL }}

# Session (générez une clé sécurisée)
SESSION_SECRET=moneyflow-super-secret-key-2024-production-railway-deployment-secure

# Environnement
NODE_ENV=production
```

## 📋 Étapes de Configuration

### 1. Créer le Service PostgreSQL

1. Dans Railway, cliquez **"New"**
2. Sélectionnez **"Database" → "PostgreSQL"**
3. Nommez-le **"Postgres"** (important pour la référence)

### 2. Configurer les Variables

1. **Cliquez sur votre service web**
2. **Onglet "Variables"**
3. **Ajoutez** :

```
new_db=${{ Postgres.DATABASE_URL }}
SESSION_SECRET=votre-clé-secrète-très-longue
NODE_ENV=production
```

### 3. Syntaxe Railway

La syntaxe `${{ Postgres.DATABASE_URL }}` permet à Railway de :
- ✅ Référencer automatiquement la base de données
- ✅ Gérer les connexions internes
- ✅ Mettre à jour automatiquement si la base change

## 🔧 Avantages de cette Approche

1. **Référence directe** : `new_db` pointe vers votre PostgreSQL
2. **Sécurité** : Pas d'URL en dur dans le code
3. **Flexibilité** : Fallback sur `DATABASE_URL` pour autres plateformes
4. **Railway natif** : Utilise les fonctionnalités Railway

## ✅ Vérification

Après déploiement, dans les logs vous verrez :
```
Database connected successfully using new_db
Database schema synchronized
serving on port 5000
```

## 🔄 Migration depuis DATABASE_URL

Si vous utilisiez `DATABASE_URL` avant :
1. **Supprimez** `DATABASE_URL` des variables
2. **Ajoutez** `new_db=${{ Postgres.DATABASE_URL }}`
3. **Redéployez**

L'application détectera automatiquement `new_db` en priorité.

---

**Cette configuration est optimisée pour Railway !** 🚀