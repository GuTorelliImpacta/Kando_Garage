import { renderToString } from 'react-dom/server';
import { App } from './App';
import { getSiteUrl } from './content/site';
import { headFor } from './seo';

/** Chamado pelo scripts/prerender.mjs: devolve o HTML do app e o <head> da rota. */
export function render(path: string) {
  return { html: renderToString(<App path={path} />), head: headFor(path, getSiteUrl()) };
}
