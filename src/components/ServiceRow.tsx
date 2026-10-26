import { copy, servicesSection as S, wa, type Service } from '../content/site';
import { trk } from '../lib/track';

/** Linha da tabela técnica. O link cobre a linha inteira (stretched link). */
export function ServiceRow({ s }: { s: Service }) {
  return (
    <tr className="srow">
      <td className="srow__n">
        <span aria-hidden="true">{s.n}</span>
      </td>
      <th scope="row" className="srow__t">{s.title}</th>
      <td className="srow__d">{s.text}</td>
      <td className="srow__o">
        <span className="label">{copy.services.sourceLabels[s.source]}</span>
      </td>
      <td className="srow__a">
        <a className="tlink tlink--stretch" href={wa(s.message)} target="_blank" rel="noopener noreferrer" {...trk('click_servico', 'servicos', s.id)}>
          {S.link}
          <span className="sr-only">: {s.title}</span>
        </a>
      </td>
    </tr>
  );
}
