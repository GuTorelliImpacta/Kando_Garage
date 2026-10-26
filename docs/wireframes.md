# Wireframes textuais (versão React, sem ícones)

Linguagem: ordem de serviço, ficha técnica, manual de oficina. Tokens e regras em `design-system.md` (citados como DS §n). Textos finais vêm de `site.ts`; aqui estão os rótulos estruturais e os textos já definidos no prompt (seção 6).

Legenda: `[ ]` botão · `____` filete 1 px · `====` filete 2 px · `////` faixa de risco · `+  +` marcas de registro (crops) · `NN` numeral Barlow · `{D}` seção escura · `{P}` seção papel.

## Ritmo das seções

| # | Seção | Superfície | Faixa de risco |
|---|---|---|---|
| 0 | Header | `g950` translúcido + blur | não |
| 1 | Hero | **D** `dark-a` | divisor inferior (uso 1 de 4) |
| 2 | Ficha de confiança | **P** | não |
| 3 | Sintomas (checklist de inspeção) | **D** `dark-b` | aviso do item de combustível (2 de 4) |
| 4 | Serviços (tabela técnica) | **P** | não |
| 5 | Como trabalhamos (escudo dividido) | **D** `dark-a` | não |
| 6 | Peça trocada, peça mostrada (+ revisão por agenda) | **P**; a tag "salta" do papel | borda da tag (3 de 4) |
| 7 | Avaliações | **P**, com painel `ink` do 5,0 que quebra o papel | não |
| 8 | Diferenciais | **D** `dark-b` | não |
| 9 | FAQ | **P** | não |
| 10 | Onde estamos | **P** (tabela de horário é ficha por natureza) | não |
| 11 | CTA final | **D** `dark-a` com emblema grande | não |
| 12 | Rodapé | **D** aço escovado | base (4 de 4) |
| 13 | Galeria | oculta sem fotos; quando existir, entra como **D** entre 8 e 9 | n/a |

Sequência: `D P D P D P P D P P D D`. Regra cumprida: **nunca 3 escuras e nunca 3 claras seguidas** (máximo 2 de cada). Escuras: hero, sintomas, como trabalhamos, diferenciais, CTA+rodapé. Claras: ficha, serviços, peça+avaliações, FAQ+onde estamos. O dark segue sendo o tom de identidade (hero, CTA, rodapé, sintomas, processo), o papel dá descanso onde há leitura e tabelas.

---

## 0. Header (sticky)

### 360 px
```
[ KANDO GARAGE (emblema + wordmark, 28 px alt.) ]   [ MENU ]
  linha 2 (compacta, 28 px): ABERTO AGORA · FECHA ÀS 18H   (lâmpada quadrada 8 px + texto)
```
- Altura 56 px + linha de status 28 px (84 px); ao rolar, a linha de status some e o header fica 56 px com fundo `g950/90%` + blur 8 px.
- `MENU` é texto Barlow 700 caixa alta em botão 48 × 48 com borda 2 px `steel-500`, raio 2 px. Aberto: painel em tela cheia `g950`, 4 links como linhas numeradas (01 SERVIÇOS, 02 COMO TRABALHAMOS, 03 AVALIAÇÕES, 04 ONDE ESTAMOS) com altura 72 px, `[CHAMAR NO WHATSAPP]` fixo na base, botão `FECHAR`, foco preso, `Esc` fecha.
- CTA do header no mobile: **não** (a barra de ação inferior cobre).

### 1280 px
```
[ emblema+KANDO GARAGE ]   SERVIÇOS   COMO TRABALHAMOS   AVALIAÇÕES   ONDE ESTAMOS   | ABERTO AGORA · FECHA ÀS 18H | [CHAMAR NO WHATSAPP]
```
Altura 72 px; filete inferior 1 px `line-dark`; link ativo com filete inferior 3 px âmbar.

---

## 1. Hero `#inicio` {D, `dark-a`}

Papel visual: a primeira "folha da OS". O escudo é o desenho técnico principal.

