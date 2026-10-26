# Ativos de marca (versão React, sem ícones)

## Situação

- `brand/` continua **vazia**: o cliente ainda não enviou o emblema nem o wordmark originais `[CONFIRMAR]`.
- O emblema da versão Astro (`src/components/Emblem.astro`, viewBox `0 0 200 232`, grupos `.gear-a/.gear-b/.gear-c`) é uma **ilustração provisória** fiel ao conceito: escudo dividido, três engrenagens à esquerda, chave inglesa e chave de fenda cruzadas à direita. Para o React, portar a **mesma geometria** como componente `Emblem` (sem reinventar), mantendo os grupos animáveis.
- O wordmark cursivo **não é reproduzido com fonte**. Enquanto não houver o arquivo, o texto provisório "KANDO / GARAGE" em Barlow Condensed fica marcado `CONFIRMAR` e a hierarquia do site não depende dele.
- Quando chegarem os originais: trocar o emblema, conferir os hex de `design-system.md` §2.1 e regenerar os derivados (favicon, apple-touch, OG, logo.png).

## Regra de ouro

**Emblema e engrenagens são logo, não ícone.** Podem ser grandes, repetidos como marca d'água e desenhados em linha fina como planta técnica. Não podem ser usados para decorar item de lista, botão ou rótulo (isso seria ícone). Nunca redesenhar, rotacionar o conjunto, esticar ou recolorir fora das variações abaixo.

## Variações permitidas do emblema

| Variação | Cores | Onde |
|---|---|---|
| Cheio, versão marca | grafite `#3A3B3E` com contorno branco; metade com engrenagens e metade com ferramentas, detalhes âmbar `#E0A33A` | hero (grande), CTA final, rodapé |
| Cheio sobre laranja | escudo grafite sobre `#E2683A` (versão Instagram) | OG, apple-touch |
| Âmbar com metade preta | versão do WhatsApp | avatar/compartilhamento, se o cliente enviar |
| **Planta (linha fina)** | `stroke` único, 1 px (`non-scaling-stroke`), sem preenchimento, âmbar a 55% no escuro / `ink` a 45% no claro | hero (sobreposto ao cheio), "Como trabalhamos" (metades), fundos |
| **Marca d'água** | cheio ou planta a 6–18% de opacidade | CTA final, diferenciais, rodapé; nunca atrás de texto corrido |
| Monocromático | uma cor chapada (`#F4F2EE` no escuro, `#17181A` no claro) | favicon pequeno, uso em 1 cor |

## Lista de SVGs a produzir

| # | Arquivo | Conteúdo | Observações |
|---|---|---|---|
| 1 | `emblem.svg` (componente `Emblem`) | Escudo cheio com grupos `<g class="gear gear-a|b|c">` e `<g class="tools">` | Engrenagens com `transform-box: fill-box; transform-origin: center` para girar sozinhas. Props: `spin`, `loose` (uma engrenagem solta para o 404), `variant` (`full`/`line`/`mono`) |
| 2 | `emblem-blueprint.svg` (componente `EmblemBlueprint`) | Planta do escudo: contorno, eixo central em traço-ponto, círculos de primitiva e de raiz das 3 engrenagens, ticks de cota, rótulos "Z=24 / Z=18 / Z=12", "DET. A", "FOLHA 01/04", "ESC. 1:1" | Rótulos são texto SVG `aria-hidden`; os números Z são **decorativos** (não representam dados reais). `stroke-dasharray` pronto para desenhar a linha uma vez. Pendente confirmar com o cliente que ele aceita o "tom de desenho técnico" |
| 3 | `emblem-half-gears.svg` e `emblem-half-tools.svg` | Metade esquerda e metade direita do escudo em linha fina | Fundo das duas colunas de "Como trabalhamos"; juntas montam o escudo completo na linha central |
| 4 | `pin-shield.svg` | Pin do mapa em forma de escudo (laranja `#E2683A`, contorno branco 2 px, centro grafite com a divisão do escudo) | 56 × 66 px; sombra dura, sem blur. É o único "pin": não há pin padrão de mapa |
| 5 | `map-schematic.svg` | Mapa esquemático (ruas em linhas, quadras como retângulos, nome "R. MAMUD RAHD", rótulo "ESQUEMA · NÃO ESTÁ EM ESCALA") com crops e malha milimetrada de fundo | Ilustração, não geografia fiel. Cores `g900`/`g700`/âmbar. Sem chave de API |
| 6 | `favicon.svg` | Emblema monocromático simplificado (escudo + divisão + 1 engrenagem) em 32 × 32, legível a 16 px | Fundo transparente; `prefers-color-scheme` trocando `#F4F2EE`/`#17181A` |
| 7 | `apple-touch-icon.png` (180) | Escudo cheio sobre `#E2683A` com respiro de 20% | Gerado por `scripts/make-assets.mjs` |
| 8 | `logo.png` (512) | Escudo cheio sobre grafite | Usado no JSON-LD |
| 9 | `og.jpg` (1200 × 630) | Ver especificação abaixo | Gerado por script, estático |
| 10 | `404.svg` | Ilustração 404 (ver abaixo) | Mesmo desenho técnico do hero |
| 11 | `hazard.svg` (opcional) | Faixa de risco `#C4272C` / `#141516` a 135°, tile de 24 px | Se não for gradiente CSS (DS §5.5); gradiente é preferido |
| 12 | `diamond-plate.svg` | Tile 28 × 28, dois losangos cruzados | Máscara em CSS; ≤ 1 KB |
| 13 | `grain.svg` | `feTurbulence` em tile 160 × 160 | ≤ 1 KB; sem PNG |

