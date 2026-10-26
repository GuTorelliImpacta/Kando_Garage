# Revisão crítica de design e experiência: Kando Garage

Contra a direção "O Brasão da Confiança" (PROMPT seções 3, 4 e 5). Base: capturas Playwright em 360 e 1280 px, dark e light (`prefers-color-scheme`), com `reducedMotion`. Nenhum código-fonte foi alterado.

## Veredito

A base é sólida: tipografia (Barlow Condensed + Inter), mini-escudos, selo 5,0, "escudo dividido" no Como trabalhamos e o seletor de sintomas funcionam e não parecem template. O CTA laranja fica acima da dobra a 360 px (botão em y≈515–575, a barra fixa começa em y≈680). Não há scroll horizontal (scrollWidth = 360).

Os problemas estão no **ritmo** (quase não há alternância), no **emblema provisório** (pouco refinado para ser o motivo central), no **mapa/pin** (grosseiro) e em **sobreposições e competição de cores** pontuais.

---

## IMPACTO ALTO

### A1. Ritmo dark/claro praticamente inexistente (dark: 6 seções seguidas; light: nenhuma alternância)

- **Evidência:** em dark, Hero, Trust, Sintomas, Serviços, Como trabalhamos e Diferenciais são todas grafite (`--bg`/`--bg-alt` diferem 1 passo: #141516 vs #1D1E20). A 1ª seção clara só aparece depois de cerca de 70% da página a 360 px (Avaliações, ~y 8.000 de 12.241). O sistema promete "dark alternado com paper" e hoje é "dark, depois um bloco claro".
- **Em light** (`prefers-color-scheme: light`): `.sec-dark` vira #eae6de e `.sec-alt` #e2ddd3, ou seja, a página toda fica bege com diferenças de 3% de luminância. As seções `sec-light` (#fff) são a única mudança. A atmosfera "oficina à noite" some por completo e o hero perde a identidade.
- **Arquivos:** `src/pages/index.astro` (classes das seções), `src/styles/tokens.css` linhas 55–95.
- **Correção:** tornar claras as seções de leitura/comparação (Serviços e Diferenciais) para quebrar a sequência, e manter dark no Hero, Sintomas e Como trabalhamos (a assinatura).

```diff
-  <section class="section sec-dark" id="servicos" ... style="background:var(--bg-alt)">
+  <section class="section sec-light" id="servicos" ...>
...
-  <section class="section sec-dark" id="diferenciais" ... style="background:var(--bg-alt)">
+  <section class="section sec-dark" id="diferenciais" ...>   <!-- fica dark: separa Como trabalhamos de Avaliações com o Serviços claro antes -->
```

Resultado a 360 px: Hero (dark), Trust (dark), Sintomas (dark), Serviços (claro), Como trabalhamos (dark), Diferenciais (dark ou claro), Avaliações/FAQ/Local (claro), CTA (dark). Para Diferenciais, preferir `sec-light` e deixar Avaliações em `--bg-alt` levemente diferente, ou fundir os dois.

Em light mode, dar contraste real ao bloco "dark" e manter o hero escuro, já que a marca é dark:

```diff
 @media (prefers-color-scheme: light) {
-  :root:not([data-theme="dark"]) .sec-dark,
-  :root:not([data-theme="dark"]) body {
+  :root:not([data-theme="dark"]) body {
     --bg: #eae6de; ...
   }
+  /* hero, CTA final e rodapé permanecem grafite também no tema claro */
+  :root:not([data-theme="dark"]) .hero.sec-dark,
+  :root:not([data-theme="dark"]) .cta-final.sec-dark,
+  :root:not([data-theme="dark"]) .site-footer.sec-dark { /* reaplicar tokens dark */ }
```

### A2. Emblema provisório (`Emblem.astro`) fraco como motivo central

Vistos no hero 1280 px e no selo "Peça trocada":

- **Engrenagens parecem "sol/ouriço", não engrenagem.** Os dentes vêm de `stroke-dasharray` num círculo: ficam finos, retos e irregulares (tamanho de dente não casa com o raio). Falta o corpo robusto do logo.
- **Engrenagem do meio cortada pelo divisor.** A `gear-b` (cx 86, r ≈ 18,5) passa de x=100 e é cortada pelo `clipPath` da metade esquerda. Parece erro, não encaixe. As três engrenagens também não se engrenam (não se tocam).
- **Cabeça da chave inglesa cortada pela borda do escudo.** Em `translate/rotate(42 142 118)` o círculo r=15 em (142,66) encosta no contorno direito; no render a "mandíbula" aparece achatada e quase sai do escudo.
- A chave de fenda (cabo laranja) e a chave inglesa cruzam sem hierarquia; o conjunto é pequeno e há muito grafite vazio na metade direita. O orange aparece no cabo, mas a direção diz laranja = ação (aceitável por fidelidade ao logo da versão Instagram, desde que não seja o único ponto laranja em volta de um CTA).
- A 360 px o `emblem-bg` (opacity .16) vira uma mancha cinza cortada atrás do H1, que reduz o contraste do texto de apoio sem agregar marca.
- **Arquivo e correção:** `src/components/Emblem.astro`.
  1. Desenhar dentes como polígonos (`<path>` gerado: 10–12 dentes trapezoidais por engrenagem), ou usar um `<symbol>` de engrenagem reutilizado com `scale`. Alternativa de custo baixo: aumentar `stroke-width` e reduzir `stroke-dasharray` para dentes quadrados (ex.: r=23, sw=10, dasharray="6.3 6.3").
  2. Mover `gear-b` para x ≤ 80 (`cx="78"`) para não cruzar o divisor, e posicionar as três de modo que se toquem (distância entre centros = r1 + r2 + ~2).
  3. Mover o pivô das ferramentas para `142,128` e reduzir o círculo da chave (`r=13`), ou escalar o grupo `0.9`, para a cabeça ficar dentro do clip do escudo.
  4. Alternativa, como já indicado no comentário do arquivo: substituir pelo SVG oficial de `brand/`. Esta é a correção correta; o provisório só deve sobreviver se não for refinado.
- **`.hero .emblem-bg` (`tokens.css` linha 203):**

```diff
-.hero .emblem-bg { right: -14%; top: 4%; width: min(78vw, 420px); opacity: .16; }
+.hero .emblem-bg { right: -22%; top: 38%; width: min(70vw, 360px); opacity: .10; mask-image: linear-gradient(180deg, transparent, #000 40%, transparent); }
```

(joga o escudo para a área abaixo do texto de apoio, atrás dos botões, longe do H1).

### A3. Mapa esquemático e pin em escudo pouco convincentes (`MapArt.astro`, `Location.astro`)

- **Evidência:** ruas são faixas cinza espessas e retas, sem rótulos, sem quadras reais, sem hierarquia; o conjunto lê como placeholder. O pin tem forma de escudo, mas dentro só um círculo preto e um traço inclinado (as ferramentas ficaram irreconhecíveis a 60 px).
- A seção usa 3 botões primários/ghost sobre o mapa a 360 px (cobrem boa parte da ilustração), e **dois botões laranja sólidos na mesma tela** (`Chamar no WhatsApp` e `Abrir no Google Maps`) competem. O laranja é a ação principal; direções é secundária.
- **Correção `MapArt.astro`:** reduzir `stroke-width` das ruas, adicionar 2 avenidas diagonais em tom um pouco mais claro e um rótulo "Av. Mandaqui" / "R. Mamud Rahd" em `<text>` (SVG, 10 px, `#6b6e74`), manter uma "praça" em verde-grafite (`#1f2421`). No pin, trocar as ferramentas por mini-engrenagem + traço da divisão:

```diff
-    <circle cx="14" cy="26" r="6" fill="#141516"/><path d="M26 18l10 16" .../>
+    <circle cx="13" cy="26" r="5" fill="none" stroke="#141516" stroke-width="3" stroke-dasharray="2 2"/>
+    <path d="M27 17l9 17M36 17l-9 17" stroke="#141516" stroke-width="3" stroke-linecap="round"/>
```

- **Correção `Location.astro` (hierarquia do CTA):** o botão do mapa passa a ghost, o orange fica só no WhatsApp:

```diff
-<a class="btn btn-primary btn-sm" href={links.maps} ...>
+<a class="btn btn-ghost btn-sm" href={links.maps} ...>
```

### A4. Estado "Fechado" em vermelho domina a primeira dobra no mobile e se repete 4×

- **Evidência (360 px):** header com "Fechado" vermelho (com halo) é o 2º elemento da tela, antes do H1; o badge do hero (y≈670) fica **escondido atrás da barra fixa**, então o usuário só vê o vermelho do header. Quando fechado, a primeira impressão é "não dá pra falar agora", o oposto da ação desejada (o WhatsApp funciona fora do horário). O vermelho também aparece no hero, local, CTA final e header.
- **Arquivos:** `src/styles/tokens.css` linhas 192–198, `src/components/Header.astro`, `StatusBadge.astro`.
- **Correção:** no estado fechado, texto neutro e ponto âmbar/cinza; reservar vermelho só para o ponto no header e manter a copy que convida ("abre hoje às 8h · chame no WhatsApp"). Remover o halo no header.

```diff
-.status[data-state="closed"]::before { background: var(--closed); box-shadow: 0 0 0 4px color-mix(in srgb, var(--closed) 25%, transparent); }
+.status[data-state="closed"]::before { background: var(--closed); box-shadow: none; }
+.header-actions .status[data-state="closed"] .status-short { color: var(--muted); }
```

E subir o badge do hero para antes dos CTAs em ≤ 899 px (ficar visível acima da barra fixa): mover `<StatusBadge>` para entre `.hero-proof` e `.hero-cta` no `Hero.astro`.

### A5. FAB do WhatsApp sobrepõe conteúdo no desktop (1280 px)

- **Evidência:** o botão verde fixo (60 px, `right:20`) cobre o texto do 4º item da Trust bar ("Diagnóstico com equipament…") e se encosta nas bordas de cards e CTAs em outras seções. O verde é intencional (só no FAB), mas ele já tem concorrente: o header sticky tem o CTA laranja.
- **Arquivo:** `src/styles/tokens.css` linha 378–381.
- **Correção:** o `.wrap` precisa de respiro à direita no desktop ou o FAB deve sumir quando o header CTA e o hero CTA estão na tela. Mínimo: reservar espaço e esconder no hero.

```diff
+@media (min-width: 900px) { .trust-grid, .wrap { padding-right: max(24px, env(safe-area-inset-right)); } }
+.fab[data-in-hero] { opacity: 0; pointer-events: none; }   /* ativar via IntersectionObserver já usado para a barra */
```

---

## IMPACTO MÉDIO

### M1. Serviços e Sintomas são redundantes e geram um "muro de cards" no mobile

- A 360 px há 10 chips (Sintomas) + 9 cards (Serviços) em coluna única: ~3.800 px de listas quase iguais (mesmos ícones, mesmos CTAs). Os dois fazem "fale sobre isso" no WhatsApp.
- **Arquivos:** `src/components/ServiceCard.astro`, `tokens.css` (`.cards`).
- **Correção:** no mobile, mostrar os cards de serviço em 2 colunas compactas (ícone + título, descrição ocultável com `<details>` ou truncada em 2 linhas) e remover o link repetido "Falar sobre isso" de cada um (o CTA fica na faixa "Não achou o seu problema?").

```diff
-@media (max-width: 599px) { .cards { grid-template-columns: 1fr; } }
+@media (max-width: 599px) { .cards { grid-template-columns: 1fr 1fr; gap: 10px; } .card p { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; } .card .card-link { display: none; } }
```

(verificar nomes reais de classe em `ServiceCard.astro`.)

### M2. Seção Avaliações sem prova social textual

- Só há o selo 5,0 num card escuro (bonito) e dois botões. Sem trechos confirmados (`confirmed:false`), a seção "Quem já deixou o carro em boas mãos" fica rala e ocupa um bloco claro inteiro só para um número que já aparece no hero, na Trust bar e nos Diferenciais (4 repetições).
- **Correção:** enquanto não houver trechos autorizados, fundir o selo com a seção FAQ/Local ou transformá-lo numa faixa fina entre seções. Em `index.astro`, colocar o selo dentro de uma `section` de padding menor (`style="padding-block:40px"`) e remover "5,0 no Google" da Trust bar (substituir por "Atendimento direto").

### M3. Âmbar e laranja competem em alguns pontos

- Regra: "nunca os dois lado a lado no mesmo componente". Violações vistas: (a) hero: estrelas e "5,0" âmbar colados ao botão laranja; (b) selo de avaliações: "5,0" e estrelas âmbar com o botão laranja na mesma barra; (c) setas laranja dentro de chips com ícone/escudo âmbar (Sintomas, `.chip`): ícone âmbar + seta laranja no mesmo componente; (d) cabo laranja da ferramenta dentro do emblema ao lado de engrenagens âmbar.
- **Correção:** setas dos chips em `var(--muted)` com hover para laranja; botão "Já é cliente? Avalie a gente" em ghost (laranja só em ação principal).

```diff
-.chip .arrow { color: var(--accent); }
+.chip .arrow { color: var(--muted); } .chip:hover .arrow { color: var(--accent); }
```

```diff
-<a class="btn btn-primary btn-sm" href={links.writeReview} ...>
+<a class="btn btn-ghost btn-sm" href={links.writeReview} ...>
```

### M4. Hero desktop com eyebrow quebrando e vazio inferior

- O eyebrow âmbar quebra em 2 linhas com órfão ("DE SP"), em caixa alta com letter-spacing largo. Há ~100 px de espaço vazio abaixo dos CTAs, e a coluna do texto termina antes do H1 crescer.
- **Arquivo:** `Hero.astro`/`tokens.css` `.eyebrow`.
- **Correção:** `text-wrap: balance` no eyebrow e reduzir o texto ("Mecânica geral e especializada · Tremembé, Zona Norte").

```diff
+.hero-copy .eyebrow { text-wrap: balance; letter-spacing: .12em; }
```

### M5. Seção CTA final: emblema fantasma com contraste ruim

- O emblema ghost atrás do CTA final tem traços cinza grossos cruzando o H2 e o botão; as engrenagens ficam sujas atrás de "Seu carro está dando sinal?". Parece artefato.
- **Arquivo:** `CtaFinal.astro` e CSS `.cta-final .emblem-bg`.
- **Correção:** reduzir para `opacity:.07`, centralizar e aplicar `mask-image: radial-gradient(closest-side, transparent 35%, #000)` para esvaziar o centro onde está o texto.

---

## IMPACTO BAIXO

### B1. Tipografia e texto de apoio no mobile
- Texto `.hero-sub` em `--muted` (#9a9da3) sobre o emblema fantasma a 360 px: razão de contraste cai com a mancha. Resolvido junto com A2.

### B2. "Como trabalhamos" a 360 px: o escudo dividido vira dois cartões empilhados
- O divisor vertical (assinatura da seção) desaparece no mobile. Aplicar um divisor horizontal âmbar com mini-escudo no centro entre "Diagnóstico" e "Serviço".

```diff
+@media (max-width: 899px) { .split-half + .split-half::before { content:""; display:block; height:1px; background:linear-gradient(90deg,transparent,var(--brand),transparent); margin-block: 8px; } }
```

### B3. Cards "Peça trocada, peça mostrada" sem foto
- O momento emocional (D) usa o emblema miniaturizado; ok enquanto não há foto, mas o bloco é pequeno e quase igual ao card "Revisão" abaixo. Dar mais peso: título maior (`clamp(1.8rem, 4vw, 2.6rem)`), borda âmbar mais visível e o emblema em 160 px.

### B4. FAQ no desktop ocupa só 2/3 da largura
- Coluna de 820 px à esquerda e vazio à direita. Opcional: colocar o mini-selo ou o CTA "Ainda com dúvida? Chamar no WhatsApp" em coluna lateral sticky.

### B5. Rodapé a 360 px
- Longo e sem destaque para os mesmos 3 botões (a barra fixa some no rodapé, ok). Garantir que a primeira dobra do rodapé tenha WhatsApp (já tem na barra) e agrupar Contato/Horário em duas colunas ≥ 480 px.

---

## O que está bom (manter)

- Hierarquia do hero: H1 com "boas mãos." em âmbar (marca), CTA laranja único e dominante, secundário ghost.
- Mini-escudos de serviço com divisor central: coeso com o conceito.
- Seletor de sintomas em grade 3×4 no desktop: legível, com aviso do combustível em âmbar.
- Como trabalhamos (desktop): metade diagnóstico/serviço com divisor âmbar funciona como "escudo dividido".
- Barra fixa mobile com 3 ações e rótulos; alvos de toque ≥ 48 px.
- Seções claras (FAQ, Local) legíveis; contraste de texto adequado nas capturas.

## Ordem sugerida de correção

1. A1 (ritmo) e A4 (status), baratos e de maior ganho percebido.
2. A2 (emblema) ou substituição pelo SVG oficial; A3 (mapa/pin e hierarquia dos CTAs).
3. A5, M3, M5.
4. M1, M2, M4 e baixos.

Capturas geradas em `/tmp/claude-0/-home-user-Kando-Garage/1a3e1c46-12b5-518a-8758-9bb6f6a98b1e/scratchpad/` (fold-*, s-*, p-*).