### 360 px
```
+                                    +      ← crops do hero
 OS Nº 0001 / 2026      TREMEMBÉ · SP        ← campos de OS (rótulo 12 px)
 ____________________________________

 MECÂNICA GERAL, PREVENTIVA
 E ESPECIALIZADA                              ← eyebrow, âmbar, 12 px tracking .14em

 SEU CARRO
 EM BOAS
 MÃOS.                                        ← H1 Barlow 700 caixa alta ~44 px, 3 linhas

 Diagnóstico explicado, orçamento antes do
 serviço e cada peça trocada mostrada a você.
 Nacionais e importados.                      ← lead 18 px

 [ CHAMAR NO WHATSAPP ]   ← 100% largura, 56 px, primário, acima da dobra
 [ O QUE MEU CARRO TEM? ] ← secundário, 100% largura

 5,0   DE 5,0 NO GOOGLE · 68 AVALIAÇÕES       ← "5,0" Barlow 64 px âmbar; link para o Maps
 ____________________________________
 ABERTO AGORA · SEG–SEX 8H–18H · SÁB 9H–14H

 [fundo: planta do escudo em linha fina âmbar 25%, ocupando a metade direita, cortada pela borda;
  atrás do texto, opacidade 12% para não baixar contraste; ver nota]
////////////////////////////////////////    ← divisor de risco (hazard 10 px) → seção 2 (papel)
```
Nota de contraste: nenhum texto sobre a planta do escudo com opacidade > 12% na zona do texto. A planta forte (25–55%) fica só fora do bloco de texto; no 360 px o escudo é uma tira vertical à direita de 96 px, cortada pela borda, atrás do H1 a 12%.

### 1280 px (12 colunas)
```
col 1–7:  campos de OS (linha horizontal: OS Nº | ENTRADA | BAIRRO | VEÍCULOS)
          eyebrow
          H1 gigante ~96 px, 3 linhas: "SEU CARRO / EM BOAS / MÃOS."
          lead (62ch)
          [CHAMAR NO WHATSAPP] [O QUE MEU CARRO TEM?]  (lado a lado, 56 px)
          5,0 (display 136 px âmbar)  | DE 5,0 NO GOOGLE · 68 AVALIAÇÕES (link)
          status + horário (tabular)

col 8–12: moldura com crops (+ + + +), 480 × 560 px
          dentro: EMBLEMA DO ESCUDO grande (preenchido, cores do logo) sobreposto à PLANTA em linha fina
          (contorno, eixo traço-ponto, círculos de primitiva das 3 engrenagens com rótulos Z=…, cotas)
          legenda inferior: "ESC. 1:1 · DET. A · FOLHA 01/04"   (rótulo de desenho, não dado da empresa)
          diamond plate com máscara no canto direito da seção, atrás da moldura
```
Engrenagens do emblema giram 1 volta uma só vez ao carregar (DS §8).

---

## 2. Ficha de confiança {P}

Tabela de 4 colunas de fatos (não "4 cards"). Nada de ícone.

### 360 px (2 × 2, com filetes entre células)
```
 5,0                    | PEÇA TROCADA,
 NOTA NO GOOGLE         | PEÇA MOSTRADA
 68 avaliações          | você vê cada peça
 ======================================
 ORÇAMENTO ANTES        | NACIONAIS E
 DE MEXER               | IMPORTADOS
 só fazemos o aprovado  | diagnóstico com equipamento
```
Numeral/palavra-chave em Barlow 700 ~36 px; `5,0` em `amber-800` sobre papel; rótulo 12 px ink-muted.

### 1280 px
Uma linha de 4 colunas, filetes verticais 1 px, filete 2 px `ink` acima e abaixo. Cabeçalho da tabela à esquerda como campo: `FICHA DE CONFIANÇA · REV. 2026`.

---

## 3. Sintomas `#sintomas` {D, `dark-b`}: "checklist de inspeção"

Mensagem: o cliente sabe o sintoma. A lista é o diferencial de experiência (prompt 5.2-C).

