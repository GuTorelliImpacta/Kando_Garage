import { company } from '../content/site';
import { PinShield } from './Emblem';

/** Mapa esquemático (ilustração, sem geografia real) com pin em escudo. Sem chave de API. */
export function MapArt() {
  const street = company.address.street.split(',')[0].toUpperCase();
  return (
    <div className="mapart" aria-hidden="true">
      <svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" focusable="false">
        <rect width="600" height="420" fill="#1d1e20" />
        <g stroke="#2e2f33" strokeWidth="9" fill="none" strokeLinecap="square">
          <path d="M-20 90 620 60" />
          <path d="M-20 250 620 290" />
          <path d="M120-20 160 440" />
          <path d="M420-20 380 440" />
        </g>
        <g stroke="#26272a" strokeWidth="4" fill="none">
          <path d="M-20 170 620 180" />
          <path d="M-20 340 620 350" />
          <path d="M270-20 280 440" />
          <path d="M520-20 540 440" />
          <path d="M40-20 60 440" />
        </g>
        <rect x="300" y="200" width="70" height="48" fill="#2a2b2e" />
        <rect x="170" y="100" width="80" height="60" fill="#232427" />
        <rect x="430" y="270" width="90" height="56" fill="#232427" />
        <rect x="60" y="190" width="60" height="40" fill="#232427" />
        <rect x="440" y="100" width="70" height="52" fill="#2a2b2e" />
        <text x="300" y="312" fill="#9a9da3" fontSize="11" fontWeight="600" letterSpacing="2" transform="rotate(3 300 312)">{street}</text>
      </svg>
      <PinShield className="mapart__pin" />
    </div>
  );
}
