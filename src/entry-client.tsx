// Entrada mínima: o CSS entra aqui (vira inline no HTML) e a hidratação só começa depois da
// primeira pintura de conteúdo (FCP), para o React não competir com a primeira pintura (FCP/LCP).
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';

let started = false;
const go = () => {
  if (started) return;
  started = true;
  import('./hydrate').then((m) => m.start());
};
try {
  new PerformanceObserver((list, obs) => {
    if (list.getEntriesByName('first-contentful-paint').length) {
      obs.disconnect();
      setTimeout(go, 0);
    }
  }).observe({ type: 'paint', buffered: true });
} catch {
  requestAnimationFrame(() => setTimeout(go, 0));
}
// Aba em segundo plano não pinta (sem FCP): garante a hidratação mesmo assim.
setTimeout(go, 1500);
