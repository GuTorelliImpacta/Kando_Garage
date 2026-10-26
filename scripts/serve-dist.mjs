// Servidor estático de teste que aplica os headers de vercel.json (para validar a CSP localmente).
import http from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { gzipSync } from 'node:zlib';
const cfg = JSON.parse(readFileSync('vercel.json', 'utf8'));
const headers = Object.fromEntries(cfg.headers[0].headers.map((h) => [h.key, h.value]));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain', '.xml': 'application/xml' };
const port = Number(process.argv[2] ?? 4322);
http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  let f = join('dist', p);
  if (!existsSync(f) || statSync(f).isDirectory()) f = existsSync(f + '.html') ? f + '.html' : (p === '/' ? 'dist/index.html' : null);
  let code = 200;
  if (!f) { f = 'dist/404.html'; code = 404; }
  const ext = extname(f);
  let body = readFileSync(f);
  const h = { ...headers, 'Content-Type': types[ext] ?? 'application/octet-stream' };
  h['Cache-Control'] = /^\/assets\//.test(p) ? 'public, max-age=31536000, immutable' : /^\/fonts\//.test(p) ? 'public, max-age=2592000' : 'public, max-age=0, must-revalidate';
  if (['.html', '.js', '.css', '.svg', '.json', '.xml', '.txt', '.webmanifest'].includes(ext)) { body = gzipSync(body); h['Content-Encoding'] = 'gzip'; }
  res.writeHead(code, h);
  res.end(body);
}).listen(port, () => console.log('http://localhost:' + port));
