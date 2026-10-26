# QA: revisão independente da versão React (Fase 6)

Feita pelo subagente `qa-reviewer`, que **não construiu este site**. Esta é uma revisão nova, da versão **React 19 + Vite com pré-render estático e sem ícones**. Ela substitui a revisão anterior (versão Astro). Data: 26/10/2026. Nenhum código foi alterado e nenhum comando git foi executado.

Método: `npm ci` (0 vulnerabilidades), `npm run build` (sem erros nem avisos), `dist/` servido por `scripts/serve-dist.mjs` na porta 4350 (headers do `vercel.json`), `npx tsx scripts/test-status.mjs`, Playwright/Chromium 1243 em 360 px e 1280 px (dark e `prefers-color-scheme: light`), `page.clock` para o relógio, Lighthouse 13 mobile (2 rodadas), `scripts/audit-a11y.mjs`. Capturas analisadas visualmente (Read em PNG) em `scratchpad/shots/` (fora do repositório).

Não foi possível sem rede pública: securityheaders.com, Mozilla Observatory, Rich Results Test, clique real em WhatsApp, Maps e Instagram (as requisições a `wa.me` foram interceptadas e a URL final conferida).

## Resumo por item

| # | Item | Resultado |
|---|---|---|
| 1 | Fatos vs seção 1 e nada inventado | **Reprovado (parcial)**: fatos reais corretos; textos decorativos novos afirmam coisas sem base |
| 2 | Links e mensagens do WhatsApp | **Aprovado com ressalvas** |
| 3 | Jornada no celular 360 px (≤ 2 toques) | **Aprovado** |
| 4 | Status de horário | **Aprovado** |
| 5 | Regra do cliente: nenhum ícone, pictograma, emoji ou ★ | **Aprovado com ressalvas** (nenhum ícone; dois resíduos de ★ e uma regressão de copy) |
| 6 | Marca e visual ("mecânica de respeito" ou template) | **Aprovado com ressalvas** |
| 7 | Conteúdo, português, tom, CONFIRMAR | **Reprovado (parcial)**: 2 erros de copy e 1 de numeração |
| 8a | Metas 8.2 (Lighthouse, peso, CWV) | **Aprovado** |
| 8b | Meta 8.2 "JS < 30 KB gzip" | **Reprovado (conhecido, decisão pendente)** |
| 8c | Metas 9.2 (segurança) | **Reprovado (parcial)**: `security.txt` |
| 9 | Hidratação, console, formulário, cookie | **Aprovado** |

## 1. Fatos vs seção 1

**Os fatos reais batem.** Conferidos no HTML gerado, no DOM hidratado, no JSON-LD e em `src/content/site.ts`:
- Endereço "R. Mamud Rahd, 202, Tremembé, São Paulo/SP, 02372-090", coordenadas -23,4598259 / -46,626002 (rodapé da seção de mapa mostra arredondado: -23,4598 · -46,6260), Place ID.
- WhatsApp `5511988367054` (exibido como (11) 98836-7054), `tel:+5511988367054`, e-mail `kandogarage@gmail.com`, Instagram `@kando_garage`.
- Horário seg-sex 08:00-18:00, sáb 09:00-14:00, dom fechado, em tabela, resumo, JSON-LD e status; fonte única em `site.ts`.
- 7 serviços oficiais + arrefecimento e combustível (citados por clientes), nota 5,0 e 68 avaliações, slogan, posicionamento, bairros atendidos.
- Diego não aparece em nenhum texto visível. Nenhum trecho de avaliação aparece (todos `confirmed:false`). CNPJ oculto.

**O que reprova: os textos decorativos novos ("ordem de serviço", desenho técnico, carimbos, tag de peça).** O comentário de `site.ts:125` diz que são "só rótulos de layout", mas vários **parecem afirmar fatos** a um visitante real:

