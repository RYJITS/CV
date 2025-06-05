# Gestion et export de CV

2ke2yw-codex/2025-06-05
Cette application est une petite plateforme web permettant de gérer et d'exporter un CV au format [JSON Resume](https://jsonresume.org/). Elle repose sur Express et l'outil `jsonresume` pour générer l'aperçu ou le fichier final.

L'interface web donne la possibilité de téléverser son fichier JSON, de choisir un thème et le format de sortie puis de prévisualiser ou télécharger le résultat.

Cette application fournit une API Express pour générer un CV puis le télécharger. Une interface web minimaliste permet d'importer un fichier JSON, de choisir un thème, de prévisualiser le rendu et d'exporter le CV en PDF ou HTML.
 main

## Installation

```bash
npm install
```

### Lancer le serveur

```bash
npm run start
```

2ke2yw-codex/2025-06-05
Ensuite ouvrez votre navigateur à l'adresse `http://localhost:5000` pour accéder à l'interface.

Depuis cette page vous pourrez téléverser votre fichier JSON, choisir un thème et un format (PDF ou HTML), prévisualiser le rendu et exporter le fichier généré.
=======
Ouvrez ensuite `http://localhost:5000` dans un navigateur pour accéder à l'interface.
main

## API

### `GET /api/export`

Paramètres `theme`, `format` et `filename`. La route lance la commande `resume export` pour générer le fichier demandé (PDF ou HTML) avec le thème sélectionné, puis renvoie le fichier en téléchargement.

### `POST /api/upload`

Cette route accepte un champ `file` envoyé en `multipart/form-data`. Le fichier JSON est enregistré sous `resume.json` et servira aux fonctions d'aperçu et d'export.

### `GET /api/preview`

2ke2yw-codex/2025-06-05
Prend un paramètre `theme` et renvoie le HTML généré à partir du CV importé. Cette route est utilisée pour l'aperçu dans l'interface web.
=======
Prend un paramètre `theme` et renvoie une page HTML générée à partir du CV importé. Cette route est utilisée pour l'aperçu dans l'interface web.
main
