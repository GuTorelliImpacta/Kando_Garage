/** Contagem rápida de 0,0 a 5,0 ao entrar na tela. Sem movimento reduzido. */
export function initCounter(): void {
  const el = document.querySelector<HTMLElement>('[data-count]');
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const target = Number((el.dataset.count ?? '5').replace(',', '.'));
  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    const t0 = performance.now(), dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const v = target * (1 - (1 - p) ** 3);
      el.textContent = v.toFixed(1).replace('.', ',');
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0,0';
    requestAnimationFrame(tick);
  }, { threshold: 0.6 });
  io.observe(el);
}