| Texto visível | Onde | Por que é problema |
|---|---|---|
| **"OS · Nº 0001 / 2026"** (campo do topo do hero) | `site.ts:507-508` | Parece um número de ordem de serviço real, gerado para este visitante. Não existe sistema de OS na seção 1. Sugere que o site abre uma ordem, o que ele não faz. **Alta prioridade.** |
| **"Esc. 1:1 · Det. A · Folha 01/04"** (legenda do desenho no hero) | `site.ts:512` | Escala, detalhe e "folha 1 de 4" não existem. "Folha 01/04" ainda sugere um documento de 4 folhas. Decoração falsa de documento técnico. |
| **"Z=24 / Z=18 / Z=12"** (rótulos de dentes das engrenagens) | `site.ts:516`, `Emblem` (`.bp__txt`) | Número de dentes de engrenagem de um logo. É medida técnica inventada (o código comenta "não representam medidas reais", mas o visitante não lê o comentário). Está `aria-hidden`, mas é visível. |
| **"Ficha de confiança · Rev. 2026"** | `site.ts:519` | "Rev." sugere revisão controlada de um documento. Inofensivo, mas é invenção. |
| **"Peça Nº 01" + campo "Data" em branco + régua "Km ... Tempo"** na etiqueta e na revisão | `site.ts:534-535`, `PartTag.tsx:54-57` | A tag de peça mostra "Peça Nº 01" como se fosse uma peça rastreada e um campo "Data" vazio (parece formulário não preenchido, quando o site não tem campos). A régua "Km ... Tempo" é decorativa, sem escala. |
| **"Situação: Peça substituída · Mostrada a você: Na entrega · Serviço feito: Depois da sua aprovação"** | `site.ts:~195-200` | Sustentado pela seção 1/6.6 (mostrar peças na entrega, só fazer o que aprovar). OK. |
| **"Origem: Oficial / Citado por clientes"** (coluna da tabela de serviços) | `site.ts:531`, `ServiceRow.tsx:14` | Não é fato inventado, mas **vaza metadado interno de proveniência**. Um cliente lê "Oficial" sem saber do que é oficial, e "Citado por clientes" em arrefecimento e combustível enfraquece dois serviços que a oficina realmente faz. Recomendo remover a coluna. |
| "Diagnóstico com equipamento" / "Diagnóstico com scanner" | `site.ts:210, 279, 524` | Vem do texto-base do próprio prompt (6.3, 6.5), mas **não está na seção 1** (que só lista serviços e "diagnósticos"). Registrar para o cliente confirmar o scanner/equipamento. |
| "Honestidade comprovada" | `site.ts:353` | Vem do prompt (6.7). É afirmação de prova baseada só na nota; aceitável, porém é o mais próximo de superlativo do site. |
| "É um elogio que aparece sempre nas avaliações" | `site.ts:324` | "Sempre" é exagero; a seção 1.2 diz "padrão" nas avaliações. Trocar por "aparece nas avaliações". Baixa. |

Itens decorativos considerados **OK** (não afirmam fato): "Ficha 0X ..." (numeração de seção), "Item 01", "Área: ...", "Bairro: Tremembé · SP", "Veículos: Nacionais e importados", o carimbo da tag ("Você vê cada peça que trocamos"). Os carimbos `orderSheet.stamps` ("Aprovado por você", "Peça mostrada") existem em `site.ts` mas não os encontrei no texto visível da home.

**Dados que não estão na seção 1 e que continuam no site (herdados do prompt)**: bairros atendidos (Jardim Tremembé, Tucuruvi, Mandaqui, Jaçanã, Vila Irmãos Arnoni, Horto Florestal) estão na 6.11, portanto aceitos.

## 2. Links

HTML gerado (`dist/index.html`): 10 sintomas, 9 serviços, CTA padrão (9x), revisão (3x), `tel:+5511988367054` (3x), Maps `search/?api=1&query=Kando+Garage&query_place_id=...` (5x), Maps place (2x), avaliação `search.google.com/local/writereview?placeid=...` (1x), Instagram `https://www.instagram.com/kando_garage`, e `wa.me/5511988367054` simples (1x). Todas as mensagens estão URL-encoded e **idênticas à seção 5.2-C** (conferi as 10 mensagens decodificadas) e os 9 serviços têm mensagem própria coerente (revisão reutiliza a mensagem do chip). A URL real aberta ao tocar no chip do airbag foi interceptada: `...text=Olá! Vim pelo site. A luz do airbag está acesa no painel. Podem avaliar?`.

