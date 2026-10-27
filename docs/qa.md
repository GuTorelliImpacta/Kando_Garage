# QA independente (Etapa 2/3, pós-otimização): Kando Garage, versão React

Revisão feita por um revisor que **não construiu o site**, em 27/10/2026, sobre o build atual de `claude/kando-garage-react` (após as etapas de conteúdo, conversão, performance e SEO/segurança). **Nenhum código foi alterado e nenhum comando git foi executado.** Este arquivo reescreve a revisão anterior.

Método: `npm ci` (0 vulnerabilidades), `npm run build` (sem erros), `scripts/serve-dist.mjs` na porta 4400 (headers do `vercel.json`, gzip), `npx tsx scripts/test-status.mjs`, Playwright/Chromium 1243 (360x740, 360x640, 768x1024, 1099, 1100, 1280x800; dark e `prefers-color-scheme: light`; toque real no mobile), `page.clock`, axe (`scripts/audit-a11y.mjs` e uma rodada extra a 768), Lighthouse 13 mobile (3 rodadas por página). As capturas (topo em 360/768/1280 e página inteira em fatias) foram **abertas e olhadas**. Fora do alcance sem rede pública: securityheaders.com, Mozilla Observatory, Rich Results Test, redirecionamentos da Vercel, abertura real de wa.me/Maps/Instagram (as requisições foram interceptadas e a URL conferida), comparação com as fotos do Instagram (não há arquivos no repositório; `brand/` está vazia).

## Resumo por item

| # | Item | Resultado |
|---|---|---|
| 1 | Metas do cliente: Lighthouse mobile >= 90 (home e política) | **Aprovado** (98-100 em tudo) |
| 2a | CTA principal visível sem scroll (360/768/1280) e não coberto | **Aprovado** |
| 2b | Barra fixa < 1100 px, mensagem pré-preenchida, `tel:` | **Aprovado** |
| 2c | Rótulos de CTA específicos e coerentes com a mensagem | **Reprovado (parcial)** |
| 3 | Alvos de toque >= 44 px (360/768/1280) | **Aprovado** |
| 4 | Parágrafos > 3 linhas a 360 px | **Reprovado** (3 casos) |
| 5 | Nenhum ícone/emoji/estrela/pictograma | **Aprovado** |
| 6 | Nenhum dado inventado, CONFIRMAR, afirmações | **Aprovado com ressalvas** |
| 7 | SEO local | **Aprovado** |
| 8 | Acessibilidade (axe, foco, movimento) | **Reprovado (parcial)**: foco encoberto pela barra fixa |
| 9 | Segurança | **Aprovado com ressalvas** (`security.txt`) |
| 10 | Status de horário | **Aprovado** |
| 11 | 404, favicon, og.jpg | **Aprovado** |
| 12 | QA visual crítico | **Aprovado com ressalvas** (4 defeitos visuais) |
| 8.2 | Metas da seção 8.2 do prompt v2 | **Reprovado (conhecido)**: JS 83,7 KB gzip contra < 30 KB |
| 9.2 | Metas da seção 9.2 do prompt v2 | **Reprovado (parcial)**: contato da Toss Lab no `security.txt` |

## 1. Lighthouse mobile (3 rodadas por página)

| Página | Perf | A11y | BP | SEO | LCP | FCP | CLS | TBT | Peso |
|---|---|---|---|---|---|---|---|---|---|
| Home #1 | 98 | 100 | 100 | 100 | 1,5 s | 1,2 s | 0 | 140 ms | 176 KB |
| Home #2 | 100 | 100 | 100 | 100 | 1,5 s | 1,2 s | 0 | 40 ms | 176 KB |
| Home #3 | 100 | 100 | 100 | 100 | 1,5 s | 1,2 s | 0 | 10 ms | 176 KB |
| Política #1-3 | 100 | 100 | 100 | 100 | 1,4 s | 1,1-1,2 s | 0-0,001 | 40-50 ms | 169 KB |

**Aprovado.** Meta do cliente (>= 90) e meta 8.2 de nota (Perf >= 95, A11y/BP/SEO 100), LCP < 2,0 s, CLS < 0,05 e peso < 500 KB atendidas. Melhoria sobre a linha de base da Etapa 1 (LCP 1,8 s para 1,5 s, peso 223 KB para 176 KB, 13,7 mil px para 10,4 mil px de altura a 360 px). INP não é medido pelo Lighthouse; TBT de 10-140 ms é o proxy (o pico de 140 ms na rodada 1 é a hidratação).

