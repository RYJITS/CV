const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Sert la page principale (index.html)
app.use(express.static(path.join(__dirname)));

// Endpoint API pour exporter le CV
app.get('/api/export', (req, res) => {
  const { theme, format, filename } = req.query;

  const allowedThemes = ['elegant', 'caffeine'];
  const allowedFormats = ['pdf', 'html'];

  const safeTheme = allowedThemes.includes(theme) ? theme : null;
  const safeFormat = allowedFormats.includes(format) ? format : null;
  const safeFilename = filename && /^[a-zA-Z0-9_-]+$/.test(filename) ? filename : null;

  if (!safeTheme || !safeFormat || !safeFilename) {
    return res.status(400).send('Param\u00e8tres invalides');
  }

  const args = ['export', `${safeFilename}.${safeFormat}`, '--theme', safeTheme];
  const child = spawn('resume', args);

  child.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).send(`Erreur : code ${code}`);
    }

    const filePath = path.join(__dirname, `${safeFilename}.${safeFormat}`);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(500).send('Erreur : fichier non g\u00e9n\u00e9r\u00e9');
      }
      res.download(filePath);
    });
  });
});

// Route pour la page principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`API en ligne sur http://localhost:${PORT}`);
});
