import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { prefersReducedMotion } from '../hooks/useMatchMedia';

let io: IntersectionObserver | null = null;
function observer(): IntersectionObserver {
  io ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io!.unobserve(e.target);
        }
      }
    },
    { threshold: 0.15 },
  );
  return io;
}

interface Props {
  as?: string;
  className?: string;
  /** Escalonamento em ms (máx. 60 ms por item, até 6 itens). */
  step?: number;
  children?: ReactNode;
  id?: string;
}

/** Entrada por IntersectionObserver. Sem JS (ou com movimento reduzido) o conteúdo já está visível: ver base.css. */
export function Reveal({ as = 'div', className = '', step = 0, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      el.classList.add('in');
      return;
    }
    const o = observer();
    o.observe(el);
    return () => o.unobserve(el);
  }, []);
  const style = step ? ({ '--d': `${Math.min(step, 5) * 60}ms` } as CSSProperties) : undefined;
  return createElement(as, { ref, className: `reveal ${className}`.trim(), style, ...rest }, children);
}
