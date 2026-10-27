// Gera favicon.svg, apple-touch-icon.png, logo.png e og.jpg a partir do componente Emblem (React).
// Uso: npx tsx scripts/make-assets.mjs      (ou: npm run assets). Requer playwright (global).
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { Emblem } from '../src/components/Emblem.tsx';
import { copy, hero, company } from '../src/content/site.ts';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const svg = renderToStaticMarkup(createElement(Emblem, { id: 'asset' }))
  .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')
  .replace(/ (class|aria-hidden|focusable|role|aria-label)="[^"]*"/g, '');

// Favicon: escudo + divisão + uma engrenagem, monocromático, troca de cor com o esquema do navegador.
writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 232"><style>.s{fill:#17181a}.d{stroke:#f4f2ee}.g{fill:#f4f2ee}@media (prefers-color-scheme:dark){.s{fill:#f4f2ee}.d{stroke:#17181a}.g{fill:#17181a}}</style><path class="s" d="M100 8 18 38v78c0 54 36 86 82 108 46-22 82-54 82-108V38z"/><path class="d" d="M100 24v190" stroke-width="10" fill="none"/><circle class="g" cx="58" cy="96" r="30"/><circle class="s" cx="58" cy="96" r="10"/></svg>\n`,
);

// Fontes embutidas em base64 (a página do setContent não lê file://).
const abs = (f) => `data:font/woff2;base64,${readFileSync(`public/fonts/${f}`).toString('base64')}`;
const fonts = `
@font-face{font-family:BC;font-weight:700;src:url(${abs('barlow-condensed-700.woff2')})}
@font-face{font-family:IN;font-weight:600;src:url(${abs('inter-600.woff2')})}`;
const browser = await chromium.launch();
const shot = async (w, h, body, path, opts = {}) => {
  const p = await browser.newPage({ viewport: { width: w, height: h } });
  await p.setContent(`<style>${fonts} *{margin:0;box-sizing:border-box} body{width:${w}px;height:${h}px;overflow:hidden}</style>${body}`);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path, ...opts });
  await p.close();
};
const emb = (css) => svg.replace('<svg ', `<svg style="${css}" `);
await shot(180, 180, `<div style="width:180px;height:180px;background:#e2683a;display:grid;place-items:center">${emb('height:128px;width:auto')}</div>`, 'public/apple-touch-icon.png');
await shot(512, 512, `<div style="width:512px;height:512px;background:#141516;display:grid;place-items:center">${emb('height:420px;width:auto')}</div>`, 'public/logo.png');

const lines = hero.h1.toUpperCase().replace(/\.$/, '.').split(' ');
const h1 = [lines.slice(0, 2).join(' '), lines.slice(2, 4).join(' '), lines.slice(4).join(' ')].join('<br>');
await shot(1200, 630, `
<div style="position:relative;width:1200px;height:630px;background:#141516;color:#f4f2ee;font-family:IN;overflow:hidden">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:40px 40px;mask-image:linear-gradient(to left,#000,transparent 60%)"></div>
  <div style="position:absolute;left:64px;top:56px;width:780px">
    <div style="font:600 22px/1.3 IN;letter-spacing:.12em;text-transform:uppercase;color:#e0a33a;white-space:nowrap">${hero.eyebrow.split(' · ')[0]}</div>
    <div style="font:700 150px/.88 BC;margin:20px 0 0;text-transform:uppercase">${h1}</div>

  </div>
  <div style="position:absolute;right:92px;top:70px;width:380px;height:440px;border:0">
    ${emb('height:440px;width:auto;margin:0 auto')}
  </div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:12px;background:repeating-linear-gradient(135deg,#c4272c 0 12px,#141516 12px 24px)"></div>
  <div style="position:absolute;left:64px;bottom:40px;font:600 22px IN;letter-spacing:.14em;text-transform:uppercase;color:#e0a33a">${copy.hero.proofText}</div>
</div>`, 'public/og.jpg', { type: 'jpeg', quality: 66 });
await browser.close();
console.log('assets ok', company.name);
