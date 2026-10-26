# Pendências `[CONFIRMAR]`: pedir ao cliente

Tudo abaixo está tratado no código (`src/content/site.ts`): o item **não aparece** para o visitante até ser confirmado.

## Marca e mídia
- [ ] Logo original em SVG/PNG alta: **emblema** e **wordmark** (hoje: ilustração provisória + texto). Conferir hex da paleta.
- [ ] Fotos originais em alta (flat lay de peças, carros no elevador, oficina, sala de espera, equipe). Sem fotos, a seção "Por dentro da garagem" fica oculta. Preencher `gallery` em `site.ts`.

## Empresa
- [ ] CNPJ (rodapé: `company.cnpj`).
- [ ] Ano de fundação e história do nome "Kando".
- [ ] Nome completo e função do **Diego** e da equipe (depois citar em "Atendimento direto").
- [ ] Se atende sem agendamento (FAQ "Preciso agendar?" hoje só recomenda chamar antes).
- [ ] Se abre em feriados (hoje o site diz "consulte pelo WhatsApp").

## Respostas de FAQ ocultas
- [ ] O orçamento é cobrado?
- [ ] Formas de pagamento.
- [ ] Garantia dos serviços (prazo). Também: atende seguradoras?

## Avaliações
- [ ] **Autorização** para exibir trechos das avaliações do Google com o primeiro nome do autor. Quando houver, preencher `author` e trocar `confirmed: true` em `reviews` e em `how.highlight.quote`. Hoje aparece só o selo 5,0 · 68 avaliações com links.
- [ ] Atualizar nota e contagem (`company.rating`, hoje 5,0 / 68) antes do deploy.

## Técnico
- [ ] Domínio (`kandogarage.com.br` ou `.com`): definir `SITE_URL` no deploy (canonical, sitemap, JSON-LD, OG).
- [ ] Analytics cookieless (Vercel Web Analytics, Plausible ou Umami) ou nenhum. Se houver, ativar `analytics.enabled`, incluir o script e liberar **só** o domínio dele na CSP.
- [ ] Contato de segurança da Toss Lab em `public/.well-known/security.txt` (hoje usa o e-mail da oficina).

## Ganhos imediatos para o cliente (fora do site)
1. **Link da bio do Instagram quebrado**: `wa.me/988367054` não tem o 55 nem o DDD. Correto: `https://wa.me/5511988367054` (ou o site novo).
2. **Horário divergente**: Google Maps mostra seg–sex 8h30–19h; WhatsApp Business (usado no site) mostra 8h–18h. Alinhar o Google Business Profile e adicionar o link do site.
