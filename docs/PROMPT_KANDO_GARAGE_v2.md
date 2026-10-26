# Prompt de implementação: site institucional Kando Garage

> **Para:** agente do Claude Code (orquestrador)
> **Projeto:** site institucional/portfólio, **sem coleta de dados** (sem formulários, sem login, sem cookies de rastreamento)
> **Agência:** Toss Lab
> **Idioma do site:** português do Brasil
> **Versão:** 2. Inclui identidade visual, serviços e horário confirmados pela própria empresa (WhatsApp Business e Instagram)

---

## 0. Como usar este prompt

Você é o **orquestrador**. Leia o documento inteiro antes de começar. Depois:

1. Crie os subagentes da seção 10 em `.claude/agents/`.
2. Execute as fases da seção 11 na ordem, delegando cada uma ao subagente indicado.
3. **Nunca invente fatos sobre a empresa.** Tudo marcado com `[CONFIRMAR]` é placeholder: deixe-o como comentário `<!-- CONFIRMAR: ... -->` no código e liste-o no relatório final. Para o visitante, o site nunca pode mostrar um placeholder quebrado. Se o dado não existir, o bloco simplesmente não aparece.
4. Ao terminar, entregue o relatório da seção 12.

---

## 1. Dados da empresa

### 1.1 Dados confirmados

Fontes: perfil do **WhatsApp Business** e **Instagram** da empresa (capturas de 26/10/2026) e perfil público do **Google Maps**.

| Campo | Valor | Fonte |
|---|---|---|
| Nome | **Kando Garage** (razão de exibição no Maps: Kando Garage Mecânica Geral) | WhatsApp, Instagram, Maps |
| Slogan oficial | **"Seu carro em boas mãos"** | Instagram |
| Posicionamento oficial | **"Mecânica geral, preventiva e especializada"** | Instagram |
| Endereço | R. Mamud Rahd, 202, Tremembé, São Paulo/SP, CEP 02372-090 | Todas |
| Coordenadas | -23.4598259, -46.626002 | Maps |
| Google Place ID | `ChIJHbKvQwD3zpQRkr6CutbrQ5E` | Maps |
| WhatsApp / telefone | **+55 11 98836-7054** → `https://wa.me/5511988367054` | WhatsApp Business |
| E-mail | **kandogarage@gmail.com** | WhatsApp Business |
| Instagram | **@kando_garage**: https://www.instagram.com/kando_garage | Instagram |
| Categoria | Serviço automotivo / oficina mecânica | WhatsApp, Maps |
| Avaliação Google | **5,0 ★ com 68 avaliações** (atualizar antes do deploy) | Maps |
| Público de veículos | **Nacionais e importados** | WhatsApp Business |

**Horário de funcionamento** (fonte: WhatsApp Business, mantido pela própria empresa, **usar este**):

| Dia | Horário |
|---|---|
| Segunda a sexta | 08:00 às 18:00 |
| Sábado | 09:00 às 14:00 |
| Domingo | Fechado |

> ⚠️ **Divergência:** o Google Maps mostra seg–sex 8h30–19h. O site usa o horário do WhatsApp Business. Registre no relatório que o cliente deve **alinhar o Google Business Profile**, porque NAP e horário inconsistentes prejudicam o SEO local e a confiança.

**Serviços e diagnósticos oficiais** (texto da própria empresa no WhatsApp Business):
> "Trabalhamos com veículos nacionais e importados, onde atuamos com serviços e diagnósticos em: Injeção eletrônica · Motor · Câmbio · Suspensão · Freios · Air bag · Revisões periódicas conforme agenda do veículo."

Serviços adicionais **citados por clientes** nas avaliações do Google:
- Limpeza do sistema de arrefecimento do motor
- Correção de vazamento de combustível

### 1.2 O que os clientes dizem (padrões das avaliações públicas no Google)

Estes são os **diferenciais reais**, e toda a comunicação parte deles:

1. **Transparência:** "mostrou todas as peças que trocou", "tudo claro e explicado", "super paciente pra explicar e mostrar o problema".
2. **Honestidade e preço justo:** "muito honesto", "preço justo", "ótimo custo-benefício".
3. **Resolve o que outros não resolveram:** "levei meu carro em dois mecânicos e não resolveram meu problema [...] resolveu o problema".
4. **Atendimento pessoal:** o **Diego** é citado pelo nome, descrito como "profissional, transparente e atencioso".
5. **Educa o cliente:** "já tomei uma lição sobre isso também".
6. **Ambiente:** "tudo limpinho", "área de descanso super confortável e aconchegante com cafezinho".
7. **Prazo cumprido:** "dentro do prazo combinado".
8. **Chega por indicação:** inclusive de outros profissionais do setor automotivo.

### 1.3 Presença digital atual (diagnóstico)

- **Site:** não existe.
- **Instagram:** 7 posts, 247 seguidores. Visual real dos posts: peças desmontadas fotografadas de cima sobre fundo escuro (flat lay), veículos no elevador, oficina de paredes brancas com **colunas de elevador vermelhas**.
- **Link da bio do Instagram quebrado:** a bio aponta para `wa.me/988367054`, **sem o código do país (55) e sem o DDD (11)**. Esse link não abre a conversa correta, o que significa que **clientes vindos do Instagram hoje não conseguem chamar no WhatsApp pela bio**. Correção: `https://wa.me/5511988367054`, ou melhor, o link do site novo. Destacar no relatório como ganho imediato.

### 1.4 Ainda a confirmar com o cliente

- `[CONFIRMAR]` Arquivos originais do logo (SVG/PNG em alta) nas duas versões: emblema e wordmark (ver seção 4).
- `[CONFIRMAR]` Fotos originais em alta resolução (as do Instagram servem de referência de estilo; pedir os arquivos).
- `[CONFIRMAR]` CNPJ (para o rodapé).
- `[CONFIRMAR]` Ano de fundação e a história do nome "Kando".
- `[CONFIRMAR]` Nome completo e função do Diego, e quem mais compõe a equipe.
- `[CONFIRMAR]` Formas de pagamento, garantia dos serviços, se atende seguradoras e se o orçamento é cobrado.
- `[CONFIRMAR]` Se atende sem agendamento.
- `[CONFIRMAR]` Autorização para exibir trechos das avaliações do Google com o primeiro nome do autor.
- `[CONFIRMAR]` Domínio (sugestões: `kandogarage.com.br`, `kandogarage.com`).

