// Testa o status de horário nos cenários do QA (fuso America/Sao_Paulo = UTC-3, sem horário de verão).
import { computeStatus } from '../src/scripts/status-horario.ts';
const at = (iso) => computeStatus(new Date(iso + '-03:00'));
const cases = [
  ['seg 07:59', '2026-10-26T07:59:00', 'closed', 'Fechado · abre hoje às 8h'],
  ['seg 08:00', '2026-10-26T08:00:00', 'open', 'Aberto agora · fecha às 18h'],
  ['seg 17:30', '2026-10-26T17:30:00', 'closing', 'Fecha em 30 min'],
  ['seg 18:01', '2026-10-26T18:01:00', 'closed', 'Fechado · abre amanhã às 8h'],
  ['sex 18:01', '2026-10-30T18:01:00', 'closed', 'Fechado · abre amanhã às 9h'],
  ['sáb 13:30', '2026-10-31T13:30:00', 'closing', 'Fecha em 30 min'],
  ['sáb 14:01', '2026-10-31T14:01:00', 'closed', 'Fechado · abre segunda às 8h'],
  ['dom 12:00', '2026-11-01T12:00:00', 'closed', 'Fechado · abre amanhã às 8h'],
  ['ter 10:00', '2026-10-27T10:00:00', 'open', 'Aberto agora · fecha às 18h'],
  ['sáb 09:00', '2026-10-31T09:00:00', 'open', 'Aberto agora · fecha às 14h'],
];
let bad = 0;
for (const [n, iso, st, full] of cases) {
  const r = at(iso); const ok = r.state === st && r.full === full;
  if (!ok) bad++;
  console.log(ok ? 'OK  ' : 'FAIL', n.padEnd(10), r.state.padEnd(8), r.full);
}
process.exit(bad ? 1 : 0);
