# Auditoria de performance e acessibilidade

Medido em 26/10/2026 sobre o build estático servido com os headers de `vercel.json` e gzip (`scripts/serve-dist.mjs`), Lighthouse mobile (throttling padrão), Chromium headless. **Medir de novo no preview real da Vercel.**

| Métrica | Meta | Antes (CSS externo, sem gzip) | Depois |
|---|---|---|---|
| Performance | ≥ 95 | 95–96 | **99** |
| Acessibilidade | 100 | 100 | **100** |
| Boas práticas | 100 | 100 | **100** |
| SEO | 100 | 100 | **100** |
| LCP | < 2,0 s | 2,4–2,6 s | **1,8 s** |
| CLS | < 0,05 | 0 | **0** |
| TBT (proxy de INP) | INP < 200 ms | 0 ms | **0 ms** |
| Peso da home | < 500 KB | 232 KB | **144 KB** |
| JS total | < 30 KB gzip | 2,4 KB | **3,3 KB gzip** (1 arquivo, vanilla) |

Correções feitas: CSS inline (`inlineStylesheets: 'always'`, elimina o bloqueio de renderização), gzip/brotli e cache imutável para `/_astro` e `/fonts`, preload só da fonte do H1.

## axe-core (WCAG 2.1 A/AA + best-practice)
`scripts/audit-a11y.mjs`: 3 páginas × dark/light × 360/1280 px = **0 violações**, 0 erros de console (CSP incluída). Corrigidos no caminho: nome acessível do logo e da prova social não continham o texto visível, botão flutuante fora de landmark.

## Checagem manual / por construção
- Foco visível em tudo; menu mobile com `aria-expanded`, foco preso e `Esc`. Ordem de foco = ordem visual. Link "Ir para o conteúdo".
- Alvos ≥ 48 px (chips, botões, barra fixa); botões pequenos 44 px.
- Ícones decorativos `aria-hidden`; botões só com ícone têm `aria-label`.
- Landmarks: header, nav, main, footer, aside. `lang="pt-BR"`. Um H1 por página.
- Contraste: ver `design-system.md` (todos os pares ≥ AA).
- `prefers-reduced-motion`: todas as animações e transições desligadas; conteúdo visível sem JS.
- **Não verificado**: leitor de tela real (NVDA/VoiceOver) no seletor de sintomas e zoom 200% por inspeção manual. O carrossel de avaliações não é renderizado enquanto não houver autorização.
