import type { SVGProps } from 'react';

// Emblema "Brasão da Confiança": escudo dividido, engrenagens à esquerda, chave inglesa e
// chave de fenda cruzadas à direita. ILUSTRAÇÃO PROVISÓRIA fiel ao conceito do logo.
// CONFIRMAR: substituir pelo SVG oficial do cliente (brand/). As engrenagens são grupos
// separados (.gear-a/.gear-b/.gear-c) para animar via CSS. É logo, não ícone.
const SHIELD = 'M100 8 18 38v78c0 54 36 86 82 108 46-22 82-54 82-108V38z';

interface Props extends Omit<SVGProps<SVGSVGElement>, 'id'> {
  /** Prefixo único dos ids internos (clipPath). */
  id: string;
  /** Engrenagens giram uma vez ao carregar (e de novo no hover). */
  spin?: boolean;
  /** Uma engrenagem solta fora do escudo (404). */
  loose?: boolean;
  /** Variante em linha fina (planta). */
  line?: boolean;
  /** Mostra só uma metade do escudo (Como trabalhamos). */
  half?: 'left' | 'right';
  /** Com rótulo vira role="img"; sem rótulo é decorativo. */
  label?: string;
}

export function Emblem({ id, spin, loose, line, half, label, className = '', ...rest }: Props) {
  const cls = ['emblem', line ? 'emblem--line' : '', spin ? 'spin-once' : '', className].filter(Boolean).join(' ');
  const body = (
    <>
      <g clipPath={`url(#${id}-s)`}>
        <rect className="bg" width="200" height="232" fill="#3a3b3e" />
        <rect className="bg" x="100" width="100" height="232" fill="#2a2b2e" />
        <g clipPath={`url(#${id}-l)`} fill="#e0a33a">
          <g className="gear gear-a">
            <circle cx="58" cy="80" r="23" fill="none" stroke="#e0a33a" strokeWidth="9" strokeDasharray="4.5 4.5" />
            <circle cx="58" cy="80" r="19" />
            <circle cx="58" cy="80" r="7" fill="#3a3b3e" />
          </g>
          <g className="gear gear-b">
            <circle cx="76" cy="128" r="15" fill="none" stroke="#e0a33a" strokeWidth="7" strokeDasharray="3.9 3.9" />
            <circle cx="76" cy="128" r="12" />
            <circle cx="76" cy="128" r="4.5" fill="#3a3b3e" />
          </g>
          {loose ? (
            <circle className="socket" cx="52" cy="160" r="18" fill="none" stroke="#e0a33a" strokeWidth="2" strokeDasharray="3 4" />
          ) : (
            <g className="gear gear-c">
              <circle cx="52" cy="160" r="18" fill="none" stroke="#e0a33a" strokeWidth="7.5" strokeDasharray="4.7 4.7" />
              <circle cx="52" cy="160" r="14.5" />
              <circle cx="52" cy="160" r="5.5" fill="#3a3b3e" />
            </g>
          )}
        </g>
        <g clipPath={`url(#${id}-r)`} fill="#f4f2ee">
          <g className="tools" transform="translate(-9 6)">
            <g transform="rotate(42 142 118)">
              <rect x="137" y="70" width="10" height="92" rx="5" />
              <circle cx="142" cy="66" r="15" />
              <rect x="138" y="46" width="8" height="18" fill="#2a2b2e" />
            </g>
            <g transform="rotate(-42 142 118)">
              <rect x="136" y="108" width="12" height="52" rx="6" fill="#e2683a" />
              <rect x="140" y="62" width="4" height="48" rx="2" />
            </g>
          </g>
        </g>
        <path className="split" d="M100 18v200" stroke="#f4f2ee" strokeWidth="2" opacity=".55" />
      </g>
      <path className="outline" pathLength={line ? 1 : undefined} d={SHIELD} fill="none" stroke="#f4f2ee" strokeWidth="6" strokeLinejoin="round" />
      {loose && (
        <>
          <path className="cota" d="M14 142 34 154" stroke="#e0a33a" strokeWidth="2" strokeDasharray="3 3" fill="none" />
          <g transform="translate(-58 -22)">
            <g className="gear gear-c loose" fill="#e0a33a">
              <circle cx="52" cy="160" r="18" fill="none" stroke="#e0a33a" strokeWidth="7.5" strokeDasharray="4.7 4.7" />
              <circle cx="52" cy="160" r="14.5" />
              <circle cx="52" cy="160" r="5.5" fill="#3a3b3e" />
            </g>
          </g>
        </>
      )}
    </>
  );
  return (
    <svg
      className={cls}
      viewBox={loose ? '-72 0 272 232' : '0 0 200 232'}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      <defs>
        <clipPath id={`${id}-l`}><rect x="0" y="0" width="100" height="232" /></clipPath>
        <clipPath id={`${id}-r`}><rect x="100" y="0" width="100" height="232" /></clipPath>
        <clipPath id={`${id}-s`}><path d={SHIELD} /></clipPath>
        {half && (
          <clipPath id={`${id}-h`}>
            <rect x={half === 'left' ? -4 : 100} y="0" width="104" height="232" />
          </clipPath>
        )}
      </defs>
      {half ? <g clipPath={`url(#${id}-h)`}>{body}</g> : body}
    </svg>
  );
}

