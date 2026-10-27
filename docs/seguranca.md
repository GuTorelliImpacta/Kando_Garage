# Segurança e privacidade

Fase 5 (security-deploy), 2026-10-26. Site React 19 + Vite com pré-render estático (`dist/index.html`, `dist/politica-de-privacidade.html`, `dist/404.html`). Nada foi publicado e nenhum DNS foi alterado.

## Headers (seção 9.1)

`vercel.json` e `public/_headers` trazem os 7 headers idênticos à seção 9.1 do prompt (comparados por script: 7/7 iguais, sem extras), aplicados a `/(.*)`, portanto às 3 páginas e a todos os assets.

| Header | Por quê |
|---|---|
| `Content-Security-Policy` | `default-src 'self'` como base. `script-src 'self'`: o build gera só `<script type="module" src>` externo (sem inline, sem `eval`; o JSON-LD é `application/ld+json`, dado e não código). `style-src 'self' 'unsafe-inline'`: o CSS é inlinado em `<style>` pelo pré-render (evita request bloqueante) e o React usa atributos `style`. `img-src 'self' data:` e `font-src 'self'`: tudo self-hosted. `frame-src https://www.google.com`: só o mapa, criado após clique. `connect-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'none'` (não há formulários), `frame-ancestors 'none'` (anti-clickjacking moderno), `upgrade-insecure-requests`. |
| `Strict-Transport-Security` | 2 anos, `includeSubDomains`, `preload`. Força HTTPS. Ver "Riscos operacionais". |
| `X-Content-Type-Options: nosniff` | Impede MIME sniffing de scripts/estilos. |
| `Referrer-Policy: strict-origin-when-cross-origin` | Só a origem sai para terceiros (Google Maps, WhatsApp, Instagram). |
| `Permissions-Policy` | Desliga câmera, microfone, geolocalização, pagamento, USB e FLoC; o site não usa nenhum. |
| `Cross-Origin-Opener-Policy: same-origin` | Isola a janela de aberturas cross-origin. |
| `X-Frame-Options: DENY` | Clickjacking em navegadores sem `frame-ancestors`. |

### Cache (fora da 9.1)
| Caminho | Cache-Control | Motivo |
|---|---|---|
| `/assets/*` | `public, max-age=31536000, immutable` | Nomes com hash de conteúdo (Vite). |
| `/fonts/*` | `public, max-age=2592000` (30 dias) | Nomes sem hash: `immutable` de 1 ano prenderia uma fonte trocada (achado 6 da versão Astro). |
| HTML e demais (`/`, `/politica-de-privacidade`, `og.jpg`, manifest, robots, sitemap, security.txt) | `public, max-age=0, must-revalidate` | Revalidação sempre: conteúdo novo aparece no deploy seguinte. Regra explícita no `vercel.json` (`/((?!assets/|fonts/).*)`), igual ao padrão da Vercel/Netlify. `scripts/serve-dist.mjs` reproduz as três regras. |

## Validação da CSP no navegador (Chromium/Playwright, `serve-dist` com os headers)

Capturados `securitypolicyviolation`, `console.error/warning` e `pageerror` em `/`, `/politica-de-privacidade` e uma URL inexistente (404 real), desktop 1280x800 e mobile 390x844; no mobile com o menu aberto; na home com o clique em "Carregar mapa interativo".

- **0 violações de CSP** nas 6 combinações. Hidratação confirmada (links `mailto:` aparecem só após o React hidratar), sem `eval` nem inline script. Nenhum `eval(`/`new Function(` no bundle.
- Menu mobile: abre (`aria-expanded=true`) sem erros.
- Mapa: o `<iframe>` é criado com `src=https://www.google.com/maps?...&output=embed` sem violação.
- Único item de console: `Failed to load resource ... 404` na página 404, que é o próprio status do documento (esperado).

