import { useEffect, useRef, useState } from 'react';
import { company, copy, nav, ui } from '../content/site';
import { Emblem } from './Emblem';
import { StatusBadge } from './StatusBadge';
import { WaLink } from './WaLink';

/** Header fixo: compacta com blur ao rolar, menu mobile com a palavra MENU, foco preso e Esc. */
export function Header({ home }: { home: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const prefix = home ? '' : '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Link ativo conforme a seção visível (só na home).
  useEffect(() => {
    if (!home || !('IntersectionObserver' in window)) return;
    const ids = nav.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [home]);

  // Menu aberto: trava a rolagem, prende o foco e fecha com Esc.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    const close = () => {
      setOpen(false);
      btnRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = [btnRef.current!, ...Array.from(panelRef.current!.querySelectorAll<HTMLElement>('a'))];
      const first = items[0];
      const last = items[items.length - 1];
      const cur = document.activeElement;
      if (e.shiftKey && (cur === first || !items.includes(cur as HTMLElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (cur === last || !items.includes(cur as HTMLElement))) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = matchMedia('(min-width: 1100px)');
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  return (
    <header className={`hdr${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}${home ? '' : ' hdr--solid'}`}>
      <div className="hdr__bar wrap">
        <a className="logo" href={home ? '#inicio' : '/'} onClick={() => setOpen(false)}>
          <Emblem id="hdr" className="logo__mark" />
          <span className="logo__word">{company.name}</span>
        </a>
        <button
          ref={btnRef}
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu-panel"
          aria-label={open ? ui.menuClose : ui.menuOpen}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? copy.ui.close : copy.ui.menu}
        </button>
        <nav id="menu-panel" ref={panelRef} className="menu" aria-label={copy.ui.mainNav}>
          <ol className="menu__list">
            {nav.map((n, i) => (
              <li key={n.href}>
                <a
                  href={prefix + n.href}
                  aria-current={active === n.href.slice(1) ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="menu__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ol>
          <WaLink origin="menu" className="btn btn--primary menu__cta" />
        </nav>
        <StatusBadge className="hdr__status" />
        <WaLink origin="header" className="btn btn--primary btn--sm hdr__cta" />
      </div>
    </header>
  );
}
