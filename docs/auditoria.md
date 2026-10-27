# Auditoria de performance e acessibilidade (Fase 4, versão React)

Medido em 26/10/2026 sobre `npm run build` servido por `scripts/serve-dist.mjs` (headers e CSP do `vercel.json`, gzip), Chromium headless 1243, Lighthouse 13 mobile (throttling padrão, 3 rodadas por página), axe-core 4.14 e scripts Playwright. **Refazer no preview real da Vercel** (brotli, CDN e HTTP/2 mudam os tempos). Os scripts de medição foram escritos no scratchpad e não fazem parte do repositório; `scripts/audit-a11y.mjs` continua sendo o gate de axe.

## 1. Lighthouse mobile contra a seção 8.2

| Métrica | Meta | Antes das correções | Depois | Situação |
|---|---|---|---|---|
| Performance, home | ≥ 95 | 99 (3/3 rodadas) | **99** (3/3) | ok |
| Performance, política | ≥ 95 | 100 | **100** | ok |
| Acessibilidade | 100 | 100 / 100 | **100 / 100** | ok |
| Boas práticas | 100 | 100 / 100 | **100 / 100** | ok |
| SEO | 100 | 100 / 100 | **100 / 100** | ok |
| LCP (home / política) | < 2,0 s | 1,8 s / 1,7 s | **1,8 s / 1,7 s** | ok |
| FCP (home) | n/a | 1,5 s | 1,5 s | |
| CLS | < 0,05 | 0 | **0** | ok |
| TBT (home, proxy de INP) | n/a | 40–90 ms | **40–60 ms** | ok |
| INP (proxy, ver 3.7) | < 200 ms | n/a | **≤ 48 ms** com CPU 4x | ok |
| Peso da home transferido | < 500 KB | 223 KB | **223 KB** | ok |
| **JS total** | **< 30 KB gzip** | 83,6 KB (hydrate 83,6 + entrada 1,0) | **83,6 KB gzip** (81,7 KB com gzip -9; **71,1 KB brotli**) | **não atende** |

O ganho de Lighthouse já estava no teto; as correções desta fase mexem em acessibilidade, não em tempo.

## 2. axe-core (WCAG 2.0/2.1 A e AA + best-practice)

`node scripts/audit-a11y.mjs http://localhost:4340`: 3 páginas (home, política, 404) × dark/light × 360/1280 px = 12 combinações, **0 violações** antes e depois das correções. Único "erro de console" é o 404 da própria página `/nao-existe` (esperado). Sem violação de CSP.

## 3. Checagem manual por script

### 3.1 Zoom 200% e reflow
Viewport 640x400 (equivale a 1280x800 com zoom 200%) e 320x256 (400%): `scrollWidth == clientWidth` em home e política (**sem rolagem horizontal**), nenhum texto cortado por `overflow:hidden`. O único elemento que passa da borda é a placa decorativa do hero (`aria-hidden`, cortada pela seção por desenho). Header fixo (85 px) + barra de ação (58 px) ocupam 36% de 400 px de altura: legível e navegável, com `scroll-margin-top` nas âncoras. Captura: `scratchpad/shots/zoom200-top.png`.

### 3.2 Ordem de foco e foco visível
Tab do topo ao fim: 55 paradas a 360 px (dark) e 56 a 1280 px (light). Ordem = ordem visual: link "Ir para o conteúdo", logo, MENU (mobile) ou nav (desktop), WhatsApp, os 10 sintomas, serviços, passos, avaliações, FAQ, local, rodapé, barra de ação fixa por último (fixa no rodapé da tela, DOM no fim, aceitável). Os dois "saltos para cima" detectados são a barra fixa e o botão do mapa (mudança de layout sticky), não ordem quebrada. Todos os controles têm caixa visível e anel de foco (outline 3 px branco/ink + halo). Os 9 links "Falar sobre isso" da tabela de serviços mostram `outline: none` no próprio `<a>` porque o anel é desenhado no `::after` que cobre a linha inteira (`.tlink--stretch:focus-visible::after`): o anel existe e é visível, é falso positivo do script.

### 3.3 Alvos de toque a 360 px (getBoundingClientRect de todos os links e botões)

| | Antes | Depois |
|---|---|---|
| Home, controles com lado < 48 px | 16 de 54 | **0 de 53** |
| Política, controles com lado < 48 px | 7 de 14 | **1 de 13** |

