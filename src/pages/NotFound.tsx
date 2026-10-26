import { copy, notFound } from '../content/site';
import { Emblem } from '../components/Emblem';
import { WaLink } from '../components/WaLink';

export function NotFound() {
  return (
    <section className="sec nf dark-a grain" aria-labelledby="nf-h">
      <div className="wrap nf__in">
        <div className="nf__art">
          <Emblem id="nf" loose className="nf__emblem" />
          <p className="nf__tag label">{copy.notFound.tag}</p>
        </div>
        <div className="nf__copy">
          <p className="label label--amber">{copy.notFound.label}</p>
          <h1 id="nf-h" className="h1">{notFound.h1}</h1>
          <p className="lead">{notFound.text}</p>
          <div className="btns">
            <a className="btn btn--ghost btn--lg" href="/">{notFound.home}</a>
            <WaLink origin="404" className="btn btn--primary btn--lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
