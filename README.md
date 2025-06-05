# Gestion et export de CV

Cette application fournit une petite API HTTP (sans dépendance) pour générer un CV puis le télécharger ou l'afficher. Une page HTML simple permet d'importer votre fichier JSON et de prévisualiser le résultat.

## Installation

```bash
npm install
```

- Lancer le serveur :

```bash
npm run start
```

Ensuite ouvrez `http://localhost:5000` dans un navigateur pour accéder à l'interface.

## API

### `GET /api/export`
Cette route prend en paramètre `theme`, `format` et `filename`. Elle exécute la commande `resume export` pour générer le fichier demandé (PDF ou HTML) avec le thème sélectionné. Ajoutez `inline=true` pour afficher le fichier directement dans le navigateur.

### `POST /api/upload`

Envoyez un fichier JSON contenant votre CV. Il sera enregistré sous `resume.json` et utilisé lors des exports ultérieurs.