Antes: telefone, "Ligar", e-mail, Instagram e endereço do rodapé (20 a 44 px de altura) e o link "Outra dúvida?" (47 px). Os "Falar sobre isso" (27 px) são link esticado: a área de clique é a linha inteira (`.srow`, ≥ 48 px). Restante: o e-mail dentro do parágrafo da política (205x20) é link em linha dentro de texto, exceção do critério 2.5.8 (WCAG 2.2) e sem exigência no 2.1 AA; mantido para não quebrar o fluxo do texto.

### 3.4 Contraste real
axe (0 falhas) mais amostragem própria: cor computada de todo texto visível contra o fundo efetivo, composição de alfa, 4 combinações de tema/tamanho × 2 páginas (277 a 288 textos na home). Pior par de texto real: **4,99:1** (link laranja do rodapé em dark). O script sinalizou apenas texto dentro de SVG decorativo `aria-hidden`: o rótulo "R. MAMUD RAHD" do mapa (o script ignora o `<rect>` do SVG; o par real é #9a9da3 sobre #1d1e20 = 6,14:1) e os "Z=24/18/12" da placa técnica (o script lê `color` e não `fill`; antes o texto herdava âmbar a 60% de alfa, 3,71:1). Corrigi os rótulos Z para âmbar pleno (`.bp__txt { fill: var(--kg-amber-400) }`, 8,24:1) embora seja decoração isenta pelo 1.4.3.

### 3.5 prefers-reduced-motion
Antes: 0 animações, mas **58 elementos** ainda com transição de 0,12 a 0,2 s (cor de hover, fundo, header). Depois: **0 animações e 0 transições**, `scroll-behavior: auto`, nenhum `.reveal` oculto. Correção: regra global em `sections.css` (`transition/animation-duration: .01ms`). Sem reduce, 81 elementos animam/transicionam.

### 3.6 Menu mobile (360 px)
Fechado: `aria-expanded="false"`, rótulo "Abrir menu", painel `visibility:hidden` (links fora do Tab; 3 Tabs saem em skip, logo, MENU). Aberto: `aria-expanded="true"`, rótulo "Fechar menu", foco vai para o 1º link, rolagem travada, **foco preso** (12 Tabs ciclam entre os 4 links, CTA e FECHAR). Esc fecha e devolve o foco ao botão. Clicar num link fecha o menu e navega à âncora (`#como-trabalhamos`). Itens do menu com 56 a 72 px de altura. Nome acessível contém o texto visível (MENU/FECHAR).

### 3.7 Seletor de sintomas e INP
Árvore de acessibilidade (`ariaSnapshot`): região nomeada pelo H2, lista com 10 itens na ordem 01 a 10; cada link tem o nome "título, Área: X, Chamar no WhatsApp"; o numeral é `aria-hidden` (a ordem é transmitida pela lista, não pelo numeral). Correção: como o CSS usa `list-style: none`, Safari/VoiceOver removem a semântica de lista; adicionei `role="list"` em todos os `ol/ul` (sintomas, diferenciais, passos, menu, galeria, fatos, política). INP medido por Event Timing com CPU 4x, tela 360 px: cliques no menu e no FAQ **16 a 48 ms**. Durante a hidratação (primeiros ~3 s, 4x) um pointer-over chegou a 352 ms; o clique real fica abaixo de 50 ms.

### 3.8 Não verificado
Leitor de tela real (NVDA, VoiceOver, TalkBack) no seletor de sintomas, validação em dispositivo físico, zoom do navegador por UI (usei emulação de viewport) e o carrossel de avaliações (não renderizado sem autorização). Fazer na revisão final com o cliente.

## 4. Correções aplicadas em `src/` (baixo risco)
- `sections.css`: links soltos do rodapé e do FAQ viram `inline-flex` com `min-height/min-width: 48px`; reduced-motion global; rótulos Z da placa com `fill` pleno.
- `role="list"` em 7 listas (`Header`, `Gallery`, `SymptomPicker`, `Differentials`, `SplitShieldSteps`, `TrustBar`, `PoliticaDePrivacidade`); `Reveal` aceita a prop `role`.
- Typecheck limpo, build refeito, axe 12/12 com 0 violações, Lighthouse remedido.

## 5. JavaScript: 83,6 KB gzip contra meta de 30 KB (pendente, decisão do cliente)

### 5.1 Onde estão os bytes (source map do bundle, bytes minificados)
| Parte | Raw | Observação |
|---|---|---|
| `react-dom-client` | 198,7 KB | monolítico (CJS), sem tree-shaking possível |
| `react` + `react-dom` + `scheduler` | 14,5 KB | |
| **Piso do React** (só `hydrateRoot` vazio, medido com esbuild) | **218 KB raw, 67,5 KB gzip, 58,1 KB brotli** | |
| Código do app (`src/`) | ≈ 53 KB, ≈ 14 KB gzip | dos quais 15,8 KB é `site.ts` (texto do site duplicado no JS para a hidratação), 5,2 KB `Emblem` |

Conclusão: **com React 19 a meta de 30 KB é inatingível**: o piso do runtime sozinho é 67,5 KB gzip, 2,2x a meta.

### 5.2 Experimentos sem trocar de framework (cópia no scratchpad, projeto intocado)
| Experimento | JS total gzip -9 | brotli |
|---|---|---|
| Base | 81,8 KB | 71,0 KB |
| `build.target: 'esnext'` (hoje `es2022`) | 81,7 KB | 71,1 KB |
| Sem `StrictMode` (só dev, não existe em produção) | 81,7 KB | 70,9 KB |
| Reminificar com esbuild por cima do oxc | 81,9 KB | 71,3 KB |
| Polyfills | já desligados (`modulePreload.polyfill: false`); nada a remover | |
| Code splitting | já feito: entrada de 1 KB, hidratação em chunk separado carregado depois do FCP; não reduz o total, só tira do caminho crítico (por isso TBT 40–60 ms) | |
| Ilhas pequenas (hidratar só Header, StatusBadge, barra de ação, EmailLink, Reveal) | **mínimo ≈ 67,5 + ~3 = ~70 KB**, ganho de ~12 KB e exige reestruturar o SSR em contêineres por ilha | |

Nenhuma configuração do Vite chega perto: nada abaixo de ~70 KB gzip enquanto `react-dom/client` estiver no cliente. Não alterei `vite.config.ts` (ganhos de 0,1 KB não justificam).

### 5.3 Preact/compat (medido em cópia, `react` e `react-dom` aliased só no build do cliente; o SSR de pré-render continua em React)
| | React 19 | Preact 11 compat | |
|---|---|---|---|
| JS total gzip (Vite) | 83,6 KB | **22,4 KB hydrate + 1,0 KB entrada** | **-72%** |
| JS total gzip -9 / brotli | 81,8 / 71,0 KB | **22,7 / 20,4 KB** | **atende < 30 KB** |
| Peso transferido da home | 223 KB | 164 KB | |
| Lighthouse home (3 rodadas) | 99 / 99 / 99 | 98 / 99 / 97 | |
| LCP / CLS | 1,8 s / 0 | 1,8 s / 0 | igual |
| TBT | 40–60 ms | 70–170 ms (hidratação do Preact refaz mais) | pior, ainda baixo |
| INP proxy (CPU 4x) | ≤ 48 ms | ≤ 40 ms | igual |
| axe, 12 combinações | 0 violações | 0 violações | igual |
| Funcional | menu, Esc, status de horário, barra de ação, e-mail montado, reveal | idênticos, 0 erros ou avisos no console | |

Preact 11.0.2 hidratou o HTML gerado pelo `renderToString` do React sem mismatch. Custos da troca: a pré-render e o cliente passam a usar runtimes diferentes (risco de divergência futura em componentes novos), `preact/compat` não é 100% React (cuidado com Suspense/`use`/formulários se forem adotados), TBT um pouco maior. A troca em produção é uma alteração de ~10 linhas em `vite.config.ts` mais `npm i preact`; **não foi aplicada**.

### 5.4 Terceira via (recomendada se o cliente quiser a meta e manter React)
Usar React só no build (SSG, como já é) e **não enviar React ao cliente**: o comportamento (menu, status, barra de ação, reveal, e-mail, mapa) vira script vanilla de ~6 a 8 KB gzip (a versão Astro anterior fechou em 3,3 KB; a lógica de status sozinha, com os horários, mede 4,3 KB). Seria o menor JS (< 10 KB), TBT ≈ 0, mas reescreve os componentes interativos (Header, StatusBadge, StickyActionBar, Reveal, EmailLink, Location) e exige duplicar a lógica do menu e do foco preso (já validada aqui).

### 5.5 Decisão pedida ao cliente
| Opção | JS gzip | Esforço | Risco |
|---|---|---|---|
| A. Manter React 19 | 83,6 KB (71 KB br) | zero | descumpre 8.2 em 54 KB |
| B. Alias Preact/compat | ~22 KB | pequeno | baixo a médio, TBT maior |
| C. React só no SSG + vanilla | ~6 a 8 KB | médio | baixo, mais código a manter |

## 6. Pendências
1. Decisão sobre o JS (5.5). Em A, a meta "JS < 30 KB" fica formalmente reprovada.
2. Medir no preview da Vercel (brotli, CDN) e repetir Lighthouse.
3. Teste com leitor de tela real e dispositivos físicos.
4. Hex dos tokens ainda `[CONFIRMAR]` com o logo original (se mudarem, rodar `scripts/contrast.mjs` e `audit:a11y` de novo).
5. Quando o carrossel de avaliações for liberado, auditar pausa, foco e anúncio.
6. Nota de processo: um `git status` somente leitura foi executado por engano durante o trabalho; nenhum outro comando git rodou e nada foi commitado.

## Etapa 2: performance

Medido em 27/10/2026 no mesmo ambiente da seção 1 (build servido por gzip com os headers do `vercel.json`, Chromium 1243, Lighthouse 13 mobile, throttling padrão). Antes = `main` do início da etapa; depois = build final. Home: 5 rodadas cada; política: 3 rodadas cada.

### Tabela antes/depois

| Métrica | Home antes | Home depois | Política antes | Política depois |
|---|---|---|---|---|
| Performance | 98–99 (mediana 99) | **100 (5/5)** | 100 | 100 |
| Acessibilidade / BP / SEO | 100 / 100 / 100 | 100 / 100 / 100 | 100 / 100 / 100 | 100 / 100 / 100 |
| FCP | 1,50 s | **1,20 s** | 1,35 s | **1,20 s** |
| LCP | 1,80 s | **1,50 s** | 1,65 s | **1,35 s** |
| CLS | 0 | 0 (5/5) | 0,0012 | 0,0012 (ver abaixo) |
| TBT, mediana (intervalo) | 40 ms (17–122) | **34 ms (31–43)** | 17 ms (16–24) | 45 ms (35–46) |
| Peso transferido | 223,1 KB | **176,1 KB (-47 KB)** | 216,3 KB | **169,3 KB** |
| JS transferido (gzip) | 83,5 KB | 83,5 KB | 83,5 KB | 83,5 KB |
| CSS inline (raw / gzip) | 37,37 / 8,66 KB | 37,44 / 8,71 KB | igual | igual |
| Arquivos de fonte | 5 (117 KB) | **3 (70,6 KB)** | 5 | 3 |
| `og.jpg` | 93,3 KB | **58,5 KB** | | |

O ganho de FCP/LCP (0,3 s) vem de ter menos fontes disputando banda no início, não de outra mudança. O TBT da home deixou de oscilar (31–43 ms em 5 rodadas, contra 17–122 antes). Na política o TBT subiu de ~17 para ~45 ms: com FCP 0,15 s mais cedo a hidratação passa a cair dentro da janela medida; segue muito abaixo de qualquer limite e a nota é 100.

### O que foi feito
1. **Fontes 5 para 3** (Inter 400 e 600, Barlow Condensed 700). Inter 500 virou 400 (`.btn__sub`, `.osf dd`, `.osf--l p`, `.strip dd`, `.tag__line dd`, `.hours`); Barlow 600 virou 700 (menu, títulos de linha, passos, FAQ, citações). Como o 700 é um pouco mais largo, `.row__t` ficou com `letter-spacing: -.005em` para os títulos da lista de sintomas continuarem em uma linha a 1280 px. Capturas 360 e 1280 (home e política, claro e escuro) comparadas lado a lado: a única diferença é o texto um pouco mais firme e, no bloco do endereço a 360 px, uma quebra de linha a menos (Inter 400 é mais estreita que 500). Preload continua só da Barlow 700 (H1); `font-display: swap` mantido; 2 famílias. Removidos `inter-500.woff2` e `barlow-condensed-600.woff2` (e a referência em `scripts/make-assets.mjs`).
2. **Fallback métrico refeito.** Os `local('Arial Narrow')`/`local('Arial')` anteriores não resolviam em Linux/Android e, onde resolvem, o `size-adjust` do Barlow (80%) estava longe do real. Agora há 3 faces de fallback (Inter 400 = 106%, Inter 600 = 98,7%, Barlow 700 = 69%), com `ascent/descent-override` derivados, medidas sobre o texto real das páginas com Liberation Sans (largura igual à do Arial). Teste de estresse (fontes atrasadas 1,5 s, `layout-shift` do navegador): home 360 px de 0,0055 para **0,0002**; home 1280 px de **0,1817 para 0,0008**; política 360 px de 0,0011 para **0**; política 1280 px de 0,0199 para 0,0122.
3. **`og.jpg`** de qualidade 88 para 66 em `scripts/make-assets.mjs`: 93,3 para **58,5 KB**, 1200x630, texto nítido (conferido). `logo.png` (29,5 KB) e `apple-touch-icon.png` (8,4 KB) não mudaram: só entram no JSON-LD e no atalho do iOS, fora do carregamento da página, e reduzi-los exigiria quantizar o antialiasing (ganho real só de ~18 e ~5 KB nesses arquivos).
4. **Hidratação fatiada.** `src/hydrate.tsx` agora chama `hydrateRoot` dentro de `startTransition`. Em lane padrão o React hidrata numa tarefa única de ~85 ms; em transição ele cede a cada ~5 ms. Medido em 10 rodadas (5+5) por variante, somando só o bloqueio atribuído ao `hydrate-*.js`: **mediana 78 ms para 38 ms**. Validado: menu abre/fecha (Esc), FAQ abre, status de horário (`data-state` aplicado; `test-status` 10/10), e-mail montado (2 links `mailto`), barra de ação visível, reveal sem elementos presos ocultos, console sem erro ou aviso de hidratação.

### Experimentos descartados
| Experimento | Resultado | Decisão |
|---|---|---|
| Hidratar em `requestIdleCallback` (timeout 2 s) após o FCP | TBT 98/74/20/38/16 contra 88/44/39/70/43 sem ele: sem diferença além do ruído | revertido |
| Hidratar só na primeira interação ou após o TTI | tiraria o TBT do relatório, mas cliques antes da hidratação se perderiam (menu, FAQ) | não testado, risco de INP |
| Ilhas/Suspense por seção | a hidratação já é fatiada pela transição; o resto do TBT é parse/avaliação do bundle de 271 KB, que ilhas não reduzem | não vale o esforço |

O TBT restante tem duas partes: ~60 ms de avaliação do bundle React (piso, ver seção 5 acima) e tarefas de estilo/layout antes da hidratação (HTML de 90 KB e 37 KB de CSS), que não dependem da estratégia de hidratação. Só trocar o runtime (seção 5.5, opções B ou C) reduz o que sobra.

### CSS não usado
Cobertura de CSS do Chromium nas 3 páginas, 5 larguras (360 a 1920), claro/escuro, com e sem reduced-motion, menu aberto, FAQ aberto, hover, foco e os 4 estados do status: restam 3,9 KB (10%) sem uso, e **quase tudo é intencional**: regras do carrossel de avaliações e da galeria (componentes prontos, ainda sem conteúdo liberado), fallback sem JavaScript (`scripting: none`), `:active`/`:focus` e cores do status no papel, `@keyframes` só com movimento permitido. Único resto morto encontrado e removido: `.paper-deep` (classe de superfície que nenhum componente usa; o token `--kg-paper-deep` segue em uso). Tokens: nenhum sem uso. Resultado: CSS praticamente igual; o ganho esperado de 36 KB para bem menos **não existe** porque o CSS já estava enxuto (o aumento de 0,07 KB vem das 2 faces de fallback novas).

### Ficou de fora (não vale o esforço)
- CLS 0,0012 na política: vem da troca do texto do e-mail ("kandogarage arroba gmail.com" para o link) na hidratação; o deslocamento é de poucos pixels, a nota é 100 e o texto é anti-raspagem por desenho. Sem deslocamento geométrico medido com a hidratação atrasada 1,5 s.
- Quantizar `logo.png`/`apple-touch-icon.png` (fora do caminho de carregamento).
- Trocar de runtime para atingir JS < 30 KB (decisão do cliente, seção 5.5).
- Brotli e CDN: só dá para medir no preview da Vercel.

### Validação
`npx tsc --noEmit` limpo; `npm run build` sem erros ou avisos; `npx tsx scripts/test-status.mjs` 10/10; `node scripts/audit-a11y.mjs http://localhost:4390` 12/12 combinações com 0 violações (único erro de console é o 404 esperado de `/nao-existe`).
