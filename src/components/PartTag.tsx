import { copy, fichaCaption, partTag, revision, wa } from '../content/site';
import { Reveal } from './Reveal';

/** Etiqueta de peça (tag de oficina, que já traz a promessa) + revisão por agenda. */
export function PartTag() {
  return (
    <section className="sec paper" aria-labelledby="peca-h">
      <div className="wrap peca">
        <Reveal className="tag">
          <div className="tag__hazard hazard" aria-hidden="true" />
          <div className="tag__body crop crop--4">
            <p className="tag__kicker label">{partTag.kicker}</p>
            <dl className="tag__lines">
              {partTag.lines.map((l) => (
                <div key={l.k} className="tag__line">
                  <dt>{l.k}</dt>
                  <dd>{l.v}</dd>
                </div>
              ))}
            </dl>
            <p className="tag__title">{partTag.title}.</p>
            <p className="tag__stamp label">{partTag.stamp}</p>
          </div>
        </Reveal>
        <Reveal className="revisao" step={1}>
          <div>
            <p className="label">{fichaCaption('revision')}</p>
            <h2 id="peca-h" className="revisao__h">{revision.h2}</h2>
            <p className="revisao__t">{revision.text}</p>
            <a className="btn btn--dark" href={wa(revision.message)} target="_blank" rel="noopener noreferrer">
              {revision.cta}
            </a>
          </div>
          <div className="ruler" aria-hidden="true">
            <span className="ruler__end">{copy.partTag.rulerStart}</span>
            <span className="ruler__ticks" />
            <span className="ruler__end">{copy.partTag.rulerEnd}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
