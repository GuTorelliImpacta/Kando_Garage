import { analytics } from '../content/site';

/** Atributos de medição. Só viram dados na página; o envio é feito por useTracking, atrás da flag. */
export const trk = (name: string, origem: string, item?: string) =>
  analytics.enabled ? { 'data-track': name, 'data-origem': origem, ...(item ? { 'data-item': item } : {}) } : {};

/** Divide o H1 em linhas de duas palavras (a última leva o resto). */
export function chunkWords(text: string, size = 2): string[] {
  const w = text.split(' ');
  const out: string[] = [];
  for (let i = 0; i < w.length; i += size) out.push(w.slice(i, i + size).join(' '));
  return out;
}

export const coord = (n: number) => n.toFixed(4).replace('.', ',').replace('-', '−');
