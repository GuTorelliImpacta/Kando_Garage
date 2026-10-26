import { useEffect, useRef } from 'react';
import { company, copy, fichaCaption, links, reviews, reviewsSection as S } from '../content/site';
import { prefersReducedMotion } from '../hooks/useMatchMedia';
import { ReviewCard } from './ReviewCard';
import { Reveal } from './Reveal';

/** Contagem 0,0 → 5,0 em 900 ms ao entrar na tela (direto no DOM; reduced-motion mostra 5,0). */
function useCountUp(ref: React.RefObject<HTMLElement | null>, target: number) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 900);
          el.textContent = (target * (1 - (1 - p) ** 3)).toFixed(1).replace('.', ',');
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = '0,0';
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, target]);
}

export function Reviews() {
  const numRef = useRef<HTMLSpanElement>(null);
  useCountUp(numRef, Number(company.rating.value.replace(',', '.')));
  const shown = reviews.filter((r) => r.confirmed);
  return (
    <section id="avaliacoes" className="sec sec--flush-top paper" aria-labelledby="av-h">
      <div className="wrap">
        <p className="label label--amber-l">{fichaCaption('reviews')}</p>
        <h2 id="av-h" className="h2">{S.h2}</h2>
        <div className={`rev${shown.length ? '' : ' rev--solo'}`}>
          <Reveal className="panel">
            <p className="panel__n">
              <span ref={numRef} className="num" aria-hidden="true">{company.rating.value}</span>
              <span className="sr-only">{company.rating.value}</span>
            </p>
            <p className="panel__t">{copy.reviews.panelLine}</p>
            <div className="panel__links">
              <a className="btn btn--ghost" href={links.mapsReviews} target="_blank" rel="noopener noreferrer">{S.seeAll}</a>
              <a className="btn btn--ghost" href={links.writeReview} target="_blank" rel="noopener noreferrer">{S.rate}</a>
            </div>
          </Reveal>
          {shown.length > 0 && (
            <Reveal as="div" className="rlist" step={1}>
              {shown.map((r) => (
                <ReviewCard key={r.text} r={r} />
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