---

## 2. Objetivo de negócio

**Problema:** a reputação da Kando Garage (5,0★, transparência, honestidade) só existe no Google Maps e no boca a boca. O Instagram é pequeno e o link de WhatsApp da bio está quebrado. Quem recebe uma indicação ou busca "oficina mecânica Tremembé" não encontra um lugar que confirme a confiança e facilite o contato.

**Objetivo do site:** transformar reputação em **conversas no WhatsApp**.

| KPI | Meta |
|---|---|
| Ação principal | Clique no WhatsApp |
| Ações secundárias | Como chegar · Ligar · Instagram |
| Busca local | "oficina mecânica Tremembé", "mecânico Zona Norte SP", "injeção eletrônica Tremembé", "mecânico de câmbio Zona Norte", "luz do airbag acesa" |
| CTA visível | Acima da dobra em 100% das telas, inclusive em 360 px |

**Promessa central** (une o slogan oficial com o diferencial comprovado):
> **Seu carro em boas mãos. E você vê cada peça que trocamos.**

---

## 3. Persona e contexto do nicho

**Quem procura uma oficina de bairro na Zona Norte de SP:**
- Motorista de 25 a 60 anos, carro nacional ou importado, muitas vezes fora da garantia de fábrica, mora ou trabalha a até 5 km.
- **Medo principal:** ser enganado com troca de peça desnecessária, orçamento inflado ou serviço que não resolve. É o maior bloqueio do setor.
- Chega **pelo celular**, muitas vezes com o carro já apresentando um sintoma: luz acesa no painel, barulho, câmbio estranho. Está ansioso, com pressa, e **não sabe o nome técnico do problema**.
- Decide por avaliações, indicação, proximidade e por quanto é fácil falar com alguém de verdade.
- Prefere o **WhatsApp** a qualquer formulário.

**Insight de experiência:** o cliente sabe o **sintoma**, não o **serviço**. Ele não pensa "preciso de injeção eletrônica", pensa "a luz da injeção acendeu" ou "o carro está falhando". O site precisa receber o cliente pelo sintoma e traduzir isso em conversa, que é exatamente o que os clientes elogiam na Kando: alguém que explica.

---

## 4. Direção criativa e identidade visual

### 4.1 A marca existente (fonte: logo no Instagram e no WhatsApp Business)

A Kando Garage já tem uma identidade forte. **Respeitar e elevar, nunca redesenhar o logo.**

- **Emblema:** um **escudo dividido ao meio**. A metade esquerda tem **três engrenagens**; a direita, **chave inglesa e chave de fenda cruzadas**. O escudo é grafite com contorno branco.
  - Versão Instagram: escudo grafite sobre fundo **laranja**.
  - Versão WhatsApp: escudo em **âmbar/dourado** com metade preta.
- **Wordmark:** "Kando" em **letra cursiva/brush itálica**, grande, em âmbar/mostarda. "Garage" vem menor, em cursiva, abaixo à direita. Tem um ar retrô de garagem americana, hot rod e oficina de tradição.
- **Leitura de marca:** proteção e confiança (o escudo), técnica e precisão (as engrenagens e ferramentas), paixão e tradição de garagem (o script retrô).

### 4.2 Conceito criativo: "O Brasão da Confiança"

O escudo do logo é a metáfora que já carrega a promessa: **seu carro protegido, em boas mãos**. O site inteiro é construído em volta dele.

- **Atmosfera:** oficina boa à noite. Fundo **grafite profundo**, luz quente **laranja/âmbar** como de luminária de bancada, metal e texturas sutis. Premium, mas de bairro. Nada de "concessionária fria" nem de "oficina amadora".
- **Assinatura visual:** o escudo aparece como motivo recorrente. Ícones de serviço dentro de mini-escudos, selos de confiança em formato de escudo e o divisor central (a linha que separa as duas metades do escudo) usado como elemento gráfico entre seções.
- **Dualidade do escudo → dualidade do conteúdo:** metade "engrenagens" (diagnóstico, técnica) e metade "ferramentas" (mão na massa, serviço). Use essa divisão no layout do bloco "Como trabalhamos": diagnóstico à esquerda, execução à direita.
- **Mote fotográfico:** o estilo que já existe no Instagram, com peças desmontadas fotografadas de cima sobre fundo escuro (flat lay). Ele vira o padrão de imagem do site e reforça visualmente "peça trocada, peça mostrada".

### 4.3 Paleta (derivada do logo)

> Valores **aproximados**, amostrados de capturas de tela. O subagente de design deve **conferir com os arquivos originais do logo** `[CONFIRMAR]` e ajustar os hex.

```css
:root {
  /* Base: grafite do escudo */
  --kg-graphite-950: #141516;   /* fundo principal dark */
  --kg-graphite-900: #1D1E20;
  --kg-graphite-800: #2A2B2E;   /* superfícies/cards */
  --kg-graphite-700: #3A3B3E;   /* grafite do escudo */
  --kg-steel-400:    #9A9DA3;   /* texto secundário sobre escuro */

  /* Acentos: cores do logo */
  --kg-orange-500:   #E2683A;   /* laranja do fundo do emblema (Instagram) */
  --kg-orange-600:   #C9542A;   /* hover / texto laranja sobre claro */
  --kg-amber-400:    #E0A33A;   /* âmbar do wordmark "Kando" (WhatsApp) */
  --kg-amber-500:    #CC8E28;

  /* Neutros claros: contorno branco do escudo */
  --kg-white:        #FFFFFF;
  --kg-paper:        #F4F2EE;   /* seções claras */
  --kg-ink:          #17181A;   /* texto sobre claro */

  /* Funcionais */
  --kg-whatsapp:     #25D366;
  --kg-open:         #3DBE6E;   /* "Aberto agora" */
  --kg-closed:       #E5484D;   /* "Fechado agora" (vermelho das colunas do elevador) */

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
}
```

**Regras de uso:**
- **Dark como padrão** (hero, serviços, CTA final, rodapé), alternado com **seções claras** (`--kg-paper`) para avaliações, perguntas frequentes e localização. Isso dá ritmo e descanso visual em textos longos.
- **Laranja = ação** (CTAs, links, foco). **Âmbar = marca e ênfase** (wordmark, números de destaque, a nota 5,0). Nunca usar os dois lado a lado no mesmo componente.
- O CTA de WhatsApp usa **laranja da marca** com ícone do WhatsApp. O verde do WhatsApp fica só no ícone e no botão flutuante, para não brigar com a identidade.
- Validar contraste WCAG AA em todos os pares. Laranja `#E2683A` sobre grafite passa para texto grande. Para texto pequeno em laranja sobre claro, usar `--kg-orange-600`. Documentar as razões de contraste.
- Respeitar `prefers-color-scheme: light`, oferecendo uma versão clara coerente (fundo paper, superfícies brancas, acentos iguais), mas a **experiência principal é dark**, como a própria marca.