Estrutura comum: `<ol>` de 10 linhas; **cada linha é um link `wa.me` com mensagem pronta**. Conteúdo das linhas vem da tabela 5.2-C.

### 360 px
```
 SINTOMAS · INSPEÇÃO DE ENTRADA              ← rótulo 12 px âmbar
 O QUE SEU CARRO
 ESTÁ FAZENDO?                               ← H2
 Toque no sintoma e fale direto com a gente no WhatsApp.
 A mensagem já vai pronta.

 ====================================  (2 px)
 01  Luz da injeção acesa /
     carro falhando                       ← numeral Barlow 700 40 px âmbar | texto Barlow 600 22 px caixa alta
     Injeção eletrônica      CHAMAR       ← apoio Inter 15 px steel-400 | rótulo "CHAMAR" 12 px laranja sublinhado
 ____________________________________
 02  Perdeu força, fumaça ou barulho no motor
     Motor                   CHAMAR
 ____________________________________
 03 ... 09
 10  Outro problema
     Descreva no WhatsApp    CHAMAR
 ====================================
 aviso de segurança (linha do item 08, combustível): faixa de risco 6 px acima do aviso:
 ////
 Se o cheiro for forte, não dê partida. Fale com a gente.

 Não sabe explicar? Tudo bem. Manda um áudio ou um vídeo do barulho no WhatsApp que a gente te ajuda.
```
- Altura mínima da linha: **72 px** (conteúdo cresce; mais de 2 linhas de texto sobe para 96). Alvo de toque = linha inteira (largura total).
- Numeral na trilha esquerda de 56 px; texto à direita com recuo.
- Hover/foco/active: DS §7 (fundo `g800`, numeral âmbar, "CHAMAR" sublinhado).
- Item 10 (Outro problema) e item 09 (Hora da revisão) sem aviso.
- Item 08 (combustível): o aviso aparece **dentro da linha, como segunda linha de texto**, com faixa de risco de 6 px no topo da linha (uso 2/4). O aviso é texto; não é pictograma de perigo.

### 1280 px
```
col 1–4 (sticky): rótulo, H2, subtítulo, microcopy do áudio/vídeo, numeral display "10" (136 px âmbar, "SINTOMAS" ao lado)
col 5–12: a lista de 10 linhas (mesmas linhas, ≥ 88 px, texto em Barlow 28 px, apoio à direita)
          cada linha em 3 colunas: [NN] [sintoma + serviço] [CHAMAR NO WHATSAPP sublinhado à direita]
```
Sem cards. A lista inteira cabe em ~1000 px de altura; a coluna esquerda fica `position: sticky; top: 96px`.

---

## 4. Serviços `#servicos` {P}: "tabela técnica"

H2: **Mecânica geral, preventiva e especializada.** Intro: "Trabalhamos com veículos nacionais e importados, com serviço e diagnóstico em todas estas áreas:".

Cabeçalho de tabela: `Nº | SERVIÇO | O QUE ATENDEMOS | ORIGEM` (a coluna ORIGEM diz `OFICIAL` ou `CITADO POR CLIENTES`; tradução honesta dos "sete oficiais e dois citados"; ver pendências se o cliente preferir não mostrar).

### 360 px (tabela colapsa em fichas empilhadas)
```
 SERVIÇOS · TABELA DE ESPECIFICAÇÃO
 ==================================
 01  INJEÇÃO ELETRÔNICA
     Diagnóstico com scanner para falhas, perda de
     potência, consumo alto e luz da injeção acesa.
     FALAR SOBRE ISSO                      ← link de ação, laranja-700, sublinhado
 ----------------------------------
 02  MOTOR ... 09 SISTEMA DE COMBUSTÍVEL
 ==================================
 [ 07 = Revisões periódicas ; 08 = Arrefecimento ; 09 = Combustível ]  
 Não achou o seu problema? Descreva no WhatsApp, ou mande um áudio.
 [ CHAMAR NO WHATSAPP ]
```
Cada ficha: numeral Barlow 40 px `amber-800`, título 24 px, descrição 17 px `ink`, link com altura de alvo ≥ 48 px.