Após hidratação: aparecem os 2 `mailto:kandogarage@gmail.com` (botão "E-mail" e rodapé), montados por `EmailLink.tsx`. No HTML pré-renderizado e sem JS o e-mail aparece como "kandogarage arroba gmail.com" e não há `@` literal (0 ocorrências em `dist/index.html`). Todos os links `http(s)` têm `rel="noopener noreferrer"`. O iframe do mapa só nasce no clique (`https://www.google.com/maps?q=...&output=embed`).

Ressalvas:
- **R1.** "Ver todas no Google" (`links.mapsReviews`, `site.ts`) é idêntico ao `mapsPlace`; abre a ficha do local, não a aba de avaliações. Aceitável, mas não leva diretamente às avaliações.
- **R2.** `security.txt`/sitemap/canonical usam `kandogarage.com.br`, domínio ainda **não confirmado** (pendência 1.4). Tudo depende de `VITE_SITE_URL` no deploy.
- Links externos não puderam ser clicados de verdade (sem rede).

## 3. Jornada "carro com problema" (360 px, toque)

**Aprovado.**
- Toque 1: o botão "Chamar no WhatsApp" (328×56 px, y=660, **acima da dobra de 740 px**) abre `wa.me` com a mensagem padrão do hero.
- Para mensagem por sintoma: toque 1 em "O que meu carro tem?" (leva a `#sintomas`, rolou até y=1285); toque 2 no chip abre o `wa.me` com a mensagem correta (verificado no chip do airbag). Dois toques.
- Observação: após o toque 1 só os primeiros ~3 a 4 chips cabem na tela. O chip do airbag (06) ficou **fora da área visível** e exigiu rolagem (rolar não conta como toque). Se "à vista" importar, subir o seletor para logo abaixo da faixa de confiança ou reduzir a altura da introdução.
- Barra fixa (WhatsApp / Ligar / Como chegar) sempre visível; sem rolagem horizontal (scrollWidth = 360).
- Nota de UX: os 10 itens têm o mesmo rótulo "Chamar no WhatsApp" (leitores de tela dependem do título + "Área"); visualmente, a repetição é monótona e o alvo é um link sublinhado pequeno dentro de uma linha clicável.

## 4. Status de horário

**Aprovado.** `test-status.mjs`: 10/10 OK. No navegador, com `page.clock.install` e fuso do navegador `America/Sao_Paulo` e também `Asia/Tokyo` (resultado idêntico, logo o cálculo usa o fuso da oficina):

| Cenário | Resultado exibido |
|---|---|
| seg 07:59 | Fechado · abre hoje às 8h |
| seg 08:00 | Aberto agora · fecha às 18h |
| seg 17:00 | Fecha em 1 h |
| seg 17:15 | Fecha em 45 min |
| seg 17:30 | Fecha em 30 min |
| seg 18:01 | Fechado · abre amanhã às 8h |
| sex 18:01 | Fechado · abre amanhã às 9h (correto, sábado abre às 9h) |
| sáb 08:59 | Fechado · abre hoje às 9h |
| sáb 13:30 | Fecha em 30 min |
| sáb 14:01 | Fechado · abre segunda às 8h |
| dom 10:00 | Fechado · abre amanhã às 8h |

A linha "hoje" da tabela de horário acompanha o dia (seg a sex, sábado, domingo "Fechado"). Sem JS, o badge degrada para "Seg–Sex 8h–18h · Sáb 9h–14h". Detalhe cosmético: "Fecha em 1 h" (`status-horario.ts:30`) tem espaço antes do "h", enquanto o resto usa "8h"/"18h"; padronizar para "1h".

## 5. Regra do cliente: nenhum ícone, pictograma, emoji ou ★

**Aprovado com ressalvas.** Varredura em `dist/*.html` e no DOM hidratado (home, política, 404):
- `<img>`, `<picture>`, `<video>`, `<canvas>`, `<object>`, `<embed>`: **0**. Nenhum `<iframe>` até o clique no mapa.
- Glifos unicode de ícone (seta, ★, ☆, ✓, emoji, bullets decorativos, faixas U+2190–21FF, U+2600–27BF, U+2B00–2BFF, U+1F000+): **0 no texto visível** (único não-alfabético é "©", legítimo). Conteúdo de `::before`/`::after`: **0** (não há pseudo-elemento com glifo).
- `<button>`: 2 no HTML estático (menu e carregar mapa), ambos só com texto.
- Fundos CSS: só `repeating-linear-gradient` (faixa de risco, grade, grão). Nenhum `url()`.

