# Revisão de copy e SEO local (copywriter-local-seo)

Escopo: `src/content/site.ts`, `src/layouts/Base.astro` e o HTML gerado (`npm run build`, `dist/index.html`, `dist/politica-de-privacidade.html`, `dist/404.html`, `dist/robots.txt`, `dist/sitemap.xml`). Base: seções 1, 3, 4.7, 5, 6 e 7 de `docs/PROMPT_KANDO_GARAGE.md`.

Nenhum arquivo existente foi editado. Cada item traz o trecho atual, o arquivo e o texto final pronto para colar.

## Resumo

| Área | Resultado |
|---|---|
| Fidelidade aos textos-base (seção 6) | OK. Hero, faixa de confiança, sintomas, serviços, passos, diferenciais, FAQ, local e CTA final batem com o prompt. |
| Fatos, números, anos, serviços inventados | Nenhum. Nota 5,0 e 68 avaliações, endereço, telefone, horário e serviços vêm da seção 1. |
| Superlativos e promessas absolutas | Nenhum "melhor", "nº 1" ou "líder". Ver item 9 (absolutos herdados do prompt). |
| Meta title e description (7.1) | Idênticos ao prompt. |
| JSON-LD | AutoRepair e FAQPage corretos, Offer/Service corretos, sem Review/AggregateRating. Melhorias no item 6. |
| Hierarquia de títulos | Um H1, H2/H3 coerentes. Pontos menores no item 7. |
| Canonical / og:url | **Erro (bloqueante).** Item 1. |
| Descrição da 404 | Erro menor. Item 2. |
| Palavras-chave de SEO local | **Cobertura fraca.** Só 2 das 7 aparecem de forma natural. Item 3. |
| robots.txt e sitemap.xml | Corretos. Observação no item 8. |

---

## Erros e divergências

### 1. Canonical e `og:url` saem com `.html` (bloqueante para SEO)

- Arquivo: `src/layouts/Base.astro`, linha 11. Efeito no HTML gerado.
- Trecho atual:
  ```astro
  const canonical = new URL(Astro.url.pathname, base + '/').toString().replace(/\/$/, '') || base;
  ```
- Resultado no build (`build.format: 'file'` faz `Astro.url.pathname` virar `/index.html`):
  - `dist/index.html`: `<link rel="canonical" href="https://kandogarage.com.br/index.html">` e `og:url` igual.
  - `dist/politica-de-privacidade.html`: canonical `.../politica-de-privacidade.html`.
  - `dist/404.html`: canonical `.../404.html`.
- Problema: a home aponta para uma URL diferente da raiz. O sitemap lista `https://kandogarage.com.br/` e `https://kandogarage.com.br/politica-de-privacidade` (sem `.html`). Canonical e sitemap se contradizem, e o `og:url` fica diferente do link que as pessoas compartilham no WhatsApp.
- Correção (substituir a linha 11):
  ```astro
  const path = Astro.url.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  const canonical = path === '/' || path === '' ? `${base}/` : `${base}${path}`;
  ```
  Resultado esperado: home `https://kandogarage.com.br/` (com a barra, igual ao sitemap) e privacidade `https://kandogarage.com.br/politica-de-privacidade`.
- Observação: `jsonLd(base, ...)` usa `url: "https://kandogarage.com.br"` (sem barra) e `@id: ".../#negocio"`. Alinhar com o canonical da home (item 6).
- Garantir que o deploy sirva `/politica-de-privacidade` sem `.html` (por exemplo `cleanUrls: true` no `vercel.json`). Isso é para o `security-deploy`, não é copy.

### 2. A página 404 usa a meta description da home

- Arquivo: `src/pages/404.astro` (usa `<Base title={seo.notFoundTitle} ...>` sem `description`) e `src/content/site.ts`, objeto `seo`.
- Trecho atual (no HTML da 404): `<meta name="description" content="Mecânica geral, preventiva e especializada para nacionais e importados no Tremembé. ...">`.
- Problema: a página é `noindex`, mas o `og:description` e a description repetem a da home, o que confunde pré-visualizações de link.
- Correção: em `site.ts`, dentro de `seo`, acrescentar:
  ```ts
  notFoundDescription: 'A página que você procurava não foi encontrada. Volte ao início ou chame a Kando Garage no WhatsApp.',
  ```
  e em `404.astro` passar `description={seo.notFoundDescription}`.

### 3. Palavras-chave de SEO local quase ausentes no corpo (7.1)

Presença hoje no HTML gerado:

| Palavra-chave (7.1) | Aparece? |
|---|---|
| oficina mecânica Tremembé | Só no `<title>`. Nenhuma ocorrência no corpo. |
| mecânico Zona Norte SP | Não. |
| injeção eletrônica Tremembé | Não (existe "Injeção eletrônica" solto e "Tremembé" solto). |
| mecânico de câmbio Zona Norte | Não. |
| luz do airbag acesa | Sim (chip, card de serviço e FAQ). |
| revisão de carro Tucuruvi | Não ("Tucuruvi" só na lista de bairros). |
| mecânico carro importado Zona Norte | Não. |

A restrição é "uso natural": sem enfiar as frases em rodapé ou texto oculto. As inclusões abaixo usam só fatos da seção 1 e do bloco 6.11, e todas são texto visível.

**3a. Parágrafo novo em "Onde estamos"** (arquivo `src/content/site.ts`, objeto `location`; renderizar como `<p>` logo abaixo do H2, em `src/components/Location.astro`):
```ts
intro: 'A Kando Garage é uma oficina mecânica no Tremembé, na Zona Norte de São Paulo. Atendemos moradores e quem trabalha na região, com mecânica geral, preventiva e especializada para carros nacionais e importados.',
```

**3b. Texto de apoio abaixo da lista de bairros** (substituir `areaTail`):
- Atual: `areaTail: 'e região.'`
- Final:
  ```ts
  areaTail: 'e região. Se você procura mecânico na Zona Norte de SP para revisão, injeção eletrônica, câmbio ou freios, é só chamar no WhatsApp.',
  ```

**3c. Intro de serviços** (`servicesSection.intro`), mantendo a frase do prompt e acrescentando uma segunda:
- Atual: `'Trabalhamos com veículos nacionais e importados, com serviço e diagnóstico em todas estas áreas:'`
- Final (a frase do prompt continua igual; a nova vai em campo separado `introNote`, exibido como `<p>` antes dos cards):
  ```ts
  intro: 'Trabalhamos com veículos nacionais e importados, com serviço e diagnóstico em todas estas áreas:',
  introNote: 'Oficina mecânica no Tremembé para quem precisa de diagnóstico de injeção eletrônica, câmbio, freios, suspensão e revisão de carro, também para moradores do Tucuruvi e do Mandaqui.',
  ```

Total: cobre "oficina mecânica Tremembé", "mecânico Zona Norte SP", "injeção eletrônica Tremembé", "revisão de carro Tucuruvi". Para "mecânico de câmbio Zona Norte" e "mecânico carro importado Zona Norte", usar o texto abaixo no H3 do card de câmbio e na FAQ (a FAQ "importados" já está confirmada):

- Resposta da FAQ "Vocês atendem carros importados?" (substitui a atual):
  - Atual: `Sim. Trabalhamos com veículos nacionais e importados.`
  - Final: `Sim. Trabalhamos com veículos nacionais e importados, com serviço e diagnóstico em injeção eletrônica, motor, câmbio, suspensão, freios e air bag. Atendemos toda a Zona Norte.`
  Obs.: o JSON-LD do FAQPage herda esse texto automaticamente.
- Descrição do card Câmbio (opcional): `Marchas arranhando, trancos, câmbio pesado ou ruidoso. Diagnóstico e reparo de câmbio para nacionais e importados.` ("nacionais e importados" está na seção 1.1 e vale para todos os serviços.)

### 4. Inconsistência "Air bag" x "airbag"

- Arquivo: `src/content/site.ts`.
- Ocorrências: título do serviço `'Air bag'` (linha 176), FAQ de JSON-LD e `itemListElement` `'Air bag'`; já o chip, a descrição, a FAQ, a meta description e o `og:image:alt` usam "airbag".
- Observação: o prompt usa as duas grafias, e "Air bag" é a grafia do texto oficial do WhatsApp Business. Para busca, "airbag" (uma palavra) é o que as pessoas digitam e é a palavra-chave de 7.1.
- Correção: manter "Air bag" só como título do card (fiel ao texto oficial) e usar "airbag" em todo o resto. Já está assim no HTML; o que muda é o JSON-LD e o novo texto do item 3, onde usei "air bag" apenas para citar o serviço oficial. Se preferir uniformizar tudo, trocar por `'Airbag'` no card e no JSON-LD e `'airbag'` no resto.

### 5. FAQ "Preciso agendar?" está `confirmed: true` com pendência em aberto

- Arquivo: `src/content/site.ts`, linhas 286 a 287.
- Trecho: `// CONFIRMAR se atende sem agendamento` seguido de `confirmed: true`.
- Avaliação: o prompt (6.10) traz a resposta "Recomendamos chamar no WhatsApp antes para garantir o melhor horário." e marca só o complemento como CONFIRMAR. A resposta publicada não afirma nada sobre atender sem agendamento, então não inventa fato. **Aprovado.** Fica registrado que a resposta entra no JSON-LD do FAQPage, e a pendência continua em `docs/pendencias.md`.