### 1280 px
```
 Nº   SERVIÇO                  O QUE ATENDEMOS (62ch)                               ORIGEM       AÇÃO
 01   INJEÇÃO ELETRÔNICA       Diagnóstico com scanner ...                          OFICIAL      FALAR SOBRE ISSO
 ...
 09   SISTEMA DE COMBUSTÍVEL   Diagnóstico e correção de vazamentos ...             CITADO       FALAR SOBRE ISSO
```
Tabela real (`<table>`), cabeçalho 2 px `ink`, linhas 1 px, altura de linha ≥ 72 px, coluna Nº em Barlow 700 40 px, hover de linha: fundo `white`, numeral muda para `amber-800` (DS §7). Rodapé da tabela em `paper-deep`: "Não achou o seu problema? Descreva no WhatsApp" + botão.

Cada "FALAR SOBRE ISSO" é um `wa.me` com mensagem do serviço.

---

## 5. Como trabalhamos `#como-trabalhamos` {D, `dark-a`}: escudo dividido

H2: **Transparência do diagnóstico à entrega.** Intro: "É assim com qualquer carro que entra aqui."

Conceito: a página se parte como o escudo. Linha central vertical = divisor do escudo. Esquerda = engrenagens (diagnóstico). Direita = ferramentas (serviço). Metade esquerda do emblema desenhada em fundo (linha fina âmbar 14%), metade direita idem, cada uma atrás da sua coluna.

### 1280 px
```
                         │ linha central 2 px âmbar (vira 1 px nas pontas)
   DIAGNÓSTICO           │            SERVIÇO
   (engrenagens)         │            (ferramentas)
   desenho em linha:     │            desenho em linha:
   3 engrenagens         │            chave inglesa + chave de fenda cruzadas
   da metade esq. do     │            da metade dir. do emblema
   emblema, 24%          │            (traço técnico, não pictograma)

   01  AVALIAMOS E EXPLICAMOS      │ 03  SERVIÇO NO PRAZO COMBINADO
       Mostramos o problema...     │     Executamos o serviço e mantemos você
                                   │     informado pelo WhatsApp.
   02  ORÇAMENTO ANTES DE MEXER    │ 04  PEÇA TROCADA, PEÇA MOSTRADA
       Você recebe o orçamento...  │     Na entrega, você vê as peças...
   ───────────────────────────────┼────────────────────────────
   marca de registro no centro (crop de 4 braços) onde a linha cruza o filete inferior
```
- Numerais 01–04 em Barlow 700 ~96 px, `amber-400`, contornados quando "vazios" (stroke) e preenchidos no hover. Numeração é contínua 01 → 04 cruzando a linha: o leitor vê que o processo atravessa o escudo.
- Cabeçalhos "DIAGNÓSTICO" e "SERVIÇO": H3 caixa alta com tracking .14em acima de cada metade; Barlow 600 28 px.
- A linha central é um filete CSS (`border-left`), com um pequeno losango (4 × 4 px, `rotate(45deg)`, preenchido âmbar) a cada 160 px como "régua de cota"; opcional. Sem seta, sem ícone.

### 360 px
```
 DIAGNÓSTICO   ← cabeçalho com filete de 2 px âmbar acima
 01 AVALIAMOS E EXPLICAMOS
    texto
 02 ORÇAMENTO ANTES DE MEXER
    texto
 ┃━━━━━━━━━━━━━━━━━━━━┃    ← a linha central vira filete horizontal 2 px âmbar com crops nas pontas
 SERVIÇO
 03 SERVIÇO NO PRAZO COMBINADO
 04 PEÇA TROCADA, PEÇA MOSTRADA
```
Numerais 56 px na trilha esquerda de 72 px. Desenho de fundo reduzido a 10% e posicionado no canto direito do cabeçalho de cada metade. `aria`: `<ol>` único de 4 itens com `<h3>` das metades antes de cada par; a ordem de leitura é 01–04.

