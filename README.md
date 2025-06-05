# Gestion et export de CV

Cette application fournit une petite API Express pour générer un CV puis le télécharger. Une page HTML simple permet de lancer l'export directement depuis le navigateur.

Cette version ajoute la possibilité d'importer un fichier JSON décrivant votre CV,
de choisir un thème, de prévisualiser le rendu et d'exporter le tout en PDF ou HTML.

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

Cette route prend en paramètre `theme`, `format` et `filename`. Elle exécute la commande `resume export` pour générer le fichier demandé (PDF ou HTML) avec le thème sélectionné, puis le renvoie en téléchargement.

### `POST /api/upload`

Envoie le contenu d'un fichier JSON contenant votre CV. Le corps de la requête doit être le JSON. Le fichier est enregistré côté serveur et utilisé pour les exports et aperçus.

### `GET /api/preview`

Prend un paramètre `theme` et renvoie une page HTML générée à partir du CV importé. Cette route est utilisée pour l'aperçu en ligne dans l'interface.
