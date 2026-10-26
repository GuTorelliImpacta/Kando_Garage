// Pré-render estático: gera dist/index.html, dist/politica-de-privacidade.html e dist/404.html
// com o HTML renderizado (renderToString), <head> completo e CSS inline; também robots.txt e sitemap.xml.
// Roda depois de `vite build` (client) e `vite build --ssr` (entry-server).
import { readFileSync, writeFileSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = resolve('dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-->') || !template.includes('<!--head-->')) {
  throw new Error('dist/index.html não é o template do Vite (rode `vite build` antes do prerender).');
}

const ssrDir = resolve('dist-ssr');
const entry = readdirSync(ssrDir).find((f) => /^entry-server\.m?js$/.test(f));
if (!entry) throw new Error('dist-ssr/entry-server.js não encontrado (rode `vite build --ssr`).');
const { render } = await import(pathToFileURL(join(ssrDir, entry)).href);

// CSS inline (crítico = tudo; o CSP permite style 'unsafe-inline'). Scripts continuam externos.
let tpl = template;
const link = tpl.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (link) {
  const cssPath = join(dist, link[1]);
  const css = readFileSync(cssPath, 'utf8').trim();
  tpl = tpl.replace(link[0], `<style>${css}</style>`);
  rmSync(cssPath);
}


const pages = [
  { path: '/', file: 'index.html' },
  { path: '/politica-de-privacidade', file: 'politica-de-privacidade.html' },
  { path: '/404', file: '404.html' },
];

for (const p of pages) {
  const { html, head } = render(p.path);
  const out = tpl.replace('<!--head-->', head).replace('<!--app-->', html);
  writeFileSync(join(dist, p.file), out);
  console.log(`prerender ${p.file.padEnd(32)} ${(Buffer.byteLength(out) / 1024).toFixed(1)} KB`);
}

// robots.txt e sitemap.xml a partir de VITE_SITE_URL
const base = (process.env.VITE_SITE_URL || 'https://kandogarage.com.br').replace(/\/+$/, '');
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
const urls = ['/', '/politica-de-privacidade'];
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${base}${u}</loc></url>`).join('\n')}\n</urlset>\n`,
);
rmSync(ssrDir, { recursive: true, force: true });
console.log(`robots.txt e sitemap.xml gerados para ${base}`);