/**
 * Planta do escudo (desenho técnico em linha fina): contorno, eixo traço-ponto, circunferências
 * de primitiva das três engrenagens e cotas sem valores nem rótulos. Decorativa e sem medidas reais.
 */
export function EmblemBlueprint({ id, className = '' }: { id: string; className?: string }) {
  const ox = 50;
  const oy = 36;
  const gears = [
    { cx: 58, cy: 80, r: 27 },
    { cx: 76, cy: 128, r: 19 },
    { cx: 52, cy: 160, r: 22 },
  ];
  return (
    <svg className={`bp ${className}`.trim()} viewBox="0 0 300 340" aria-hidden="true" focusable="false">
      <Emblem id={id} line x={ox} y={oy} width="200" height="232" />
      <g className="bp__lines" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <path d="M150 14V292" strokeDasharray="14 3 2 3" />
        {gears.map((g, i) => (
          <g key={i}>
            <circle cx={g.cx + ox} cy={g.cy + oy} r={g.r} strokeDasharray="5 2 1 2" />
            <path d={`M${g.cx + ox - g.r} ${g.cy + oy}H34`} strokeDasharray="2 2" />
          </g>
        ))}
        {/* cota horizontal */}
        <path className="draw" pathLength="1" d="M50 276v30M250 276v30M50 300H250" />
        <path d="M50 295v10M250 295v10" />
        {/* cota vertical */}
        <path className="draw" pathLength="1" d="M254 36h30M254 268h30M278 36V268" />
        <path d="M273 36h10M273 268h10" />
      </g>
    </svg>
  );
}

/** Pin do mapa em forma de escudo (é logo, não ícone). */
export function PinShield({ className = '' }: { className?: string }) {
  return (
    <svg className={`pin ${className}`.trim()} viewBox="0 0 56 66" width="56" height="66" aria-hidden="true" focusable="false">
      <path d="M31 8 8 16v22c0 14 9 22 20 28 11-6 20-14 20-28V16z" fill="#000" opacity=".5" />
      <path d="M28 2 4 10v22c0 14 10 24 24 32 14-8 24-18 24-32V10z" fill="#e2683a" stroke="#f4f2ee" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 12 14 17v14c0 9 6 15 14 20 8-5 14-11 14-20V17z" fill="#3a3b3e" />
      <path d="M28 12v39" stroke="#f4f2ee" strokeWidth="1.5" opacity=".7" />
      <path d="M28 12 14 17v14c0 9 6 15 14 20z" fill="#e0a33a" opacity=".9" />
    </svg>
  );
}