SVGs na home hidratada (11) e se são permitidos:

| # | SVG | Onde | Permitido? |
|---|---|---|---|
| 1 | `emblem logo__mark` 28×32 | Link do logo no header | Sim (emblema) |
| 2 | `emblem spin-once plate__emblem` (role=img, "Emblema Kando Garage") | Hero, placa (0×0 em 360 px; só aparece no desktop) | Sim (emblema/engrenagens) |
| 3 | `bp plate__bp` 280×317 (cotas e "Z=24/18/12") | Hero (desenho técnico) | Sim (engrenagens/textura de desenho técnico); texto "Z=" é o problema do item 1 |
| 4 | `emblem emblem--line` 163×202 | Dentro do bloco do hero (traço) | Sim (emblema) |
| 5 e 6 | `emblem emblem--line half__art` (2x) | Metades do "escudo dividido" | Sim (emblema/engrenagens, ferramentas do logo) |
| 7 | `emblem emblem--line watermark` 360×418 | Marca d'água atrás de "Diferenciais" | Sim (emblema) |
| 8 | `svg` sem classe, 312×320 (esquema de ruas, "R. MAMUD RAHD") | Mapa esquemático | Sim (mapa/pin/textura); o `<div>` pai tem `aria-hidden` |
| 9 | `pin mapart__pin` 56×66 | Pin em escudo | Sim (pin) |
| 10 | `emblem spin-once cta__emblem` | CTA final | Sim (emblema) |
| 11 | `emblem foot__mark` | Rodapé | Sim (emblema) |

Política: 2 SVGs (logo e rodapé). 404: 3 (logo, emblema com engrenagem solta, rodapé). **Nenhum SVG de ícone de serviço, de seta ou de pictograma.** Os rótulos de numeração substituem ícones, conforme a regra. Todos os SVG decorativos estão `aria-hidden`, exceto o do hero (`role="img"` com nome).

Ressalvas:
- **5-a.** O PNG `public/og.jpg` e o JSON do `site.ts` (export morto `trust`, `site.ts:206-211`, ainda com "5,0 ★ no Google") não exibem a estrela na página, mas a constante **contém ★**; está sem uso. Remover para não reaparecer. A seção 7.1 do prompt pede "★ 5,0 no Google" na OG; foi corretamente substituída por texto, **mas ficou "DE 5,0 NO GOOGLE" (ver item 7)**.
- **5-b.** A faixa de risco vermelha/preta e as engrenagens do emblema contam como "textura/emblema", permitidas. O emblema do hero mistura engrenagens âmbar e chave de fenda laranja no mesmo componente (ver item 6).

## 6. Marca e visual

**Aprovado com ressalvas.** Avaliação crítica a partir das capturas em 360 e 1280 px.

**O que funciona (parece "mecânica de respeito", não template):**
- Identidade própria e coerente: grafite profundo alternando com "papel" quadriculado, faixa de risco vermelha/preta como divisor entre blocos, numeração grande em âmbar (01..10), tabela de serviços em 1280 px com cara de planilha de oficina, tag de peça inclinada com borda de risco, rodapé com faixa de risco. A estética "ordem de serviço" é consistente do hero ao rodapé.
- Hierarquia clara. H1 em Barlow Condensed gigante, CTA laranja imediato, 5,0 grande em âmbar, subtítulo legível. Contraste forte e legibilidade boa em 360 px (corpo 16 px, rótulos em caixa alta com tracking).
- Laranja = ação, âmbar = marca: **respeitado** (CTAs, links, setas e foco em laranja; 5,0, numerais, eyebrows e "Diagnóstico/Serviço" em âmbar). A barra fixa laranja/grafite é um bom alvo de toque.
- Emblema do escudo dividido (engrenagens | chave inglesa e de fenda) reaparece em header, hero, "Como trabalhamos" (metades), marca d'água, mapa (pin) e CTA final, cumprindo o conceito do prompt. A seção 404 ("Essa página foi pro elevador") tem engrenagem solta com bom humor.
- Ritmo dark/papel (hero dark, confiança papel, sintomas dark, serviços papel, como trabalhamos dark, tag e revisão papel, avaliações papel, diferenciais dark, FAQ e local papel, CTA dark) dá descanso nos blocos de texto.

