# Design system: Kando Garage (versão React, sem ícones)

Conceito mantido: **"O Brasão da Confiança"** (o escudo do logo é a marca). Mudou a linguagem: sai o "site com ícones em mini-escudos", entra a **ordem de serviço**. O site inteiro se comporta como o papelório de uma oficina séria: ficha técnica, checklist de inspeção, tag de peça, manual de oficina. Tipografia é a protagonista; o metal é textura, nunca enfeite.

Referência de tom visual: placa de oficina de bairro com tradição + manual técnico impresso + chapa de aço. Anti-referências: landing de startup (cards arredondados com ícone, gradiente roxo, bolhas, sombras difusas), concessionária fria, "oficina amadora" com flame e cromado.

Fonte dos hex: `src/styles/tokens.css` da versão Astro, **já aprovados em contraste**. Continuam `[CONFIRMAR]` com o arquivo original do logo (a pasta `brand/` está vazia). Trocar os hex em um só lugar (`:root`) quando chegar o arquivo.

---

## 1. Regra de ouro: sem ícones

Proibido em qualquer parte do site: Lucide ou qualquer biblioteca de ícones, pictogramas SVG (chave, engrenagem-ícone, disco, bomba, termômetro, check, seta, lupa, hambúrguer), mini-escudos com pictograma, emoji, glifos decorativos (`★ ✓ → ➜ ☰ ● ▶`), logos de redes sociais, imagens de ícone em PNG.

| Precisa de | Em vez de ícone, usar |
|---|---|
| Identificar serviço/sintoma | **Numeral 01–10** em Barlow Condensed (item da lista = índice de ficha) |
| Indicar ação/link | Texto sublinhado com rótulo verbal ("Falar sobre isso", "Chamar no WhatsApp") e filete que cresce no hover |
| Menu mobile | Botão com a palavra **MENU** / **FECHAR** em caixa alta com tracking |
| Estrelas da nota | O numeral **5,0** gigante + "de 5,0 · 68 avaliações no Google". Sem estrelas |
| Status aberto/fechado | Texto ("ABERTO AGORA · FECHA ÀS 18H") + **lâmpada**: quadrado CSS de 8 px (`border-radius: 0`), sem forma de pictograma. A cor nunca é o único sinal |
| Passo concluído, destaque | Numeral, filete, rótulo em caixa alta, tag retangular |
| Divisor de seção | Filete duplo, marcas de registro (crop marks) e faixa de risco |
| WhatsApp/Instagram/Maps | Só o nome em texto. O verde do WhatsApp não é usado em nada |
| Pin do mapa | Escudo da marca (é logo, não ícone), ver `brand-assets.md` |