### 4.4 Tipografia
- **Wordmark:** usar **somente a imagem/SVG do logo**. Não tentar reproduzir a cursiva com fonte.
- **Títulos:** sans condensada e robusta, com cara de oficina e placa: **Barlow Condensed** (600/700) ou **Oswald**. Caixa alta só em eyebrows e rótulos curtos.
- **Texto:** **Inter** (400/500/600), com ótima legibilidade em telas pequenas.
- Fontes self-hosted em `woff2`, subset latin, `font-display: swap`. Máximo de 2 famílias e 5 pesos no total.
- Escala fluida com `clamp()`. H1 mobile ≈ 36–40 px; desktop ≈ 64–72 px.

### 4.5 Iconografia, texturas e movimento
- **Ícones:** linha (Lucide), traço 1.75 px, brancos ou âmbar, dentro de **mini-escudos** com contorno, ecoando o emblema. Ícones necessários: injeção (chip/raio), motor, câmbio (alavanca/engrenagem), suspensão (mola), freios (disco), airbag, revisão (checklist/calendário), arrefecimento (termômetro/gota), combustível (bomba).
- **Textura:** ruído/grão bem sutil (≤ 4% de opacidade) no fundo grafite e, opcionalmente, um padrão de **chapa de piso diamantado** (diamond plate) em SVG, quase invisível, só no hero e no rodapé. Gerado em SVG/CSS, nunca como imagem pesada.
- **Movimento:** com propósito e discreto.
  - As engrenagens do emblema do hero giram lentamente (1 volta a cada ~20 s) **só uma vez ao carregar e ao passar o mouse**, e ficam paradas com `prefers-reduced-motion`.
  - Seções entram com fade + leve translate (≤ 12 px) via `IntersectionObserver`.
  - A nota "5,0" faz uma contagem rápida de 0,0 a 5,0 ao entrar na tela (sem reduced motion).
  - Proibido: parallax pesado, carrosséis automáticos, animação em loop chamando atenção.

### 4.6 Fotografia
- **Estilo 1, flat lay de peças:** peças sobre fundo escuro, luz lateral quente. Usar em serviços e em "peça trocada, peça mostrada".
- **Estilo 2, oficina real:** carros no elevador, colunas vermelhas, paredes brancas, ambiente limpo.
- **Estilo 3, pessoas:** Diego/equipe explicando ao cliente, mãos com ferramenta. `[CONFIRMAR fotos]`
- Tratamento unificado: leve gradação quente nas sombras e um overlay grafite de 30–50% quando houver texto por cima.
- **Nunca** usar banco de imagens de "mecânico sorrindo de joinha". Enquanto não houver foto real, use composições gráficas com o emblema e as texturas. Isso é melhor do que foto genérica.

### 4.7 Tom de voz
- Direto, honesto e próximo, como o mecânico de confiança que explica com calma.
- Frases curtas, segunda pessoa ("seu carro"), verbos de ação.
- Traduzir o técnico: "Injeção eletrônica: quando o carro falha, perde força ou acende a luz no painel."
- Proibido: superlativos sem prova ("o melhor", "nº 1", "líder"), promessas absolutas ("garantia total", "resolvemos qualquer coisa").

---

## 5. Experiência: princípios e momentos-chave

### 5.1 Princípios
1. **Confiança antes de tudo:** a nota 5,0 e o "você vê cada peça" aparecem nos primeiros 2 segundos.
2. **Do sintoma à conversa em 2 toques:** o cliente escolhe o que está sentindo e cai no WhatsApp com a mensagem pronta.
3. **Sempre a um toque:** WhatsApp, ligar e como chegar estão disponíveis em qualquer ponto da página.
4. **Saber se está aberto, sem perguntar:** o status em tempo real evita ligação perdida.
5. **Sem atrito:** nenhum formulário, cadastro, pop-up ou banner de cookies (não há cookies).

### 5.2 Momentos-chave da experiência

**A. Barra de ação fixa (mobile, sempre visível na base da tela)**
`[WhatsApp]` `[Ligar]` `[Como chegar]`, com alvos de toque de pelo menos 48 px e ícones com rótulo. Ela some suavemente quando o rodapé (que tem os mesmos botões) entra na tela, para não duplicar.

**B. Status "Aberto agora"**
Badge no hero, no header e na seção de localização:
- `● Aberto agora · fecha às 18h` (verde)
- `● Fecha em 45 min` (âmbar, na última hora)
- `● Fechado · abre amanhã às 8h` / `abre segunda às 8h` (vermelho)

Calculado no navegador com `Intl.DateTimeFormat` no fuso `America/Sao_Paulo`, a partir de uma única fonte de dados de horário em `site.ts`. Sem API externa. Considerar feriados nacionais como "consulte pelo WhatsApp" `[CONFIRMAR se abre em feriados]`.

**C. Seletor de sintomas: "O que seu carro está fazendo?"** ⭐ *(diferencial de experiência)*
Uma grade de "chips" grandes e tocáveis, em linguagem de motorista. Cada chip abre o WhatsApp com a mensagem já escrita. **Não coleta nenhum dado**: é só um link `wa.me` com `?text=`.

