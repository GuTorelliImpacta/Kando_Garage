import { useEffect, useState } from 'react';
import { copy, links, ui, waDefault } from '../content/site';
import { trk } from '../lib/track';

/** Barra de ação fixa (mobile): só texto. Some quando o rodapé entra na tela. */
export function StickyActionBar() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const foot = document.querySelector('[data-footer]');
    if (!foot || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.05 });
    io.observe(foot);
    return () => io.disconnect();
  }, []);
  return (
    <nav className={`abar${hidden ? ' is-hidden' : ''}`} aria-label={copy.ui.quickActions}>
      <a className="abar__wa" href={waDefault} target="_blank" rel="noopener noreferrer" {...trk('click_whatsapp', 'barra')}>{copy.ui.whatsapp}</a>
      <a href={links.tel} {...trk('click_ligar', 'barra')}>{ui.call}</a>
      <a href={links.maps} target="_blank" rel="noopener noreferrer" {...trk('click_mapa', 'barra')}>{ui.directions}</a>
    </nav>
  );
}
