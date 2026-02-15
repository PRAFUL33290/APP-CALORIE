# Application Scan Calories

Application web de suivi des calories construite avec React, Vite et Express.

## Prérequis

Avant de lancer l'application, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure)
- **npm** (généralement installé avec Node.js)
- Un compte **Supabase** (pour la base de données et l'authentification)

## Installation

1. **Cloner le repository** (si ce n'est pas déjà fait) :
```bash
git clone https://github.com/PRAFUL33290/APP-CALORIE.git
cd APP-CALORIE
```

2. **Installer les dépendances du frontend** :
```bash
npm install
```

3. **Installer les dépendances du serveur backend** :
```bash
cd server
npm install
cd ..
```

## Configuration

### Variables d'environnement

1. **Créer le fichier `.env` à la racine du projet** :
```bash
cp .env.example .env
```

2. **Éditer le fichier `.env`** et remplir les valeurs :
```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_clé_supabase
VITE_API_URL=http://localhost:3001
```

3. **Créer le fichier `.env` pour le serveur** (dans le dossier `server/`) :
```bash
cd server
touch .env
```

Ajouter les variables suivantes dans `server/.env` :
```env
PORT=3001
FRONTEND_URL=http://localhost:5173
ANTHROPIC_API_KEY=votre_clé_anthropic
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_KEY=votre_clé_service_supabase
```

## Comment lancer l'application ?

L'application se compose de deux parties qui doivent être lancées séparément :

### 1. Lancer le serveur backend

Dans un premier terminal :

```bash
cd server
npm run dev
```

Le serveur démarrera sur `http://localhost:3001`

Vous devriez voir le message :
```
Server running on port 3001
```

### 2. Lancer le frontend

Dans un second terminal (à la racine du projet) :

```bash
npm run dev
```

Le frontend démarrera sur `http://localhost:5173`

Vite affichera l'URL dans le terminal :
```
  VITE v7.3.1  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 3. Accéder à l'application

Ouvrez votre navigateur et allez sur :
```
http://localhost:5173
```

## Scripts disponibles

### Frontend (à la racine du projet)

- `npm run dev` - Lance le serveur de développement Vite
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint

### Backend (dans le dossier `server/`)

- `npm run dev` - Lance le serveur en mode développement avec rechargement automatique
- `npm start` - Lance le serveur en mode production

## Dépannage

### Le serveur backend ne démarre pas

- Vérifiez que le port 3001 n'est pas déjà utilisé
- Assurez-vous que toutes les variables d'environnement sont correctement configurées dans `server/.env`

### Le frontend ne se connecte pas au backend

- Vérifiez que le serveur backend est bien démarré
- Vérifiez que `VITE_API_URL` dans le fichier `.env` pointe vers `http://localhost:3001`

### Erreurs Supabase

- Vérifiez que vos clés Supabase sont correctes dans les fichiers `.env`
- Assurez-vous que votre projet Supabase est actif

## Technologies utilisées

- **Frontend** : React 19, Vite, Tailwind CSS, React Router
- **Backend** : Node.js, Express, Supabase
- **IA** : Anthropic Claude (pour l'analyse des calories)
