// This script copies index-embedded.html to index.html before running the embedded build.
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, 'index-embedded.html');
const dest = path.join(__dirname, 'index.html');

fs.copyFile(src, dest)
  .then(() => console.log('Copied index-embedded.html to index.html for embedded build.'))
  .catch(err => {
    console.error('Failed to copy index-embedded.html:', err);
    // Remove process.exit for ESM compatibility
  });
