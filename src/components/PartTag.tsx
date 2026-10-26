import { copy, how, partTag, revision, wa } from '../content/site';
import { Reveal } from './Reveal';
import { WaLink } from './WaLink';

/** Etiqueta de peça (tag de oficina) + promessa + revisão por agenda. */
export function PartTag() {
  const q = how.highlight.quote;
  return (
    <section className="sec paper" aria-labelledby="peca-h">
      <div className="wrap peca">
        <Reveal className="tag">
          <div className="tag__hazard hazard" aria-hidden="true" />
          <div className="tag__body crop crop--4">
            <p className="tag__kicker label">{partTag.kicker} · {copy.partTag.number}</p>
            <dl className="tag__lines">
              {partTag.lines.map((l) => (
                <div key={l.k} className="tag__line">
                  <dt>{l.k}</dt>
                  <dd>{l.v}</dd>
                </div>
              ))}
              <div className="tag__line tag__line--blank">
                <dt>{copy.partTag.dateLabel}</dt>
                <dd aria-hidden="true">&nbsp;</dd>
              </div>
            </dl>
            <p className="tag__title">{partTag.title}.</p>
            <p className="tag__stamp label">{partTag.stamp}</p>
          </div>
        </Reveal>
        <Reveal className="peca__text" step={1}>
          <p className="label label--amber-l">{copy.partTag.promiseLabel}</p>
          <h2 id="peca-h" className="h2">{how.highlight.title}.</h2>
          <p className="lead">{how.highlight.text}</p>
          {q.confirmed && (
            <blockquote className="quote">
              <p>{`“${q.text}”`}</p>
              <footer className="label">{q.author}</footer>
            </blockquote>
          )}
          <WaLink origin="peca" className="btn btn--primary" />
        </Reveal>
      </div>
      <div className="wrap">
        <Reveal className="revisao">
          <div>
            <p className="label">{revision.caption}</p>
            <h3 className="revisao__h">{revision.h2}</h3>
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
