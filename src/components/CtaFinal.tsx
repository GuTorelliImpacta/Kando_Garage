import { ctaFinal } from '../content/site';
import { chunkWords } from '../lib/track';
import { Emblem } from './Emblem';
import { StatusBadge } from './StatusBadge';
import { WaLink } from './WaLink';

export function CtaFinal() {
  return (
    <section className="sec cta dark-a grain plate-mask" aria-labelledby="cta-h">
      <Emblem id="cta" spin line={false} className="cta__emblem" />
      <div className="wrap cta__in">
        <p className="label label--amber">{ctaFinal.caption}</p>
        <h2 id="cta-h" className="h2 h2--xl">
          {chunkWords(ctaFinal.h2, 3).map((l, i) => (
            <span key={i}><span className="l">{l}</span>{' '}</span>
          ))}
        </h2>
        <p className="lead">{ctaFinal.text}</p>
        <WaLink origin="cta_final" now className="btn btn--primary btn--xl" />
        <StatusBadge />
      </div>
    </section>
  );
}
