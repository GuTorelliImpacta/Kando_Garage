# Revisão de segurança e deploy (security-deploy)

Data: 2026-10-26. Escopo: auditoria somente leitura (nenhum arquivo existente alterado, nada publicado, DNS intocado). Build gerado com `npm run build`; servidor local `scripts/serve-dist.mjs` (aplica os headers de `vercel.json`); Playwright/Chromium em desktop 1280x800 e mobile 390x844.

## Resumo

| # | Prioridade | Achado |
|---|-----------|--------|
| 1 | Alta | `canonical`, `og:url` apontam para `.../index.html`, `.../404.html` e `.../politica-de-privacidade.html` (URLs que a Vercel redireciona); conflita com o sitemap |
| 2 | Média | Contato do `security.txt` é o Gmail do cliente, não o da Toss Lab (pendência já marcada como CONFIRMAR) |
| 3 | Média | HSTS com `preload` + `includeSubDomains`: não submeter ao hstspreload.org nem ativar antes de confirmar HTTPS em todos os subdomínios |
| 4 | Baixa | `npm audit`: 1 vulnerabilidade baixa no `astro` (View Transitions, não usado) |
| 5 | Baixa | E-mail aparece em texto plano no bundle JS (`/_astro/*.js`) e no JSON-LD |
| 6 | Baixa | `/fonts/*` com `immutable` de 1 ano e nomes sem hash |
| 7 | Baixa | `/_headers` é copiado para `dist/` e fica público na Vercel (inócuo, mas desnecessário) |
| 8 | Info | Iframe do mapa não pôde ser validado de ponta a ponta (sandbox bloqueia google.com) |

Pontos aprovados estão na seção final.

## Achados

### 1. [ALTA] Canonical e og:url com `.html` (build.format 'file')

Evidência (`dist/`):
```
index.html                  <link rel="canonical" href="https://kandogarage.com.br/index.html">
404.html                    <link rel="canonical" href="https://kandogarage.com.br/404.html">
politica-de-privacidade.html canonical = .../politica-de-privacidade.html
```
O sitemap lista `/` e `/politica-de-privacidade` (corretos). Com `cleanUrls: true` a Vercel responde 308 de `/index.html` para `/` e de `/politica-de-privacidade.html` para `/politica-de-privacidade`. O canonical aponta, portanto, para uma URL que redireciona e contradiz o sitemap; o Google tende a ignorar o canonical e o `og:url` fica inconsistente em compartilhamentos. Causa: `Astro.url.pathname` vale `/index.html` quando `format: 'file'`. (O `docs/review-copy.md` já registrou o mesmo problema.)

Correção proposta em `src/layouts/Base.astro` (linha 11):
```diff
-const canonical = new URL(Astro.url.pathname, base + '/').toString().replace(/\/$/, '') || base;
+const path = Astro.url.pathname.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '');
+const canonical = (base + (path === '/' ? '' : path)).replace(/\/$/, '') || base;
```
Verificar depois: `grep -o 'rel="canonical"[^>]*' dist/*.html` deve dar `https://kandogarage.com.br` (home) e `.../politica-de-privacidade`. Na 404, com `noindex`, o canonical pode simplesmente ser omitido.

### 2. [MÉDIA] security.txt com contato do cliente

`public/.well-known/security.txt`: `Contact: mailto:kandogarage@gmail.com`. A seção 9.2 pede o contato da Toss Lab. Há o comentário `# CONFIRMAR`, mas ele vai para produção. Também: `Expires: 2027-10-26` é exatamente 1 ano (o RFC 9116 recomenda menos de 1 ano) e `Canonical` usa o domínio ainda não confirmado.
```diff
-Contact: mailto:kandogarage@gmail.com
+Contact: mailto:<seguranca@tosslab...>   # confirmar com a Toss Lab
-Expires: 2027-10-26T00:00:00.000Z
+Expires: 2027-07-01T00:00:00.000Z
```
Remover também a linha de comentário antes do go-live.

### 3. [MÉDIA] HSTS preload

`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` é idêntico à seção 9.1, então está conforme. Risco operacional: a inclusão na lista de preload é praticamente irreversível e `includeSubDomains` afeta qualquer subdomínio (por exemplo, painel ou e-mail web no mesmo domínio). Recomendação: só submeter ao hstspreload.org depois de o domínio definitivo estar estável em HTTPS; documentar em `docs/seguranca.md`. Nenhuma mudança de código.

### 4. [BAIXA] npm audit

```
astro 7.1.0 - 7.3.2  GHSA-mpr7-6m5w-76rw (CSS injection em View Transitions) - low
fix available via `npm audit fix`
```
Sem alta/crítica (critério da 9.2 atendido). O projeto não usa `ViewTransitions`/`ClientRouter` (grep em `src` vazio), então não é explorável. Correção: `npm audit fix` e rebuild; lockfile está versionado.

### 5. [BAIXA] E-mail legível em texto plano fora do `<a>`

- HTML: `kandogarage@gmail.com` aparece só uma vez, no JSON-LD (permitido). Os links e rótulos usam `kandogarage (arroba) gmail.com` e o `mailto:` é montado em `initEmail()`. Conforme.
- Porém `company.email` entra inteiro, como literal, em `dist/_astro/Base.astro_astro_type_script_index_0_lang.*.js` (`email:\`kandogarage@gmail.com\``). Um bot que baixa JS encontra o endereço. Proteção fraca, coerente com "fácil para bots" da 9.2, mas vale documentar que é ofuscação leve. Melhoria opcional: guardar `emailUser`/`emailDomain` separados em `site.ts` e juntar só no navegador.

### 6. [BAIXA] Cache de fontes

