# Kando Garage: site institucional

Site estático (React 19 + Vite + TypeScript, HTML pré-renderizado no build) da oficina **Kando Garage**, Tremembé, São Paulo. Sem formulários, login ou cookies de rastreamento. Objetivo: transformar reputação em conversas no WhatsApp. Feito pela Toss Lab.

```bash
npm install
npm run dev        # desenvolvimento (Vite)
npm run build      # vite build (client) + vite build --ssr + scripts/prerender.mjs -> dist/
npm run preview    # serve dist/ com os headers de vercel.json
npm run typecheck
```

Requer Node ≥ 22.12.

## Onde mexer
- **Todo o texto e dados**: `src/content/site.ts` (horário, serviços, sintomas, mensagens de WhatsApp, FAQ, avaliações, SEO, JSON-LD). Itens com `confirmed: false` não são renderizados. Veja `docs/pendencias.md`.
- Tokens de design: `src/styles/tokens.css` (CSS puro, sem Tailwind). Componentes: `src/components/*.tsx`; páginas: `src/pages/`; rota por pathname em `src/lib/route.ts`; lógica do status de horário: `src/scripts/status-horario.ts`. Nenhum ícone: só tipografia, numerais, filetes e o emblema da marca.
- Documentação: `docs/` (design system, wireframes, ativos, pendências, auditoria, segurança, QA, prompt original).
- Agentes do fluxo de trabalho: `.claude/agents/`.

## Scripts de verificação
```bash
node scripts/serve-dist.mjs 4322     # serve dist/ com os headers de vercel.json
node scripts/audit-a11y.mjs          # axe-core em todas as páginas (requer playwright)
npx tsx scripts/test-status.mjs      # status "aberto agora" nos cenários de horário
npx tsx scripts/make-assets.mjs      # regenera favicon, apple-touch-icon, logo.png e og.jpg a partir do componente Emblem
node scripts/contrast.mjs '[["nome","#fff","#000"]]'
```

## Deploy (Vercel ou Netlify)
1. Importe o repositório. Framework: Vite. Build command: `npm run build`. Output directory: `dist`. Node >= 22.12.
2. Variável de ambiente `VITE_SITE_URL` (Production e Preview) com o domínio final, sem barra no fim (ex.: `https://kandogarage.com.br`). Alimenta canonical, og:url, sitemap, robots e JSON-LD, lida no build. Sem ela vale o padrão `https://kandogarage.com.br`; em previews os canonicals apontam para o domínio de produção (esperado).
3. Headers de segurança e cache: já em `vercel.json` (Vercel) e `public/_headers` (Netlify). `cleanUrls` e `trailingSlash: false` fazem `/politica-de-privacidade` servir `politica-de-privacidade.html`; `404.html` é usado automaticamente (status 404). Na Netlify as "pretty URLs" têm o mesmo efeito.
4. Domínio (somente com aprovação do cliente): adicione-o no painel do provedor e crie no DNS `A 76.76.21.21` (apex) e `CNAME cname.vercel-dns.com` (www) na Vercel, ou os registros que a Netlify indicar. Redirecione www para o apex (ou o inverso) no painel. HTTPS (Let's Encrypt) é emitido automaticamente depois que o DNS propaga.
5. HSTS usa `includeSubDomains; preload`: só submeta o domínio a hstspreload.org depois de confirmar que o domínio e todos os subdomínios servem HTTPS de forma estável (a inclusão é praticamente irreversível).
6. `public/.well-known/security.txt`: trocar o contato pelo definitivo da Toss Lab e remover as linhas `# CONFIRMAR`; renovar `Expires` antes de 30/06/2027.
7. Depois do deploy: validar JSON-LD (Rich Results Test), headers (securityheaders.com, Mozilla Observatory), clicar em "Carregar mapa interativo" (confirma `frame-src`) e rodar o Lighthouse mobile.

**Nada foi publicado em produção nem teve DNS alterado.** Publicar só com aprovação do cliente.