Nenhum destes é pictograma de serviço. Ícones de injeção, motor, câmbio, suspensão, freios, airbag, revisão, arrefecimento e combustível **não são produzidos** (eram os da versão Astro).

## Especificação do OG (1200 × 630)

- Fundo `#141516` com grão (2%) e diamond plate mascarada no lado direito.
- À esquerda: rótulo âmbar "MECÂNICA GERAL, PREVENTIVA E ESPECIALIZADA" (Barlow 600, 28 px, tracking .14em), H1 "SEU CARRO EM BOAS MÃOS." (Barlow 700, ~150 px, caixa alta, `#F4F2EE`, 3 linhas), linha de campos "TREMEMBÉ · ZONA NORTE DE SP".
- À direita: emblema cheio com a planta sobreposta em linha fina, dentro de moldura com crops.
- Rodapé: faixa de risco de 12 px e `5,0 DE 5,0 NO GOOGLE · 68 AVALIAÇÕES` (sem estrelas, sem ícone).
- Margem de segurança de 64 px (corte do WhatsApp). Contraste conferido: `#F4F2EE`/`#141516` 16,35; âmbar `#E0A33A`/`#141516` 8,24.
- A nota e a contagem de avaliações precisam ser atualizadas antes do deploy.

## Ilustração 404 (texto e composição)

Desenho técnico do escudo com uma engrenagem "solta" fora do contorno, cota apontando o encaixe vazio e o rótulo "PEÇA NÃO ENCONTRADA" no estilo de tag de peça. H1: "Essa página foi pro elevador." Botões de texto: "Voltar ao início" e "Chamar no WhatsApp". Sem ícone; a faixa de risco **não** aparece no 404 (ela já está no rodapé).

## Regras de uso do logo

- **Área de respiro:** metade da largura do escudo em todos os lados (mínimo 16 px no mobile).
- **Tamanho mínimo:** emblema com 28 px de largura; favicon simplificado a partir de 16 px; wordmark com 96 px de largura mínima.
- **Fundos permitidos:** `g950` `#141516`, `g900` `#1D1E20`, papel `#F4F2EE`, laranja `#E2683A` (só a versão do Instagram). Fundos de aço escovado só em faixas ≤ 120 px.
- **Proibido:** sobre foto sem overlay grafite de 30–50%; sobre malha milimetrada sem fundo sólido atrás do logo; dentro de caixa arredondada; com sombra difusa ou brilho; com a faixa de risco encostada.
- **Não redesenhar, rotacionar, esticar nem recolorir.** Não usar o emblema como ícone de lista, botão ou rótulo. Não reproduzir o wordmark com fonte.
- Marca d'água: no máximo 18% de opacidade, sem texto de leitura sobreposto na região do desenho.

## Fotos (ainda não existem)

Sem banco de imagens. Enquanto não houver fotos reais, as composições gráficas deste design system (planta do escudo, numerais gigantes, tag de peça, malha milimetrada, diamond plate) ocupam o lugar das fotos. Quando chegarem:
- flat lay de peças (fundo escuro, luz lateral quente) entra na tag "Peça trocada" e em Serviços;
- oficina real e equipe entram no hero secundário e na galeria (seção só renderiza com fotos).
Tratamento: gradação quente nas sombras, overlay grafite de 30–50% sob texto, moldura com crops, sem cantos arredondados.
