export type Route = 'home' | 'privacy' | 'notfound';

/** Escolhe a rota pelo pathname (sem biblioteca de roteamento). */
export function resolveRoute(path: string): Route {
  const p = path.split(/[?#]/)[0].replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  if (p === '/' || p === '/index') return 'home';
  if (p === '/politica-de-privacidade') return 'privacy';
  return 'notfound';
}
