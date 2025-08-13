// This script copies index-full.html to index.html before running the full build.
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, 'index-full.html');
const dest = path.join(__dirname, 'index.html');

fs.copyFile(src, dest)
  .then(() => console.log('Copied index-full.html to index.html for full build.'))
  .catch(err => {
    console.error('Failed to copy index-full.html:', err);
    // Remove process.exit for ESM compatibility
  });