## 2. Conversão

### 2a. CTA principal acima da dobra

Medido com `getBoundingClientRect` e `elementFromPoint` em 3 pontos do botão "Pedir orçamento no WhatsApp" do hero:

| Viewport | Topo | Base | Altura | Barra fixa (topo) | Coberto? |
|---|---|---|---|---|---|
| 360x740 | 400 | 456 | 56 | 682 | não (3 pontos "ok") |
| 360x640 (tela curta) | 400 | 456 | 56 | 582 | não |
| 768x1024 | 429 | 485 | 56 | 966 | não |
| 1099x800 | 475 | 531 | 56 | 742 | não |
| 1280x800 | 487 | 543 | 56 | (sem barra) | não |

Capturas olhadas: o botão laranja aparece inteiro e com folga nas três larguras. O hero do mobile agora começa com o H1 (status e eyebrow em uma linha cada); o defeito C1 da Etapa 1 está resolvido. **Aprovado.**

### 2b. Barra fixa e telefone

- A barra (`nav[aria-label="Contato rápido"]`) existe em 360, 768 e 1099 px e some em 1100 px (nessa largura o cabeçalho passa a mostrar o menu e o botão "Pedir orçamento"). Conteúdo: "Pedir orçamento" (`wa.me/5511988367054?text=Olá! Vim pelo site e gostaria de pedir um orçamento.`), "Ligar" (`tel:+5511988367054`) e "Como chegar" (Maps com `query_place_id`). Altura 56 px por alvo. Esconde-se quando o rodapé aparece. Presente também na política e na 404.
- `tel:` presente na barra, na seção "Onde estamos" e no rodapé (3 ocorrências).
- Ressalva menor: o número exibido no rodapé `(11) 98836-7054` (`Footer.tsx:32`) abre `wa.me` **sem mensagem**; o `tel:` fica no link "Ligar" ao lado. Funciona, mas é o único link de WhatsApp sem texto pronto.
- Ressalva menor: a 360 px o rótulo "Como chegar" quebra em duas linhas na barra.

**Aprovado.**

### 2c. Rótulos de CTA e coerência com a mensagem

O 360 px tem 27 links de WhatsApp no DOM. Conferidos rótulo e mensagem decodificada de cada um:

| Rótulo visível | Onde | Mensagem | Coerente? |
|---|---|---|---|
| Pedir orçamento no WhatsApp | hero, avaliações, local, menu | "...gostaria de pedir um orçamento." | sim |
| Agendar diagnóstico (x8) | linhas de sintoma 01-08 | uma mensagem por sintoma, termina em "agendar um diagnóstico" (conferi as 8) | sim |
| Agendar revisão / Agendar minha revisão | sintoma 09, serviço 07, bloco de revisão | "...quero agendar a revisão do meu carro. Modelo/ano/km: " | sim |
| Descrever meu problema | sintoma 10 e "Não achou o seu problema?" | "...Meu carro está com o seguinte problema: " | sim |
| Pedir orçamento (x8) | cartões de serviço | "...pedir um orçamento para o motor do meu carro" etc. (uma por serviço) | sim |
| Agendar diagnóstico | fim de "Como trabalhamos" | "...agendar um diagnóstico." | sim |
| Agendar diagnóstico agora | CTA final | "...agendar um diagnóstico." | sim |
| **Outra dúvida? É só chamar no WhatsApp.** | fim do FAQ | **"...gostaria de pedir um orçamento."** | **não** |

Verificado na prática: toque em "Escolher meu sintoma" e depois no sintoma "Luz do airbag acesa" abriu `https://wa.me/5511988367054?text=Olá! Vim pelo site. A luz do airbag está acesa no painel. Gostaria de agendar um diagnóstico.`

Não há mais "Saiba mais", "Falar sobre isso" nem "Chamar no WhatsApp" (os 10 e 9 repetidos da Etapa 1 foram eliminados).

