const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Sert la page principale (index.html)
app.use(express.static(path.join(__dirname)));

// Endpoint API pour exporter le CV
app.get('/api/export', (req, res) => {
  const { theme, format, filename } = req.query;
  const command = `resume export ${filename}.${format} --theme ${theme}`;
  
  exec(command, (error) => {
    if (error) {
      return res.status(500).send(`Erreur : ${error.message}`);
    }
    res.download(path.join(__dirname, `${filename}.${format}`));
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
