# QA

> **Atenção:** esta revisão foi feita pelo próprio orquestrador, **não** por um `qa-reviewer` independente (o agente está definido em `.claude/agents/qa-reviewer.md`, mas não foi executado). Recomenda-se rodá-lo antes da aprovação do cliente.

| # | Item | Resultado |
|---|---|---|
| 1 | Fatos (endereço, WhatsApp 5511988367054, e-mail, horário, serviços, nota) batem com a seção 1 | Aprovado. Nada inventado. |
| 2 | Links `wa.me` (todos os sintomas e serviços com mensagem codificada), `tel:`, `mailto:`, Maps, Instagram, avaliação | Aprovado na inspeção do HTML. **Não** foi clicado em produção: o envio real no WhatsApp deve ser testado num celular. |
| 3 | Jornada do carro com problema: 2 toques até o WhatsApp com mensagem | Aprovado (chip de sintoma). |
| 4 | Status de horário nos cenários pedidos | Aprovado: `npx tsx scripts/test-status.mjs`, 10/10 (seg 7h59, 8h00, 17h30, 18h01; sáb 13h30, 14h01; dom; sex 18h01). |
| 5 | Marca: laranja = ação, âmbar = marca | Aprovado. **Ressalva:** emblema é provisório e o wordmark é texto (ver `brand-assets.md`). |
| 6 | Conteúdo: `CONFIRMAR` não aparece para o usuário | Aprovado no texto visível. Há um comentário HTML `CONFIRMAR` no cabeçalho (invisível). Sem superlativos ou promessas absolutas. |
| 7 | Metas de performance/segurança | Lighthouse atingido (`auditoria.md`). Notas de headers só medíveis em preview público. |
| 8 | Sem formulário/input/cookie | Aprovado (0 ocorrências no HTML; sem cookies). |
| 9 | JSON-LD | Gerado a partir de `site.ts` (AutoRepair com `Offer`/`Service`; FAQPage só com respostas confirmadas; sem Review/AggregateRating). **Não** validado no Rich Results Test (sem acesso externo). |

## Correções priorizadas
1. (Alta) Obter logo original e fotos; atualizar nota/contagem de avaliações.
2. (Alta) Autorização das avaliações: sem ela a seção mostra só o selo.
3. (Média) Validar JSON-LD e headers no preview público.
4. (Baixa) Teste com leitor de tela.
