import { useSyncExternalStore } from 'react';
import { computeStatus, nowInSaoPaulo, type Status } from '../scripts/status-horario';

/**
 * Relógio compartilhado: um único intervalo para todos os componentes.
 * No servidor e na hidratação o snapshot é `null` (estado neutro), então o HTML
 * pré-renderizado nunca depende de Date/Intl. O valor real chega após a hidratação.
 */
export interface Clock {
  status: Status;
  day: number;
}

let snapshot: Clock | null = null;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function read(): Clock {
  const now = new Date();
  return { status: computeStatus(now), day: nowInSaoPaulo(now).day };
}

function tick() {
  const next = read();
  if (!snapshot || snapshot.status.full !== next.status.full || snapshot.day !== next.day) {
    snapshot = next;
    listeners.forEach((l) => l());
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (listeners.size === 1) {
    tick();
    timer = setInterval(tick, 30_000);
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && timer) clearInterval(timer);
  };
}

export function useClock(): Clock | null {
  return useSyncExternalStore(subscribe, () => snapshot, () => null);
}
