const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Aucun fichier');
  }
  fs.writeFile('resume.json', req.file.buffer, err => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de l'enregistrement");
    }
    res.json({ message: 'CV importé' });
  });
});

app.get('/api/export', (req, res) => {
  const theme = req.query.theme || 'flat';
  const format = req.query.format || 'pdf';
  const filename = req.query.filename || 'resume';
  const output = `${filename}.${format}`;

  const cmd = `npx resume export ${output} --resume resume.json --theme ${theme}`;
  exec(cmd, err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Export impossible');
    }
    res.download(output, err2 => {
      if (err2) console.error(err2);
      fs.unlink(output, () => {});
    });
  });
});

app.get('/api/preview', (req, res) => {
  const theme = req.query.theme || 'flat';
  const output = 'preview.html';
  const cmd = `npx resume export ${output} --resume resume.json --theme ${theme} --format html`;
  exec(cmd, err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Pr\u00e9visualisation impossible');
    }
    fs.readFile(output, 'utf8', (err2, data) => {
      if (err2) {
        console.error(err2);
        return res.status(500).send('Erreur lecture');
      }
      res.send(data);
      fs.unlink(output, () => {});
    });
  });
});

app.listen(PORT, () => {
  console.log(`Serveur en ecoute sur http://localhost:${PORT}`);
});
