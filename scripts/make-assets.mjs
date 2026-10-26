// Gera favicon.svg, apple-touch-icon.png, logo.png e og.jpg a partir do emblema do build.
// Uso: npm run build && node scripts/make-assets.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const html = readFileSync('dist/index.html', 'utf8');
const m = html.match(/<svg class="emblem[^>]*id=|<svg class="[^"]*emblem[^"]*"[\s\S]*?<\/svg>/);
let svg = m[0].replace(/<svg [^>]*?viewBox/, '<svg xmlns="http://www.w3.org/2000/svg" viewBox').replace(/ (class|aria-hidden|focusable|role|aria-label)="[^"]*"/g, '');
svg = svg.replace(/ astro-[a-z0-9-]+(="")?/g, '');
writeFileSync('public/favicon.svg', svg);

const fonts = `
@font-face{font-family:BC;font-weight:700;src:url(file://${process.cwd()}/public/fonts/barlow-condensed-700.woff2)}
@font-face{font-family:BC;font-weight:600;src:url(file://${process.cwd()}/public/fonts/barlow-condensed-600.woff2)}
@font-face{font-family:IN;font-weight:600;src:url(file://${process.cwd()}/public/fonts/inter-600.woff2)}`;
const browser = await chromium.launch();
const shot = async (w, h, body, path, opts = {}) => {
  const p = await browser.newPage({ viewport: { width: w, height: h } });
  await p.setContent(`<style>${fonts} *{margin:0;box-sizing:border-box} body{width:${w}px;height:${h}px;overflow:hidden}</style>${body}`);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path, ...opts });
  await p.close();
};
const emb = (css) => svg.replace('<svg ', `<svg style="${css}" `);
await shot(180, 180, `<div style="width:180px;height:180px;background:#141516;display:grid;place-items:center">${emb('height:140px;width:auto')}</div>`, 'public/apple-touch-icon.png');
await shot(512, 512, `<div style="width:512px;height:512px;background:#141516;display:grid;place-items:center">${emb('height:420px;width:auto')}</div>`, 'public/logo.png');
await shot(1200, 630, `
<div style="width:1200px;height:630px;background:radial-gradient(800px 420px at 85% 0%,rgba(226,104,58,.28),transparent 60%),radial-gradient(500px 360px at 0% 100%,rgba(224,163,58,.12),transparent 60%),#141516;display:flex;align-items:center;gap:72px;padding:0 90px;color:#f4f2ee;font-family:IN">
  ${emb('height:430px;width:auto;flex:none;filter:drop-shadow(0 24px 48px rgba(226,104,58,.3))')}
  <div>
    <div style="font:700 30px BC;letter-spacing:.18em;color:#e0a33a;text-transform:uppercase">Kando Garage · Tremembé, SP</div>
    <div style="font:700 112px/0.95 BC;margin:18px 0 26px">Seu carro<br>em boas mãos.</div>
    <div style="display:inline-flex;gap:14px;align-items:center;font:600 34px IN;border:2px solid rgba(224,163,58,.6);border-radius:999px;padding:12px 28px"><span style="color:#e0a33a">★ 5,0</span><span>no Google</span></div>
  </div>
</div>`, 'public/og.jpg', { type: 'jpeg', quality: 88 });
await browser.close();
console.log('assets ok');