| Chip (o que o cliente vê) | Serviço relacionado | Mensagem pré-preenchida |
|---|---|---|
| Luz da injeção acesa / carro falhando | Injeção eletrônica | "Olá! Vim pelo site. A luz da injeção acendeu / o carro está falhando. Podem avaliar?" |
| Perdeu força, fumaça ou barulho no motor | Motor | "Olá! Vim pelo site. Meu carro está com problema no motor (perda de força/barulho/fumaça). Podem avaliar?" |
| Marcha arranhando, câmbio pesado ou trancos | Câmbio | "Olá! Vim pelo site. Estou com problema no câmbio (marcha arranhando/tranco). Podem avaliar?" |
| Barulho em buraco, carro "batendo" | Suspensão | "Olá! Vim pelo site. Meu carro está com barulho na suspensão. Podem avaliar?" |
| Freio chiando, pedal mole ou carro puxando | Freios | "Olá! Vim pelo site. Estou com problema no freio. Podem avaliar?" |
| Luz do airbag acesa | Air bag | "Olá! Vim pelo site. A luz do airbag está acesa no painel. Podem avaliar?" |
| Temperatura subindo / vazando água | Arrefecimento | "Olá! Vim pelo site. A temperatura do carro está subindo / vazando água. Podem avaliar?" |
| Cheiro ou vazamento de combustível | Combustível | "Olá! Vim pelo site. Estou sentindo cheiro / vendo vazamento de combustível. Podem avaliar?" |
| Hora da revisão | Revisão periódica | "Olá! Vim pelo site. Quero agendar a revisão do meu carro. Modelo/ano/km: " |
| Outro problema | Geral | "Olá! Vim pelo site. Meu carro está com o seguinte problema: " |

- Todas as mensagens devem ser URL-encoded.
- Microcopy abaixo da grade: "Não sabe explicar? Tudo bem. Manda um áudio ou um vídeo do barulho no WhatsApp que a gente te ajuda."
- O chip "Cheiro de combustível" leva um aviso de segurança: "Se o cheiro for forte, não dê partida. Fale com a gente."

**D. "Peça trocada, peça mostrada"**
Bloco de destaque com uma foto flat lay de peças, ou uma composição gráfica enquanto não houver foto, e o selo-escudo com o texto. É o momento emocional do site: transforma o elogio mais repetido nas avaliações em promessa de marca.

**E. Revisão "conforme agenda do veículo"**
Um bloco educativo e curto (sem calculadora e sem coletar dados): "Seu manual tem uma agenda de revisões por km ou tempo. A gente segue a agenda do seu carro, sem empurrar serviço que ele ainda não precisa." CTA: "Agendar minha revisão".

---

## 6. Arquitetura e conteúdo completo do site

One-page com âncoras, mais as páginas `/politica-de-privacidade` e `404`.

> O subagente de conteúdo usa estes textos como **base final**, ajustando só para caber no layout.

### 6.1 Header (sticky; fica compacto e com fundo grafite translúcido + blur ao rolar)
- Logo horizontal (emblema + wordmark), com link para o topo.
- Menu: Serviços · Como trabalhamos · Avaliações · Onde estamos
- Badge de status (compacto).
- CTA: **Chamar no WhatsApp**
- Mobile: logo + badge + botão de menu acessível (`aria-expanded`, foco preso no menu aberto, `Esc` fecha).

### 6.2 Hero (`#inicio`), fundo grafite com textura e luz quente
- **Eyebrow:** MECÂNICA GERAL, PREVENTIVA E ESPECIALIZADA · TREMEMBÉ, ZONA NORTE DE SP
- **H1:** Seu carro em boas mãos.
- **Subtítulo:** Diagnóstico explicado, orçamento antes do serviço e cada peça trocada mostrada a você. Nacionais e importados.
- **Prova:** ★★★★★ **5,0** no Google · 68 avaliações (link para as avaliações no Maps)
- **CTA primário:** Chamar no WhatsApp → `https://wa.me/5511988367054?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20falar%20sobre%20meu%20carro.`
- **CTA secundário:** O que meu carro tem? (âncora para o seletor de sintomas)
- **Status:** ● Aberto agora · Seg–Sex 8h–18h · Sáb 9h–14h
- **Visual:** emblema do escudo grande à direita no desktop (atrás do texto e esmaecido no mobile), com as engrenagens animadas conforme a seção 4.5. Alternativa: foto real da oficina com overlay `[CONFIRMAR]`. Usar `fetchpriority="high"` no elemento LCP.

### 6.3 Faixa de confiança (logo abaixo do hero)
Quatro itens em linha (2×2 no mobile), cada um com ícone em mini-escudo:
- **5,0 ★ no Google:** 68 avaliações
- **Peça trocada, peça mostrada:** você vê tudo
- **Orçamento antes de mexer:** só fazemos o que você aprovar
- **Nacionais e importados:** diagnóstico com equipamento

### 6.4 Seletor de sintomas (`#sintomas`)
- **H2:** O que seu carro está fazendo?
- **Subtítulo:** Toque no sintoma e fale direto com a gente no WhatsApp. A mensagem já vai pronta.
- Grade de chips (conteúdo na seção 5.2-C).
- Microcopy do áudio/vídeo.

### 6.5 Serviços (`#servicos`)
- **H2:** Mecânica geral, preventiva e especializada
- **Intro:** Trabalhamos com veículos nacionais e importados, com serviço e diagnóstico em todas estas áreas:

Cards com mini-escudo, título, descrição e link "Falar sobre isso →" para o WhatsApp com a mensagem do serviço:

| Serviço | Descrição |
|---|---|
| **Injeção eletrônica** | Diagnóstico com scanner para falhas, perda de potência, consumo alto e luz da injeção acesa. |
| **Motor** | Ruídos, vazamentos, superaquecimento, correias e manutenção completa do motor. |
| **Câmbio** | Marchas arranhando, trancos, câmbio pesado ou ruidoso. Diagnóstico e reparo. |
| **Suspensão** | Amortecedores, molas, buchas e terminais. Fim do barulho e mais estabilidade. |
| **Freios** | Pastilhas, discos, fluido e diagnóstico de ruídos e pedal mole. Segurança em primeiro lugar. |
| **Air bag** | Diagnóstico da luz do airbag acesa e do sistema de segurança do veículo. |
| **Revisões periódicas** | Seguimos a agenda de revisão do seu veículo, sem empurrar serviço desnecessário. |
| **Arrefecimento** | Limpeza do sistema, radiador, mangueiras e controle de temperatura. |
| **Sistema de combustível** | Diagnóstico e correção de vazamentos e falhas na alimentação. |

Os sete primeiros são **oficiais** (WhatsApp Business). Os dois últimos foram **citados por clientes**.

- Rodapé da seção: **Não achou o seu problema?** Descreva no WhatsApp, ou mande um áudio, que a gente explica.

### 6.6 Como trabalhamos (`#como-trabalhamos`), layout "escudo dividido"
- **H2:** Transparência do diagnóstico à entrega
- **Intro:** É assim com qualquer carro que entra aqui.

Layout em duas metades separadas por uma linha vertical (o divisor do escudo). À esquerda, o ícone de engrenagens com o título "Diagnóstico". À direita, o ícone de ferramentas com o título "Serviço". No mobile, empilha.

