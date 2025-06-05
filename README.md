# Gestion et export de CV

Cette application est une petite plateforme web permettant de gérer et d'exporter un CV au format [JSON Resume](https://jsonresume.org/). Elle repose sur Express et l'outil `jsonresume` pour générer l'aperçu ou le fichier final.

L'interface web donne la possibilité de téléverser son fichier JSON, de choisir un thème et le format de sortie puis de prévisualiser ou télécharger le résultat.

## Installation

```bash
npm install
```

### Lancer le serveur

```bash
npm run start
```

Ensuite ouvrez votre navigateur à l'adresse `http://localhost:5000` pour accéder à l'interface.

Depuis cette page vous pourrez téléverser votre fichier JSON, choisir un thème et un format (PDF ou HTML), prévisualiser le rendu et exporter le fichier généré.

## API

### `GET /api/export`

Paramètres `theme`, `format` et `filename`. La route lance la commande `resume export` pour générer le fichier demandé (PDF ou HTML) avec le thème sélectionné, puis renvoie le fichier en téléchargement.

### `POST /api/upload`

Cette route accepte un champ `file` envoyé en `multipart/form-data`. Le fichier JSON est enregistré sous `resume.json` et servira aux fonctions d'aperçu et d'export.

### `GET /api/preview`

Prend un paramètre `theme` et renvoie le HTML généré à partir du CV importé. Cette route est utilisée pour l'aperçu dans l'interface web.