**O que NÃO é ícone** e pode aparecer: o **emblema do escudo** (logo, grande no hero, marca d'água, desenho técnico em linha fina), as engrenagens do emblema, caracteres tipográficos normais (`/ · – — ×`), numerais, marcas de registro desenhadas por borda CSS (crops em L feitos com `border`, não SVG de pictograma).

Teste de revisão: se cobrir o texto com a mão e o elemento ainda "diz" o que é, é ícone. Remover.

---

## 2. Cores

### 2.1 Tokens

```css
:root {
  /* Metal escuro (base) */
  --kg-g950: #141516;   /* fundo principal dark */
  --kg-g900: #1D1E20;   /* seção dark alternada */
  --kg-g800: #2A2B2E;   /* painel / linha de tabela em destaque */
  --kg-g700: #3A3B3E;   /* grafite do escudo; filete decorativo no escuro */
  --kg-steel-500: #7C7F85; /* borda de controle no escuro (4,55:1) */
  --kg-steel-400: #9A9DA3; /* texto secundário no escuro */
  --kg-steel-300: #B4B7BC; /* texto de apoio de maior contraste */

  /* Ação (laranja do emblema do Instagram) */
  --kg-orange-500: #E2683A;  /* fundo do botão primário */
  --kg-orange-400: #EE7B50;  /* hover do botão / link de ação sobre escuro */
  --kg-orange-700: #B3441D;  /* link de ação sobre claro */

  /* Marca (âmbar do wordmark) */
  --kg-amber-400: #E0A33A;   /* marca sobre escuro, numerais de destaque */
  --kg-amber-800: #8A5A06;   /* marca sobre claro */

  /* Papel de ordem de serviço */
  --kg-paper: #F4F2EE;       /* seção clara */
  --kg-paper-deep: #E9E5DC;  /* faixa/rodapé de tabela no claro (só fundo, texto em ink) */
  --kg-white: #FFFFFF;       /* campo "preenchido" na OS */
  --kg-ink: #17181A;         /* texto e filete sobre claro */
  --kg-ink-muted: #55585D;   /* texto secundário sobre claro */
  --kg-ink-line: #6B6E73;    /* borda de controle no claro (4,58:1) */

  /* Risco (vermelho das colunas do elevador) */
  --kg-hazard: #C4272C;      /* faixa de risco e tag; texto branco sobre ele */

  /* Funcionais (texto + lâmpada) */
  --kg-open-d: #3DBE6E;   --kg-open-l: #1A7F43;
  --kg-closed-d: #F2686C; --kg-closed-l: #C4272C;
  --kg-warn: var(--kg-amber-400);       /* "fecha em 45 min" no escuro */
  --kg-warn-l: var(--kg-amber-800);

  /* Linhas */
  --line-dark: rgb(255 255 255 / .14);   /* filete fino no escuro (decorativo) */
  --line-dark-strong: rgb(255 255 255 / .32);
  --line-light: rgb(23 24 26 / .22);
  --line-light-strong: var(--kg-ink);
}
```

Mudanças em relação à versão Astro: removidos `--kg-whatsapp` (sem verde de WhatsApp, nada de botão flutuante verde) e `--kg-orange-600` (não passa em nenhum uso). Adicionados `steel-500`, `steel-300`, `paper-deep`, `ink-line`, `hazard`.

### 2.2 Papéis

- **Laranja = ação**: botão primário, link de ação, foco. **Âmbar = marca**: numerais grandes, rótulos de seção, nota 5,0, escudo. Nunca os dois no mesmo componente (exceção: a linha da lista de sintomas em hover, onde o numeral âmbar fica e o texto "Falar" fica laranja, em elementos separados e afastados).
- **Hazard (vermelho) é acento estrutural, nunca fundo de seção.** Máximo **1 faixa de risco por 2 telas** de scroll, e no máximo 3 no site todo (ver 6.4).
- Botão primário: fundo `orange-500`, texto **grafite `#141516`** (branco dá só 3,35:1).
- Em seções claras, botão primário: fundo `orange-500`, texto `ink` (5,31:1).
- `paper-deep` nunca recebe texto laranja nem link `orange-700` (4,44:1 reprova). Só `ink`, `ink-muted`, `amber-800`.

### 2.3 Superfícies e ritmo

| Superfície | Fundo | Texto | Uso |
|---|---|---|---|
| `dark-a` | `g950` + grão | paper | hero, CTA final, rodapé |
| `dark-b` | `g900` + grão | paper | seções escuras intermediárias |
| `paper` | `paper` + malha milimetrada | ink | "papel de ordem de serviço": sintomas, avaliações, FAQ, onde estamos |
| `paper-deep` | `paper-deep` | ink | tarja de totais, cabeçalho de tabela clara |

Esquema do site (detalhe em `wireframes.md`): **D L D L D L D** com no máximo 2 escuras seguidas. O dark é o padrão em tom e identidade (hero, serviços, CTA, rodapé); o claro dá descanso em leitura longa e é onde a estética "OS impressa" aparece mais.

`prefers-color-scheme: light`: o site não inverte o ritmo. Seções escuras continuam escuras (a marca é dark); apenas `dark-b` pode subir para `#222326` e o grão fica 2 pontos mais discreto. Não existe tema claro completo na v1 (decisão: menos superfície para testar; pendente se o cliente pedir).

---

## 3. Tipografia (protagonista)

Famílias (self-hosted, `woff2`, latin, `font-display: swap`; máx. 2 famílias e 5 arquivos):

- **Barlow Condensed**: 600 e 700 (títulos, numerais, rótulos).
- **Inter**: 400, 500, 600 (corpo, tabelas, UI). Ativar `font-variant-numeric: tabular-nums` em horários, telefone, OS, preços e tabelas. Inter tem `tnum`.
- Preload só do Barlow Condensed 700.
- Wordmark cursivo: somente o SVG/imagem do cliente; nunca reproduzido com fonte.

### 3.1 Escala fluida

```css
:root {
  --fs-display: clamp(3.5rem, 2.2rem + 6.4vw, 8.5rem);   /* 56 → 136 px: numerais gigantes, "5,0" */
  --fs-h1:      clamp(2.75rem, 1.8rem + 4.6vw, 6rem);     /* 44 → 96 px */
  --fs-h2:      clamp(2.25rem, 1.7rem + 2.6vw, 4rem);     /* 36 → 64 px */
  --fs-h3:      clamp(1.5rem, 1.25rem + 1.1vw, 2.25rem);  /* 24 → 36 px */
  --fs-row:     clamp(1.375rem, 1.1rem + 1.2vw, 2rem);    /* 22 → 32 px: linha de sintoma/serviço */
  --fs-lead:    clamp(1.125rem, 1.05rem + .35vw, 1.3125rem); /* 18 → 21 px */
  --fs-body:    1.0625rem;                                 /* 17 px */
  --fs-small:   .9375rem;                                  /* 15 px */
  --fs-label:   .75rem;                                    /* 12 px, caixa alta */
}
```

Valores são alvos; o frontend ajusta o `vw` para atingir H1 ≈ 44 px a 360 e ≈ 88–96 px a 1280.

### 3.2 Estilos

| Papel | Família / peso | Tamanho | Line-height | Tracking | Caixa |
|---|---|---|---|---|---|
| Display / numeral | Barlow Cond. 700 | `--fs-display` | .86 | -0.01em | n/a (numerais) |
| H1 | Barlow Cond. 700 | `--fs-h1` | .92 | -0.005em | **ALTA** no hero ("SEU CARRO EM BOAS MÃOS.") |
| H2 | Barlow Cond. 700 | `--fs-h2` | .98 | 0 | Alta |
| H3 | Barlow Cond. 600 | `--fs-h3` | 1.05 | .01em | Alta |
| Linha de lista | Barlow Cond. 600 | `--fs-row` | 1.08 | .01em | Alta |
| Rótulo (eyebrow, cabeçalho de coluna, nome de campo) | Inter 600 | `--fs-label` | 1.2 | **.14em** | Alta |
| Lead | Inter 400 | `--fs-lead` | 1.5 | 0 | normal |
| Corpo | Inter 400 | `--fs-body` | 1.6 | 0 | normal |
| Dado de tabela (horário, tel., OS) | Inter 500 + `tnum` | 1rem | 1.4 | .01em | normal |
| Botão | Barlow Cond. 700 | 1.25rem | 1 | .06em | Alta |

Regras: caixa alta só em títulos de impacto, rótulos e botões. Corpo e frases longas nunca em alta. Largura de leitura do corpo: `max-width: 62ch`. Hierarquia por **escala e peso**, não por cor: no máximo uma palavra em âmbar dentro de um título.

---

## 4. Espaçamento, grade, raios, sombras

- Base **4 px**. Escala: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- Gutter lateral: **16 px** a 360, 32 px a 768, 48 px a ≥ 1024. Container máx. **1200 px**, centralizado, com `padding-inline` do gutter.
- Ritmo vertical de seção: `padding-block: clamp(64px, 8vw, 128px)`.
- Grade desktop de 12 colunas, gap 24 px. Trilha de índice (numeral) sempre nas colunas 1–2; conteúdo nas 3–12.
- **Raios: 0 ou 2 px.** Padrão `--r: 2px` para botão, tag, campo. `0` para tabelas, linhas e painéis. **Nunca** acima de 4 px, nunca pílula, nunca círculo (exceto o próprio desenho das engrenagens).
- **Sombras**: nenhuma difusa. Elevação é por **filete** e por **sombra dura** deslocada, opcional em botão e tag: `box-shadow: 3px 3px 0 rgb(0 0 0 / .55)` (no escuro) e `3px 3px 0 var(--kg-ink)` (no claro). Sem blur.
- **Bordas**: 1 px filete fino (decorativo); **2 px** para tabelas de ficha e campos; 3 px para a base da tag de peça. Linhas de controle interativo usam `steel-500` (escuro) ou `ink-line` (claro), para passar 3:1.

---

## 5. Texturas e padrões (CSS/SVG, nada de imagem pesada)

Todas via `background-image` com `data:` URI SVG ou gradientes CSS. Nenhuma passa de ~1,5 KB.

### 5.1 Grão (todas as seções escuras)
`<feTurbulence baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/>` em tile 160 × 160, `opacity .035` (≤ 4%), `mix-blend-mode: overlay` fixo em `::before` da seção.

### 5.2 Aço escovado (rodapé, faixa de CTA, cabeçalho de painel)
Só gradientes, sem imagem:
```css
background:
  repeating-linear-gradient(90deg, rgb(255 255 255 / .018) 0 1px, transparent 1px 3px),
  linear-gradient(180deg, #25262A 0%, #1D1E20 40%, #232427 100%);
```
Variante clara para o cabeçalho da OS: a mesma ideia em `#E9E5DC`. Aplicar só em faixas de **≤ 120 px de altura**; nunca em seção inteira (vira "cromado de 2008").

### 5.3 Diamond plate (hero e rodapé, máscara de borda)
Tile SVG 28 × 28: dois losangos alongados cruzados a 45° (traço `#fff`, opacidade .05 no escuro). Aplicar em `::after` com `mask-image: linear-gradient(to left, #000 0, transparent 55%)` para a chapa aparecer só no lado do escudo e sumir em direção ao texto. Nunca atrás de texto corrido.

### 5.4 Malha milimetrada (papel)
Seções `paper`:
```css
background-color: var(--kg-paper);
background-image:
  linear-gradient(rgb(23 24 26 / .06) 1px, transparent 1px),
  linear-gradient(90deg, rgb(23 24 26 / .06) 1px, transparent 1px),
  linear-gradient(rgb(23 24 26 / .035) 1px, transparent 1px),
  linear-gradient(90deg, rgb(23 24 26 / .035) 1px, transparent 1px);
background-size: 80px 80px, 80px 80px, 16px 16px, 16px 16px;
```
A malha de 16/80 px dá a leitura de papel técnico. Máscara vertical (`mask-image` de 0 → 12% e 88% → 0) para as bordas da seção ficarem limpas. Nas tabelas, a malha é coberta pelo fundo `white` ou `paper` das células, então não atrapalha a leitura.

### 5.5 Faixa de risco (hazard)
```css
.hazard { height: 10px;  /* 6 px em listras finas de divisor */
  background: repeating-linear-gradient(135deg, var(--kg-hazard) 0 12px, var(--kg-g950) 12px 24px); }
```
Em seção clara, o par é vermelho e `ink`. Usos permitidos (ver 6.4): (1) borda superior da tag "Peça trocada, peça mostrada"; (2) linha de aviso de segurança do chip de combustível; (3) divisor entre hero e a primeira seção clara; (4) base do rodapé. Qualquer outro uso exige justificar.

### 5.6 Marcas de registro (crop marks)
Quatro cantos em L, 14 × 14 px, 1,5 px de traço, feitos com `border` em pseudo-elementos (`::before`/`::after` + `--tl/--tr/--bl/--br` ou `background` com 8 `linear-gradient` de 14 × 1,5 px). Cor `var(--line-dark-strong)` no escuro e `var(--kg-ink)` a 60% no claro. Aparecem em: moldura do escudo do hero, tag de peça, cartão "OS" de contato, mapa. Máximo **um conjunto por seção**.

### 5.7 Desenho técnico (composição no lugar de foto)
Em SVG inline com `stroke="currentColor"`, `stroke-width: 1` (`vector-effect: non-scaling-stroke`), sem preenchimento:
- **Planta do escudo** (hero): contorno do emblema + linhas de cota (extension lines com ticks `|` nas pontas; sem pontas de seta), eixo central em traço-ponto, circunferências de primitiva das 3 engrenagens com dentes numerados "Z=24", "Z=18", "Z=12" em rótulo pequeno.
- **Engrenagens em corte**: círculo de raiz, círculo de topo, furo, rasgo de chaveta.
- **Legendas** em Inter 600 caixa alta 11–12 px, `letter-spacing: .14em`: "ESC. 1:1", "DET. A", "FOLHA 01/04", "REV. 2026". São rótulos de desenho, não fatos da empresa; **não** inventar medidas reais da peça.
Cor: âmbar a 55% no escuro, `ink` a 45% no claro.

---

## 6. Padrões de componente (especificação, sem código de UI)

### 6.1 Campo de ordem de serviço (o átomo visual)
Rótulo + valor em duas linhas:
```
OS Nº        ← rótulo: Inter 600, 12 px, tracking .14em, caixa alta, steel-400 / ink-muted
0001 / 2026  ← valor: Inter 500 tnum 17 px (ou Barlow 600 24 px se for dado de destaque)
─────────────  ← filete inferior 1 px (line-*)
```
Usos: cabeçalho do hero ("OS Nº", "ENTRADA: SEG–SÁB", "BAIRRO: TREMEMBÉ", "VEÍCULOS: NACIONAIS E IMPORTADOS"), rodapé de contato, bloco da tag de peça. **O número de OS é decorativo e fixo** ("OS Nº 0001") e nunca representa registro real; pendente validação do cliente (a ideia pode parecer afetação se mal executada; ver pendências).

### 6.2 Tabela de especificação
`border-collapse: collapse; width: 100%`. Cabeçalho: rótulo em caixa alta, borda inferior 2 px `ink`/`line-dark-strong`. Linhas: 1 px `line-*`. Coluna de números: `text-align: right`, `tnum`. Linha "hoje" (horários): fundo `ink` + texto paper no claro; fundo `g800` com filete esquerdo âmbar de 4 px no escuro. Zebra proibida (fica "planilha").

### 6.3 Lista numerada (sintomas e serviços): detalhe em `wireframes.md`
Linha = `[numeral 01–10] [título em Barlow] [apoio em Inter] [rótulo de ação]`. Altura mínima **72 px** (mobile) / 88 px (desktop); a linha inteira é o alvo de toque (≥ 48 px, na prática ≥ 72). Filete 1 px entre linhas, 2 px acima da primeira e abaixo da última.

### 6.4 Faixa de risco: orçamento de uso
Total de 4 ocorrências no site (listadas em 5.5). Ela marca **limite estrutural** (começo de um bloco de atenção ou fim do site). Nunca como fundo de botão, nunca ao lado de outra faixa, nunca animada, nunca em texto.

### 6.5 Botões (texto, retos)
| Variante | Fundo | Texto | Borda | Altura | Uso |
|---|---|---|---|---|---|
| Primário | `orange-500` | `g950` | 2 px `orange-500` | 56 px (48 mín.) | WhatsApp |
| Secundário (escuro) | transparente | paper | 2 px `line-dark-strong` (≥ 3:1: usar `steel-500`) | 56 px | "Ver sintomas", "Como chegar" |
| Secundário (claro) | transparente | `ink` | 2 px `ink` | 56 px | idem |
| Link de ação | sem fundo | `orange-400` (escuro) / `orange-700` (claro) | sublinhado 2 px, offset 4 px | texto | "Falar sobre isso" |

Rótulos em Barlow 700 caixa alta, tracking .06em. Padding-x 24 px. `border-radius: 2px`. Sombra dura opcional de 3 px.

### 6.6 Tag de peça (Peça trocada, peça mostrada)
Retângulo de papel `#F4F2EE` (também no site escuro: ele "salta" da seção) com furo e cordinha desenhados em CSS: um furo de 14 px (círculo `radial-gradient` transparente com anel de 2 px `ink`; é forma de objeto físico da etiqueta, não pictograma), canto superior esquerdo cortado 45° (`clip-path`), faixa de risco de 10 px na borda superior, base de 3 px `ink`. Conteúdo em campos de OS. Detalhe em `wireframes.md`.

### 6.7 Selos de confiança
Não existem selos redondos nem "badges" com ícone. Provas são **tabela de fatos**: `5,0 | NOTA NO GOOGLE`, `68 | AVALIAÇÕES`, `100% | PEÇAS MOSTRADAS NA ENTREGA` **(esse último é promessa de método, não métrica; ver pendência)**. Numeral Barlow 700 em âmbar + rótulo em caixa alta.

---

## 7. Estados

| Estado | Escuro | Claro |
|---|---|---|
| `:hover` link de ação | sublinhado 2 → 4 px, cor `orange-400` → `#F59A74`* | sublinhado 2 → 4 px, `orange-700` → `#9A3A18`* |
| `:hover` botão primário | fundo `orange-400` | idem |
| `:active` botão primário | fundo `orange-500`, `translate(2px, 2px)` e sombra dura some | idem (sem cor nova: `g950` sobre `#C9542A` só dá 4,17) |
| `:hover` linha de lista | fundo `g800`, numeral vira âmbar, rótulo "Falar sobre isso" ganha sublinhado | fundo `white`, numeral vira `amber-800`, rótulo ganha sublinhado |
| `:focus-visible` | `outline: 3px solid #fff; outline-offset: 3px` (também com `box-shadow: 0 0 0 6px #141516` para destacar de fundos claros dentro do escuro) | `outline: 3px solid var(--kg-ink); outline-offset: 3px` |
| `:disabled` | não há (site sem formulário) | n/a |
| `[aria-current]` (menu) | filete inferior 3 px âmbar | filete 3 px `amber-800` |
| Selecionado (`<details open>`) | numeral âmbar; filete superior 2 px âmbar | idem com `amber-800` |

\* `#F59A74` e `#9A3A18` são realce de 1 passo e passam AA (ver nota sob a tabela 10).

Alvos de toque: **≥ 48 × 48 px** em tudo, linhas de lista ≥ 72 px. Espaço entre alvos ≥ 8 px.

---

## 8. Movimento (tudo com fallback para `prefers-reduced-motion: reduce`)

| Efeito | Especificação | Reduced-motion |
|---|---|---|
| Engrenagens do emblema | `transform: rotate`; 1 volta em ~20 s, **uma só vez** ao carregar (`animation-iteration-count: 1`), de novo no hover do emblema. Engrenagens vizinhas giram em sentidos opostos (A horário, B anti-horário, C horário) | `animation: none`; engrenagens paradas |
| Desenho de linha do escudo (planta) | `stroke-dasharray` + `stroke-dashoffset` 1.2 s `cubic-bezier(.2,.7,.2,1)` na entrada do hero, **uma vez** | traço completo, sem animação |
| Entrada de seções | opacity 0→1 e `translateY(12px→0)`, 360 ms, `IntersectionObserver` com `threshold .15`, escalonamento ≤ 60 ms entre linhas (máx. 6 itens) | conteúdo já visível; nada é ocultado |
| Sem JS | com `@media (scripting: enabled)` as classes de reveal só são aplicadas quando o script roda | idem |
| Contagem da nota 5,0 | 0,0 → 5,0 em 900 ms `ease-out`, `tnum` para não pular largura | mostra 5,0 direto |
| Hover de linha de lista | `background-color` 120 ms; numeral muda de cor 120 ms | troca instantânea |
| Foco | sem transição (resposta imediata) | idem |
| Barra de ação mobile | `transform: translateY(100%)` ao chegar no rodapé, 200 ms | some/aparece sem transição |

Proibido: parallax, carrossel automático, animação em loop, marquee, cursor customizado, shimmer, "typewriter". Duração máxima de qualquer transição: 400 ms (exceto a linha do escudo, 1,2 s, uma vez).

---

## 9. Acessibilidade

- Mínimo AA em todos os pares (tabela 10). Foco visível sempre.
- Sem ícones: o texto é o rótulo. Botões não precisam de `aria-label` além do texto visível.
- Status "aberto agora": `role="status"` com texto completo; a lâmpada é `aria-hidden`.
- Lista de sintomas: `<ol>` com `<a>` por linha; o numeral é parte do texto visual, `aria-hidden="true"` no numeral (a ordem não carrega significado, é índice).
- Tabelas semânticas (`<table>`, `<th scope>`), tag de peça e cartões com landmarks `<section aria-labelledby>`.
- Desenhos técnicos: `aria-hidden`, exceto o emblema do hero (`role="img"` com `aria-label="Emblema Kando Garage"`).
- Zoom a 200% sem rolagem horizontal; texto em `rem`.

---

## 10. Tabela de contraste (WCAG 2.1, calculado com `node scripts/contrast.mjs`)

Mínimos: texto normal 4,5:1 · texto grande (≥ 24 px ou ≥ 18,66 px bold) 3:1 · componentes e gráficos 3:1.

| # | Par (frente / fundo) | Uso | Razão | Resultado |
|---|---|---|---|---|
| 1 | `#F4F2EE` / `#141516` | texto no escuro (g950) | 16,35 | AAA |
| 2 | `#F4F2EE` / `#1D1E20` | texto em g900 | 14,92 | AAA |
| 3 | `#F4F2EE` / `#2A2B2E` | texto em painel g800 | 12,66 | AAA |
| 4 | `#9A9DA3` / `#141516` | secundário em g950 | 6,73 | AA |
| 5 | `#9A9DA3` / `#1D1E20` | secundário em g900 | 6,14 | AA |
| 6 | `#9A9DA3` / `#2A2B2E` | secundário em g800 | 5,21 | AA |
| 7 | `#B4B7BC` / `#141516` | apoio forte em g950 | 9,09 | AAA |
| 8 | `#B4B7BC` / `#2A2B2E` | apoio forte em g800 | 7,04 | AAA |
| 9 | `#141516` / `#E2683A` | botão primário | 5,46 | AA |
| 10 | `#141516` / `#EE7B50` | botão primário hover | 6,60 | AA |
| 11 | `#17181A` / `#E2683A` | botão primário em seção clara | 5,31 | AA |
| 12 | `#EE7B50` / `#141516` | link de ação em g950 | 6,60 | AA |
| 13 | `#EE7B50` / `#1D1E20` | link de ação em g900 | 6,03 | AA |
| 14 | `#EE7B50` / `#2A2B2E` | link de ação em g800 (linha hover) | 5,11 | AA |
| 15 | `#E2683A` / `#141516` | laranja como numeral/borda grande no escuro | 5,46 | AA (texto grande ou componente) |
| 16 | `#E2683A` / `#2A2B2E` | idem sobre g800 | 4,23 | só componente/texto grande (≥ 3:1) |
| 17 | `#B3441D` / `#F4F2EE` | link de ação em papel | 4,99 | AA |
| 18 | `#B3441D` / `#FFFFFF` | link de ação em branco | 5,58 | AA |
| 19 | `#B3441D` / `#E9E5DC` | link em paper-deep | 4,44 | **REPROVA texto pequeno: não usar** |
| 20 | `#E0A33A` / `#141516` | marca em g950 | 8,24 | AAA |
| 21 | `#E0A33A` / `#1D1E20` | marca em g900 | 7,52 | AAA |
| 22 | `#E0A33A` / `#2A2B2E` | marca em g800 | 6,38 | AA |
| 23 | `#141516` / `#E0A33A` | texto sobre tag âmbar | 8,24 | AAA |
| 24 | `#8A5A06` / `#F4F2EE` | marca em papel | 5,30 | AA |
| 25 | `#8A5A06` / `#FFFFFF` | marca em branco | 5,92 | AA |
| 26 | `#8A5A06` / `#E9E5DC` | marca em paper-deep | 4,71 | AA |
| 27 | `#17181A` / `#F4F2EE` | texto no papel | 15,89 | AAA |
| 28 | `#17181A` / `#FFFFFF` | texto no branco | 17,77 | AAA |
| 29 | `#17181A` / `#E9E5DC` | texto em paper-deep | 14,13 | AAA |
| 30 | `#55585D` / `#F4F2EE` | secundário no papel | 6,39 | AA |
| 31 | `#55585D` / `#E9E5DC` | secundário em paper-deep | 5,68 | AA |
| 32 | `#55585D` / `#FFFFFF` | secundário no branco | 7,14 | AAA |
| 33 | `#3DBE6E` / `#141516` | "aberto" no escuro | 7,65 | AAA |
| 34 | `#1A7F43` / `#F4F2EE` | "aberto" no papel | 4,51 | AA |
| 35 | `#F2686C` / `#141516` | "fechado" no escuro | 6,07 | AA |
| 36 | `#C4272C` / `#F4F2EE` | "fechado" no papel | 5,11 | AA |
| 37 | `#FFFFFF` / `#C4272C` | texto na tag/faixa vermelha | 5,72 | AA |
| 38 | `#F4F2EE` / `#C4272C` | idem com paper | 5,11 | AA |
| 39 | `#C4272C` / `#141516` | faixa de risco vs fundo (não texto) | 3,20 | OK ≥ 3:1 (gráfico) |
| 40 | `#7C7F85` / `#141516` | borda de controle no escuro | 4,55 | OK ≥ 3:1 |
| 41 | `#6B6E73` / `#F4F2EE` | borda de controle no papel | 4,58 | OK ≥ 3:1 |
| 42 | `#17181A` / `#F4F2EE` | borda ink (foco/tabela) no papel | 15,89 | AAA |
| 43 | `#FFFFFF` / `#3A3B3E` | texto sobre g700 | 11,20 | AAA |
| 44 | `#3A3B3E` / `#141516` | filete decorativo no escuro | 1,63 | decorativo (**nunca** único indicador) |
| 45 | `#141516` / `#C9542A` | `orange-600` como fundo (:active antigo) | 4,17 | **REPROVA texto pequeno; removido** |

Hover de link (calculado): `#F59A74` / `#141516` 8,49 · `#F59A74` / `#2A2B2E` 6,58 · `#9A3A18` / `#F4F2EE` 6,28 · `#9A3A18` / `#FFFFFF` 7,02. Todos AA ou melhor.

Reproduzir: `node scripts/contrast.mjs '[["nome","#F4F2EE","#141516"]]'`.

---

## 11. Checklist para o frontend (anti-"template")

1. Nenhum `border-radius` > 4 px; nenhum botão em pílula; nenhuma sombra com blur.
2. Nenhum SVG que seja pictograma. Só: emblema, engrenagens, planta técnica, pin em escudo, texturas.
3. Todo item de lista tem numeral (01–10) e **linha inteira clicável**; sem cards-em-grade com ícone.
4. Pelo menos 1 numeral gigante (`--fs-display`) por seção escura.
5. Ritmo D L D L D L D; nunca 3 seções escuras seguidas.
6. Faixa de risco: ≤ 4 no site, nunca duas visíveis ao mesmo tempo.
7. `prefers-reduced-motion` testado: tudo visível, nada se move.
8. `tabular-nums` em horário, telefone, CEP, nota, contagens.