Reprovações parciais:
- **R1 (média).** O link do FAQ diz "Outra dúvida?" e abre uma conversa que diz "gostaria de pedir um orçamento". Rótulo e mensagem não combinam. Origem: `site.ts:624` (rótulo) com `WaLink` sem mensagem (`waDefault`) em `FAQ.tsx:33`. Precisa de mensagem própria, por exemplo "Tenho uma dúvida sobre...".
- **R2 (baixa-média).** O rótulo visual "Agendar diagnóstico" repete 8 vezes seguidas e "Pedir orçamento" repete 8 vezes seguidas (`site.ts:101`, `site.ts:103`). O contexto da linha e o `aria-label` ("Pedir orçamento : Motor") resolvem para leitor de tela e para quem olha o cartão, mas o pedido foi "nenhum genérico repetido". Se o critério for estrito, o rótulo visual deveria citar o sintoma/serviço.
- **R3 (baixa).** O mesmo rótulo "Pedir orçamento no WhatsApp" aparece 4 vezes (hero, avaliações, local, menu). Aceitável por serem seções diferentes.

## 3. Alvos de toque (todos os elementos interativos visíveis)

Medidos 55 (360 e 768) e 56 (1280) elementos (`a`, `button`, `summary`, `[tabindex]`): **0 abaixo de 44 px** em largura ou altura. Mínimo medido: 44 px (links "Pedir orçamento" dos cartões de serviço, 132,6x44). Skip link 193x46, itens de menu 72 px, barra fixa 56 px, botões 48-56 px. O defeito C3 (127x27/127x20) está corrigido. **Aprovado.**

Observação: as linhas de sintoma são links inteiros (328x66-105 px), ótimo; porém o texto "AGENDAR DIAGNÓSTICO" e as etiquetas de área usam **11 px** a 360 px (`sections.css:142-143`), pequeno para quem tem pressa e olha de relance. Baixa prioridade.

## 4. Parágrafos acima de 3 linhas a 360 px

Medido por altura de caixa / line-height, com todas as perguntas do FAQ abertas. De 146 blocos de texto, **3 passam de 3 linhas**:

| Linhas | Texto | Onde |
|---|---|---|
| 6 | "Atendemos toda a Zona Norte: Tremembé, Jardim Tremembé, Tucuruvi... Peça um orçamento." | `Location.tsx:64`, `site.ts:513-515` |
| 4 | "Seu manual traz uma agenda de revisões por km ou tempo. Seguimos essa agenda..." | `site.ts:392` |
| 4 | FAQ "Vocês atendem carros importados?": "Sim, nacionais e importados. Diagnóstico de injeção..." | `site.ts:494` |

**Reprovado** (parcial: caiu de 12 para 3 em relação à Etapa 1, mas a meta é zero). Também há 27 blocos com exatamente 3 linhas (limite). Descrições de serviço ainda têm 2-3 linhas (por exemplo Suspensão e Freios com 3 linhas a 360 px) quando o pedido da Etapa 1 era título + 1 linha (`site.ts:330-338`).

## 5. Ícones, emojis, estrelas, pictogramas

- Texto visível varrido por Unicode (setas, símbolos, dingbats, emoji, ★, geometria): só ocorre `©` (rodapé). Nenhum emoji, nenhuma estrela, nenhum caractere de ícone. Pseudo-elementos `::before/::after` com conteúdo: **zero** (o único `content:` é vazio, usado para ampliar a área de clique). Nenhum `<img>`, `<canvas>`, `<video>` ou `background-image: url()`.
- Os glifos de texto "+" e "−" do FAQ (`site.ts:624`, `openMark/closeMark`) são tipografia, não ícone, e vêm acompanhados da palavra "Abrir/Fechar" no desktop. Aceitável, mas é o ponto mais próximo de pictograma; confirmar com o cliente se aceita.
- `<svg>` na home (360 px), todos permitidos:

| SVG | Classe | Veredito |
|---|---|---|
| Emblema no logo do cabeçalho (28x32) | `emblem logo__mark` | permitido (emblema/logo) |
| Emblema do hero (oculto em 360, 0x0) e desenho técnico | `emblem plate__emblem`, `bp plate__bp` (280x317, sem texto) | permitido (emblema/desenho) |
| Emblema em linha fina (2 metades, "Como trabalhamos") | `emblem--line half__art` | permitido (emblema/desenho) |
| Marca d'água em Diferenciais e CTA final | `emblem--line watermark`, `cta__emblem` | permitido (emblema) |
| Mapa esquemático e pin | `mapart` (texto "R. MAMUD RAHD"), `pin mapart__pin` | permitido (desenho/pin) |
| Emblema do rodapé | `emblem foot__mark` | permitido (emblema) |

  Todos com `aria-hidden` (exceto o emblema do hero, `role=img`). Os rótulos técnicos inventados "Z=24 / Folha 01/04 / Esc. 1:1" da revisão anterior **não estão mais no DOM** (`texts: []`). A 404 só tem emblema (logo, ilustração com engrenagem solta e rodapé).
