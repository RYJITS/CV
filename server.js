const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5000;

function serveFile(res, filePath, contentType = 'text/html') {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'POST' && parsedUrl.pathname === '/api/upload') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        fs.writeFile('resume.json', JSON.stringify(data, null, 2), err => {
          if (err) {
            res.writeHead(500);
            return res.end("Erreur lors de l'enregistrement");
          }
          res.writeHead(200);
          res.end('OK');
        });
      } catch (e) {
        res.writeHead(400);
        res.end('JSON invalide');
      }
    });
    return;
  }

  if (parsedUrl.pathname === '/api/export') {
    const { theme, format, filename, inline } = parsedUrl.query;
    const allowedThemes = ['elegant', 'caffeine'];
    const allowedFormats = ['pdf', 'html'];

    const safeTheme = allowedThemes.includes(theme) ? theme : null;
    const safeFormat = allowedFormats.includes(format) ? format : null;
    const safeFilename = filename && /^[a-zA-Z0-9_-]+$/.test(filename) ? filename : null;

    if (!safeTheme || !safeFormat || !safeFilename) {
      res.writeHead(400);
      return res.end('Paramètres invalides');
    }

    const args = ['export', `${safeFilename}.${safeFormat}`, '--theme', safeTheme];
    const child = spawn('resume', args);

    child.on('close', (code) => {
      if (code !== 0) {
        res.writeHead(500);
        return res.end(`Erreur : code ${code}`);
      }

      const filePath = path.join(__dirname, `${safeFilename}.${safeFormat}`);
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          res.writeHead(500);
          return res.end('Erreur : fichier non généré');
        }
        const disposition = inline === 'true' ? 'inline' : 'attachment';
        res.writeHead(200, {
          'Content-Type': safeFormat === 'pdf' ? 'application/pdf' : 'text/html',
          'Content-Disposition': `${disposition}; filename="${safeFilename}.${safeFormat}"`
        });
        fs.createReadStream(filePath).pipe(res);
      });
    });
  } else {
    const filePath = parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname;
    serveFile(res, path.join(__dirname, filePath));
  }
});

server.listen(PORT, () => {
  console.log(`API en ligne sur http://localhost:${PORT}`);
});
