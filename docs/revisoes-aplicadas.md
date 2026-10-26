# Revisões dos subagentes: o que foi aplicado

Quatro subagentes revisaram o site em paralelo (relatórios `qa.md`, `review-design.md`, `review-copy.md`, `review-seguranca.md`).

## Aplicado
| Achado | Correção |
|---|---|
| Canonical/`og:url` com `.html` (3 relatórios) | `Base.astro` normaliza o caminho (`/`, `/politica-de-privacidade`); a 404 não tem canonical nem `og:url` |
| 404 com meta description da home | `seo.notFoundDescription` |
| Poucas palavras-chave de SEO local no corpo | Intro em "Onde estamos", `introNote` em Serviços, `areaTail` e FAQ de importados ampliados (só fatos da seção 1) |
| "Air bag"/"airbag" misturados | "Airbag" no card e no JSON-LD, "airbag" no texto |
| "O elogio que mais se repete" (contagem sem prova) | "É um elogio que aparece sempre nas avaliações" |
| Metas `twitter:*` ausentes | Adicionadas |
| Ritmo dark/claro quase inexistente | Serviços virou seção clara; hero, faixa de confiança, CTA final e rodapé ficam grafite também no tema claro (`.keep`) |
| Badge "Fechado" dominante no mobile | Sem halo; passa para antes dos CTAs, com o resumo de horário da seção 6.2 |
| Emblema: engrenagem cortada pelo divisor e ferramentas cortadas pela borda | Engrenagem central reposicionada; ferramentas deslocadas |
| Mapa grosseiro e dois CTAs laranja na mesma tela | Ruas mais finas; "Abrir no Google Maps" virou botão secundário |
| Botão flutuante cobrindo conteúdo | Oculto enquanto o hero está visível |
| "Fecha em 60 min" | "Fecha em 1 h" |
| Alvos pequenos no rodapé (23 px) | 44 px |

Reverificado depois das correções: build sem avisos, axe 0 violações (dark/light, 360/1280), Lighthouse 99/100/100/100, LCP 1,8 s, CLS 0, 145 KB, status de horário 10/10.

## Não aplicado (e por quê)
- **Logo oficial e wordmark**: dependem do cliente (`docs/pendencias.md`).
- **`security.txt` com contato da Toss Lab** e **domínio definitivo**: dados que só o cliente/agência têm.
- **Não submeter ao hstspreload.org** antes de confirmar o domínio (HSTS já tem `preload` conforme a seção 9.1).
- **Vulnerabilidade baixa do `astro`** (View Transitions, recurso não usado): fica até haver versão compatível com o Node do ambiente de deploy.
- Itens de design de impacto baixo (muro de cards no mobile, competição âmbar/laranja nas setas dos chips, emblema fantasma no mobile): ficam para a rodada com o logo oficial, para não redesenhar duas vezes.
- Testes que precisam de rede externa (securityheaders.com, Mozilla Observatory, Rich Results Test, comportamento real da Vercel, clique no mapa do Google): fazer no preview público.
