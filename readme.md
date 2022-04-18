# Hot Takes

API REST réalisée pour Piiquante, une marque de sauces piquantes. Elle permet aux utilisateurs de partager et liker leurs sauces favorites.

## Tech Stack

NodeJS, Express, MongoDB

## Fonctionnalités

### Authentification

- Authentification par token JWT

- Mots de passe hashés avec Bcrypt

### CRUD

- Récupération des sauces existantes

- Création d'une sauce

- Modification d'une sauce

- Suppression d'une sauce

### Autres

- Upload de fichiers avec Multer

- Validation des données avec Yup

### Sécurité

- Helmet

- Rate Limit

- Express Mongo Sanitize

## Variables d'environnement

Avant de lancer ce projet, vous devrez ajouter les variables d'environnement suivantes dans un fichier .env

`DB_URL = mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE`

`TOKEN_SECRET = XXXXXXXX`

## Installation

#### Installer les dépendances

```bash
npm install
```

#### Démarrer le serveur

```bash
npm start
```
