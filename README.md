# Gestion et export de CV

Cette application fournit une petite API Express pour générer un CV puis le télécharger. Une page HTML simple permet de lancer l'export directement depuis le navigateur.

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