- O círculo do furo da etiqueta de peça e as faixas de risco são CSS puro, decoração geométrica; não são pictogramas.

**Aprovado.**

## 6. Dados inventados, CONFIRMAR, afirmações

**Fatos conferidos contra a seção 1 (HTML gerado, DOM hidratado e JSON-LD): corretos.**

| Dado | Valor no site | Bate? |
|---|---|---|
| Endereço | R. Mamud Rahd, 202, Tremembé, São Paulo/SP, 02372-090 (rodapé, local, JSON-LD) | sim |
| Coordenadas | -23,4598259 / -46,626002 (JSON-LD); -23,4598 / -46,6260 exibido | sim |
| WhatsApp | `wa.me/5511988367054`, exibido (11) 98836-7054 | sim |
| Telefone | `tel:+5511988367054` | sim |
| E-mail | `kandogarage@gmail.com`; no HTML estático só "kandogarage arroba gmail.com", `mailto:` montado após hidratação | sim |
| Instagram | `https://www.instagram.com/kando_garage` | sim |
| Horário | seg-sex 08:00-18:00, sáb 09:00-14:00, dom fechado (tabela, resumo, JSON-LD, status) | sim |
| Serviços | os 7 oficiais + arrefecimento e combustível (os 2 citados por clientes) | sim |
| Nota | 5,0 e 68 avaliações | sim (atualizar antes do deploy) |
| Slogan e posicionamento | "Seu carro em boas mãos", "Mecânica geral, preventiva e especializada" | sim |

**Itens `confirmed:false` não vazam.** Busca no texto renderizado: "garantia" 0, "marca(s)" 0, "Diego" 0, "depoimento" 0, "CNPJ" 0, "★" 0, "grátis/gratuito" 0, "certificad/credenciad/líder" 0. Nenhum card de avaliação, nenhuma pergunta de FAQ sem resposta (6 de 9 renderizadas, 6 no JSON-LD, 0 divergência). `CONFIRMAR` aparece 0 vezes nos 3 HTML (os comentários `<!-- -->` do HTML são separadores de texto do React). Nenhum placeholder visível, nenhum "undefined", nenhum "lorem".

Ressalvas (afirmações que o visitante lê como fato, sem base na seção 1; a maioria vem do texto-base do prompt, não é invenção do construtor, mas continua sem confirmação do cliente):
- **A1 (média).** "Diagnóstico com scanner" (`site.ts:330`) e "Diagnóstico com equipamento" (faixa de confiança, `site.ts:609`): a seção 1 não cita scanner ou equipamento. Já está em `docs/pendencias.md`; deveria ser confirmado antes do go-live.
- **A2 (baixa).** Detalhes de serviço que a seção 1 não lista: correias, radiador, mangueiras, buchas e terminais, pastilhas, discos, fluido, "Segurança em primeiro lugar", "Menos barulho, mais estabilidade" (`site.ts:331-337`). Vêm do prompt 6.5, mas são promessas de escopo que a oficina precisa validar.
- **A3 (baixa).** "Por que os clientes voltam e indicam" e "Preço justo" são afirmações da própria marca; aparecem nas avaliações (seção 1.2), mas sem a citação que as sustente (a autorização está pendente). A seção de avaliações hoje mostra só o selo 5,0.
- **A4 (baixa).** "Registro de clientes" (`site.ts:179`) é a legenda de uma seção que não mostra nenhum registro, só a nota. O título promete mais do que há.
- **A5 (baixa).** Textos "decorativos" restantes são rótulos de layout sem fato novo: "Ficha 0X", "Ordem de serviço · Kando Garage", "Etiqueta de peça", "Km / Tempo" (régua sem escala), "Coordenadas". A coluna "Origem: Oficial / Citado por clientes" não aparece mais. Nenhum número de OS, prazo ou garantia. OK.

