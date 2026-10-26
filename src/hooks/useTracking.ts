import { useEffect } from 'react';
import { analytics } from '../content/site';

type Provider = {
  plausible?: (n: string, o: object) => void;
  va?: (a: string, o: object) => void;
  umami?: { track: (n: string, p: object) => void };
};

/**
 * Medição opcional, desligada por padrão (analytics.enabled = false em site.ts).
 * Sem cookies e sem dados pessoais. Só chama um provedor cookieless se ele existir na página.
 */
export function useTracking(): void {
  useEffect(() => {
    if (!analytics.enabled) return;
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
      if (!el) return;
      const name = el.dataset.track!;
      const props = { origem: el.dataset.origem ?? '', item: el.dataset.item ?? '' };
      const w = window as unknown as Provider;
      try {
        w.plausible?.(name, { props });
        w.va?.('event', { name, ...props });
        w.umami?.track(name, props);
      } catch {
        /* medição nunca pode quebrar o site */
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