**Metade Diagnóstico (engrenagens)**
1. **Avaliamos e explicamos:** Mostramos o problema para você, de preferência com o carro na sua frente.
2. **Orçamento antes de mexer:** Você recebe o orçamento detalhado e só fazemos o que aprovar.

**Metade Serviço (ferramentas)**
3. **Serviço no prazo combinado:** Executamos o serviço e mantemos você informado pelo WhatsApp.
4. **Peça trocada, peça mostrada:** Na entrega, você vê as peças substituídas e entende o que foi feito.

**Bloco de destaque "Peça trocada, peça mostrada"** (seção 5.2-D), com um trecho real de avaliação `[CONFIRMAR autorização]`:
> "Levei meu carro em dois mecânicos e não resolveram meu problema. [...] Resolveu o problema, muito honesto, mostrou todas as peças que trocou."
> *— Cliente, avaliação no Google*

### 6.7 Diferenciais (`#diferenciais`)
- **H2:** Por que os clientes voltam e indicam
- **Honestidade comprovada:** 5,0 no Google em 68 avaliações.
- **Preço justo:** Orçamento claro, sem troca desnecessária.
- **A gente explica:** Você entende o que acontece com o seu carro, sem "mecaniquês".
- **Ambiente limpo e confortável:** Área de descanso com cafezinho enquanto você espera.
- **Atendimento direto:** Você fala com quem cuida do seu carro, inclusive o Diego `[CONFIRMAR nome/função]`.

### 6.8 Avaliações (`#avaliacoes`), seção clara (paper)
- **H2:** Quem já deixou o carro em boas mãos
- **Selo grande:** **5,0** ★★★★★ · 68 avaliações no Google (o número em âmbar, com a contagem animada)
- Grid de 3 a 5 cards (no mobile, rolagem horizontal com scroll-snap e botões anterior/próximo acessíveis). Trechos **literais e curtos**, com primeiro nome e "Avaliação no Google", **após autorização** `[CONFIRMAR]`:
  1. "A manutenção foi clara e honesta, mostrou todas as peças que trocou, tudo claro e explicado. [...] Pessoal educado, rápido na solução dos problemas e tudo limpinho!"
  2. "O Diego foi extremamente profissional, transparente e atencioso. Explicou cada etapa do serviço de forma clara, sem pressa e com total honestidade."
  3. "Levei meu carro em dois mecânicos e não resolveram meu problema. [...] Muito honesto, mostrou todas as peças que trocou, preço justo."
  4. "Super paciente pra explicar e mostrar o problema [...]. Tem uma área de descanso super confortável e aconchegante com cafezinho."
  5. "Resolveu o problema de vazamento de combustível após o abastecimento. Não conhecia a oficina, e agora já tenho onde deixar meu carro."
- Links: **Ver todas no Google** · **Já é cliente? Avalie a gente** → `https://search.google.com/local/writereview?placeid=ChIJHbKvQwD3zpQRkr6CutbrQ5E`

> **Não** usar marcação `Review`/`AggregateRating` do schema.org para avaliações de terceiros exibidas no próprio site (o Google trata isso como autoavaliação). Apenas exibir, com link para a fonte.

### 6.9 Por dentro da oficina (`#oficina`), mostrado só quando houver fotos
- **H2:** Por dentro da garagem
- Galeria em grade assimétrica (masonry leve, só com CSS) com 6 a 9 fotos: flat lay de peças, carros no elevador, ambiente e sala de espera `[CONFIRMAR fotos]`.
- Lightbox acessível (foco preso, `Esc`, setas, legenda).
- CTA: **Acompanhe no Instagram @kando_garage**.
- Sem fotos reais, a seção **não é renderizada**.

### 6.10 Perguntas frequentes (`#duvidas`), seção clara, com `<details>/<summary>` nativo
- **Vocês atendem carros importados?** Sim. Trabalhamos com veículos nacionais e importados.
- **Vocês mostram as peças trocadas?** Sim. Todas as peças substituídas são mostradas na entrega.
- **Preciso agendar?** Recomendamos chamar no WhatsApp antes para garantir o melhor horário. `[CONFIRMAR se atende sem agendamento]`
- **A luz do airbag acendeu. É perigoso?** Pode indicar que o airbag não vai funcionar em caso de batida. Vale fazer o diagnóstico o quanto antes.
- **Como funciona a revisão?** Seguimos a agenda de revisão indicada para o seu veículo, por quilometragem ou tempo, sem incluir serviço que ele ainda não precisa.
- **Quanto tempo leva o serviço?** Depende do diagnóstico. O prazo vem junto com o orçamento e você é avisado pelo WhatsApp.
- **O orçamento é cobrado?** `[CONFIRMAR]`
- **Quais formas de pagamento aceitam?** `[CONFIRMAR]`
- **Os serviços têm garantia?** `[CONFIRMAR prazo]`

Perguntas com resposta `[CONFIRMAR]` **não são renderizadas** até haver resposta.

### 6.11 Onde estamos (`#onde-estamos`)
- **H2:** Venha nos visitar no Tremembé
- **Endereço:** R. Mamud Rahd, 202, Tremembé, São Paulo/SP, 02372-090 (clicável)
- **Horário:** tabela semântica com o **dia atual destacado** e o badge de status ao lado:
  - Segunda a sexta: 08:00 às 18:00
  - Sábado: 09:00 às 14:00
  - Domingo: Fechado
- **Mapa:** imagem estática estilizada em tons de grafite, com o pin em escudo laranja, e botão **Abrir no Google Maps** → `https://www.google.com/maps/search/?api=1&query=Kando+Garage&query_place_id=ChIJHbKvQwD3zpQRkr6CutbrQ5E`. Se usar iframe, carregar **só após clique** (facade).
- **Atendemos toda a Zona Norte:** Tremembé, Jardim Tremembé, Tucuruvi, Mandaqui, Jaçanã, Vila Irmãos Arnoni, Horto Florestal e região.
- Botões: WhatsApp · Ligar (`tel:+5511988367054`) · Como chegar · E-mail (`mailto:kandogarage@gmail.com`)

### 6.12 CTA final, fundo grafite com o emblema grande esmaecido
- **H2:** Seu carro está dando sinal?
- **Texto:** Fale com quem explica antes de mexer.
- Botão grande: **Chamar no WhatsApp agora**
- Linha de status abaixo do botão.

