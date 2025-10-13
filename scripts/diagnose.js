const fs = require('fs');
const path = require('path');
const child = require('child_process');
const http = require('http');

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

function safeExec(cmd) {
  try { return child.execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim(); }
  catch (e) { return null; }
}

function probe(port, timeout = 1500) {
  return new Promise((resolve) => {
    const req = http.get({ hostname: '127.0.0.1', port, path: '/', timeout }, (res) => {
      resolve({ ok: true, statusCode: res.statusCode, port });
      res.destroy();
    });
    req.on('error', () => resolve({ ok: false, port }));
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, port }); });
  });
}

(async function main() {
  console.log('Project diagnostics for:', root);
  console.log('----------------------------------------------------');

  // Node / npm
  const nodeV = safeExec('node -v');
  const npmV = safeExec('npm -v');
  console.log('Environment:');
  console.log('  node:', nodeV || 'NOT FOUND');
  console.log('  npm :', npmV || 'NOT FOUND');
  if (!nodeV) {
    console.warn('  -> Install Node.js (includes npm) from https://nodejs.org and retry.');
  }

  // File tree summary (brief)
  const all = listAll(root);
  console.log('\nTop entries (project root):');
  all.slice(0, 40).forEach((f) => console.log('  -', f));
  if (all.length > 40) console.log('  ... (truncated)');

  // package.json
  const pj = readJSON('package.json');
  if (!pj) {
    console.warn('\npackage.json: NOT FOUND. You must run this from the project root or create package.json (npm init).');
  } else {
    console.log('\npackage.json found. Scripts snapshot:');
    console.log('  scripts:', pj.scripts ? Object.keys(pj.scripts).join(', ') : '(none)');
    const deps = Object.assign({}, pj.dependencies || {}, pj.devDependencies || {});
    const hasReactScripts = !!deps['react-scripts'];
    const hasVite = !!deps['vite'] || !!pj.devDependencies?.vite;
    console.log('  detected deps (react-scripts):', hasReactScripts);
    console.log('  detected deps (vite):', hasVite);
    if (hasReactScripts) console.log('  Recommendation: CRA detected -> use "npm start". Keep public/index.html as-is.');
    if (hasVite) console.log('  Recommendation: Vite detected -> use "npm run dev". Ensure index.html is at project root.');
  }

  // Common files
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

  // Dev server probe
  console.log('\nProbing local dev-server ports (127.0.0.1:3000 and :5173)...');
  const probes = await Promise.all([probe(3000), probe(5173)]);
  probes.forEach(p => {
    if (p.ok) console.log(`  port ${p.port}: responded (status ${p.statusCode}) -> dev server running`);
    else console.log(`  port ${p.port}: no response -> server not running on this port`);
  });

  // Quick actionable summary for Windows desktop
  console.log('\nQuick actions to run on Windows (from project root):');
  if (!nodeV) {
    console.log('  1) Install Node.js from https://nodejs.org');
    console.log('  2) Re-open terminal and verify: node -v && npm -v');
    return;
  }

  console.log('  1) Install dependencies:');
  console.log('       npm install');
  if (pj && pj.scripts) {
    if (pj.scripts.start) console.log('  2) Start (CRA / other): npm start');
    if (pj.scripts.dev) console.log('  2) Start (Vite/other): npm run dev');
    if (!pj.scripts.start && !pj.scripts.dev) console.log('  2) No start/dev script found in package.json — inspect package.json and add an appropriate script.');
  } else {
    console.log('  2) No scripts in package.json — inspect package.json and add "start" or "dev".');
  }

  console.log('\nIf server does not start or probes above show no server:');
  console.log('  - Run the start command and watch the terminal for build errors.');
  console.log('  - Open browser DevTools (F12) -> Console and Network. Copy any red errors and paste here.');
  console.log('  - If you see "PORT in use" or permission errors, reboot or change the dev server port.');
  console.log('\nPaste the full output of this script and any terminal/browser errors here and I will provide exact file edits.');
})();