## SEO técnico e arquivos públicos
- `canonical` e `og:url` por página, sem `.html`: `https://kandogarage.com.br/` (home) e `.../politica-de-privacidade`; coerentes com o `sitemap.xml` (2 URLs). A 404 não tem canonical e tem `<meta name="robots" content="noindex">`; é a única com noindex.
- `robots.txt`: `Allow: /` + `Sitemap:`; `sitemap.xml` e `robots.txt` são gerados em `scripts/prerender.mjs` a partir de `VITE_SITE_URL`.
- `manifest.webmanifest`: `theme_color #141516`, `lang pt-BR`, ícones `favicon.svg` e `logo.png`.
- `/.well-known/security.txt`: `Expires: 2027-06-30T23:59:59Z` (menos de 1 ano, RFC 9116). **CONFIRMAR (Toss Lab):** o `Contact` ainda é o Gmail do cliente; a seção 9.2 pede o contato da Toss Lab, que não foi informado. O `Canonical` do security.txt usa o domínio ainda não confirmado e é estático (não lê `VITE_SITE_URL`). Há linhas `# CONFIRMAR` no arquivo que devem sair no go-live.

## Segredos, dependências e privacidade
- Segredos: busca por padrões de chave (AKIA, AIza, ghp_, sk-, xox, PRIVATE KEY, api key, secret, token, password) na árvore e em `git log -p --all`: nenhuma ocorrência real (só a palavra "tokens" de design). Sem `.env`, `.pem`, `.key` rastreados. `.gitignore` cobre `node_modules`, `.env*`, `dist`, `dist-ssr`, `.vercel`, `.netlify`. `dist/` não é versionado.
- `npm audit` (completo e `--omit=dev`): **0 vulnerabilidades**. `package-lock.json` versionado.
- Links externos: todos os `<a href="http...">` do HTML gerado (39 na home, 7 na política, 8 na 404) têm `rel` com `noopener noreferrer`; nenhum `target="_blank"` sem `noopener`.
- HTML sem `<form>`, `<input>`, `<textarea>`, `<select>`, sem atributos `on*` e sem scripts inline além do JSON-LD; sem cookies, sem analytics, sem recurso `http://`.
- **E-mail (decisão documentada):** no HTML pré-renderizado o e-mail não aparece em lugar nenhum (nem no JSON-LD, onde `seo.ts` o remove); só "kandogarage arroba gmail.com" como fallback acessível. O `mailto:` é montado no navegador após a hidratação (`EmailLink.tsx`). Limitação: o literal `kandogarage@gmail.com` está no bundle JS (`company.email` em `site.ts`); é ofuscação leve contra scrapers de HTML, não segredo (é contato comercial). Melhoria opcional: guardar usuário e domínio separados em `site.ts`.
- LGPD: o site não trata dados pessoais; telefone e e-mail são contato comercial da empresa.

## Vercel: como as 3 páginas são servidas
`cleanUrls: true` e `trailingSlash: false`: `/politica-de-privacidade` responde 200 com `dist/politica-de-privacidade.html`; `/politica-de-privacidade.html` e `/politica-de-privacidade/` fazem redirecionamento 308 para a URL limpa; `/index.html` para `/`. Qualquer caminho sem arquivo recebe `dist/404.html` com status 404 (comportamento padrão da Vercel para sites estáticos; na Netlify também, via pretty URLs). O servidor local reproduz isso (`/pagina-inexistente` = 404 com a página 404). O canonical (sem `.html`) coincide com a URL final.

## Riscos operacionais
- **HSTS preload + includeSubDomains** conforme a seção 9.1. Não submeter a hstspreload.org nem confiar nisso antes de o domínio definitivo estar estável em HTTPS, inclusive subdomínios (e-mail web, painéis). A inclusão na lista é praticamente irreversível.
- Plano B do mapa: se o Google redirecionar o embed para outro host (`maps.google.com`, `www.google.com.br`), a CSP o bloqueará; ajustar `frame-src` conforme o erro visto no preview.
- `public/_headers` é copiado para `dist/` e fica acessível em `/_headers` na Vercel (inócuo: os headers já são visíveis em qualquer resposta).

