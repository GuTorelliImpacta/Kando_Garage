import { hours } from '../content/site';
import { useClock } from '../hooks/useClock';

interface Props {
  /** Acrescenta o resumo do horário depois do status. */
  withSummary?: boolean;
  /** Região viva (só uma instância por página deve anunciar). */
  live?: boolean;
  className?: string;
}

/**
 * Status "aberto agora". O render inicial é neutro (mostra só o resumo do horário) e não depende
 * de Date/Intl: o estado real chega após a hidratação, no fuso America/Sao_Paulo.
 */
export function StatusBadge({ withSummary = false, live = false, className = '' }: Props) {
  const clock = useClock();
  const st = clock?.status;
  const text = st ? (withSummary ? `${st.full} · ${hours.summary}` : st.full) : hours.summary;
  return (
    <p className={`status ${className}`.trim()} data-state={st?.state ?? 'idle'} role={live ? 'status' : undefined}>
      <i className="lamp" aria-hidden="true" />
      <span className="status__t">{text}</span>
    </p>
  );
}
