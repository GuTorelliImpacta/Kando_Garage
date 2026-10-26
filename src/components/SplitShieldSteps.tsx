import { fichaCaption, how } from '../content/site';
import { Emblem } from './Emblem';
import { Reveal } from './Reveal';

/** Como trabalhamos: a página se parte como o escudo. Esquerda diagnóstico, direita serviço. */
export function SplitShieldSteps() {
  return (
    <section id="como-trabalhamos" className="sec dark-a grain" aria-labelledby="como-h">
      <div className="wrap">
        <p className="label label--amber">{fichaCaption('how')}</p>
        <h2 id="como-h" className="h2">{how.h2}</h2>
        <p className="lead">{how.intro}</p>
        <div className="shield-split">
          {how.halves.map((h, idx) => (
            <Reveal key={h.id} className={`half half--${idx ? 'r' : 'l'}`}>
              <Emblem id={`half${idx}`} line half={idx ? 'right' : 'left'} className="half__art" />
              <h3 className="half__h">{h.title}</h3>
              <ol className="steps" role="list" start={Number(h.steps[0].n)}>
                {h.steps.map((st) => (
                  <li key={st.n} className="step">
                    <span className="step__n" aria-hidden="true">{st.n}</span>
                    <div>
                      <h4 className="step__t">{st.title}</h4>
                      <p>{st.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
