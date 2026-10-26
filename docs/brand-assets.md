# Ativos de marca

## Situação
O repositório **não contém os arquivos originais do logo** (`brand/` está vazio). Foi criada uma **ilustração provisória** do emblema, fiel ao conceito descrito (escudo dividido: três engrenagens à esquerda, chave inglesa e chave de fenda cruzadas à direita), em `src/components/Emblem.astro`. O wordmark cursivo **não foi reproduzido**: no lugar há o texto "KANDO / GARAGE" em Barlow Condensed (marcado `CONFIRMAR` em `Header.astro`).

**Ação:** pedir ao cliente os SVG/PNG em alta (emblema e wordmark) e colocá-los em `brand/`. Depois trocar `Emblem.astro` e o texto provisório, e regenerar os derivados com `npm run build && node scripts/make-assets.mjs`. Conferir também os hex da paleta.

## Ativos gerados
| Arquivo | Origem |
|---|---|
| `public/favicon.svg` | emblema (SVG) |
| `public/apple-touch-icon.png` (180) | emblema sobre grafite |
| `public/logo.png` (512) | emblema sobre grafite (JSON-LD) |
| `public/og.jpg` (1200×630) | emblema + "Seu carro em boas mãos" + "★ 5,0 no Google" |
| `src/components/MapArt.astro` | mapa **esquemático** com pin em escudo (ilustração, não geografia real) |
| `src/pages/404.astro` | emblema com engrenagem solta (`loose`) |
| Engrenagens animáveis | grupos `.gear-a/.gear-b/.gear-c` no emblema |

## Regras de uso do logo
- Área de respiro: metade da largura do escudo em todos os lados. Tamanho mínimo do emblema: 28 px de largura.
- Fundos permitidos: grafite (`#141516`/`#1D1E20`), papel (`#F4F2EE`). Nunca sobre foto sem overlay grafite de 30–50%.
- Não redesenhar, rotacionar, esticar nem recolorir. Não reproduzir o wordmark com fonte.
