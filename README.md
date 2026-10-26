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
1. Importe o repositório (framework Vite; build `npm run build`; saída `dist`).
2. Defina a variável `VITE_SITE_URL` com o domínio final (ex.: `https://kandogarage.com.br`). Ela alimenta canonical, sitemap, robots, Open Graph e JSON-LD (lida no build).
3. Headers de segurança: já em `vercel.json` (Vercel) e `public/_headers` (Netlify).
4. Domínio: adicione-o no painel, aponte `A 76.76.21.21` (apex) e `CNAME cname.vercel-dns.com` (www) na Vercel, ou o equivalente do provedor. HTTPS é emitido automaticamente.
5. Depois do deploy: validar JSON-LD (Rich Results Test), headers (securityheaders.com, Mozilla Observatory) e rodar o Lighthouse mobile.

**Nada foi publicado em produção nem teve DNS alterado.** Publicar só com aprovação do cliente.