**Problemas e ressalvas:**
1. **O logo oficial ainda não está sendo mostrado.** O wordmark é texto em Barlow Condensed ("KANDO GARAGE", sem a cursiva âmbar) e o emblema é uma **ilustração provisória** (a pasta `brand/` está vazia). Isso contraria a regra 4.4 ("usar somente a imagem/SVG do logo") e é a maior distância entre o site e o Instagram (script retrô âmbar). Documentado como pendência do cliente, mas é o item que mais pesa para "parecer a Kando".
2. **Ordem das seções difere do briefing:** Avaliações vêm antes de Diferenciais (`Home.tsx:24-25`; o prompt 6.7 põe Diferenciais antes de 6.8 Avaliações). Combinado com a numeração fixa, gera "Ficha 06" antes de "Ficha 05" (item 7). Hoje a seção Avaliações é só o selo 5,0 e dois botões (nenhum card, por falta de autorização), o que deixa um bloco "papel" de pouca substância entre a revisão e os diferenciais.
3. **Repetição excessiva do slogan "Peça trocada, peça mostrada"**: faixa de confiança, passo 04, título da tag, título "A promessa" e etiqueta ("Você vê cada peça que trocamos"). Cinco vezes em uma rolagem; vira ruído. Reduzir para 2 (tag + passo).
4. **Tema claro não existe de fato.** Em `prefers-color-scheme: light` só `--dark-b` e o grão mudam (`tokens.css:59-61`); as capturas "light" são praticamente idênticas às "dark". É decisão documentada em `design-system.md:103`, mas a seção 4.3 do prompt pede "versão clara coerente". Registrar ao cliente como desvio consciente.
5. **Hero em 360 px**: o emblema vira marca d'água quase invisível (engrenagens e escudo a ~10%) e os "Z=" aparecem cortados na borda direita; o ganho emocional do emblema fica só no desktop. O status aparece **duas vezes** no hero mobile (header e linha abaixo do 5,0) e uma terceira na barra. Considerar remover uma.
6. **Marcas de registro (cantos) da tag de peça** (`[` soltos) ficam desalinhadas da tag inclinada em 1280 px e cortadas na borda esquerda em 360 px (`PartTag`). Pequeno defeito de acabamento.
7. **Emblema do hero mistura âmbar e laranja no mesmo componente** (engrenagens âmbar + chave de fenda laranja). A regra 4.3 pede "nunca lado a lado". Vem do logo (escudo sobre laranja), mas vale confirmar com o cliente ao receber os arquivos originais.
8. **FAQ sem indício de interatividade em 360 px**: a regra `@media (max-width: 479.98px) { .qa__tog { display: none; } }` (`sections.css:~284`) esconde "Abrir/Fechar" no celular, e como não há ícone, as 6 perguntas parecem uma lista estática de títulos. **Pior combinação possível com a regra "sem ícones" e com o público (celular).** Mostrar o rótulo "Abrir" também no mobile, por exemplo abaixo do título.
9. **A tabela de serviços** em 360 px vira lista com 3 linhas por serviço ("descrição", "OFICIAL", "Falar sobre isso") com muito ar vertical; ok, mas a coluna "Origem" ocupa espaço sem valor (item 1).

**Coerência com o Instagram:** boa na atmosfera (grafite, laranja, peças e elevador, colunas vermelhas lembradas pela faixa de risco), fraca no logo (item 6.1). Sem fotos reais (galeria oculta, correto por regra).

## 7. Conteúdo

**CONFIRMAR vazando:** nenhum. Texto visível da home, política e 404 sem "CONFIRMAR", colchetes, "undefined", "null", "lorem" ou "TODO". Os `CONFIRMAR` do `site.ts` são só comentários de código; no HTML gerado não há comentário `<!-- CONFIRMAR -->`. `confirmed:false` realmente oculto: 5 cards de avaliação, trecho de avaliação do bloco "A promessa", 3 FAQs (orçamento cobrado, pagamento, garantia), CNPJ, galeria. Nenhum aparece no DOM nem no JSON-LD (FAQPage só tem as 6 respostas confirmadas).

