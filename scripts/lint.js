'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function javascriptFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? javascriptFiles(file) : file.endsWith('.js') ? [file] : [];
  });
}

const files = ['server.js', ...javascriptFiles(path.join(__dirname, '..', 'src')), ...javascriptFiles(path.join(__dirname, '..', 'tests'))];
const failures = files.filter((file) => spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' }).status !== 0);
if (failures.length) { console.error(`JavaScript inválido: ${failures.join(', ')}`); process.exit(1); }
console.log(`Lint OK: ${files.length} arquivos JavaScript verificados.`);