### 6. Melhorias no JSON-LD (sem erro de conformidade)

Verificado no HTML gerado: `@graph` com `AutoRepair` e `FAQPage` (6 perguntas, todas com resposta confirmada); `hasOfferCatalog` com `Offer` e `Service` nos 9 itens; nenhum `Review` nem `AggregateRating`; telefone, e-mail, endereço, geo e horários iguais ao 7.2.

Ajustes recomendados em `jsonLd()` (`src/content/site.ts`, linhas 366 a 414):

1. `url` sem barra final enquanto o canonical da home passa a ter barra (item 1). Trocar:
   - Atual: `url,`
   - Final: `url: `${url}/`,`
2. Ligar o FAQPage ao negócio e à página:
   - Atual: `graph.push({ '@type': 'FAQPage', mainEntity: ... })`
   - Final: acrescentar `'@id': `${url}/#faq`, inLanguage: 'pt-BR', about: { '@id': `${url}/#negocio` },` antes de `mainEntity`.
3. Acrescentar `hasMap` (link do Maps que já existe em `links.maps`) e `knowsLanguage`:
   ```ts
   hasMap: links.maps,
   ```
   Opcional e seguro: não acrescentar `priceRange`, `aggregateRating` nem `review` (não há dado confirmado, e as avaliações de terceiros não devem virar marcação).
4. `areaServed` como lista de strings funciona. Se quiser mais robustez, usar objetos `{ '@type': 'City', name: 'Tucuruvi' }` etc.; não é necessário.

### 7. Hierarquia de títulos: pontos menores

Estrutura atual: H1 único ("Seu carro em boas mãos."), H2 por seção, H3 por card/diferencial, H4 por passo. Está coerente. Dois ajustes:

1. **H3 repetido:** em "Como trabalhamos" existe um H4 "Peça trocada, peça mostrada" (passo 4) e um H3 com o mesmo texto (bloco de destaque). O texto repetido é do prompt (6.6), então não mexer nas palavras. Para evitar dois títulos idênticos na mesma seção, ajustar só o do bloco de destaque:
   - Atual: `highlight.title: 'Peça trocada, peça mostrada'`
   - Final: `highlight.title: 'Por que mostramos cada peça'`
   O passo 4 continua exatamente como no prompt.
2. **H2 do rodapé:** "Contato" e "Horário" são H2 e entram no mesmo nível que as seções de conteúdo, diluindo o outline. Usar `<p class="foot-title">` (ou H2 visualmente oculto no rodapé não é necessário). Se mantiver H2, nada quebra; é um ajuste de qualidade, não de erro.

Sem saltos de nível (H2 para H4) em nenhum ponto. A página de privacidade e a 404 têm cada uma um único H1.

### 8. robots.txt, sitemap, og e manifest

- `dist/robots.txt`: `User-agent: *`, `Allow: /` e `Sitemap: https://kandogarage.com.br/sitemap.xml`. OK.
- `dist/sitemap.xml`: lista a home e `/politica-de-privacidade`; não lista a 404. OK. Depende do item 1 para o canonical bater com essas URLs.
- Pendência de domínio: `kandogarage.com.br` é provisório (já está em `docs/pendencias.md`). Quando o domínio for definido, o `SITE_URL` do deploy corrige canonical, sitemap, JSON-LD e `og:image`.
- Open Graph: `og:type`, `og:locale` (`pt_BR`), `og:site_name`, `og:title`, `og:description`, `og:image` 1200x630 e `og:image:alt` presentes. Faltou `og:image:type` (opcional) e `twitter:title`/`twitter:description`/`twitter:image` (o card `summary_large_image` usa os `og:*` como fallback na maioria dos casos). Opcional, em `Base.astro`, depois de `twitter:card`:
  ```astro
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={`${base}/og.jpg`} />
  ```
- `og:image:alt`: `Kando Garage: seu carro em boas mãos. Nota 5,0 no Google.` OK (descreve o conteúdo da imagem do prompt 7.1).

### 9. Tom de voz (4.7) e promessas absolutas

Varredura do HTML final: sem "o melhor", "nº 1", "líder", "garantia total", "resolvemos qualquer coisa". Pontos para ficar atento, todos herdados literalmente dos textos-base do prompt, por isso mantidos:

