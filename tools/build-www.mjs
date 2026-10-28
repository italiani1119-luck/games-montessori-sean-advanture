import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'www');
const entries = ['index.html', 'manifest.webmanifest', 'sw.js', 'css', 'js', 'vendor', 'assets'];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const entry of entries) {
  cpSync(resolve(root, entry), resolve(out, entry), {
    recursive: true,
    filter: (src) => !src.endsWith('.key')
  });
}

console.log('www ready');
