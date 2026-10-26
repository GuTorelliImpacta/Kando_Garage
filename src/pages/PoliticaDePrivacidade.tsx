import { notFound, privacy } from '../content/site';
import { EmailLink } from '../components/EmailLink';

export function PoliticaDePrivacidade() {
  return (
    <section className="sec doc paper" aria-labelledby="priv-h">
      <div className="wrap doc__in">
        <h1 id="priv-h" className="h1 h1--doc">{privacy.title}</h1>
        <p className="lead">{privacy.intro}</p>
        <ul className="doc__list" role="list">
          {privacy.items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p>
          {privacy.contact} <EmailLink />.
        </p>
        <p className="fine fine--l">{privacy.updated}</p>
        <a className="btn btn--dark" href="/">{notFound.home}</a>
      </div>
    </section>
  );
}
