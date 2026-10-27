# Auditoria (Etapa 1): Kando Garage, versão React

Medida em 27/10/2026 sobre o build de produção (`npm run build`), servido com os headers de `vercel.json` e gzip (`scripts/serve-dist.mjs`), Lighthouse mobile, 3 rodadas por página. Sem alterações de código nesta etapa.

## Linha de base

| Página | Perf | A11y | BP | SEO | LCP | FCP | CLS | TBT | Peso |
|---|---|---|---|---|---|---|---|---|---|
| Home | 97–99 | 100 | 100 | 100 | 1,8 s | 1,5 s | 0 | 30–170 ms | 223 KB |
| Política | 100 | 100 | 100 | 100 | 1,7 s | 1,4 s | 0 | 10–20 ms | 216 KB |

Estrutura: 1 arquivo de JS de 270 KB (83,5 KB gzip, dos quais ~67,5 KB são React 19 + react-dom), CSS inline de 36 KB (8,4 KB gzip), 5 fontes `woff2` (~117 KB), **nenhuma imagem raster na página** (só `og.jpg`, 93 KB, para compartilhamento). Home: 1.150 palavras, 13.668 px de altura a 360 px, 30 links de WhatsApp.

**Conclusão: a meta de 90+ já está atingida.** O ganho que resta está em conversão, conteúdo enxuto e acabamento, não em milissegundos.

## Achados por impacto

### 1. Conversão (alto)
- **C1. Topo do mobile gasto com dados.** A 360×740 o H1 só aparece abaixo de status + 3 campos (Bairro, Veículos, Endereço) + eyebrow; o CTA primário fica na última linha da dobra, parcialmente sob a barra fixa, e o secundário já está abaixo.
- **C2. CTAs genéricos.** "Chamar no WhatsApp" aparece 10 vezes só no seletor de sintomas e "Falar sobre isso" 9 vezes nos serviços, exatamente o tipo de texto que não diz o que acontece. Faltam verbos específicos ("Agendar diagnóstico", "Pedir orçamento…").
- **C3. Alvos de toque.** Os 9 links "Falar sobre isso" medem 127×27 px (mobile) e 127×20 px (tablet/desktop): abaixo de 44 px.
- **C4. Sem barra fixa a 768 px.** A barra de WhatsApp/Ligar/Como chegar some a partir de 768 px, mas o menu ainda está colapsado até 1100 px: em tablet não há CTA fixo.
- **C5. CTA ao fim das seções-chave.** Só serviços, revisão, "Outra dúvida" e CTA final têm CTA; "Como trabalhamos" e "Avaliações" não.
- Positivo: CTA acima da dobra em 360/768/1280; telefone clicável (`tel:`) no rodapé/local e na barra; mensagem pré-preenchida em todos os links.

### 2. Conteúdo (alto)
- **T1. Página longa e repetitiva:** 13,7 mil px no mobile. "Peça trocada, peça mostrada" aparece em 4 lugares (faixa de confiança, passo 04, etiqueta, bloco "A promessa"); "Diferenciais" repete o painel 5,0 ("Honestidade comprovada") e "Como trabalhamos".
- **T2. Parágrafos longos:** 12 parágrafos acima de 3 linhas a 360 px (resposta de FAQ de importados: 7 linhas; revisão: 5; nota de serviços: 5; hero: 4).
- **T3. Sintomas e serviços cobrem os mesmos assuntos** em duas listas longas (10 linhas de ~135 px + 9 cartões de ~215 px no mobile).
- **T4. Descrições de serviço com 3–4 linhas;** o pedido é título + 1 linha.

### 3. Prova de confiança (médio)
- Há selo 5,0 · 68 avaliações com links para o Google e horário/endereço/mapa. **Faltam dados reais** para depoimentos (autorização pendente), garantia e marcas atendidas. Nada será inventado: ficam como itens `confirmed: false` (invisíveis ao visitante) e listados em `docs/pendencias.md`.

### 4. UX/UI e marca (médio)
- Direção visual consistente (grafite/laranja/âmbar, ficha técnica, numeração) e não parece template; contraste e espaçamento corretos.
- **U1.** Wordmark ainda é texto e o emblema é provisório (depende de arquivos do cliente).
- **U2.** Tema claro quase inexistente (não afeta conversão).
- **Nota sobre ícones:** o pedido atual cita "cards com ícone + título + 1 linha"; a instrução anterior do cliente foi "evite ícones". Mantida a linguagem sem ícones (numeral + título + 1 linha), salvo nova decisão.

### 5. Performance (baixo, já aprovada)
- **P1. Fontes:** 5 arquivos (Inter 400/500/600 + Barlow 600/700). Dá para cortar para 3 (Inter 400/600, Barlow 700) sem perda visual: ~46 KB a menos.
- **P2. JS:** 83,5 KB gzip, 80% é o piso do React. TBT oscila (30–170 ms) por causa da hidratação. Alternativas já medidas em `docs/auditoria.md` (Preact ≈ 22,7 KB; vanilla ≈ 6–8 KB, não medido); decisão do cliente pendente.
- **P3. CSS** inline de 36 KB: provável CSS não usado a podar.
- **P4. `og.jpg`** 93 KB (só afeta compartilhamento): pode cair para < 60 KB.
- Imagens: não há imagens na página, então WebP/AVIF, `width/height` e preload do hero não se aplicam.

### 6. SEO local (baixo, em boa forma)
- Title/description únicos por página, canonical correto, `og:*`/`twitter:*`, JSON-LD `AutoRepair` + `FAQPage` (só respostas confirmadas), sitemap, robots, H1 único, 404 `noindex`. Revalidar após as mudanças de texto.

### 7. Acessibilidade (baixo)
- axe: 0 violações (dark/light, 360/1280). Pendente só o item C3 (alvos 44 px) e teste com leitor de tela real.

### 8. Segurança (baixo, em boa forma)
- 7 headers da seção 9.1 aplicados (CSP sem violações), `npm audit` 0, sem segredos no repositório (a ocorrência de "token" no bundle é interna do React), links externos com `rel="noopener noreferrer"`, sem formulários (portanto sem anti-spam a configurar), e-mail montado no cliente.

## Plano da Etapa 2 (só o que tem ganho claro)
1. **Conteúdo** (`copywriter-local-seo`): CTAs específicos, parágrafos ≤ 3 linhas, descrições de 1 linha, remover repetições.
2. **Conversão/UX** (`frontend-builder`): topo do mobile enxuto, alvos ≥ 44 px, barra fixa até 1100 px, CTA ao fim das seções-chave, listas mais compactas.
3. **Performance** (`perf-a11y-auditor`): fontes 5→3, CSS não usado, `og.jpg`.
4. **SEO/segurança** (`security-deploy`): revalidar após os textos novos.
5. **QA independente** (`qa-reviewer`) e Lighthouse antes/depois.

Fora de escopo por não valer o esforço agora: trocar de framework, tema claro completo, imagens (não há).
