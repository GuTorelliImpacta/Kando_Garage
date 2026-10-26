# Segurança e privacidade

Headers em `vercel.json` (e `public/_headers` para Netlify), idênticos à seção 9.1 do prompt.

| Header | Por quê |
|---|---|
| `Content-Security-Policy` | `default-src 'self'`; scripts só do próprio domínio (Astro configurado para nunca inlinar script: `assetsInlineLimit: 0`); `style-src 'unsafe-inline'` só por causa do CSS inline do build; `frame-src https://www.google.com` só para o mapa sob demanda; `form-action 'none'` (não há formulários); `frame-ancestors 'none'`; `upgrade-insecure-requests`. Validada sem erros de console. |
| `Strict-Transport-Security` | 2 anos + subdomínios + preload. Só vale em HTTPS (a Vercel/Netlify servem HTTPS). |
| `X-Content-Type-Options: nosniff` | evita MIME sniffing |
| `Referrer-Policy: strict-origin-when-cross-origin` | não vaza caminho para terceiros |
| `Permissions-Policy` | desliga câmera, microfone, geolocalização, pagamento, USB, FLoC |
| `Cross-Origin-Opener-Policy: same-origin` | isola a janela |
| `X-Frame-Options: DENY` | clickjacking em navegadores antigos |

## Outras decisões
- Links externos com `rel="noopener noreferrer"`. Nenhum segredo no repositório (`.gitignore` cobre `.env*`, `dist`, `node_modules`). Lockfile versionado.
- `npm audit`: nenhuma vulnerabilidade alta/crítica (Astro 7.3.2). Resta 1 *low* em View Transitions, recurso que o site não usa.
- **E-mail**: o `href="mailto:"` e o texto são montados no navegador por `src/scripts/ui.ts`; no HTML estático aparece só "kandogarage (arroba) gmail.com" (fallback acessível). O endereço aparece no JSON-LD, que é público por natureza (dado comercial).
- Sem formulários, inputs, cookies ou analytics ligados. Medição é opt-in (`analytics.enabled`) e sem Google Analytics/Meta Pixel.
- Mapa: ilustração commitada, sem chave de API. O iframe do Google só carrega após clique.
- `/.well-known/security.txt` com validade até 26/10/2027.

## Não verificado
Notas A+ no securityheaders.com / Mozilla Observatory só podem ser medidas num preview público (o ambiente não tem acesso). Os headers acima foram aplicados e testados localmente.
