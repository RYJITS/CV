# Gestion et export de CV

Ce projet est une petite application permettant de gérer et d'exporter un CV. Un serveur Express expose une API pour générer des fichiers à partir d'un template, tandis qu'un client React interagit avec cette API.

## Installation

```bash
npm install
```

- Lancer le serveur :

```bash
npm run start
```

- Lancer le client (Vite) :

```bash
npm run frontend
```

## API

### `GET /api/export`

Cette route prend en paramètre `theme`, `format` et `filename`. Elle exécute la commande `resume export` pour générer le fichier demandé (PDF ou HTML) avec le thème sélectionné, puis le renvoie en téléchargement.