---

## 6. Peça trocada, peça mostrada {P, `paper`}

Momento emocional do site. Layout em duas peças: a **tag de peça** (esquerda) e o **depoimento** (direita).

### A tag de peça (componente)
```
          ○ (furo 14 px com anel, canto superior, cordinha omitida)
 ///////////////////////////////////  ← hazard 10 px (uso 3/4)
 PEÇA Nº 01 · TROCADA                  ← campo
 ____________________________________
 ESTADO NA ENTRADA   |  DESGASTADA / DEFEITUOSA
 ESTADO NA ENTREGA   |  SUBSTITUÍDA
 MOSTRADA AO CLIENTE |  SIM · NA ENTREGA
 DATA                |  __ / __ / ____    ← linhas em branco com filete, "preenchível" visualmente
 ====================================  (3 px ink)
 PEÇA TROCADA, PEÇA MOSTRADA.          ← Barlow 700 caixa alta 36 px
 +                              +      ← crops
```
- Canto superior esquerdo cortado em 45° (`clip-path`); `box-shadow: 4px 4px 0 var(--kg-ink)`.
- Rotação de -1,5° (`transform: rotate(-1.5deg)`), a única inclinação do site, para parecer uma tag pendurada; em `prefers-reduced-motion` e a 360 px a rotação é 0 (nada "tremendo").
- Conteúdo é **ilustrativo e fixo** (não é registro real). "Sem fotos reais ainda": a tag é a composição gráfica; quando chegarem as fotos do flat lay, substituir ou posicionar a foto numa moldura com crops ao lado da tag.
- Campos em branco com linha (`DATA`) são puramente visuais; não são `<input>` (site sem formulário).

### 360 px
Tag em largura total (padding 24 px), seguida do depoimento: trecho literal e curto, **só após autorização** `[CONFIRMAR]`. Sem autorização, o trecho não renderiza e fica só a tag.
```
 "Levei meu carro em dois mecânicos e não resolveram meu problema. [...]
 Resolveu o problema, muito honesto, mostrou todas as peças que trocou."
 CLIENTE · AVALIAÇÃO NO GOOGLE
```
Citação: Barlow 600 28 px, aspas tipográficas “ ”, filete esquerdo 4 px âmbar-800.

### 1280 px
```
col 1–6: tag (rotação -1,5°, 520 px de largura)
col 7–12: eyebrow "A PROMESSA", H2 "Peça trocada, peça mostrada.", parágrafo, citação, [CHAMAR NO WHATSAPP]
```

### 6b. Revisão por agenda (continuação da seção 6, faixa curta em `paper-deep`)
Bloco educativo, sem calculadora:
```
 REVISÃO PERIÓDICA · CONFORME AGENDA DO VEÍCULO
 "Seu manual tem uma agenda de revisões por km ou tempo. A gente segue a agenda do seu carro,
  sem empurrar serviço que ele ainda não precisa."
 [ AGENDAR MINHA REVISÃO ]    ← wa.me com a mensagem do item 09 dos sintomas
```
Lado do 1280: texto à esquerda e, à direita, uma **escala em linha** desenhada com ticks (`0 km … 10 mil … 20 mil … `) como régua decorativa. **Aviso:** os números da régua não podem sugerir intervalo oficial; usar ticks sem rótulo numérico, só "KM / TEMPO" nas pontas.

---

## 7. Avaliações `#avaliacoes` {P}

O painel do 5,0 é `ink` (escuro) e quebra visualmente o papel entre as seções 6 e 7.

