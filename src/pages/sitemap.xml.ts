import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const base = (site?.toString() ?? '').replace(/\/$/, '');
  const urls = ['', '/politica-de-privacidade'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${base}${u || '/'}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