Português: sem erros ortográficos encontrados. Tom coerente (direto, "a gente" misturado com "Trabalhamos/Seguimos": aceitável). Ressalvas:
- **P1 (baixa).** Repetição de intenção SEO: "Oficina mecânica no Tremembé" abre `servicesSection.introNote` (`site.ts:317`) e `location.intro` (`site.ts:510`); "Mecânico na Zona Norte de SP para revisão, injeção, câmbio, freios ou carro importado? Peça um orçamento." (`site.ts:515`) soa a palavra-chave empilhada e é justamente o parágrafo de 6 linhas.
- **P2 (baixa).** Repetição do conceito "peça mostrada": hero (sub), faixa de confiança ("Peças à vista / Mostradas na entrega"), passo 04, etiqueta, FAQ 02. O título exato "Peça trocada, peça mostrada" aparece 2 vezes (passo 04 e etiqueta), mas a ideia aparece em 5 lugares (12 menções a peças mostradas/substituídas). Melhorou em relação a 4 blocos idênticos, mas ainda é a mensagem mais repetida do site.
- **P3 (baixa).** "Esquema · não está em escala. Ilustração esquemática." duplicado (`site.ts:518` e `site.ts:628`).

## 7. SEO local

| Verificação | Resultado |
|---|---|
| Title home | "Kando Garage \| Oficina Mecânica no Tremembé, Zona Norte SP" (58 caracteres) |
| Description home | 160 caracteres, cita Tremembé, nacionais e importados, injeção, câmbio, freios, airbag, WhatsApp |
| Política / 404 | title e description próprios; 404 com `noindex` e sem canonical |
| Canonical | `https://kandogarage.com.br/` e `.../politica-de-privacidade` (sem `.html`) |
| `og:*` e `twitter:*` | presentes (`summary_large_image`, 1200x630, alt); 404 sem `og:url` por desenho |
| H1 | 1 por página; hierarquia H1 > H2 > H3 sem salto |
| `lang` | `pt-BR` |
| JSON-LD | `JSON.parse` ok; `AutoRepair` (nome, endereço, geo, telefone, `openingHoursSpecification` batendo com o horário, `areaServed`, `hasOfferCatalog`, `sameAs`, `hasMap`) + `FAQPage` com 6 perguntas; sem `Review`/`AggregateRating`/`priceRange`; e-mail fora do JSON-LD (decisão documentada, `email: undefined` no nó) |
| `sitemap.xml` / `robots.txt` | 2 URLs coerentes com os canonicals; `Allow: /` + `Sitemap` |
| `alt` | não há imagens raster no DOM; SVGs decorativos com `aria-hidden` |
| Domínio | `kandogarage.com.br` ainda é o padrão (pendente `VITE_SITE_URL`) |

**Aprovado.** Não verificável aqui: Rich Results Test e Schema Validator (precisam de URL pública).

## 8. Acessibilidade

- **axe** (`wcag2a/aa`, 2.1 AA, best-practice): `scripts/audit-a11y.mjs` em 3 páginas x dark/light x 360/1280 (12 combinações) e rodada extra a **768 px** (6 combinações), mais menu mobile aberto: **0 violações** em todas. Único erro de console: o 404 do próprio documento da página 404.
- **Ordem de foco** (Tab, 360 e 1280): skip link, logotipo, menu (ou links do menu no desktop), CTA primário, CTA secundário, selo 5,0, depois as linhas de sintoma em ordem numérica. Lógica. O painel de menu fechado **não** entra na ordem de foco. Menu aberto fecha com Esc.
- **Foco visível:** anel branco de 3 px com halo grafite em todos os elementos testados (também nos stretched links, `sections.css:175-177`).
- **`prefers-reduced-motion: reduce`:** `document.getAnimations()` retorna 0 (contra 9 animações em movimento normal) e nenhum `.reveal` fica invisível. Sem JS, nenhum conteúdo fica com opacidade 0 e a barra fixa continua presente.
- **Reprovado: foco encoberto pela barra fixa (WCAG 2.4.11).** A 360 px, ao percorrer com Tab, itens ficam por baixo da barra (topo em 682 px): linha de sintoma 05 (649-740), 09 (655-723), 10 (672-740) e o link "Pedir orçamento : Suspensão" (696-740, **totalmente sob a barra**). Falta `scroll-padding-bottom` (hoje só há `[id] { scroll-margin-top: 72px }` em `base.css:30`). Mesmo problema em 768 px. Impacta teclado, leitor de tela com foco e alternância por switch. **Prioridade alta entre os reprovados de acessibilidade.**
- Ressalvas: texto de 11 px nas linhas de sintoma (item 3). Teste com leitor de tela real continua pendente (não feito aqui).