### 6.13 Rodapé
- Logo, slogan "Seu carro em boas mãos".
- Endereço, WhatsApp, e-mail, horário resumido.
- Instagram (@kando_garage).
- CNPJ `[CONFIRMAR]` (exibir só se confirmado).
- Links: Política de privacidade.
- "© {ano dinâmico} Kando Garage · Site por Toss Lab"

### 6.14 `/politica-de-privacidade`
Texto curto e honesto:
- O site não coleta dados pessoais, não tem formulários e não usa cookies de rastreamento.
- Os botões levam a serviços de terceiros (WhatsApp, Google Maps, Instagram, e-mail), regidos pelas políticas deles.
- Se houver analytics sem cookies, dizer qual e que não identifica pessoas.
- Contato: kandogarage@gmail.com.

### 6.15 `404`
- Emblema com uma engrenagem "solta" (ilustração SVG).
- **H1:** Essa página foi pro elevador.
- **Texto:** A gente não encontrou o que você procurava, mas seu carro continua em boas mãos.
- Botões: Voltar ao início · Chamar no WhatsApp

---

## 7. SEO local e marketing

### 7.1 On-page
- `<title>`: **Kando Garage | Oficina Mecânica no Tremembé, Zona Norte SP**
- `meta description`: **Mecânica geral, preventiva e especializada para nacionais e importados no Tremembé. Nota 5,0 no Google. Injeção, motor, câmbio, freios e airbag. Chame no WhatsApp.**
- Um único `H1` e hierarquia H2/H3 coerente.
- Palavras-chave em uso natural: *oficina mecânica Tremembé*, *mecânico Zona Norte SP*, *injeção eletrônica Tremembé*, *mecânico de câmbio Zona Norte*, *luz do airbag acesa*, *revisão de carro Tucuruvi*, *mecânico carro importado Zona Norte*.
- `lang="pt-BR"`, `canonical`, `robots.txt`, `sitemap.xml`.
- **Imagem Open Graph** 1200×630: fundo grafite, emblema, "Seu carro em boas mãos" e "★ 5,0 no Google". Gerada como asset estático. É a imagem que aparece quando o link é compartilhado no WhatsApp, então precisa ficar bonita.
- Favicon em SVG (o emblema), `apple-touch-icon` 180 px, `manifest.webmanifest` com `theme_color: #141516`.

### 7.2 Dados estruturados (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "Kando Garage",
  "alternateName": "Kando Garage Mecânica Geral",
  "slogan": "Seu carro em boas mãos",
  "description": "Mecânica geral, preventiva e especializada para veículos nacionais e importados no Tremembé, Zona Norte de São Paulo.",
  "url": "https://[DOMINIO]",
  "logo": "https://[DOMINIO]/logo.png",
  "image": "https://[DOMINIO]/og.jpg",
  "telephone": "+55-11-98836-7054",
  "email": "kandogarage@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "R. Mamud Rahd, 202",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "postalCode": "02372-090",
    "addressCountry": "BR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": -23.4598259, "longitude": -46.626002 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "14:00" }
  ],
  "areaServed": ["Tremembé", "Tucuruvi", "Mandaqui", "Jaçanã", "Horto Florestal", "Zona Norte de São Paulo"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços",
    "itemListElement": [
      "Injeção eletrônica", "Motor", "Câmbio", "Suspensão", "Freios", "Air bag",
      "Revisões periódicas", "Sistema de arrefecimento", "Sistema de combustível"
    ]
  },
  "sameAs": [
    "https://www.instagram.com/kando_garage",
    "https://www.google.com/maps/place/?q=place_id:ChIJHbKvQwD3zpQRkr6CutbrQ5E"
  ]
}
```
- Em `hasOfferCatalog.itemListElement`, transformar cada item em `{ "@type": "Offer", "itemOffered": { "@type": "Service", "name": "..." } }` (a lista acima foi simplificada para leitura).
- Adicionar `FAQPage` **apenas** com as perguntas renderizadas (respostas confirmadas).
- Validar no Rich Results Test e no Schema Markup Validator.

### 7.3 Ações de marketing fora do site (vão no relatório para o cliente)
1. **Corrigir já o link da bio do Instagram** (`wa.me/988367054` está quebrado). Trocar pelo link do site, ou por `https://wa.me/5511988367054` até o site ir ao ar.
2. **Alinhar o horário do Google Business Profile** com o do WhatsApp (8h–18h) e adicionar o link do site no perfil.
3. Manter **NAP idêntico** (nome, endereço, telefone) no site, Maps, Instagram e WhatsApp.
4. **QR code no balcão:** "Gostou? Avalie a gente no Google" (link de avaliação).
5. **Conteúdo para o Instagram**, alimentando a promessa: série "Peça trocada, peça mostrada" (flat lay da peça velha ao lado da nova + explicação curta) e série "Sintoma da semana" (ex.: "Luz do airbag acesa: o que significa?"), sempre com CTA para o site.
6. Links com UTM: `?utm_source=instagram&utm_medium=bio`, `?utm_source=google&utm_medium=gbp`, `?utm_source=whatsapp&utm_medium=catalogo`.

### 7.4 Medição (sem coletar dado pessoal)
- Analytics **cookieless** (Vercel Web Analytics, Plausible ou Umami), ou nenhum, se o cliente preferir.
- Eventos: `click_whatsapp` (propriedade: `origem` = hero/sintoma/serviço/cta_final/barra e `item` = sintoma ou serviço), `click_call`, `click_directions`, `click_instagram`, `click_email`.
- **Não** usar Google Analytics nem Meta Pixel. Eles exigiriam banner de cookies e contrariam a proposta de "sem coleta de dados".

---

## 8. Performance

### 8.1 Stack
- **Astro** (saída 100% estática, zero JS por padrão) + **Tailwind CSS** com os tokens da seção 4.3 mapeados no `tailwind.config`.
- JS mínimo, em vanilla ou ilhas pequenas: menu mobile, status de horário, animação de entrada, contagem da nota, lightbox, rolagem de avaliações.
- Logo e emblema como **SVG inline**, com as engrenagens como grupos separados para animar via CSS `transform`. Se o cliente só tiver PNG, vetorizar com fidelidade e marcar para aprovação `[CONFIRMAR]`.
- Imagens via `astro:assets`: **AVIF/WebP**, `srcset`, `width`/`height` explícitos, `loading="lazy"` fora da dobra, `decoding="async"`.
- Fontes self-hosted com `preload` apenas da fonte do H1.
- Deploy: **Vercel** ou **Netlify** (estático + CDN + HTTPS).

