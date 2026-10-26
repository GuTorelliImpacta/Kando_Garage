import { useEffect, useState } from 'react';
import { company, copy, ui } from '../content/site';

interface Props {
  /** 'inline': texto com o endereço; 'button': botão secundário com o rótulo. */
  variant?: 'inline' | 'button';
  className?: string;
  light?: boolean;
}

/**
 * E-mail montado no cliente: o HTML pré-renderizado só tem "usuario arroba dominio".
 * Depois da hidratação vira link mailto com o endereço real.
 */
export function EmailLink({ variant = 'inline', className = '', light = false }: Props) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [user, domain] = company.email.split('@');
  const fallback = `${user} ${copy.emailAt} ${domain}`;
  if (variant === 'button') {
    const cls = `btn ${light ? 'btn--ghost-l' : 'btn--ghost'} ${className}`.trim();
    return ready ? (
      <a className={cls} href={`mailto:${user}@${domain}`}>
        {ui.email}
      </a>
    ) : (
      <span className={cls}>
        {ui.email}
        <small className="btn__sub">{fallback}</small>
      </span>
    );
  }
  return ready ? (
    <a className={`tlink ${className}`.trim()} href={`mailto:${user}@${domain}`}>
      {`${user}@${domain}`}
    </a>
  ) : (
    <span className={className}>{fallback}</span>
  );
}
