# Gestion et export de CV

Cette application fournit une API Express pour générer un CV puis le télécharger. Une interface web minimaliste permet d'importer un fichier JSON, de choisir un thème, de prévisualiser le rendu et d'exporter le CV en PDF ou HTML.

## Installation

```bash
npm install
```

### Lancer le serveur

```bash
npm run start
```

Ouvrez ensuite `http://localhost:5000` dans un navigateur pour accéder à l'interface.

## API

### `GET /api/export`

Paramètres `theme`, `format` et `filename`. La route lance la commande `resume export` pour générer le fichier demandé (PDF ou HTML) avec le thème sélectionné, puis renvoie le fichier en téléchargement.

### `POST /api/upload`

Envoie le contenu d'un fichier JSON contenant votre CV. Le corps de la requête doit être le JSON. Le fichier est enregistré côté serveur et utilisé pour les exports et aperçus.

### `GET /api/preview`

Prend un paramètre `theme` et renvoie une page HTML générée à partir du CV importé. Cette route est utilisée pour l'aperçu dans l'interface web.
