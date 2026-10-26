import { company, analytics } from '../content/site';

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-btn]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (!btn || !menu) return;

  const focusables = () => [btn, ...menu.querySelectorAll<HTMLElement>('a')];
  const setOpen = (open: boolean) => {
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector<HTMLElement>('a')?.focus(); else btn.focus();
  };
  btn.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', () => {
    menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
  }));
  document.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('open')) return;
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'Tab') {
      // foco preso no menu aberto
      const f = focusables();
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  matchMedia('(min-width: 900px)').addEventListener('change', (m) => { if (m.matches) setOpen(false); });
}

/** A barra fixa some quando o rodapé (que tem os mesmos botões) entra na tela. */
export function initActionBar(): void {
  const footer = document.querySelector('[data-footer]');
  const targets = document.querySelectorAll<HTMLElement>('[data-action-bar], [data-fab]');
  if (!footer || !targets.length || !('IntersectionObserver' in window)) return;
  new IntersectionObserver((en) => {
    const hide = en[0].isIntersecting;
    targets.forEach((t) => t.classList.toggle('hidden', hide));
  }, { threshold: 0.15 }).observe(footer);
}

/** E-mail montado no navegador: não aparece em texto plano no HTML. Sem JS, fica o texto "arroba". */
export function initEmail(): void {
  const [user, domain] = company.email.split('@');
  const addr = `${user}@${domain}`;
  document.querySelectorAll<HTMLAnchorElement>('a[data-email]').forEach((a) => {
    a.href = `mailto:${addr}`;
    a.removeAttribute('role');
    const t = a.querySelector('[data-email-text]');
    if (t) t.textContent = addr;
  });
}

export function initMap(): void {
  const box = document.querySelector<HTMLElement>('[data-map]');
  const btn = document.querySelector<HTMLButtonElement>('[data-map-load]');
  if (!box || !btn) return;
  btn.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = box.dataset.src ?? '';
    f.title = 'Mapa: Kando Garage, R. Mamud Rahd, 202, Tremembé';
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    box.querySelector('svg.mapart')?.replaceWith(f);
    btn.remove();
  });
}

export function initYear(): void {
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
}

export function initReviewsNav(): void {
  const track = document.querySelector<HTMLElement>('[data-rv-track]');
  if (!track) return;
  const step = () => Math.max(260, Math.round(track.clientWidth * 0.8));
  document.querySelector('[data-rv-prev]')?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  document.querySelector('[data-rv-next]')?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
}

interface Photo { src: string; alt: string; caption: string }
export function initLightbox(): void {
  const dlg = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  const data = document.getElementById('gallery-data');
  if (!dlg || !data) return;
  const photos: Photo[] = JSON.parse(data.textContent ?? '[]');
  const img = dlg.querySelector<HTMLImageElement>('[data-lb-img]')!;
  const cap = dlg.querySelector<HTMLElement>('[data-lb-cap]')!;
  let i = 0, opener: HTMLElement | null = null;
  const show = (n: number) => {
    i = (n + photos.length) % photos.length;
    img.src = photos[i].src; img.alt = photos[i].alt; cap.textContent = photos[i].caption;
  };
  document.querySelectorAll<HTMLElement>('[data-lb]').forEach((b) => b.addEventListener('click', () => {
    opener = b; show(Number(b.dataset.lb)); dlg.showModal();
  }));
  dlg.querySelector('[data-lb-prev]')?.addEventListener('click', () => show(i - 1));
  dlg.querySelector('[data-lb-next]')?.addEventListener('click', () => show(i + 1));
  dlg.querySelector('[data-lb-close]')?.addEventListener('click', () => dlg.close());
  dlg.addEventListener('close', () => opener?.focus());
  dlg.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
}

/**
 * Medição opcional (desligada por padrão em site.ts). Sem cookies e sem dados pessoais.
 * Só dispara se um provedor cookieless estiver presente na página.
 */
export function initTracking(): void {
  if (!analytics.enabled) return;
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
    if (!el) return;
    const name = el.dataset.track!;
    const props = { origem: el.dataset.origem ?? '', item: el.dataset.item ?? '' };
    const w = window as unknown as { plausible?: (n: string, o: object) => void; va?: (a: string, o: object) => void; umami?: { track: (n: string, p: object) => void } };
    try {
      w.plausible?.(name, { props });
      w.va?.('event', { name, ...props });
      w.umami?.track(name, props);
    } catch { /* medição nunca pode quebrar o site */ }
  });
}
