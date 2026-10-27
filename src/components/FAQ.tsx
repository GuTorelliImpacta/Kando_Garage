import { copy, faq, fichaCaption, faqSection as F } from '../content/site';
import { WaLink } from './WaLink';
import { Reveal } from './Reveal';

/** FAQ com <details> nativo. Só entram perguntas confirmadas e com resposta. */
export function FAQ() {
  const items = faq.filter((f) => f.confirmed && f.a.trim());
  if (!items.length) return null;
  return (
    <section id="duvidas" className="sec paper" aria-labelledby="faq-h">
      <div className="wrap split-cols">
        <div className="split-cols__side">
          <p className="label label--amber-l">{fichaCaption('faq')}</p>
          <h2 id="faq-h" className="h2">{F.h2}</h2>
        </div>
        <Reveal className="faq">
          {items.map((f, i) => (
            <details key={f.q} className="qa">
              <summary>
                <span className="qa__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="qa__q">{f.q}</span>
                <span className="qa__tog" aria-hidden="true">
                  <span className="qa__o">{copy.faq.open}</span>
                  <span className="qa__c">{copy.faq.close}</span>
                  <span className="qa__om">{copy.faq.openMark}</span>
                  <span className="qa__cm">{copy.faq.closeMark}</span>
                </span>
              </summary>
              <p className="qa__a">{f.a}</p>
            </details>
          ))}
          <p className="faq__more">
            <WaLink origin="faq" className="tlink" message={copy.faq.moreMessage} label={copy.faq.more} />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