| Trecho | Onde | Avaliação |
|---|---|---|
| "Honestidade comprovada. 5,0 no Google em 68 avaliações." | `differentials.items[0]` | Sustentado pela nota e pela contagem exibidas ao lado. Manter. |
| "Todas as peças substituídas são mostradas na entrega." | FAQ | Absoluto, mas é a promessa de marca do prompt (6.10). Manter; se o cliente não confirmar a prática, suavizar para "As peças substituídas são mostradas na entrega." |
| "manutenção completa do motor" | Card Motor | Fiel ao prompt (6.5). Manter. |
| "Atendemos toda a Zona Norte" | `location.areaTitle` | Fiel ao prompt (6.11). Manter. |
| "É o elogio que mais se repete nas avaliações, e virou promessa" | `how.highlight.text` | Baseado na seção 1.2 (transparência é o primeiro padrão listado). Não há contagem comprovada. Se quiser evitar afirmação quantitativa, usar o texto final abaixo. |

Texto final para `how.highlight.text` (sem afirmar contagem):
```ts
text: 'É um elogio que aparece sempre nas avaliações, e virou promessa: você vê cada peça substituída e entende o que foi feito no seu carro.',
```

### 10. Português revisado

Revisão ortográfica, de acentuação, crase e concordância em todo o `site.ts` e no HTML gerado. Sem erros de crase, acento ou concordância. Observações de estilo, todas opcionais:

1. `'Seu manual tem uma agenda de revisões por km ou tempo.'`: abreviação "km" sem ponto está correta (símbolo). Manter.
2. `'Manda um áudio ou um vídeo do barulho no WhatsApp que a gente te ajuda.'`: registro coloquial intencional (4.7). Manter, texto idêntico ao prompt (5.2-C).
3. `'Barulho em buraco, carro "batendo"'`: as aspas aparecem como `&quot;` no HTML-fonte, mas são renderizadas corretamente. Para tipografia brasileira, trocar por aspas curvas:
   - Atual: `'Barulho em buraco, carro "batendo"'`
   - Final: `'Barulho em buraco, carro “batendo”'`
   O mesmo vale para `'... sem "mecaniquês".'` em `differentials.items[2]` (final: `'Você entende o que acontece com o seu carro, sem “mecaniquês”.'`) e em `privacy.items[3]` (`“Carregar mapa interativo”`).
4. `kandogarage (arroba) gmail.com`: texto de fallback sem JavaScript (Footer e privacidade). É intencional (anti-spam), mas aparece para leitores de tela e crawlers sem JS. O e-mail já está em texto puro no JSON-LD, então a ofuscação protege pouco. Sugestão de rótulo mais natural para o fallback: `kandogarage@gmail.com` visível (e o `mailto:` montado direto). Decisão do frontend/produto, não de copy.
5. Rótulo do e-mail em `ui.email`: `'E-mail'`. Correto.

---

## Textos já corretos (conferidos contra o prompt)

- `<title>`: `Kando Garage | Oficina Mecânica no Tremembé, Zona Norte SP`.
- `meta description`: `Mecânica geral, preventiva e especializada para nacionais e importados no Tremembé. Nota 5,0 no Google. Injeção, motor, câmbio, freios e airbag. Chame no WhatsApp.`
- Hero (eyebrow, H1, subtítulo, prova, CTAs, status), faixa de confiança (4 itens), seletor de sintomas (10 chips, 10 mensagens, aviso de combustível, microcopy do áudio/vídeo), 9 serviços (7 oficiais + 2 citados por clientes), 4 passos, bloco de revisão, 5 diferenciais, FAQ com 6 respostas confirmadas (3 ocultas), local (endereço, tabela de horário, bairros), CTA final, rodapé, 404 e política de privacidade.
- WhatsApp `https://wa.me/5511988367054?text=...` com `encodeURIComponent` (inclui "Olá!" como `Ol%C3%A1!`), telefone `tel:+5511988367054` e `Place ID` corretos.
- Itens CONFIRMAR ocultos de forma correta: avaliações (5 cards), citação do bloco de destaque, CNPJ, galeria, 3 FAQs; o selo 5,0 e os links de avaliação continuam visíveis.
- Slogan oficial "Seu carro em boas mãos" intacto; nenhum ano de fundação, nome de funcionário (Diego só nos cards ocultos), forma de pagamento, garantia ou serviço extra foi inventado.

## Ordem sugerida de aplicação

1. Item 1 (canonical e `og:url`) e o `url` do JSON-LD (item 6.1).
2. Item 3 (palavras-chave de SEO local no corpo e FAQ de importados).
3. Item 2 (descrição da 404).
4. Itens 7, 9 e 10 (títulos, tom, aspas curvas).
5. Itens 6.2 a 6.4 e o twitter:* do item 8 (opcionais).
