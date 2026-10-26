import { hours } from '../content/site';

export type StatusState = 'open' | 'closing' | 'closed';
export interface Status { state: StatusState; full: string; short: string }

const DAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const DAY_NAME = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

const fmt = new Intl.DateTimeFormat('en-US', {
  timeZone: hours.timeZone, weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
});

/** Dia da semana e minutos desde 00:00 no fuso de São Paulo. */
export function nowInSaoPaulo(date: Date): { day: number; minutes: number } {
  const p = Object.fromEntries(fmt.formatToParts(date).map((x) => [x.type, x.value]));
  return { day: DAY_INDEX[p.weekday], minutes: Number(p.hour) * 60 + Number(p.minute) };
}

export const hourLabel = (m: number): string => {
  const h = Math.floor(m / 60), min = m % 60;
  return min ? `${h}h${String(min).padStart(2, '0')}` : `${h}h`;
};

export function computeStatus(date: Date = new Date()): Status {
  const { day, minutes } = nowInSaoPaulo(date);
  const today = hours.week[day];
  if (today && minutes >= today.open && minutes < today.close) {
    const left = today.close - minutes;
    if (left <= 60) {
      const t = left === 60 ? '1 h' : `${left} min`;
      return { state: 'closing', full: `Fecha em ${t}`, short: `Fecha em ${t}` };
    }
    return { state: 'open', full: `Aberto agora · fecha às ${hourLabel(today.close)}`, short: 'Aberto agora' };
  }
  let when: string | null = null;
  let open = 0;
  if (today && minutes < today.open) {
    when = 'hoje';
    open = today.open;
  } else {
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      const h = hours.week[d];
      if (h) {
        open = h.open;
        when = i === 1 ? 'amanhã' : DAY_NAME[d];
        break;
      }
    }
  }
  return { state: 'closed', full: `Fechado · abre ${when} às ${hourLabel(open)}`, short: 'Fechado' };
}