## 9. Segurança

Headers servidos (curl em `/` e em uma URL 404): os 7 da seção 9.1, iguais ao `vercel.json` e ao prompt (CSP, HSTS, `nosniff`, Referrer-Policy, Permissions-Policy, COOP, X-Frame-Options). Cache: HTML `max-age=0, must-revalidate`, `/assets/*` imutável, `/fonts/*` 30 dias.

- CSP: **0 violações** (`securitypolicyviolation` capturado em `/`, `/politica-de-privacidade`, `/x`, dark/light, 768) e 0 erros de console.
- Links externos: 0 `<a href="http...">` sem `rel="noopener noreferrer"` no HTML da home; 0 `target="_blank"` sem `noopener`. Links `tel:`, `mailto:` e internos sem `rel`, como esperado.
- 0 `<form>`, `<input>`, `<textarea>`; 0 cookies; só um script de módulo e o JSON-LD; sem recurso de terceiros.
- E-mail: nenhum `@` em texto plano nem `mailto:` no HTML estático (fallback "arroba"). O literal está no bundle JS (ofuscação leve, documentada).
- `npm audit`: 0 vulnerabilidades; `.gitignore` cobre `node_modules`, `.env*`, `dist`.
- **Reprovado (9.2): `/.well-known/security.txt`** (`public/.well-known/security.txt:1-3`): o `Contact` é o Gmail do cliente, não o da Toss Lab, e o arquivo **servido publicamente** começa com duas linhas `# CONFIRMAR antes do go-live...`. É o único lugar onde a palavra CONFIRMAR chega ao exterior. Já listado em `docs/pendencias.md`, mas é bloqueio de go-live.
- `public/_headers` é copiado para `dist/` e fica acessível em `/_headers` na Vercel (inócuo, documentado).
- Não medido: notas em securityheaders.com e Mozilla Observatory (meta A ou superior): precisam de preview público.

## 10. Status de horário

`npx tsx scripts/test-status.mjs`: **10/10 OK**. Além disso, no navegador com `page.clock.install` (home, 1280), nos fusos `America/Sao_Paulo`, `UTC` e `Asia/Tokyo` (o resultado não depende do fuso do visitante):

| Instante (horário de Brasília) | Texto exibido | Linha "HOJE" da tabela |
|---|---|---|
| Seg 07:59 | Fechado · abre hoje às 8h | Segunda a sexta |
| Seg 08:00 | Aberto agora · fecha às 18h | Segunda a sexta |
| Seg 17:30 | Fecha em 30 min | Segunda a sexta |
| Seg 18:01 | Fechado · abre amanhã às 8h | Segunda a sexta |
| Sex 18:01 | Fechado · abre amanhã às 9h (sábado) | Segunda a sexta |
| Sáb 13:30 | Fecha em 30 min | Sábado |
| Sáb 14:01 | Fechado · abre segunda às 8h | Sábado |
| Dom 12:00 | Fechado · abre amanhã às 8h | Domingo |

**Aprovado.** Observação de UX: o status "Fechado" aparece em vermelho no topo do hero, no cabeçalho, no local e no CTA final; fora do horário (e quando o CTA é "Agendar agora") a repetição de "FECHADO" 4 vezes na página pode desestimular, embora a barra e os CTAs sigam levando ao WhatsApp. Baixa.

## 11. 404, favicon, og.jpg

- 404 real (status 404, `noindex`): "Essa página foi pro elevador.", emblema com engrenagem solta, botões "Voltar ao início" (`/`) e "Pedir orçamento no WhatsApp", barra fixa e rodapé completos; amigável e na marca. Capturas olhadas em 360 e 1280.
- `favicon.svg` 200, `apple-touch-icon.png` 200, `logo.png` 200, `manifest.webmanifest` 200 com content-type correto. `og.jpg` 200, 58,5 KB (era 93 KB), 1200x630; imagem olhada: escudo + "Seu carro em boas mãos" + nota 5,0, legível e na paleta.

**Aprovado.**

## 12. QA visual crítico (360/768/1280, dark e light)

**Impressão geral: parece oficina séria e não template.** Grafite com luz âmbar, faixas de risco vermelhas, numeração estilo ordem de serviço, H1 em condensada, hierarquia clara (H1 > sintomas > serviços > como trabalhamos), ritmo escuro/claro bem alternado, laranja só em ação e âmbar só em marca/numeração (seções, números 01-10, "5,0"). Altura a 360 px caiu para 10,4 mil px.

