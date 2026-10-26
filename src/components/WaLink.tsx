import type { ReactNode } from 'react';
import { ui, wa, waDefault } from '../content/site';
import { trk } from '../lib/track';

interface Props {
  origin: string;
  message?: string;
  label?: ReactNode;
  className?: string;
  item?: string;
  now?: boolean;
}

/** Link wa.me (texto puro, sem ícone). Sem mensagem usa a mensagem padrão. */
export function WaLink({ origin, message, label, className = 'btn btn--primary', item, now }: Props) {
  return (
    <a
      className={className}
      href={message ? wa(message) : waDefault}
      target="_blank"
      rel="noopener noreferrer"
      {...trk('click_whatsapp', origin, item)}
    >
      {label ?? (now ? ui.ctaWhatsappNow : ui.ctaWhatsapp)}
    </a>
  );
}
