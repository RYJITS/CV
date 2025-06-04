
import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [theme, setTheme] = useState('elegant');
  const [filename, setFilename] = useState('cv_yann');

  const handleExport = async (format) => {
    const res = await axios.get('/api/export', {
      params: { theme, format, filename },
      responseType: 'blob'
    });
    const url = URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${format}`;
    a.click();
  };

  return (
    <div>
      <h1>Resume Manager</h1>
      <input 
        value={filename} 
        onChange={(e) => setFilename(e.target.value)} 
        placeholder="Nom du fichier" 
      />
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {['elegant', 'caffeine'].map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <button onClick={() => handleExport('pdf')}>Exporter PDF</button>
      <button onClick={() => handleExport('html')}>Exporter HTML</button>
    </div>
  );
}