Pontos a corrigir:
- **V1 (média, desktop/tablet). Etiquetas de área esticadas.** A 1280 px, em cada linha de sintoma a etiqueta ("INJEÇÃO ELETRÔNICA", "MOTOR") vira uma barra bordada de largura total da coluna, parecendo um campo de formulário; nas linhas 09 e 10 a largura muda e o link "Agendar revisão/Descrever meu problema" perde o alinhamento à direita com o das demais. Em 768 px a etiqueta é um chip pequeno (correto). Origem: `sections.css:136-143` (`.row__meta` flex + `.row__s`, sem `flex: 0 0 auto`/`justify-self`). A 360 px, o link "Agendar diagnóstico" da linha 01 cai abaixo da etiqueta, à esquerda, enquanto nas linhas 02-10 fica à direita: inconsistência de alinhamento.
- **V2 (média). E-mail quebrado no meio da palavra** no rodapé a 360 px ("kandogarage@gm / ail.com"), na home e na política, causado por `overflow-wrap: anywhere` em `sections.css:355` (`.osf--d dd`). Dado de contato partido prejudica cópia e leitura.
- **V3 (baixa). Botões do mapa cobrem o rótulo da rua.** A 360 px, "Carregar mapa interativo" e "Abrir no Google Maps" sobrepõem "R. MAMUD RAHD" (texto do SVG em `MapArt.tsx:29`, botões em `Location.tsx:80-83` / `sections.css:323`); a 1280 px a rua também fica rente aos botões. No desktop a coluna do mapa deixa um vazio grande abaixo dele.
- **V4 (baixa). Botão "Já é cliente? Avalie a gente"** quebra em duas linhas a 360 px com "GENTE" sozinho (`site.ts:426`).
- **V5 (baixa). Duas barras laranja idênticas na dobra do mobile** (CTA do hero e barra fixa "Pedir orçamento"). Cumprem papéis distintos, mas competem; a barra poderia ser grafite com só o WhatsApp laranja (já é) e o hero manter o único grande, ou esconder a barra enquanto o CTA do hero está visível (o que a versão anterior fazia).
- **V6 (baixa). Marca d'água do escudo atrás do texto** nos passos de "Como trabalhamos" (1280 e 360) cruza algumas palavras; a regra de marca diz "nunca atrás de texto corrido".
- Dark e light: em `prefers-color-scheme: light` o site é praticamente idêntico ao escuro (hero, sintomas, passos, CTA e rodapé seguem grafite; seções de serviços, avaliações e FAQ são papel nos dois). Sem quebra de contraste (axe 0). Tema claro "quase inexistente" é decisão conhecida.
- **Marca:** o emblema (escudo dividido, 3 engrenagens à esquerda, chave inglesa e de fenda à direita, grafite com contorno branco e detalhes âmbar) segue a descrição da seção 4.1 e não foi distorcido; é **ilustração provisória** (a pasta `brand/` está vazia, sem arquivo original do cliente). O **wordmark** é texto "KANDO GARAGE" em condensada, **não** o script/brush itálico âmbar do logo. Não dá para dizer que "o logo foi respeitado" enquanto o original não chegar; a coerência com o Instagram (fundo escuro, laranja, âmbar) é plausível mas não pôde ser comparada com as fotos. Marcado como pendência do cliente em `docs/pendencias.md` e `docs/brand-assets.md`.

## 8.2 e 9.2: metas do prompt v2

| Meta | Medido | Situação |
|---|---|---|
| Perf >= 95 / A11y 100 / BP 100 / SEO 100 | 98-100 / 100 / 100 / 100 | atende |
| LCP < 2,0 s | 1,4-1,5 s | atende |
| CLS < 0,05 | 0-0,001 | atende |
| INP < 200 ms | não medido por Lighthouse (TBT 10-140 ms) | atende (proxy) |
| Peso da home < 500 KB | 176 KB | atende |
| **JS total < 30 KB gzip** | **83,7 KB** (`hydrate` 82,7 + entrada 1,0; React 19 + react-dom ~67 KB) | **não atende** (decisão do cliente pendente: Preact ~22,7 KB ou vanilla) |
| Headers 9.1, rel externos, sem segredos, `npm audit`, LGPD, e-mail ofuscado | conferidos | atende |
| `security.txt` com contato da Toss Lab | contato é o Gmail do cliente + linhas CONFIRMAR | **não atende** |
| A ou superior em securityheaders/Observatory | não medível offline | pendente |