`/fonts/(.*)` recebe `public, max-age=31536000, immutable`, mas os arquivos (`inter-400.woff2` etc.) não têm hash no nome. Se uma fonte for trocada, visitantes recorrentes ficam com a antiga por até 1 ano. Opção: importar as fontes pelo pipeline do Astro (hash em `/_astro`) ou reduzir para `max-age=2592000`. HTML, `og.jpg`, `logo.png` e manifest ficam com o padrão da Vercel (`max-age=0, must-revalidate`), o que é adequado.

### 7. [BAIXA] `public/_headers` publicado

O arquivo é cópia do `vercel.json` para uso em Netlify. Na Vercel ele é ignorado como config, mas é servido como arquivo estático em `/_headers`. Sem risco (os headers já são visíveis em qualquer resposta). Se o deploy for só Vercel, mover para fora de `public/` ou excluir no build.

### 8. [INFO] Mapa interativo

O clique em "Carregar mapa interativo" funciona: o `<iframe>` é criado com `src=https://www.google.com/maps?q=-23.4598259,-46.626002&z=17&output=embed`, sem evento `securitypolicyviolation` (o `frame-src https://www.google.com` cobre a origem). A requisição em si falhou apenas por bloqueio de rede do ambiente (`ERR_TUNNEL_CONNECTION_FAILED`), portanto não foi possível confirmar que a resposta do Google não redireciona para outro host (por exemplo `maps.google.com`/`www.google.com.br`), o que a CSP bloquearia. Teste manual obrigatório no preview da Vercel. Plano B: `frame-src https://www.google.com https://maps.google.com`. O iframe usa `referrerPolicy = 'no-referrer-when-downgrade'`; como o site não tem dados sensíveis na URL é aceitável, mas `strict-origin-when-cross-origin` seria consistente com o header global.

## Vercel: `build.format: 'file'`, cleanUrls e trailing slash

Saída do build: `index.html`, `404.html`, `politica-de-privacidade.html`, `robots.txt`, `sitemap.xml`, `.well-known/security.txt`. Comportamento esperado na Vercel (não testável localmente; o servidor de teste só simula rewrite `.html`):

- `/politica-de-privacidade` responde 200 a partir de `politica-de-privacidade.html` (cleanUrls). Funcionará.
- `/politica-de-privacidade.html` e `/index.html` recebem 308 para a URL limpa (ver achado 1 sobre o canonical).
- `trailingSlash: false`: `/politica-de-privacidade/` redireciona para a versão sem barra.
- 404: arquivos `404.html` na raiz do output são usados pela Vercel para rotas inexistentes, com status 404. O servidor local confirmou `404` com a página correta (`noindex` presente). Os headers de `source: "/(.*)"` também se aplicam à 404.
- `/.well-known/security.txt` e `/manifest.webmanifest` são arquivos estáticos e são servidos normalmente.
- Sugestão de verificação pós-preview: `curl -sI https://<preview>/politica-de-privacidade` (200), `/politica-de-privacidade.html` (308), `/xyz` (404), `/index.html` (308).

## Verificações aprovadas

- **Headers:** `vercel.json` (bloco `/(.*)`), `public/_headers` e o bloco da seção 9.1 de `docs/PROMPT_KANDO_GARAGE.md` são idênticos, linha a linha (comparação programática: `true`/`true`). Respostas do servidor local trazem os 7 headers.
- **CSP sem violações:** `/`, `/politica-de-privacidade` e uma rota 404, em desktop e mobile, após rolar a página inteira, abrir/fechar o menu mobile (abre com `aria-expanded=true`, fecha com Esc) e clicar em "Carregar mapa interativo": zero eventos `securitypolicyviolation`, zero `pageerror`, zero erros de console (exceto o 404 esperado na rota inexistente e a falha de rede do Google acima). Único `<script>` é `type="module"` externo em `/_astro/`; o JSON-LD (`application/ld+json`) não é executado e dispensa `unsafe-inline`.
- **robots.txt:** `User-agent: *`, `Allow: /`, `Sitemap: https://kandogarage.com.br/sitemap.xml`.
- **sitemap.xml:** `/` e `/politica-de-privacidade` (sem `.html`), domínio vindo de `SITE_URL`.
- **manifest:** `theme_color #141516`, `lang pt-BR`, ícones existentes (logo 512x512, favicon SVG); `apple-touch-icon` 180x180; `og.jpg` 1200x630. Nome `display: browser` é intencional.
- **Segredos:** busca por AKIA/AIza/ghp_/sk-/xox/PRIVATE KEY/api key/secret/token/password em arquivos rastreados e em `git log -p --all`: sem ocorrências reais (só a palavra "tokens" de design). Nenhum `.env`, `.pem` ou `.key` rastreado. `.gitignore` cobre `node_modules`, `.env*`, `dist`, `.astro`, `.vercel`, `.netlify`. Um único commit, autor `noreply@anthropic.com`, sem dados pessoais. Mapa estático, sem chave de API no front-end.
- **Links externos:** todos os `target="_blank"` (28 ocorrências em `src`) têm `rel="noopener noreferrer"`.
- **Analytics:** nenhum script de terceiros; `connect-src 'self'`.
- **Cache:** `/_astro/*` e `/fonts/*` com `immutable` (ver achado 6); servidor local confirmou o cabeçalho.

## Ordem sugerida de correção

1. Achado 1 (canonical), 2 (security.txt), 4 (`npm audit fix`): antes do preview final.
2. Teste manual do iframe no preview da Vercel (achado 8) e dos quatro `curl` acima.
3. Achados 3, 5, 6 e 7: decidir e documentar em `docs/seguranca.md`.
