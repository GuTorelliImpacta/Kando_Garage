// axe-core em todas as páginas, nos dois esquemas de cor e em dois tamanhos de tela. Também reporta erros de console (CSP).
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { AxeBuilder } from '@axe-core/playwright';
const base = process.argv[2] ?? 'http://localhost:4322';
const b = await chromium.launch();
let total = 0;
for (const scheme of ['dark', 'light']) for (const vp of [[360, 740], [1280, 800]]) for (const path of ['/', '/politica-de-privacidade', '/nao-existe']) {
  const ctx = await b.newContext({ colorScheme: scheme, viewport: { width: vp[0], height: vp[1] } });
  const p = await ctx.newPage(); const errs = [];
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(base + path); await p.waitForTimeout(500);
  await p.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important;transition:none!important}' });
  const r = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
  console.log(`${scheme} ${vp[0]} ${path}: ${r.violations.length} violações, ${errs.length} erros de console`);
  for (const v of r.violations) { total++; console.log('  -', v.impact, v.id, v.help, v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')); }
  errs.forEach((e) => console.log('  console:', e));
  await ctx.close();
}
await b.close();
process.exit(total ? 1 : 0);