**Tom e promessas:** coerente com a seção 4.7 (direto, segunda pessoa, frases curtas). Sem "o melhor", "nº 1", "líder", "garantia total". Promessas de processo ("orçamento antes de mexer", "só fazemos o que você aprovar", "serviço no prazo combinado", "peça mostrada na entrega") vêm da seção 6 e das avaliações. "Honestidade comprovada" e "É um elogio que aparece sempre" são as mais fortes (item 1).

**Erros encontrados:**

| # | Problema | Onde | Prioridade |
|---|---|---|---|
| C1 | **"De 5,0 no Google · 68 avaliações"** lê como "5,0 **de 5,0** no Google": após remover a estrela ficou ambíguo e estranho ("De 5,0"). Aparece 3 vezes: hero (ao lado do 5,0 gigante), selo da seção Avaliações ("DE 5,0 · 68 AVALIAÇÕES NO GOOGLE") e **na imagem Open Graph** (`public/og.jpg`: "DE 5,0 NO GOOGLE · 68 AVALIAÇÕES"). Sugestão: "Nota no Google · 68 avaliações" (e regenerar `og.jpg`). | `site.ts:511`, `site.ts:541`, `scripts/make-assets.mjs` | **Alta** (é a prova social, 2 segundos do topo, e vai para o WhatsApp via OG) |
| C2 | **Numeração das fichas fora de ordem e com buraco:** a página mostra Ficha 01, 02, 03, 04, **06, 05**, 08, 09. A 07 (galeria) sumiu por estar oculta, e 06 (avaliações) vem antes de 05 (diferenciais). | `site.ts:147-148`, `Home.tsx:24-25` | Média |
| C3 | "Fecha em 1 h" com espaço, inconsistente com "8h", "18h". | `status-horario.ts:30` | Baixa |
| C4 | FAQ "Preciso agendar?" afirma "Recomendamos chamar no WhatsApp antes" sem confirmar atendimento sem agendamento; ok porque não promete nada, mas está marcado `confirmed:true` com comentário CONFIRMAR em `site.ts`. | `site.ts` (FAQ) | Baixa |
| C5 | A seção de Avaliações sem nenhum card tem H2 "Quem já deixou o carro em boas mãos" e só o selo. Aceitável, mas pouco convincente sem as falas. Liberar autorização dos trechos é o maior ganho de conteúdo. | `site.ts:381-388` | Média (pendência do cliente) |
| C6 | Português: sem erros ortográficos ou de concordância encontrados nos textos visíveis. Observação: "Atendemos toda a Zona Norte" (promessa ampla, porém vinda do prompt). | n/a | n/a |

## 8. Metas

### 8a. Seção 8.2: Lighthouse mobile da home (revalidado agora, 2 rodadas)

| Métrica | Meta | Medido | Situação |
|---|---|---|---|
| Performance | ≥ 95 | **99 / 99** | Aprovado |
| Acessibilidade | 100 | **100 / 100** | Aprovado |
| Boas práticas | 100 | **100 / 100** | Aprovado |
| SEO | 100 | **100 / 100** | Aprovado |
| LCP | < 2,0 s | **1,8 s** | Aprovado |
| CLS | < 0,05 | **0** | Aprovado |
| TBT (proxy de INP) | n/a | 40 a 50 ms | Aprovado (INP real < 200 ms não medido aqui; `auditoria.md` mede ≤ 48 ms com CPU 4x) |
| Peso da home | < 500 KB | **224 KB** | Aprovado |

`docs/auditoria.md` cita 99/100/100/100 e 223 KB: **a revalidação confirma**. axe (`scripts/audit-a11y.mjs`, 3 páginas × dark/light × 360/1280): **0 violações** nas 12 combinações; único erro de console é o 404 da própria `/nao-existe` (esperado).

### 8b. JS total: **Reprovado (conhecido)**