### 360 px
```
 AVALIAÇÕES · GOOGLE
 QUEM JÁ DEIXOU O CARRO EM BOAS MÃOS         ← H2

 painel ink (fundo #17181A, texto paper, borda superior 3 px âmbar):
   5,0                          ← display 96 px âmbar-400 (contagem 0,0 → 5,0)
   DE 5,0 · 68 AVALIAÇÕES NO GOOGLE

 depoimentos: lista vertical de "fichas" (sem carrossel quando cabem):
   “A manutenção foi clara e honesta...”
   CLIENTE · AVALIAÇÃO NO GOOGLE
   ____________________________
   ...
 [ VER TODAS NO GOOGLE ]   [ JÁ É CLIENTE? AVALIE A GENTE ]
```
Sem autorização para exibir trechos, a lista não renderiza; sobram o painel `5,0` e os links.

### 1280 px
Painel `ink` ocupa col 1–5 com o `5,0` display 136 px; col 6–12 lista os depoimentos em 2 colunas de fichas separadas por filete; sem rolagem horizontal. Se houver > 5 depoimentos, "VER TODAS NO GOOGLE" cobre o resto; nada de carrossel.

---

## 8. Diferenciais `#diferenciais` {D, `dark-b`}

H2: **Por que os clientes voltam e indicam.** Lista numerada 01–05 (mesmo padrão do 3, mas **sem link**: as linhas não são clicáveis, então sem hover):
01 Honestidade comprovada · 02 Preço justo · 03 A gente explica · 04 Ambiente limpo e confortável · 05 Atendimento direto.

### 360 px
Numeral 40 px âmbar + título Barlow 600 22 px + frase Inter 16 px `steel-300`; filete 1 px entre itens.

### 1280 px
Duas colunas: col 1–5 com **numeral display "05"** (136 px âmbar, rótulo "MOTIVOS") e H2; col 6–12 com a lista. Marca d'água: engrenagem grande em linha fina (6%) atrás do numeral, recortada pela borda da seção.

---

## 9. FAQ `#duvidas` {P}

`<details>/<summary>` nativo. Linha = `[NN] [pergunta Barlow 600 22 px] [ABRIR / FECHAR]` onde "ABRIR/FECHAR" é texto (troca via `details[open]::after`/conteúdo de texto em CSS; nada de seta/+/−). Altura ≥ 72 px; resposta em Inter 17 px com recuo de 56 px. Só perguntas com resposta confirmada renderizam.

360: lista única. 1280: col 1–4 H2 + intro, col 5–12 lista.

---

## 10. Onde estamos `#onde-estamos` {P}

H2: **Venha nos visitar no Tremembé.**

### 360 px
```
 +  ONDE ESTAMOS                  +
 ENDEREÇO
 R. Mamud Rahd, 202
 Tremembé, São Paulo/SP · 02372-090      ← link (Google Maps)

 HORÁRIO DE FUNCIONAMENTO                ← tabela semântica
 ======================================
 DIA              HORÁRIO
 Segunda a sexta  08:00 às 18:00
 Sábado           09:00 às 14:00
 Domingo          Fechado
 ======================================
 linha de hoje: fundo ink, texto paper, filete âmbar 4 px à esquerda
 ABERTO AGORA · FECHA ÀS 18H

 [ CHAMAR NO WHATSAPP ]
 [ LIGAR ]  [ COMO CHEGAR ]  [ E-MAIL ]  ← 3 botões secundários de 48 px
 Atendemos toda a Zona Norte: Tremembé, Jardim Tremembé, Tucuruvi, Mandaqui, Jaçanã, Vila Irmãos Arnoni, Horto Florestal e região.

 MAPA: painel 100% × 240 px, mapa estilizado (SVG esquemático) com crops nos cantos,
 pin do escudo em laranja; sobreposto, botão "ABRIR NO GOOGLE MAPS" (48 px)
```

### 1280 px
col 1–5 (endereço, tabela, botões); col 6–12 mapa 520 px alto com crops e rótulo `COORDENADAS −23,4598 · −46,6260` em Inter tabular. Iframe do Maps só após clique (facade).

Atenção: "mapa esquemático" não é geografia real; legenda "ESQUEMA · NÃO ESTÁ EM ESCALA".

---

## 11. CTA final {D, `dark-a`}

