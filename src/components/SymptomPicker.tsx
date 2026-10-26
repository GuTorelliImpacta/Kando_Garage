import { copy, fichaCaption, symptoms, symptomsSection as S, ui, wa } from '../content/site';
import { trk } from '../lib/track';
import { Reveal } from './Reveal';

/** Checklist de inspeção: 10 linhas, cada uma é um link wa.me com a mensagem pronta. */
export function SymptomPicker() {
  return (
    <section id="sintomas" className="sec dark-b grain" aria-labelledby="sintomas-h">
      <div className="wrap split-cols">
        <div className="split-cols__side">
          <p className="label label--amber">{fichaCaption('symptoms')}</p>
          <h2 id="sintomas-h" className="h2">{S.h2}</h2>
          <p className="lead">{S.sub}</p>
          <p className="fine">{S.micro}</p>
          <p className="bignum" aria-hidden="true">
            <span className="bignum__n">{symptoms.length}</span>
            <span className="label">{copy.symptoms.countLabel}</span>
          </p>
        </div>
        <Reveal as="ol" role="list" className="rows">
          {symptoms.map((s) => (
            <li key={s.id} className={`rowwrap${s.warning ? ' rowwrap--warn' : ''}`}>
              <a
                className="row"
                href={wa(s.message)}
                target="_blank"
                rel="noopener noreferrer"
                {...trk('click_sintoma', 'sintomas', s.id)}
              >
                <span className="row__n" aria-hidden="true">{s.n}</span>
                <span className="row__body">
                  <span className="row__t">{s.label}</span>
                  <span className="row__meta">
                    <span className="row__s">{S.areaLabel}: {s.area}</span>
                    <span className="row__act">{ui.ctaWhatsapp}</span>
                  </span>
                </span>
              </a>
              {s.warning && <p className="row__warn">{s.warning}</p>}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