## Correções priorizadas

**P0 (bloqueiam go-live)**
1. `public/.well-known/security.txt:1-3`: trocar `Contact` pelo contato da Toss Lab, remover as linhas `# CONFIRMAR` do arquivo publicado e fixar o domínio final.
2. Foco encoberto pela barra fixa: adicionar `scroll-padding-bottom` (>= 72 px, abaixo de 1100 px) em `base.css:30` ou `html` e testar com Tab a 360 e 768 px (`sections.css:362`).

**P1 (conversão e coerência)**
3. `site.ts:624` e `FAQ.tsx:33`: dar mensagem própria ao link "Outra dúvida?" (ex.: "Olá! Vim pelo site e tenho uma dúvida: ").
4. Parágrafos > 3 linhas: encurtar `site.ts:392` (revisão), `site.ts:494` (FAQ importados) e dividir/encurtar `site.ts:513-515` + `Location.tsx:64` (Zona Norte, 6 linhas); idealmente transformar os bairros em lista curta.
5. E-mail quebrado no rodapé: remover `overflow-wrap: anywhere` de `sections.css:355` para o `dd` do e-mail (reduzir fonte ou `white-space: nowrap` com `font-size` menor).
6. Etiquetas de área esticadas e links desalinhados em desktop: `sections.css:136-143` (etiqueta `flex: 0 0 auto`, CTA alinhado à direita em todas as linhas, inclusive o da linha 01 no mobile).
7. Confirmar com o cliente "scanner" e "equipamento" (`site.ts:330`, `site.ts:609`) ou reescrever sem eles; revisar detalhes de escopo de `site.ts:331-337`.

**P2 (acabamento)**
8. Rótulo visual repetido 8x ("Agendar diagnóstico", "Pedir orçamento"): citar o sintoma/serviço no rótulo ou aceitar formalmente (`site.ts:101`, `site.ts:103`).
9. Descrições de serviço para uma linha (`site.ts:330-338`).
10. Mapa: afastar botões do rótulo da rua (`MapArt.tsx:29`, `Location.tsx:80-83`); remover frase duplicada "Esquema... Ilustração esquemática" (`site.ts:518`/`site.ts:628`).
11. Rodapé: dar mensagem ao `wa.me` do número exibido (`Footer.tsx:32`), com `waDefault`.
12. Renomear "Registro de clientes" (`site.ts:179`) enquanto não houver avaliações exibidas; reduzir a repetição de "peça mostrada" (hero sub, faixa de confiança, FAQ 02).
13. Fonte de 11 px nas linhas de sintoma (`sections.css:142-143`) para 12-13 px.
14. Barra fixa: avaliar esconder enquanto o CTA do hero está visível (V5) e evitar a quebra de "Como chegar" em duas linhas.
15. Marca d'água atrás de texto nos passos (V6), `Já é cliente? Avalie a gente` curto (`site.ts:426`).

**Pendências do cliente e fora do alcance deste QA:** logo original e wordmark, fotos, CNPJ, Diego, garantia, marcas, autorização de depoimentos, domínio (`VITE_SITE_URL`), contato Toss Lab, alinhar horário do Google Business Profile e link da bio do Instagram (`wa.me/988367054` quebrado); notas de securityheaders/Observatory, Rich Results e HSTS preload só com preview público; teste com leitor de tela real.

## Reprovados (resumo curto)

1. **JS 83,7 KB gzip** contra meta de 30 KB (conhecido; depende de decisão do cliente sobre o framework).
2. **`security.txt`**: contato errado (Gmail do cliente) e linhas CONFIRMAR publicadas.
3. **Foco encoberto** pela barra fixa em 360/768 px (sem `scroll-padding-bottom`).
4. **Parágrafos > 3 linhas** a 360 px: 3 casos (Zona Norte 6, revisão 4, FAQ importados 4).
5. **CTA do FAQ** com rótulo "Outra dúvida?" e mensagem de orçamento; **rótulos repetidos** 8x+8x.
6. Defeitos visuais: **e-mail partido** no rodapé, **etiquetas de área esticadas** no desktop, botões do mapa sobre o texto da rua.