Emblema grande (preenchido, 18%) centralizado atrás; crops na seção.

### 360 px
```
 SEU CARRO ESTÁ
 DANDO SINAL?                 ← H2 Barlow 700 ~44 px caixa alta
 Fale com quem explica antes de mexer.
 [ CHAMAR NO WHATSAPP AGORA ] ← 100% largura, 64 px
 ABERTO AGORA · FECHA ÀS 18H
```
### 1280 px
Centralizado: H2 ~96 px, botão 72 × 360 px, status abaixo; emblema 520 px à direita com engrenagens (gira no hover), diamond plate mascarada na borda.

---

## 12. Rodapé {D, aço escovado}

### 360 px
```
 faixa de aço escovado (≤ 120 px) com o wordmark/emblema
 SEU CARRO EM BOAS MÃOS.
 ====================================
 ENDEREÇO · R. Mamud Rahd, 202, Tremembé, São Paulo/SP, 02372-090
 WHATSAPP · +55 11 98836-7054
 E-MAIL · kandogarage@gmail.com
 INSTAGRAM · @kando_garage
 HORÁRIO · SEG–SEX 08–18 · SÁB 09–14 · DOM FECHADO
 CNPJ · (só se confirmado)
 ====================================
 POLÍTICA DE PRIVACIDADE
 © 2026 Kando Garage · Site por Toss Lab
 ////////////////////////////////     ← faixa de risco final (uso 4/4)
```
Campos de OS (rótulo + valor), uma por linha, alinhados com tabulação.

### 1280 px
Quatro colunas de campos (Endereço / Contato / Horário / Instagram + privacidade), emblema à esquerda, slogan em Barlow 700 48 px.

---

## 13. Barra de ação fixa (mobile ≤ 767 px), só texto

```
┌───────────────┬───────────────┬───────────────┐
│   WHATSAPP    │     LIGAR     │ COMO CHEGAR   │   altura 56 px + safe-area-inset-bottom
└───────────────┴───────────────┴───────────────┘
```
- Três células iguais; WhatsApp é primário (fundo `orange-500`, texto `g950`); Ligar e Como chegar em `g900` com texto paper e filete esquerdo 1 px `line-dark-strong`. Barlow 700 caixa alta 18 px, tracking .06em. Alvo ≥ 56 × 120 px.
- Filete superior 2 px `orange-500` (não há faixa de risco aqui).
- Some (`translateY(100%)`, 200 ms) quando o rodapé entra na viewport; reservar `padding-bottom: calc(56px + env(safe-area-inset-bottom))` no `body` para não cobrir conteúdo.
- Desktop (≥ 768 px): não existe barra. O CTA fica no header e em cada seção; sem botão flutuante.

---

## 14. Resumo de CTAs por seção

| Seção | CTA primário | CTAs secundários |
|---|---|---|
| Header | Chamar no WhatsApp (desktop) | Menu |
| Hero | Chamar no WhatsApp | O que meu carro tem? |
| Ficha | n/a | n/a |
| Sintomas | cada linha = WhatsApp com mensagem do sintoma | microcopy áudio/vídeo |
| Serviços | Falar sobre isso (por linha) | Chamar no WhatsApp (rodapé da tabela) |
| Como trabalhamos | n/a | n/a |
| Peça mostrada / revisão | Chamar no WhatsApp · Agendar minha revisão | n/a |
| Avaliações | Ver todas no Google | Já é cliente? Avalie a gente |
| Diferenciais | n/a | n/a |
| FAQ | n/a | link para WhatsApp na última resposta |
| Onde estamos | Chamar no WhatsApp | Ligar · Como chegar · E-mail |
| CTA final | Chamar no WhatsApp agora | n/a |
| Barra mobile | WhatsApp | Ligar · Como chegar |

Jornada do "carro com problema" no celular: hero → "O que meu carro tem?" (1 toque) → linha do sintoma (2º toque) → WhatsApp com mensagem pronta. Dois toques a partir do topo.
