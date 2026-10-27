import { company, copy, jsonLd, links, seo } from './content/site';
import { resolveRoute, type Route } from './lib/route';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function routeInfo(route: Route) {
  if (route === 'privacy') return { title: seo.privacyTitle, description: seo.privacyDescription, path: '/politica-de-privacidade' };
  if (route === 'notfound') return { title: seo.notFoundTitle, description: seo.notFoundDescription, path: null };
  return { title: seo.title, description: seo.description, path: '/' };
}

/** <head> completo de cada página pré-renderizada. */
export function headFor(urlPath: string, siteUrl: string): string {
  const route = resolveRoute(urlPath);
  const { title, description, path } = routeInfo(route);
  const base = siteUrl.replace(/\/+$/, '');
  const canonical = path === null ? null : path === '/' ? `${base}/` : `${base}${path}`;
  const img = `${base}/og.jpg`;
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}">`,
    canonical ? `<link rel="canonical" href="${esc(canonical)}">` : '<meta name="robots" content="noindex">',
    '<meta name="theme-color" content="#141516">',
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
    '<link rel="manifest" href="/manifest.webmanifest">',
    '<link rel="preload" href="/fonts/barlow-condensed-700.woff2" as="font" type="font/woff2" crossorigin>',
    '<meta property="og:type" content="website">',
    '<meta property="og:locale" content="pt_BR">',
    `<meta property="og:site_name" content="${esc(company.name)}">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    canonical ? `<meta property="og:url" content="${esc(canonical)}">` : '',
    `<meta property="og:image" content="${esc(img)}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${esc(copy.seoExtra.ogAlt)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(description)}">`,
    `<meta name="twitter:image" content="${esc(img)}">`,
  ];
  if (route === 'home') {
    // O e-mail fica de fora do JSON-LD: ele só é montado no cliente (ver EmailLink), para não aparecer em texto plano no HTML.
    const ld = jsonLd(base);
    for (const node of ld['@graph'] as Array<Record<string, unknown>>) {
      delete node.email;
      if (node['@type'] === 'AutoRepair') node.hasMap = links.mapsPlace;
    }
    const json = JSON.stringify(ld).replace(/</g, '\\u003c');
    lines.push(`<script type="application/ld+json">${json}</script>`);
  }
  return lines.filter(Boolean).join('\n    ');
}
