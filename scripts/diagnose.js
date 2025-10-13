const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function listAll(dir) {
  const results = [];
  function walk(current) {
    let entries = [];
    try { entries = fs.readdirSync(current, { withFileTypes: true }); }
    catch (e) { return; }
    for (const e of entries) {
      const full = path.join(current, e.name);
      results.push(path.relative(root, full));
      if (e.isDirectory()) walk(full);
    }
  }
  walk(dir);
  return results;
}

function exists(p) {
  try { return fs.existsSync(path.join(root, p)); } catch { return false; }
}

function readJSON(p) {
  try { return JSON.parse(fs.readFileSync(path.join(root, p), 'utf8')); }
  catch (e) { return null; }
}

console.log('Project diagnostics for:', root);
console.log('----------------------------------------------------');

// File tree summary (top-level and few nested)
const all = listAll(root);
console.log('Total files/folders discovered:', all.length);
console.log('Top 50 entries (relative to project root):');
all.slice(0, 50).forEach((f) => console.log('  -', f));
if (all.length > 50) console.log('  ... (truncated)');

console.log('\nChecks:');
const pj = readJSON('package.json');
if (!pj) {
  console.warn('package.json: NOT FOUND. This is required to detect scripts/dependencies. If missing, create one with npm init or ensure you are in the project root.');
} else {
  console.log('package.json found. Scripts snapshot:');
  console.log('  scripts:', pj.scripts ? Object.keys(pj.scripts).join(', ') : '(none)');
  const deps = Object.assign({}, pj.dependencies || {}, pj.devDependencies || {});
  const hasReactScripts = !!deps['react-scripts'];
  const hasVite = !!deps['vite'] || !!pj.devDependencies?.vite;
  console.log('  detected deps (react-scripts):', hasReactScripts);
  console.log('  detected deps (vite):', hasVite);
  if (hasReactScripts) console.log('  Recommendation: This looks like Create React App (CRA). Keep index.html in public/ and do not add <script src="/src/..."> manually.');
  if (hasVite) console.log('  Recommendation: This looks like Vite. Ensure index.html is at project root (not public/) and keep <script type="module" src="/src/main.jsx"> in that root index.html.');
}

const checks = [
  'public/index.html',
  'index.html',
  'src/main.jsx',
  'src/index.jsx',
  'src/main.js',
  'src/index.js',
  'vite.config.js',
  'webpack.config.js',
  'public/manifest.json',
  'public/favicon.ico',
  'src/App.jsx',
  'src/App.js'
];

console.log('\nPresence of common files:');
checks.forEach((c) => console.log(`  ${c}:`, exists(c) ? 'FOUND' : 'missing'));

console.log('\nQuick diagnosis heuristics:');
if (exists('public/index.html') && !exists('index.html')) {
  console.log('  - public/index.html present and root index.html missing -> typical CRA layout.');
}
if (exists('index.html') && !exists('public/index.html')) {
  console.log('  - root index.html present and public/index.html missing -> typical Vite layout.');
}
if (!pj) {
  console.log('  - Cannot determine bundler. Ensure package.json exists and contains either "react-scripts" (CRA) or "vite" or build/dev scripts.');
} else if (!pj.scripts || (!pj.scripts.start && !pj.scripts.dev)) {
  console.warn('  - package.json has no start/dev script. Run "npm install" and check project template.');
}

console.log('\nNext steps (manual):');
console.log('  1) Open a terminal in the project root and run the dev server:');
console.log('       - For CRA: npm start');
console.log('       - For Vite: npm run dev');
console.log('  2) Open browser devtools (F12) -> Console and Network tab. Copy any red errors here.');
console.log('  3) If React fails to mount: ensure src/main.jsx or src/index.jsx renders to #root and that your index.html location matches your bundler (see recommendations above).');

console.log('\nIf you want, paste the full output of this script and any console errors here and I will tell you the exact lines to change.');