### 8.2 Metas obrigatórias (Lighthouse mobile, navegação anônima)

| Métrica | Meta |
|---|---|
| Performance | ≥ 95 |
| Acessibilidade | 100 |
| Boas práticas | 100 |
| SEO | 100 |
| LCP | < 2,0 s |
| CLS | < 0,05 |
| INP | < 200 ms |
| Peso da home (sem galeria) | < 500 KB |
| JS total | < 30 KB gzip |

### 8.3 Regras
- Nenhum script de terceiros bloqueando a renderização.
- Sem jQuery, sem bibliotecas de carrossel ou animação (GSAP, Swiper etc.). CSS + `IntersectionObserver` bastam.
- Texturas em SVG/CSS, nunca em PNG grande.
- Iframe do Maps só após interação.

---

## 9. Segurança e privacidade

### 9.1 Headers HTTP (`vercel.json` ou `_headers` do Netlify)
```
Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; frame-src https://www.google.com; connect-src 'self'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
Cross-Origin-Opener-Policy: same-origin
X-Frame-Options: DENY
```
- Se o analytics escolhido exigir domínio externo, adicionar **apenas** esse domínio em `script-src`/`connect-src` e documentar.
- Mapa estático gerado uma vez e **commitado como asset**, sem chave de API no front-end.

### 9.2 Outras regras
- Links externos com `rel="noopener noreferrer"`.
- Nenhum segredo, token ou chave no repositório. `.gitignore` com `node_modules`, `.env*` e `dist`.
- `npm audit` sem vulnerabilidades altas ou críticas; lockfile versionado.
- `/.well-known/security.txt` com o contato da Toss Lab.
- **LGPD:** o site não trata dados pessoais. O e-mail e o telefone exibidos são de contato comercial da própria empresa.
- E-mail exibido de forma legível, mas montado via `mailto:` sem expor em texto plano no HTML de forma fácil para bots (ex.: montar o `href` com JS simples e manter um fallback acessível). Documentar a escolha.
- Meta: nota **A** ou superior em securityheaders.com e no Mozilla Observatory.

---

## 10. Subagentes especializados

Crie cada arquivo em `.claude/agents/`. Cada subagente trabalha só no seu escopo e devolve um resumo do que fez e do que ficou pendente.

### 10.1 `creative-director.md`
```markdown
---
name: creative-director
description: Direção criativa e de experiência da Kando Garage. Traduz a marca existente (escudo, engrenagens, ferramentas, wordmark cursivo, grafite/laranja/âmbar) em um design system e em momentos de experiência memoráveis. Use antes de qualquer código de interface.
tools: Read, Write, Edit, Glob
---
Você é diretor criativo e especialista em experiência para marcas locais de serviço automotivo.
Entradas: seções 1, 3, 4 e 5 de PROMPT_KANDO_GARAGE.md e os arquivos em /brand.
Entregas:
1. docs/design-system.md: tokens finais (confira os hex com os arquivos originais do logo; os da seção 4.3 são aproximados), tipografia com escala fluida, espaçamentos, raios, sombras e texturas (grão, diamond plate em SVG), mini-escudo para ícones, estados (hover, focus-visible, active) e as especificações de movimento com fallback para reduced-motion.
2. docs/wireframes.md: wireframe textual de cada seção em 360 px e 1280 px, com ritmo dark/claro, posição dos CTAs e o layout "escudo dividido" do "Como trabalhamos".
3. docs/brand-assets.md: lista dos SVGs a produzir (emblema com engrenagens em grupos animáveis, favicon, pin do mapa em escudo, ilustração 404, OG image) e as regras de uso do logo (área de respiro, tamanho mínimo, fundos permitidos).
4. Tabela de contraste de todos os pares de cor usados.
Regras: respeitar o logo existente, nunca redesenhá-lo. Laranja = ação, âmbar = marca. A experiência deve parecer premium e de confiança, nunca genérica de template.
```

### 10.2 `copywriter-local-seo.md`
```markdown
---
name: copywriter-local-seo
description: Finaliza todos os textos, microcopy, mensagens de WhatsApp, metadados, JSON-LD e conteúdo de SEO local da Kando Garage.
tools: Read, Write, Edit
---
Você é copywriter de conversão e especialista em SEO local para pequenos negócios no Brasil.
Entradas: seções 1, 3, 4.7, 5, 6 e 7 de PROMPT_KANDO_GARAGE.md.
Entregas:
1. src/content/site.ts: TODO o conteúdo centralizado e tipado (empresa, horário como fonte única de dados, serviços, sintomas com mensagens URL-encoded, passos, diferenciais, avaliações, FAQ, rodapé, metadados). Itens CONFIRMAR ficam com `confirmed: false` para o frontend esconder.
2. JSON-LD AutoRepair + FAQPage (só com respostas confirmadas).
3. docs/pendencias.md com todos os CONFIRMAR, agrupados em "pedir ao cliente".
Regras: nunca inventar fatos, números, anos ou serviços. Use apenas a seção 1. Slogan oficial: "Seu carro em boas mãos". Trechos de avaliações literais e curtos. Tom: direto, honesto, que explica sem "mecaniquês". Português do Brasil revisado.
```

### 10.3 `frontend-builder.md`
```markdown
---
name: frontend-builder
description: Implementa o site em Astro + Tailwind a partir do design system, dos wireframes e do conteúdo centralizado.
tools: Read, Write, Edit, Bash, Glob, Grep
---
Você é engenheiro frontend sênior focado em sites estáticos de altíssima performance e em microinterações acessíveis.
Entradas: docs/design-system.md, docs/wireframes.md, docs/brand-assets.md, src/content/site.ts e as seções 5, 6 e 8.
Entregas: projeto Astro completo, com componentes reutilizáveis (Header, Hero, TrustBar, SymptomPicker, ServiceCard, SplitShieldSteps, ReviewCard, Gallery, FAQ, Location, StatusBadge, StickyActionBar, CtaFinal, Footer), páginas index, politica-de-privacidade e 404.
Requisitos: status "aberto agora" em vanilla JS no fuso America/Sao_Paulo a partir de site.ts; barra de ação fixa no mobile que se oculta ao chegar no rodapé; emblema SVG com engrenagens animáveis; entrada das seções com IntersectionObserver; contagem da nota; facade do mapa; tracking opcional atrás de uma flag; itens `confirmed: false` não renderizados.
Regras: HTML semântico; nenhum formulário ou input; nenhum texto fora de site.ts; JS < 30 KB gzip; todas as animações respeitam prefers-reduced-motion. `npm run build` deve passar sem erros nem warnings.
```