## Não pôde ser medido sem rede pública
- Notas em securityheaders.com e Mozilla Observatory (meta: A ou superior): precisam de um preview público. Os headers foram aplicados e conferidos localmente.
- Carregamento real do mapa do Google (a rede do ambiente bloqueia google.com): validado apenas que o iframe é criado sem violação de CSP.
- Redirecionamentos 308, certificado/HTTPS e o `404.html` da Vercel de fato: reproduzidos só por `serve-dist.mjs`, não pela plataforma.
- Propagação de DNS e emissão de certificado: dependem do domínio e da aprovação do cliente.

## Etapa 2: revalidação (27/10/2026, build com os textos novos)

Nada publicado, DNS intacto, sem git. Único código alterado: `src/seo.ts` (acrescenta `hasMap` = link do Maps ao nó `AutoRepair` do JSON-LD; nenhum dado inventado, sem `priceRange`).

**SEO (7.1/7.2), lido do HTML gerado**
- `title` e `description` da home idênticos ao texto da seção 7.1; política e 404 com título/descrição próprios e únicos.
- Canonical sem `.html`: `/` e `/politica-de-privacidade`. A 404 não tem canonical e tem `noindex`. `og:*` (9, 8 na 404 sem `og:url`) e `twitter:*` (4) em todas. H1 único e `lang=pt-BR` nas 3.
- JSON-LD parseado com `JSON.parse`: `@graph` = `AutoRepair` (name, address, geo, telephone, openingHoursSpecification, areaServed, hasOfferCatalog, sameAs, hasMap) + `FAQPage` com 6 perguntas. Cada pergunta e resposta do JSON-LD foi buscada no texto renderizado: 0 divergências, 6 `<details>` na página. Sem `Review`, `AggregateRating` ou `priceRange`. O e-mail continua fora do JSON-LD (decisão da Etapa 1).
- `sitemap.xml` (2 URLs) e `robots.txt` (`Allow: /` + `Sitemap`) coerentes com os canonicals.
- Pendência fora de escopo: validar no Rich Results Test e no Schema Markup Validator (precisam de URL pública).

**Segurança**
- Os 7 headers: `vercel.json` == `public/_headers` == bloco da seção 9.1 (comparação por script, ordem e valores idênticos).
- CSP: 0 violações e 0 erros de console, desktop 1280 e mobile 390, em `/`, `/politica-de-privacidade` e URL inexistente; menu mobile abre; clique em "mapa" cria o iframe. Único item: o 404 do próprio documento na página 404.
- Cache (servidor local com as regras): HTML, `og.jpg`, manifest, robots, sitemap e security.txt com `max-age=0, must-revalidate`; `/fonts/*` 30 dias; `/assets/*` 1 ano `immutable`.
- `npm audit`: 0 vulnerabilidades (alto/crítico = 0).
- Segredos: nenhuma chave, token, credencial em URL ou arquivo `.env`/`.pem`/`.key` rastreado (`.gitignore` cobre `.env*`, `dist`). A palavra "token" não aparece mais no bundle atual. O literal do e-mail está só no JS (ofuscação leve, já documentada).
- Links externos: todos com `rel="noopener noreferrer"`. HTML sem e-mail em texto plano, sem `mailto:`, sem `<form>`/`<input>`, sem atributos `on*`. Sem formulário, portanto não há anti-spam (captcha/honeypot/rate limit) a configurar.

**QA de rotas**
- 404 real: status 404, `noindex`, botão Voltar aponta para `/` e há 5 links de WhatsApp (`wa.me/5511988367054`).
- `favicon.svg`, `apple-touch-icon.png`, `logo.png`, `manifest.webmanifest` respondem 200 com content-type correto. `og.jpg`: 1200x630, `image/jpeg`, 93 KB.
- Âncoras e links internos: 0 quebrados nas 3 páginas (56, 22 e 22 hrefs únicos varridos).
- Links esperados presentes: `wa.me/5511988367054` (31 na home), `tel:+5511988367054` (3), Maps (busca e place), Instagram `kando_garage`, avaliação (`writereview`).

**Pendências**
- `security.txt`: contato da Toss Lab e domínio final ainda a confirmar (inalterado).
- `og.jpg` segue com 93 KB (o agente de performance está tratando).
- Sem rede pública: notas em securityheaders.com/Observatory, Rich Results Test e redirecionamentos 308 da Vercel só após o preview.
