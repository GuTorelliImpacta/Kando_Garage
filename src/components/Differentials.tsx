import { copy, differentials as D } from '../content/site';
import { Emblem } from './Emblem';
import { Reveal } from './Reveal';

export function Differentials() {
  return (
    <section id="diferenciais" className="sec dark-b grain" aria-labelledby="dif-h">
      <Emblem id="difw" line half="left" className="watermark" />
      <div className="wrap split-cols">
        <div className="split-cols__side">
          <p className="label label--amber">{D.caption}</p>
          <h2 id="dif-h" className="h2">{D.h2}</h2>
          <p className="bignum" aria-hidden="true">
            <span className="bignum__n">{String(D.items.length).padStart(2, '0')}</span>
            <span className="label">{copy.differentials.countLabel}</span>
          </p>
        </div>
        <Reveal as="ol" role="list" className="rows rows--static">
          {D.items.map((it) => (
            <li key={it.n} className="rowwrap">
              <div className="row">
                <span className="row__n" aria-hidden="true">{it.n}</span>
                <div className="row__body">
                  <h3 className="row__t">{it.title}</h3>
                  <p className="row__d">{it.text}</p>
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
