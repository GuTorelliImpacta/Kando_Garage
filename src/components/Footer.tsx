import { company as C, copy, footer as F, hours, links, ui } from '../content/site';
import { EmailLink } from './EmailLink';
import { Emblem } from './Emblem';

function Field({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="osf osf--d">
      <dt>{k}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function Footer() {
  const a = C.address;
  return (
    <footer className="foot" data-footer>
      <div className="foot__steel">
        <div className="wrap foot__brand">
          <Emblem id="foot" className="foot__mark" />
          <p className="foot__slogan">{`${C.slogan}.`}</p>
        </div>
      </div>
      <div className="wrap">
        <dl className="foot__fields">
          <Field k={copy.footer.addressLabel}>
            <a className="tlink" href={links.maps} target="_blank" rel="noopener noreferrer">
              {a.street}, {a.district}, {a.city}/{a.region}, {a.zip}
            </a>
          </Field>
          <Field k={copy.footer.whatsappLabel}>
            <a className="tlink" href={`https://wa.me/${C.phoneWa}`} target="_blank" rel="noopener noreferrer">{C.phoneDisplay}</a>
            {' · '}
            <a className="tlink" href={links.tel}>{ui.call}</a>
          </Field>
          <Field k={copy.footer.emailLabel}>
            <EmailLink />
          </Field>
          <Field k={copy.footer.instagramLabel}>
            <a className="tlink" href={links.instagram} target="_blank" rel="noopener noreferrer">{C.instagram.handle}</a>
          </Field>
          <Field k={copy.footer.hoursLabel}>
            {hours.table.map((r) => `${r.label}: ${r.text}`).join(' · ')}
          </Field>
          {C.cnpj.confirmed && <Field k={copy.footer.cnpjLabel}>{C.cnpj.value}</Field>}
        </dl>
        <div className="foot__legal">
          <a className="tlink" href="/politica-de-privacidade">{F.privacy}</a>
          <p>
            {copy.footer.rights} {copy.footer.year} {C.name} · {copy.footer.madeBy} {C.credit.name}
          </p>
        </div>
      </div>
      <div className="hazard" aria-hidden="true" />
    </footer>
  );
}
