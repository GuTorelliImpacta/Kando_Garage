import { useState } from 'react';
import { company, copy, fichaCaption, hours, links, location as L, ui } from '../content/site';
import { useClock } from '../hooks/useClock';
import { coord } from '../lib/track';
import { EmailLink } from './EmailLink';
import { MapArt } from './MapArt';
import { Reveal } from './Reveal';
import { StatusBadge } from './StatusBadge';
import { WaLink } from './WaLink';

/** Onde estamos: ficha de endereço, tabela de horário (dia de hoje destacado) e mapa com facade. */
export function Location() {
  const clock = useClock();
  const [map, setMap] = useState(false);
  const a = company.address;
  return (
    <section id="onde-estamos" className="sec sec--flush-top paper" aria-labelledby="loc-h">
      <div className="wrap">
       <div className="loc">
        <div className="loc__info">
          <p className="label label--amber-l">{fichaCaption('location')}</p>
          <h2 id="loc-h" className="h2">{L.h2}</h2>
          <p className="fine fine--l">{L.intro}</p>

          <div className="osf osf--l">
            <h3 className="label">{copy.location.addressLabel}</h3>
            <p>
              <a className="tlink" href={links.maps} target="_blank" rel="noopener noreferrer">
                {a.street}
                <br />
                {a.district}, {a.city}/{a.region} · {a.zip}
              </a>
            </p>
          </div>

          <table className="hours">
            <caption className="label">{L.hoursTitle}</caption>
            <tbody>
              {hours.table.map((r) => {
                const today = clock ? (r.days as readonly number[]).includes(clock.day) : false;
                return (
                  <tr key={r.label} aria-current={today ? 'date' : undefined}>
                    <th scope="row">
                      {r.label}
                      {today && <span className="hours__today"> · {L.today}</span>}
                    </th>
                    <td>{r.text}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <StatusBadge className="status--l" />
          <p className="fine fine--l">{hours.holidayNote}</p>

          <div className="btns btns--stack">
            <WaLink origin="local" className="btn btn--primary btn--lg" />
            <div className="btns__row">
              <a className="btn btn--ghost-l" href={links.tel}>{ui.call}</a>
              <a className="btn btn--ghost-l" href={links.maps} target="_blank" rel="noopener noreferrer">{ui.directions}</a>
              <EmailLink variant="button" light />
            </div>
          </div>
          <h3 className="label areas__h">{L.areaTitle}</h3>
          <ul className="areas">
            {L.area.map((b) => <li key={b}>{b}</li>)}
            <li className="areas__tail">{L.areaTail}</li>
          </ul>
        </div>

        <Reveal className="loc__map" step={1}>
          <div className="mapbox crop crop--4">
            {map ? (
              <iframe
                title={copy.ui.mapTitle}
                src={links.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <>
                <MapArt />
                <div className="mapbox__btns">
                  <button type="button" className="btn btn--dark" onClick={() => setMap(true)}>{L.loadMap}</button>
                  <a className="btn btn--ghost-l btn--solid" href={links.maps} target="_blank" rel="noopener noreferrer">{L.openMaps}</a>
                </div>
              </>
            )}
          </div>
          <p className="mapnote">
            <span className="label">{copy.location.coords} {coord(company.geo.lat)} · {coord(company.geo.lng)}</span>
            <span className="fine fine--l">{copy.location.mapSchematic}. {L.mapNote}</span>
          </p>
        </Reveal>
       </div>
      </div>
    </section>
  );
}
