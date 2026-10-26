import { copy } from '../content/site';
import { Reveal } from './Reveal';

/** Ficha de confiança: tabela de fatos (não cards). Sem ícones, sem estrelas. */
export function TrustBar() {
  const { caption, items } = copy.trustBar;
  return (
    <section className="sec sec--tight paper" aria-labelledby="trust-h">
      <div className="wrap">
        <h2 id="trust-h" className="label trust__cap">{caption}</h2>
        <Reveal as="ul" role="list" className="facts">
          {items.map((it, i) => (
            <li key={it.head} className={`fact${i === 0 ? ' fact--num' : ''}`}>
              <strong className="fact__head">{it.head}</strong>
              {it.label && <span className="label fact__label">{it.label}</span>}
              <span className="fact__text">{it.text}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