`dist/assets/hydrate-*.js` = **82,5 KB** gzip -9 (83,6 KB pelo Vite) + `index-*.js` 1,0 KB, contra a meta **< 30 KB**: **excede em ~54 KB (2,8x)**. O piso do React 19 já é ~67 KB gzip (`auditoria.md` §5.1), então a meta é inatingível com `react-dom/client`. Isto é **risco/decisão**, não bug:
- Efeito real: TBT 40 a 50 ms, LCP 1,8 s, Performance 99; a métrica de usuário não sofre porque a hidratação é carregada em chunk separado depois do FCP.
- Opções já medidas em `auditoria.md` §5.5: (A) manter React, descumpre 8.2; (B) Preact/compat ≈ 22 KB, risco baixo-médio (SSR em React e cliente em Preact); (C) React só no pré-render + script vanilla ≈ 6 a 8 KB, esforço médio. **Pedir decisão formal ao cliente/orquestrador.** Minha leitura: o site é majoritariamente estático (só header/menu, status, barra de ação, reveal, e-mail e mapa são interativos), então C é a opção mais coerente com a proposta "zero JS por padrão" do briefing; B é a mais barata.

### 8c. Seção 9.2

| Requisito | Resultado |
|---|---|
| Headers da 9.1 | **OK.** Os 7 headers servidos são **idênticos** aos de `vercel.json` (comparados por script) e à 9.1; aplicados a `/`, `/politica-de-privacidade` e 404; `Cache-Control`: `/assets/*` immutable, HTML `max-age=0, must-revalidate`. 0 violações de CSP no navegador. |
| `rel="noopener noreferrer"` | **OK** (0 exceções no HTML gerado). |
| Sem segredos; `.gitignore` | **OK** (`node_modules`, `.env*`, `dist`, `dist-ssr`, `.vercel`, `.netlify`). |
| `npm audit` / lockfile | **OK**: `npm ci` reportou 0 vulnerabilidades; `package-lock.json` versionado. |
| **`/.well-known/security.txt` com contato da Toss Lab** | **REPROVADO.** `public/.well-known/security.txt:3` traz `Contact: mailto:kandogarage@gmail.com` (e-mail da oficina), não o da Toss Lab; mantém comentários `# CONFIRMAR` visíveis ao público em `/.well-known/security.txt` (linhas 1-2). Também `Canonical` fixo em `kandogarage.com.br` (não lê `VITE_SITE_URL`). |
| E-mail ofuscado no HTML | **OK.** `dist/index.html` não contém `kandogarage@gmail`; só "arroba" como fallback; `mailto:` montado em `EmailLink.tsx` após hidratação. Limitação aceita: o literal está no bundle JS (contato comercial). |
| Nota A em securityheaders.com / Observatory | **Não verificável aqui** (sem rede). Headers batem com os da 9.1, esperada nota A (HSTS preload, CSP, COOP etc.); medir no preview público. |
| HSTS `preload` | Risco operacional documentado em `seguranca.md`: não submeter a hstspreload.org antes do domínio definitivo. |

## 9. Hidratação, console, formulário, cookies

**Aprovado.** Em 360 px, com `networkidle` e `page.clock`:
- Console: **0 mensagens** (sem `console.error`, `warn`, nem `pageerror`, inclusive nenhum aviso de hidratação/mismatch) na home, política e 404; o único erro é o 404 do documento na rota inexistente.
- Requisições externas no carregamento: **0** (tudo `localhost`).
- `form`, `input`, `select`, `textarea`: **0**. Cookies: **0**; `localStorage`: vazio.
- Rolagem horizontal: **nenhuma** (scrollWidth = largura do viewport).
- Sem JS: página funciona (links, badge com horário resumido, e-mail em "arroba"). `lang="pt-BR"`, 1 único `<h1>`, canonical correto.
- A política e a 404 têm `title`/`description` próprios e a 404 é `noindex`, como projetado.

## Correções priorizadas (arquivo:linha)

