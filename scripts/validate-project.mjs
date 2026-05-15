import { existsSync, readFileSync } from 'node:fs';

const required = [
  'config.xml',
  'www/index.html',
  'www/js/app.js',
  'www/js/config/env.js',
  'www/js/firebase/firebaseConnection.js',
  'www/js/services/firebaseService.js',
  'www/js/utils/exporters.js',
  'www/css/styles.css',
  'www/assets/logos/logo.svg',
  'firestore.rules',
  'README.md',
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error(`[validate] Missing required files:\n  ${missing.join('\n  ')}`);
  process.exit(1);
}

const index = readFileSync('www/index.html', 'utf8');
for (const token of ['VIPS Books UGB', 'app.js', 'styles.css']) {
  if (!index.includes(token)) {
    console.error(`[validate] index.html does not include "${token}"`);
    process.exit(1);
  }
}
// Credentials must NOT appear in index.html
for (const secret of ['apiKey', 'AIzaSy']) {
  if (index.includes(secret)) {
    console.error(`[validate] index.html contains a hardcoded credential ("${secret}"). Move it to firebaseConnection.js or inject via runtime env.`);
    process.exit(1);
  }
}

const app = readFileSync('www/js/app.js', 'utf8');
for (const token of ['CatalogView', 'AdminView', 'csv-import', 'DashboardView']) {
  if (!app.includes(token)) {
    console.error(`[validate] app.js does not register "${token}"`);
    process.exit(1);
  }
}

const envJs = readFileSync('www/js/config/env.js', 'utf8');
if (!envJs.includes('firebaseConnection.js')) {
  console.error('[validate] env.js must import from firebaseConnection.js');
  process.exit(1);
}

console.log('[validate] Project validation passed.');