### 10.4 `perf-a11y-auditor.md`
```markdown
---
name: perf-a11y-auditor
description: Audita e corrige performance (Core Web Vitals) e acessibilidade (WCAG 2.1 AA) do build da Kando Garage.
tools: Read, Edit, Bash, Grep
---
Você é especialista em web performance e acessibilidade.
Tarefas:
1. Lighthouse CI (mobile) no build e comparação com as metas da seção 8.2.
2. axe-core/pa11y em todas as páginas.
3. Checagem manual: ordem e visibilidade do foco, alvos ≥ 48 px, alt text, rótulos de botões de ícone, landmarks, contraste (atenção ao laranja/âmbar sobre grafite e sobre paper), reduced-motion, zoom até 200%, leitor de tela no seletor de sintomas e no carrossel de avaliações.
4. Corrigir o que for de baixo risco; o resto vai documentado com evidência.
Entrega: docs/auditoria.md com tabela antes/depois.
```

### 10.5 `security-deploy.md`
```markdown
---
name: security-deploy
description: Configura headers de segurança, privacidade, SEO técnico e o deploy da Kando Garage.
tools: Read, Write, Edit, Bash
---
Você é engenheiro de segurança web e DevOps para sites estáticos.
Tarefas: aplicar os headers da seção 9.1; robots.txt, sitemap.xml, security.txt, canonical, manifest; npm audit; garantir zero segredos no repositório; preparar o deploy (Vercel ou Netlify) e um README com domínio, DNS e HTTPS.
NÃO publique em produção nem altere DNS sem aprovação explícita do usuário. Gere apenas um preview, se possível, e pare.
Entrega: docs/seguranca.md com cada header justificado.
```

### 10.6 `qa-reviewer.md` (revisor independente)
```markdown
---
name: qa-reviewer
description: Revisão final independente, como cliente da oficina e como auditor. Não participou da construção.
tools: Read, Bash, Grep, Glob
---
Você não construiu este site. Revise com olhar crítico e não corrija código: só reporte.
Checklist:
1. Fatos: endereço, WhatsApp (5511988367054), e-mail, horário (seg–sex 8–18, sáb 9–14), serviços e nota batem com a seção 1? Algum fato inventado?
2. Links: todos os wa.me (com mensagens corretas por sintoma/serviço), tel:, mailto:, Maps, Instagram e o link de avaliação funcionam?
3. Jornada "carro com problema": no celular, em até 2 toques a partir do topo, o cliente chega ao WhatsApp com a mensagem certa?
4. Status de horário: testar simulando segunda 7h59, 8h00, 17h30, 18h01, sábado 13h30, 14h01 e domingo.
5. Marca: o logo foi respeitado? Laranja = ação, âmbar = marca? Visual coerente com o Instagram?
6. Conteúdo: erros de português, tom incoerente, promessas sem prova, CONFIRMAR vazando para o usuário?
7. Metas das seções 8.2 e 9.2 atingidas?
Entrega: docs/qa.md com aprovado/reprovado por item e correções priorizadas.
```

---

## 11. Plano de execução

| Fase | Subagente | Entrada | Saída | Paralelo com |
|---|---|---|---|---|
| 1 | `creative-director` | Seções 1, 3, 4, 5 + /brand | design-system, wireframes, brand-assets | Fase 2 |
| 2 | `copywriter-local-seo` | Seções 1, 3–7 | site.ts, JSON-LD, pendencias | Fase 1 |
| 3 | `frontend-builder` | Saídas 1 e 2 | Projeto Astro com build ok | — |
| 4 | `perf-a11y-auditor` | Build | auditoria + correções | Fase 5 |
| 5 | `security-deploy` | Build | headers, SEO técnico, README, preview | Fase 4 |
| 6 | `qa-reviewer` | Tudo | qa.md | — |
| 7 | Orquestrador | qa.md | Correções (voltando às fases 3–5 se preciso) + relatório final | — |

**Estrutura de pastas:**
```
kando-garage/
├─ .claude/agents/          # 6 subagentes
├─ brand/                   # logo (emblema + wordmark), fotos originais (cliente)
├─ docs/                    # design-system, wireframes, brand-assets, pendencias, auditoria, seguranca, qa
├─ public/                  # favicon.svg, apple-touch-icon.png, og.jpg, robots.txt, manifest, .well-known/security.txt
├─ src/
│  ├─ assets/               # svgs (emblema, texturas, pin, 404), imagens
│  ├─ components/
│  ├─ content/site.ts
│  ├─ layouts/
│  ├─ pages/                # index.astro, politica-de-privacidade.astro, 404.astro
│  ├─ scripts/              # status-horario.ts, reveal.ts, counter.ts
│  └─ styles/tokens.css
├─ vercel.json | netlify.toml + _headers
└─ README.md
```

---

## 12. Critérios de aceite e relatório final

O trabalho só está pronto quando:

- [ ] `npm run build` passa sem erros nem warnings.
- [ ] Lighthouse mobile atinge as metas da seção 8.2 (números anexados).
- [ ] axe/pa11y sem violações sérias ou críticas.
- [ ] Headers com nota A ou superior (no preview).
- [ ] Nenhum formulário, input ou cookie de rastreamento.
- [ ] Todos os links de contato e todas as mensagens de WhatsApp testados.
- [ ] Status de horário correto em todos os cenários do QA.
- [ ] JSON-LD válido.
- [ ] Logo respeitado, paleta conferida com os arquivos originais.
- [ ] Nenhum fato inventado; todos os `[CONFIRMAR]` listados e nenhum visível para o usuário final.
- [ ] `qa-reviewer` aprovou todos os itens críticos.

**Relatório final ao usuário (curto):**
1. O que foi construído e o link do preview.
2. Métricas finais (Lighthouse e headers).
3. Pendências `[CONFIRMAR]` para pedir ao cliente.
4. Ganhos imediatos para apresentar ao cliente: link da bio do Instagram quebrado e horário divergente no Google.
5. Ações de marketing da seção 7.3.
6. Próximo passo: aprovação do cliente → deploy em produção com domínio próprio.
