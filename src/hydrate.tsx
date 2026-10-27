import { StrictMode, startTransition } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';

/** Hidrata o HTML pré-renderizado (ou monta do zero em `vite dev`, onde não há HTML). */
export function start() {
  const root = document.getElementById('root')!;
  const app = (
    <StrictMode>
      <App path={window.location.pathname} />
    </StrictMode>
  );
  // Em transição, a hidratação é fatiada (cede a cada ~5 ms) em vez de uma tarefa longa única.
  if (root.hasChildNodes()) startTransition(() => { hydrateRoot(root, app); });
  else createRoot(root).render(app);
}