**P1: antes de mostrar ao cliente**
1. Remover/neutralizar o número de OS falso: `src/content/site.ts:507-508` (`osLabel`/`osNumber` "Nº 0001 / 2026") e o campo em `src/components/Hero.tsx:22`. Se quiser manter o campo, trocar por algo factual (ex.: "Atendimento: Seg–Sáb").
2. Corrigir "De 5,0 no Google": `src/content/site.ts:511` e `:541` ("Nota 5,0 no Google · 68 avaliações"), `scripts/make-assets.mjs` + regenerar `public/og.jpg`.
3. Remover a coluna "Origem: Oficial / Citado por clientes": `src/content/site.ts:531`, `src/components/ServiceRow.tsx:14`, `src/components/ServiceTable.tsx:22`.
4. Mostrar "Abrir" no FAQ em 360 px ou criar outro indício de interação sem ícone: `src/styles/sections.css:~284` (regra `@media (max-width: 479.98px) { .qa__tog { display: none; } }`).
5. `public/.well-known/security.txt:1-3`: contato da Toss Lab e remover os comentários `# CONFIRMAR` quando houver contato.
6. Decisão formal sobre o JS (8b); documentar no relatório final que 8.2 "JS < 30 KB" fica reprovada em React 19.

**P2: acabamento**
7. Remover ou reescrever `"Esc. 1:1 · Det. A · Folha 01/04"` (`site.ts:512`), `"Rev. 2026"` (`site.ts:519`), os "Z=24/18/12" (`site.ts:516`) e o campo "Data" em branco da tag (`site.ts:535`, `PartTag.tsx`). Alternativa: trocar por rótulos obviamente decorativos sem números.
8. Renumerar as fichas ou reordenar `Home.tsx:24-25` (Diferenciais antes de Avaliações) e tornar a numeração dinâmica, para que a galeria oculta não deixe buraco: `site.ts:147-148`.
9. Reduzir a repetição de "Peça trocada, peça mostrada" (faixa de confiança, tag, "A promessa", passo 04): `site.ts` (`trustBar`, `how.highlight`, `partTag`).
10. Remover o export morto `trust` com "★": `src/content/site.ts:206-211`.
11. Padronizar "Fecha em 1h": `src/scripts/status-horario.ts:30`.
12. Corrigir cantos de registro da tag em 360/1280 px (`PartTag` / `sections.css`).
13. Hero mobile: remover um dos três status repetidos e reforçar o emblema (hoje quase invisível em 360 px).
14. Suavizar "aparece sempre nas avaliações" (`site.ts:324`) e confirmar "scanner/equipamento" com o cliente (`site.ts:210, 279, 524`).

**P3: dependem do cliente (já registradas em `pendencias.md`)**
15. Logo original (SVG/PNG) em `brand/` para trocar o wordmark em texto e o emblema provisório; conferir os hex.
16. Autorização dos trechos de avaliação e fotos reais (hoje Avaliações e Galeria estão vazias).
17. Domínio definitivo (`VITE_SITE_URL`), contato da Toss Lab para o `security.txt`, e medir securityheaders.com/Observatory no preview.
18. Ações externas: corrigir a bio do Instagram (`wa.me/988367054` quebrado) e alinhar o horário do Google Business Profile (Maps mostra 8h30-19h).

## Resumo dos reprovados

- **Item 1 (fatos/decoração):** "OS Nº 0001 / 2026", "Esc. 1:1 · Det. A · Folha 01/04", "Z=24/18/12", "Rev. 2026", "Peça Nº 01" + campo "Data" e a coluna "Origem: Oficial / Citado por clientes" soam como fatos ou metadados internos que a seção 1 não sustenta.
- **Item 7 (conteúdo):** "De 5,0 no Google" (hero, selo e `og.jpg`) é ambíguo e estranho; fichas numeradas fora de ordem (06 antes de 05, 07 ausente); FAQ sem indício de toque no celular.
- **Item 8b (JS):** 82,5 KB gzip contra 30 KB; decisão pendente (A manter, B Preact, C vanilla).
- **Item 8c (9.2):** `security.txt` aponta o e-mail da oficina, não a Toss Lab, e expõe comentários `# CONFIRMAR`.
- **Aprovados com ressalvas:** links (2), regra de ícones (5), marca/visual (6: logo oficial ainda ausente, sem tema claro real, repetição do slogan).
- **Aprovados:** jornada em ≤ 2 toques (3), status de horário em todos os cenários (4), Lighthouse/axe/headers (8a, parte de 8c), hidratação limpa sem formulário nem cookie (9).
