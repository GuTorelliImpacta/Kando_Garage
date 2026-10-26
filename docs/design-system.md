# Design system: Kando Garage

Conceito: **"O Brasão da Confiança"**. Oficina boa à noite: grafite profundo, luz quente laranja/âmbar, o escudo do logo como motivo recorrente.
Implementação: `src/styles/tokens.css` (tokens em `@theme` do Tailwind v4 + tokens semânticos em `:root`).

> Os hex abaixo são **aproximados** (amostrados de capturas). `[CONFIRMAR]` com os arquivos originais do logo.

## Cores

| Token | Hex | Uso |
|---|---|---|
| `kg-graphite-950` | `#141516` | fundo principal dark |
| `kg-graphite-900` | `#1D1E20` | fundo alternado dark |
| `kg-graphite-800` | `#2A2B2E` | cards/superfícies |
| `kg-graphite-700` | `#3A3B3E` | grafite do escudo |
| `kg-steel-400` | `#9A9DA3` | texto secundário no escuro |
| `kg-orange-500` | `#E2683A` | **ação** (fundo de botão primário) |
| `kg-orange-400` | `#EE7B50` | links/ícones de ação sobre escuro (passa AA em cards) |
| `kg-orange-700` | `#B3441D` | links de ação sobre claro (o `orange-600` da seção 4.3 dava 3,9:1) |
| `kg-amber-400` | `#E0A33A` | **marca/ênfase** sobre escuro |
| `kg-amber-800` | `#8A5A06` | marca/ênfase sobre claro (o `amber-500` dava 2,5:1) |
| `kg-paper` / `kg-ink` | `#F4F2EE` / `#17181A` | seções claras / texto sobre claro |
| status | `#3DBE6E` · `#F2686C` (escuro), `#1A7F43` · `#C4272C` (claro) | aberto / fechado |

Regras: laranja = ação, âmbar = marca; nunca lado a lado no mesmo componente. Texto do botão primário é **grafite** (branco sobre `#E2683A` dá só 3,35:1). Verde do WhatsApp só no botão flutuante.

Esquemas: dark é o padrão e a experiência principal. Em `prefers-color-scheme: light` as seções escuras viram "papel" (`#EAE6DE`), as claras viram branco, com os mesmos acentos (ajustados para contraste).

## Contraste (WCAG, calculado por `scripts/contrast.mjs`)

| Par | Razão | Resultado |
|---|---|---|
| Texto `#F4F2EE` / `#141516` | 16,35 | AAA |
| Secundário `#9A9DA3` / `#141516` · / `#2A2B2E` | 6,73 · 5,21 | AA |
| Botão: `#141516` / `#E2683A` | 5,46 | AA |
| Laranja-400 `#EE7B50` / `#2A2B2E` | ≥ 5,3 | AA |
| Laranja-700 `#B3441D` / `#F4F2EE` · / branco | 4,99 · 5,58 | AA |
| Âmbar-400 `#E0A33A` / `#141516` · / `#2A2B2E` | 8,24 · 6,38 | AAA / AA |
| Âmbar-800 `#8A5A06` / `#F4F2EE` | 5,30 | AA |
| Texto `#17181A` / papel · branco | 15,89 · 17,77 | AAA |
| Muted `#55585D` / papel · branco | 6,39 · 7,14 | AA |
| Aberto `#3DBE6E` / `#141516` · `#1A7F43` / papel | 7,65 · 4,51 | AA |
| Fechado `#F2686C` / `#141516` · `#C4272C` / papel | 6,07 · 5,11 | AA |
| Branco / `#3A3B3E` | 11,20 | AAA |

## Tipografia
- Títulos: **Barlow Condensed** 600/700. Texto: **Inter** 400/500/600. Self-hosted `woff2` latin, `font-display: swap`, 5 arquivos. Só o 700 do título tem `preload`.
- Escala fluida com `clamp()`: H1 ≈ 40 px (360) → 72 px (desktop).
- Wordmark cursivo: **somente imagem/SVG do cliente** (hoje há um texto provisório, ver `brand-assets.md`).

## Forma, textura, ícones
- Raios 8/14/22 px. Pílula (999px) para botões.
- Grão SVG (≤ 4%) e chapa diamantada SVG (≤ 5%, com máscara), via CSS `data:` URI. Nenhuma imagem pesada.
- Ícones de linha (traço 1,75) dentro de **mini-escudos** com contorno âmbar (`MiniShield`). Divisor central do escudo reaproveitado no "Como trabalhamos" e nos selos.

## Estados
- `:focus-visible`: contorno de 3 px (branco no escuro, grafite no claro) com offset 3 px.
- Hover de botão primário: `#E2683A` → `#EE7B50`. Chips: borda laranja + elevação de 2 px.
- Alvos de toque ≥ 48 px (botões, chips, barra fixa, menu). Botão pequeno: 44 px.

## Movimento (todo com fallback para `prefers-reduced-motion`)
| Efeito | Regra |
|---|---|
| Engrenagens do emblema | 1 volta em ~20 s, **uma vez** ao carregar e no hover; parado com reduced-motion |
| Entrada de seções | fade + translate ≤ 12 px via `IntersectionObserver`; só ativa com `@media (scripting: enabled)`, então sem JS o conteúdo aparece |
| Nota 5,0 | contagem 0,0 → 5,0 em 0,9 s ao entrar na tela |
| Proibido | parallax, carrossel automático, loops chamativos |
