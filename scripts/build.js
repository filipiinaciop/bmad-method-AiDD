'use strict';

const fs = require('node:fs');
const path = require('node:path');
const requiredFiles = ['package.json', 'server.js', 'src/views/index.html', 'src/public/styles.css', 'src/models/domain.js', 'src/models/store.js', 'src/controllers/app-controller.js'];
const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(__dirname, '..', file)));
if (missing.length) { console.error(`Build incompleto. Arquivos ausentes: ${missing.join(', ')}`); process.exit(1); }
const html = fs.readFileSync(path.join(__dirname, '..', 'src/views/index.html'), 'utf8');
for (const reference of ['/public/styles.css', '/models/domain.js', '/models/store.js', '/controllers/app-controller.js']) {
  if (!html.includes(reference)) { console.error(`Build incompleto. Referência ausente: ${reference}`); process.exit(1); }
}
console.log('Build OK: baseline MVC, assets e referências da aplicação estão completos.');
