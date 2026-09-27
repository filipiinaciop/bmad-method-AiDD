'use strict';

const express = require('express');
const path = require('node:path');

const app = express();
const port = Number(process.env.PORT) || 3000;
const srcDirectory = path.join(__dirname, 'src');

app.disable('x-powered-by');
app.use(express.static(srcDirectory));
app.get('/', (_request, response) => {
  response.sendFile(path.join(srcDirectory, 'views', 'index.html'));
});
app.use((_request, response) => {
  response.status(404).send('Página não encontrada.');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Germinare Tech disponível em http://localhost:${port}`);
  });
}

module.exports = app;
