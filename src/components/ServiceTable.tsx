import { copy, servicesSection as S, services } from '../content/site';
import { Reveal } from './Reveal';
import { ServiceRow } from './ServiceRow';
import { WaLink } from './WaLink';

export function ServiceTable() {
  const c = copy.services.cols;
  return (
    <section id="servicos" className="sec paper" aria-labelledby="servicos-h">
      <div className="wrap">
        <p className="label label--amber-l">{S.caption}</p>
        <h2 id="servicos-h" className="h2">{S.h2}</h2>
        <p className="lead">{S.intro}</p>
        <Reveal className="sheet">
          <table className="spec">
            <caption className="sr-only">{copy.services.tableCaption}</caption>
            <thead>
              <tr>
                <th scope="col">{c.n}</th>
                <th scope="col">{c.service}</th>
                <th scope="col">{c.what}</th>
                <th scope="col">{c.source}</th>
                <th scope="col">{c.action}</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <ServiceRow key={s.id} s={s} />
              ))}
            </tbody>
          </table>
          <div className="sheet__foot">
            <div>
              <p className="sheet__h">{S.outroH}</p>
              <p>{S.outroText}</p>
            </div>
            <WaLink origin="servicos" className="btn btn--primary" />
          </div>
        </Reveal>
        <p className="fine fine--l">{S.introNote}</p>
      </div>
    </section>
  );
}
