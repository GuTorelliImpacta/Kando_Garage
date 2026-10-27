import { company, copy, hero, links } from '../content/site';
import { chunkWords } from '../lib/track';
import { Emblem, EmblemBlueprint } from './Emblem';
import { StatusBadge } from './StatusBadge';
import { WaLink } from './WaLink';

export function Hero() {
  return (
    <section id="inicio" className="hero sec dark-a grain" aria-labelledby="hero-h1">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-h1" className="hero__h1">
            {chunkWords(hero.h1).map((l, i) => (
              <span key={i}>
                <span className="l">{l}</span>{' '}
              </span>
            ))}
          </h1>
          <p className="lead">{hero.sub}</p>
          <div className="btns">
            <WaLink origin="hero" href={hero.ctaPrimaryHref} label={hero.ctaPrimary} className="btn btn--primary btn--lg" />
            <a className="btn btn--ghost btn--lg" href="#sintomas">{hero.ctaSecondary}</a>
          </div>
          <div className="proof">
            <a className="proof__link" href={links.mapsReviews} target="_blank" rel="noopener noreferrer">
              <span className="proof__n num">{company.rating.value}</span>
              <span className="proof__t">{copy.hero.proofLabel}</span>
            </a>
            <StatusBadge withSummary live />
          </div>
        </div>
        <figure className="hero__plate">
          <div className="crop crop--4">
            <div className="plate__art">
              <Emblem id="hero" spin label={copy.ui.emblemLabel} className="plate__emblem" />
              <EmblemBlueprint id="herobp" className="plate__bp" />
            </div>
          </div>
          <figcaption className="plate__cap">{copy.hero.legend}</figcaption>
        </figure>
      </div>
      <div className="hazard" aria-hidden="true" />
    </section>
  );
}
