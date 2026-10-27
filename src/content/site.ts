/**
 * Fonte única de conteúdo do site Kando Garage (TypeScript puro, sem Astro e sem React).
 * Nada de texto de interface fora deste arquivo.
 * Sem ícones: a numeração (`n`: '01', '02'…) faz o papel visual, no estilo de ordem de serviço.
 * Itens com `confirmed: false` dependem de confirmação do cliente e NÃO são renderizados.
 * Lista completa em docs/pendencias.md.
 */

export interface Confirmable {
  confirmed: boolean;
}

// ---------------------------------------------------------------- URL do site (Vite e Node)
const DEFAULT_SITE_URL = 'https://kandogarage.com.br';

/**
 * Lê a URL do site tanto no navegador/Vite (`import.meta.env.VITE_SITE_URL`)
 * quanto em Node (SSR/prerender de build, via `process.env.VITE_SITE_URL`).
 * Sem barra final. Nunca lança erro.
 */
export function getSiteUrl(): string {
  let value: string | undefined;
  try {
    // @ts-ignore: `import.meta.env` só existe sob Vite; em Node (tsx) fica undefined.
    value = import.meta.env?.VITE_SITE_URL;
  } catch {
    /* ignora */
  }
  if (!value) {
    try {
      value = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.VITE_SITE_URL;
    } catch {
      /* ignora */
    }
  }
  return (value || DEFAULT_SITE_URL).replace(/\/+$/, '');
}

// ---------------------------------------------------------------- empresa
export const company = {
  name: 'Kando Garage',
  legalDisplayName: 'Kando Garage Mecânica Geral',
  slogan: 'Seu carro em boas mãos',
  positioning: 'Mecânica geral, preventiva e especializada',
  promise: 'Seu carro em boas mãos. E você vê cada peça que trocamos.',
  address: {
    street: 'R. Mamud Rahd, 202',
    district: 'Tremembé',
    city: 'São Paulo',
    region: 'SP',
    zip: '02372-090',
  },
  geo: { lat: -23.4598259, lng: -46.626002 },
  placeId: 'ChIJHbKvQwD3zpQRkr6CutbrQ5E',
  phoneE164: '+5511988367054',
  phoneWa: '5511988367054',
  phoneDisplay: '(11) 98836-7054',
  email: 'kandogarage@gmail.com',
  instagram: { handle: '@kando_garage', url: 'https://www.instagram.com/kando_garage' },
  rating: { value: '5,0', count: 68 },
  // CONFIRMAR: CNPJ. Só é exibido no rodapé quando `confirmed` for true.
  cnpj: { confirmed: false, value: '' },
  // CONFIRMAR: domínio definitivo (defina VITE_SITE_URL no deploy).
  siteUrl: getSiteUrl(),
  credit: { name: 'Toss Lab' },
} as const;

export const links = {
  maps: `https://www.google.com/maps/search/?api=1&query=Kando+Garage&query_place_id=${company.placeId}`,
  mapsPlace: `https://www.google.com/maps/place/?q=place_id:${company.placeId}`,
  mapsReviews: `https://www.google.com/maps/place/?q=place_id:${company.placeId}`,
  writeReview: `https://search.google.com/local/writereview?placeid=${company.placeId}`,
  mapsEmbed: `https://www.google.com/maps?q=${company.geo.lat},${company.geo.lng}&z=17&output=embed`,
  tel: `tel:${company.phoneE164}`,
  mailto: `mailto:${company.email}`,
  instagram: company.instagram.url,
};

/** Link wa.me com mensagem URL-encoded. Não coleta nada: é só um link. */
export function wa(message: string): string {
  return `https://wa.me/${company.phoneWa}?text=${encodeURIComponent(message)}`;
}

/** Mensagens pré-preenchidas. Cada uma combina com o rótulo do botão que a usa. */
const msgQuote = 'Olá! Vim pelo site e gostaria de pedir um orçamento.';
const msgDiagnosis = 'Olá! Vim pelo site e gostaria de agendar um diagnóstico.';
const msgRevision = 'Olá! Vim pelo site e quero agendar a revisão do meu carro. Modelo/ano/km: ';

/** Link padrão (hero, cabeçalho, local, rodapé): combina com “Pedir orçamento no WhatsApp”. */
export const waDefault = wa(msgQuote);

/**
 * CTAs por posição na página: rótulo + mensagem coerentes entre si.
 * Nenhum promete preço, prazo, garantia ou gratuidade.
 * `href` é o link wa.me pronto. Use `label` e `href` direto nos componentes.
 */
export const ctas = {
  hero: { label: 'Pedir orçamento no WhatsApp', message: msgQuote, href: wa(msgQuote) },
  heroSecondary: { label: 'Escolher meu sintoma', href: '#sintomas' },
  /** Linhas do seletor de sintomas (a revisão tem rótulo próprio em `Symptom.cta`) */
  symptom: { label: 'Agendar diagnóstico', message: msgDiagnosis, href: wa(msgDiagnosis) },
  /** Cartões de serviço (rótulo curto; o aria-label concatena o título do serviço) */
  service: { label: 'Pedir orçamento', message: msgQuote, href: wa(msgQuote) },
  revision: { label: 'Agendar minha revisão', message: msgRevision, href: wa(msgRevision) },
  /** Fim de “Como trabalhamos” */
  how: { label: 'Agendar diagnóstico', message: msgDiagnosis, href: wa(msgDiagnosis) },
  /** Fim de “Avaliações” */
  reviews: { label: 'Pedir orçamento no WhatsApp', message: msgQuote, href: wa(msgQuote) },
  /** “Não achou o seu problema?” e “Outra dúvida?” */
  other: { label: 'Descrever meu problema', message: 'Olá! Vim pelo site. Meu carro está com o seguinte problema: ', href: wa('Olá! Vim pelo site. Meu carro está com o seguinte problema: ') },
  /** CTA final */
  final: { label: 'Agendar diagnóstico agora', message: msgDiagnosis, href: wa(msgDiagnosis) },
} as const;

// ---------------------------------------------------------------- horário (fonte única)
/** Dias 0 = domingo … 6 = sábado. `null` = fechado. Horas em minutos desde 00:00. */
export const hours = {
  timeZone: 'America/Sao_Paulo',
  week: {
    0: null,
    1: { open: 8 * 60, close: 18 * 60 },
    2: { open: 8 * 60, close: 18 * 60 },
    3: { open: 8 * 60, close: 18 * 60 },
    4: { open: 8 * 60, close: 18 * 60 },
    5: { open: 8 * 60, close: 18 * 60 },
    6: { open: 9 * 60, close: 14 * 60 },
  } as Record<number, { open: number; close: number } | null>,
  table: [
    { label: 'Segunda a sexta', days: [1, 2, 3, 4, 5], text: '08:00 às 18:00' },
    { label: 'Sábado', days: [6], text: '09:00 às 14:00' },
    { label: 'Domingo', days: [0], text: 'Fechado' },
  ],
  summary: 'Seg–Sex 8h–18h · Sáb 9h–14h',
  holidayNote: 'Em feriados, consulte pelo WhatsApp.',
} as const;

// ---------------------------------------------------------------- navegação e rótulos de interface
export const nav = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-trabalhamos', label: 'Como trabalhamos' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#onde-estamos', label: 'Onde estamos' },
];

export const ui = {
  // Mantêm os nomes antigos, com rótulos específicos (ver também `ctas`).
  ctaWhatsapp: 'Pedir orçamento no WhatsApp',
  ctaWhatsappNow: 'Agendar diagnóstico agora',
  /** Versão curta para cabeçalho e barra fixa (novo, opcional) */
  ctaWhatsappShort: 'Pedir orçamento',
  call: 'Ligar',
  directions: 'Como chegar',
  email: 'E-mail',
  menuOpen: 'Abrir menu',
  menuClose: 'Fechar menu',
  skip: 'Ir para o conteúdo',
};

// ---------------------------------------------------------------- microcopy: ordem de serviço / ficha técnica
/**
 * Rótulos de ficha técnica. São só rótulos de layout: não contêm fatos novos,
 * número de ordem, prazo, garantia ou valor. Nenhum deles é campo editável.
 */
export const orderSheet = {
  /** Cabeçalho decorativo de página/seção */
  title: 'Ordem de serviço',
  /** Prefixo de item numerado. Use itemLabel('01') → 'Item 01'. */
  itemPrefix: 'Item',
  /** Faixas do layout “escudo dividido” */
  diagnosis: 'Diagnóstico',
  execution: 'Execução',
  split: 'Diagnóstico / Execução',
  /** Rótulos de legenda por seção. O número da ficha é calculado por fichaCaption() só entre as seções visíveis. */
  captions: {
    symptoms: 'Sintoma relatado',
    services: 'Serviços e diagnósticos',
    how: 'Do diagnóstico à entrega',
    revision: 'Revisão periódica',
    reviews: 'Registro de clientes',
    differentials: 'Por que voltam e indicam',
    gallery: 'Bancada e elevador',
    faq: 'Dúvidas comuns',
    location: 'Onde fica a oficina',
    cta: 'Abrir ordem de serviço',
  },
  /** Chamadas curtas para links/botões em cartões numerados */
  openItem: 'Agendar diagnóstico',
  /** Rótulos de campo da faixa de contato (somente exibição) */
  fields: {
    vehicles: 'Veículos', // redundante: o subtítulo do hero já diz “Nacionais e importados”
    vehiclesValue: 'Nacionais e importados', // redundante
    area: 'Região', // redundante: o eyebrow já diz “Tremembé, SP”
    areaValue: 'Tremembé, Zona Norte de SP', // redundante
    hours: 'Atendimento',
    quote: 'Orçamento',
    quoteValue: 'Antes do serviço, para você aprovar',
    parts: 'Peças trocadas',
    partsValue: 'Mostradas na entrega',
  },
  /** Carimbos de rodapé de ficha (texto fixo, sem prometer nada além da seção 1) */
  stamps: {
    approved: 'Aprovado por você',
    shown: 'Peça mostrada',
  },
} as const;

export type FichaKey = 'symptoms' | 'services' | 'how' | 'revision' | 'reviews' | 'differentials' | 'gallery' | 'faq' | 'location';

/** Ordem em que as fichas aparecem na página (src/pages/Home.tsx). */
const fichaOrder: FichaKey[] = ['symptoms', 'services', 'how', 'revision', 'reviews', 'differentials', 'gallery', 'faq', 'location'];

function fichaVisible(k: FichaKey): boolean {
  if (k === 'gallery') return gallery.length > 0;
  if (k === 'faq') return faq.some((f) => f.confirmed && f.a.trim());
  return true;
}

/** 'Ficha 03 · Do diagnóstico à entrega': numeração contínua só entre as seções realmente renderizadas. */
export function fichaCaption(k: FichaKey): string {
  const n = fichaOrder.filter(fichaVisible).indexOf(k) + 1;
  return `Ficha ${String(n).padStart(2, '0')} · ${orderSheet.captions[k]}`;
}

/** 'Item 01' */
export function itemLabel(n: string): string {
  return `${orderSheet.itemPrefix} ${n}`;
}

/**
 * Etiqueta de peça (formato de tag de oficina) para “Peça trocada, peça mostrada”.
 * Só usa o que a seção 1 sustenta: o cliente vê as peças substituídas na entrega,
 * e o serviço só é feito depois da aprovação do orçamento.
 */
export const partTag = {
  title: 'Peça trocada, peça mostrada',
  kicker: 'Etiqueta de peça',
  lines: [
    { k: 'Situação', v: 'Peça substituída' },
    { k: 'Mostrada a você', v: 'Na entrega' },
    { k: 'Serviço feito', v: 'Depois da sua aprovação' },
  ],
  stamp: 'Você vê cada peça que trocamos',
} as const;

// ---------------------------------------------------------------- hero
export const hero = {
  eyebrow: 'Mecânica geral, preventiva e especializada · Tremembé, SP',
  h1: 'Seu carro em boas mãos.',
  sub: 'Diagnóstico explicado, orçamento antes do serviço e peças mostradas na entrega. Nacionais e importados.',
  proof: 'no Google',
  ctaPrimary: ctas.hero.label,
  ctaPrimaryHref: ctas.hero.href,
  ctaSecondary: ctas.heroSecondary.label,
  sheetLabel: 'Ordem de serviço · Kando Garage',
};

// ---------------------------------------------------------------- sintomas
export interface Symptom {
  id: string;
  /** Numeração 01–10 da lista */
  n: string;
  label: string;
  /** Serviço relacionado (rótulo curto da ficha) */
  area: string;
  message: string;
  warning?: string;
  /** Rótulo próprio do botão (opcional). Sem ele, use `symptomsSection.cta`. */
  cta?: string;
}

export const symptomsSection = {
  h2: 'O que seu carro está fazendo?',
  sub: 'Toque no sintoma e fale direto com a gente no WhatsApp. A mensagem já vai pronta.',
  micro: 'Não sabe explicar? Tudo bem. Manda um áudio ou um vídeo do barulho no WhatsApp que a gente te ajuda.',
  /** Rótulo padrão das linhas de sintoma */
  cta: ctas.symptom.label,
  /** Sugestão: mostrar `area` como etiqueta curta, sem o prefixo “Área:”. Mantido por compatibilidade. */
  areaLabel: 'Área',
};

export const symptoms: Symptom[] = [
  { id: 'injecao', n: '01', area: 'Injeção eletrônica', label: 'Luz da injeção acesa / carro falhando', message: 'Olá! Vim pelo site. A luz da injeção acendeu / o carro está falhando. Gostaria de agendar um diagnóstico.' },
  { id: 'motor', n: '02', area: 'Motor', label: 'Perdeu força, fumaça ou barulho no motor', message: 'Olá! Vim pelo site. Meu carro está com problema no motor (perda de força/barulho/fumaça). Gostaria de agendar um diagnóstico.' },
  { id: 'cambio', n: '03', area: 'Câmbio', label: 'Marcha arranhando, câmbio pesado ou trancos', message: 'Olá! Vim pelo site. Estou com problema no câmbio (marcha arranhando/tranco). Gostaria de agendar um diagnóstico.' },
  { id: 'suspensao', n: '04', area: 'Suspensão', label: 'Barulho em buraco, carro “batendo”', message: 'Olá! Vim pelo site. Meu carro está com barulho na suspensão. Gostaria de agendar um diagnóstico.' },
  { id: 'freios', n: '05', area: 'Freios', label: 'Freio chiando, pedal mole ou carro puxando', message: 'Olá! Vim pelo site. Estou com problema no freio. Gostaria de agendar um diagnóstico.' },
  { id: 'airbag', n: '06', area: 'Airbag', label: 'Luz do airbag acesa', message: 'Olá! Vim pelo site. A luz do airbag está acesa no painel. Gostaria de agendar um diagnóstico.' },
  { id: 'arrefecimento', n: '07', area: 'Arrefecimento', label: 'Temperatura subindo / vazando água', message: 'Olá! Vim pelo site. A temperatura do carro está subindo / vazando água. Gostaria de agendar um diagnóstico.' },
  {
    id: 'combustivel',
    n: '08',
    area: 'Combustível',
    label: 'Cheiro ou vazamento de combustível',
    message: 'Olá! Vim pelo site. Estou sentindo cheiro / vendo vazamento de combustível. Gostaria de agendar um diagnóstico.',
    warning: 'Se o cheiro for forte, não dê partida. Fale com a gente.',
  },
  { id: 'revisao', n: '09', area: 'Revisão periódica', label: 'Hora da revisão', message: msgRevision, cta: 'Agendar revisão' },
  { id: 'outro', n: '10', area: 'Geral', label: 'Outro problema', message: 'Olá! Vim pelo site. Meu carro está com o seguinte problema: ', cta: 'Descrever meu problema' },
];

// ---------------------------------------------------------------- serviços
export interface Service {
  id: string;
  /** Numeração 01–09 da lista */
  n: string;
  title: string;
  /** Uma linha, até 80 caracteres */
  text: string;
  message: string;
  /** Rótulo próprio do botão (opcional). Sem ele, use `servicesSection.serviceCta`. */
  cta?: string;
}

export const servicesSection = {
  h2: 'Mecânica geral, preventiva e especializada',
  intro: 'Trabalhamos com veículos nacionais e importados, com serviço e diagnóstico em todas estas áreas:',
  introNote: 'Oficina mecânica no Tremembé. Revisão de carro e diagnóstico para quem mora no Tucuruvi e no Mandaqui.',
  /** Mesmo valor de `serviceCta`; mantido por compatibilidade */
  link: ctas.service.label,
  /** Rótulo curto do botão de cada serviço (o aria-label deve concatenar o título) */
  serviceCta: ctas.service.label,
  outroH: 'Não achou o seu problema?',
  outroText: 'Descreva no WhatsApp, ou mande um áudio, que a gente explica.',
  outroCta: ctas.other.label,
};

const svcMsg = (what: string) => `Olá! Vim pelo site e gostaria de pedir um orçamento para ${what}.`;

export const services: Service[] = [
  { id: 'injecao', n: '01', title: 'Injeção eletrônica', text: 'Diagnóstico com scanner: falhas, perda de potência, consumo alto, luz acesa.', message: svcMsg('a injeção eletrônica') },
  { id: 'motor', n: '02', title: 'Motor', text: 'Ruídos, vazamentos, superaquecimento, correias e manutenção completa.', message: svcMsg('o motor do meu carro') },
  { id: 'cambio', n: '03', title: 'Câmbio', text: 'Marcha arranhando, trancos, câmbio pesado ou ruidoso. Diagnóstico e reparo.', message: svcMsg('o câmbio do meu carro') },
  { id: 'suspensao', n: '04', title: 'Suspensão', text: 'Amortecedores, molas, buchas e terminais. Menos barulho, mais estabilidade.', message: svcMsg('a suspensão do meu carro') },
  { id: 'freios', n: '05', title: 'Freios', text: 'Pastilhas, discos, fluido, ruídos e pedal mole. Segurança em primeiro lugar.', message: svcMsg('os freios do meu carro') },
  { id: 'airbag', n: '06', title: 'Airbag', text: 'Diagnóstico da luz do airbag acesa e do sistema de segurança.', message: svcMsg('o airbag do meu carro') },
  { id: 'revisoes', n: '07', title: 'Revisões periódicas', text: 'Seguimos a agenda de revisão do seu veículo, sem serviço desnecessário.', message: msgRevision, cta: 'Agendar revisão' },
  { id: 'arrefecimento', n: '08', title: 'Arrefecimento', text: 'Limpeza do sistema, radiador, mangueiras e controle de temperatura.', message: svcMsg('o sistema de arrefecimento') },
  { id: 'combustivel', n: '09', title: 'Sistema de combustível', text: 'Diagnóstico e correção de vazamentos e falhas na alimentação.', message: svcMsg('o sistema de combustível') },
];

// ---------------------------------------------------------------- como trabalhamos
export interface Step {
  /** Numeração contínua 01–04 (as duas metades somam quatro passos) */
  n: string;
  title: string;
  text: string;
}

export const how = {
  h2: 'Transparência do diagnóstico à entrega',
  intro: 'É assim com qualquer carro que entra aqui.',
  halves: [
    {
      id: 'diagnostico',
      label: orderSheet.diagnosis,
      title: 'Diagnóstico',
      steps: [
        { n: '01', title: 'Avaliamos e explicamos', text: 'Mostramos o problema para você, de preferência com o carro na sua frente.' },
        { n: '02', title: 'Orçamento antes de mexer', text: 'Você recebe o orçamento detalhado e só fazemos o que aprovar.' },
      ] as Step[],
    },
    {
      id: 'servico',
      label: orderSheet.execution,
      title: 'Serviço',
      steps: [
        { n: '03', title: 'Serviço no prazo combinado', text: 'Executamos o serviço e mantemos você informado pelo WhatsApp.' },
        { n: '04', title: 'Peça trocada, peça mostrada', text: 'Na entrega, você vê as peças substituídas e entende o que foi feito.' },
      ] as Step[],
    },
  ],
  /** CTA no fim da seção */
  cta: ctas.how.label,
  ctaHref: ctas.how.href,
  highlight: {
    // Texto reescrito para não repetir o passo 04 nem a etiqueta de peça.
    // Sugestão ao frontend: se a página continuar longa, este bloco pode ser cortado
    // (o passo 04 e a etiqueta já dizem o mesmo). Só o `quote` perde lugar até a autorização.
    title: 'Você acompanha o que foi feito',
    text: 'As peças substituídas ficam à vista na entrega, e a gente explica cada uma.',
    // CONFIRMAR autorização para exibir o trecho da avaliação
    quote: {
      confirmed: false,
      text: 'Levei meu carro em dois mecânicos e não resolveram meu problema. [...] Resolveu o problema, muito honesto, mostrou todas as peças que trocou.',
      author: 'Cliente, avaliação no Google',
    },
  },
};

export const revision = {
  h2: 'Revisão conforme a agenda do seu carro',
  text: 'Seu manual traz uma agenda de revisões por km ou tempo. Seguimos essa agenda, sem empurrar serviço de que o carro não precisa.',
  cta: ctas.revision.label,
  message: msgRevision,
};

// ---------------------------------------------------------------- diferenciais
export interface Differential {
  n: string;
  title: string;
  text: string;
}

export const differentials = {
  h2: 'Por que os clientes voltam e indicam',
  items: [
    // Removidos por duplicar outras seções: “Honestidade comprovada” (painel 5,0)
    // e “A gente explica” (passo 01 de Como trabalhamos).
    { n: '01', title: 'Preço justo', text: 'Orçamento claro, sem troca desnecessária.' },
    { n: '02', title: 'Ambiente limpo e confortável', text: 'Área de descanso com cafezinho enquanto você espera.' },
    // CONFIRMAR: nome/função do Diego antes de citá-lo aqui.
    { n: '03', title: 'Atendimento direto', text: 'Você fala com quem cuida do seu carro.' },
  ] as Differential[],
};

// ---------------------------------------------------------------- avaliações
export interface Review extends Confirmable {
  text: string;
  author: string;
}

export const reviewsSection = {
  h2: 'Quem já deixou o carro em boas mãos',
  seal: 'avaliações no Google',
  seeAll: 'Ver todas no Google',
  rate: 'Já é cliente? Avalie a gente',
  /** CTA no fim da seção (distinto do de “Como trabalhamos”) */
  cta: ctas.reviews.label,
  ctaHref: ctas.reviews.href,
  prev: 'Avaliação anterior',
  next: 'Próxima avaliação',
  source: 'Avaliação no Google',
};

// CONFIRMAR: autorização para exibir trechos com o primeiro nome do autor.
// Enquanto `confirmed` for false, os cards não aparecem (o selo 5,0 e os links aparecem normalmente).
export const reviews: Review[] = [
  { confirmed: false, author: 'Cliente', text: 'A manutenção foi clara e honesta, mostrou todas as peças que trocou, tudo claro e explicado. [...] Pessoal educado, rápido na solução dos problemas e tudo limpinho!' },
  { confirmed: false, author: 'Cliente', text: 'O Diego foi extremamente profissional, transparente e atencioso. Explicou cada etapa do serviço de forma clara, sem pressa e com total honestidade.' },
  { confirmed: false, author: 'Cliente', text: 'Levei meu carro em dois mecânicos e não resolveram meu problema. [...] Muito honesto, mostrou todas as peças que trocou, preço justo.' },
  { confirmed: false, author: 'Cliente', text: 'Super paciente pra explicar e mostrar o problema [...]. Tem uma área de descanso super confortável e aconchegante com cafezinho.' },
  { confirmed: false, author: 'Cliente', text: 'Resolveu o problema de vazamento de combustível após o abastecimento. Não conhecia a oficina, e agora já tenho onde deixar meu carro.' },
];

// ---------------------------------------------------------------- prova de confiança (INVISÍVEL até confirmar)
/**
 * Garantia dos serviços. Não renderizar enquanto `confirmed` for false.
 * Os textos abaixo são placeholders: nunca devem chegar ao visitante.
 */
export interface Warranty extends Confirmable {
  title: string;
  /** Texto exato aprovado pelo cliente (prazo e condições) */
  text: string;
}
// CONFIRMAR: existe garantia? Qual prazo e quais condições? Depois, preencher `text` e `confirmed: true`.
export const warranty: Warranty = {
  confirmed: false,
  title: 'Garantia dos serviços',
  text: '', // CONFIRMAR
};

/** Marcas atendidas. Não renderizar enquanto `confirmed` for false ou `items` estiver vazio. */
export interface Brands extends Confirmable {
  title: string;
  items: string[];
}
// CONFIRMAR: quais marcas a oficina atende e pode citar? Depois, preencher `items` e `confirmed: true`.
export const brands: Brands = {
  confirmed: false,
  title: 'Marcas que atendemos',
  items: [], // CONFIRMAR
};

// ---------------------------------------------------------------- galeria
export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}
export const gallerySection = {
  h2: 'Por dentro da garagem',
  cta: 'Acompanhe no Instagram @kando_garage',
};
// CONFIRMAR fotos: sem fotos reais, a seção não é renderizada.
export const gallery: GalleryItem[] = [];

// ---------------------------------------------------------------- FAQ
export interface Faq extends Confirmable {
  q: string;
  a: string;
}
export const faqSection = { h2: 'Perguntas frequentes' };
export const faq: Faq[] = [
  { confirmed: true, q: 'Vocês atendem carros importados?', a: 'Sim, nacionais e importados. Diagnóstico de injeção, motor, câmbio, suspensão, freios e airbag, para toda a Zona Norte.' },
  { confirmed: true, q: 'Vocês mostram as peças trocadas?', a: 'Sim. Todas as peças substituídas são mostradas na entrega.' },
  // CONFIRMAR se atende sem agendamento
  { confirmed: true, q: 'Preciso agendar?', a: 'Recomendamos chamar no WhatsApp antes, para garantir o melhor horário.' },
  { confirmed: true, q: 'A luz do airbag acendeu. É perigoso?', a: 'Pode indicar que o airbag não vai funcionar numa batida. Vale fazer o diagnóstico o quanto antes.' },
  { confirmed: true, q: 'Como funciona a revisão?', a: 'Seguimos a agenda de revisão do seu veículo, por km ou tempo, sem incluir serviço de que ele não precisa.' },
  { confirmed: true, q: 'Quanto tempo leva o serviço?', a: 'Depende do diagnóstico. O prazo vem junto com o orçamento e avisamos pelo WhatsApp.' },
  // CONFIRMAR: respostas abaixo dependem do cliente
  { confirmed: false, q: 'O orçamento é cobrado?', a: '' },
  { confirmed: false, q: 'Quais formas de pagamento aceitam?', a: '' },
  { confirmed: false, q: 'Os serviços têm garantia?', a: '' },
];

// ---------------------------------------------------------------- local
export const location = {
  h2: 'Venha nos visitar no Tremembé',
  intro: 'Oficina mecânica no Tremembé, Zona Norte de São Paulo. Mecânica geral, preventiva e especializada para nacionais e importados.',
  hoursTitle: 'Horário de funcionamento',
  today: 'hoje',
  areaTitle: 'Atendemos toda a Zona Norte',
  area: ['Tremembé', 'Jardim Tremembé', 'Tucuruvi', 'Mandaqui', 'Jaçanã', 'Vila Irmãos Arnoni', 'Horto Florestal'],
  areaTail: 'e região. Mecânico na Zona Norte de SP para revisão, injeção, câmbio, freios ou carro importado? Peça um orçamento.',
  openMaps: 'Abrir no Google Maps',
  loadMap: 'Carregar mapa interativo',
  mapNote: 'Ilustração esquemática. O mapa interativo só carrega quando você pedir.',
};

export const ctaFinal = {
  caption: orderSheet.captions.cta,
  h2: 'Seu carro está dando sinal?',
  text: 'Fale com quem explica antes de mexer.',
  /** Botão principal: combina com `ui.ctaWhatsappNow`. Use `message`/`href` deste objeto, não `waDefault`. */
  cta: ctas.final.label,
  message: ctas.final.message,
  href: ctas.final.href,
};

export const footer = {
  hoursTitle: 'Horário',
  contactTitle: 'Contato',
  privacy: 'Política de privacidade',
};

// ---------------------------------------------------------------- páginas extras
export const privacy = {
  title: 'Política de privacidade',
  intro: 'Resumo direto: este site não coleta dados pessoais.',
  items: [
    'O site não tem formulários, não pede cadastro e não usa cookies de rastreamento.',
    'Não usamos Google Analytics, Meta Pixel nem outras ferramentas que identifiquem você.',
    'Os botões levam a serviços de terceiros (WhatsApp, Google Maps, Instagram e e-mail). Ao clicar, valem as políticas deles.',
    'O mapa interativo do Google só é carregado se você clicar em “Carregar mapa interativo”.',
    'O telefone e o e-mail exibidos são o contato comercial da própria Kando Garage.',
  ],
  contact: 'Dúvidas sobre esta política? Escreva para',
  updated: 'Atualizada em outubro de 2026.',
};

export const notFound = {
  h1: 'Essa página foi pro elevador.',
  text: 'A gente não encontrou o que você procurava, mas seu carro continua em boas mãos.',
  home: 'Voltar ao início',
};

// ---------------------------------------------------------------- SEO
export const seo = {
  title: 'Kando Garage | Oficina Mecânica no Tremembé, Zona Norte SP',
  description:
    'Mecânica geral, preventiva e especializada para nacionais e importados no Tremembé. Nota 5,0 no Google. Injeção, motor, câmbio, freios e airbag. Chame no WhatsApp.',
  privacyTitle: 'Política de privacidade | Kando Garage',
  privacyDescription: 'A Kando Garage não coleta dados pessoais neste site: sem formulários, sem login e sem cookies de rastreamento.',
  notFoundTitle: 'Página não encontrada | Kando Garage',
  notFoundDescription: 'A página que você procurava não foi encontrada. Volte ao início ou chame a Kando Garage no WhatsApp.',
};

/** Medição: desligada por padrão. Quando ligada, o script só chama o provedor se ele existir na página. */
export const analytics = {
  enabled: false,
  // CONFIRMAR: provedor cookieless (Vercel Web Analytics, Plausible ou Umami) e, se houver, domínio para a CSP
  provider: 'none' as 'none' | 'vercel' | 'plausible' | 'umami',
};

// ---------------------------------------------------------------- acréscimos da versão React
/**
 * Rótulos estruturais usados pelos componentes React (sem ícones). Tudo que aparece na tela
 * e não estava acima mora aqui, para que nenhum texto de interface fique solto nos componentes.
 */
export const copy = {
  ui: {
    menu: 'Menu',
    close: 'Fechar',
    mainNav: 'Principal',
    quickActions: 'Contato rápido',
    whatsapp: 'WhatsApp',
    home: 'Início',
    emblemLabel: 'Emblema Kando Garage',
    mapTitle: 'Mapa: Kando Garage, R. Mamud Rahd, 202, Tremembé',
  },
  hero: {
    // redundante: o eyebrow já diz “Tremembé, SP”. O frontend pode remover estes três campos no mobile.
    placeLabel: 'Bairro', // redundante
    placeValue: 'Tremembé', // redundante
    addressLabel: 'Endereço', // redundante (endereço completo está em Onde estamos e no rodapé)
    /** Texto completo (usado também no og.jpg) */
    proofText: 'Nota 5,0 no Google · 68 avaliações',
    /** Na home o 5,0 aparece em destaque ao lado, então o rótulo não repete o número */
    proofLabel: 'Nota no Google · 68 avaliações',
    legend: 'Ordem de serviço · Kando Garage',
  },
  trustBar: {
    caption: 'Ficha de confiança',
    items: [
      { head: '5,0', label: 'Nota no Google', text: '68 avaliações' },
      { head: 'Peças à vista', label: '', text: 'Mostradas na entrega' },
      { head: 'Orçamento antes de mexer', label: '', text: 'Só fazemos o que você aprovar' },
      { head: 'Nacionais e importados', label: '', text: 'Diagnóstico com equipamento' },
    ],
  },
  symptoms: { countLabel: 'Sintomas' },
  services: {
    tableCaption: 'Serviços · tabela de especificação',
    cols: { n: 'Nº', service: 'Serviço', what: 'O que atendemos', action: 'Ação' },
  },
  partTag: {
    promiseLabel: 'A promessa',
    rulerStart: 'Km',
    rulerEnd: 'Tempo',
  },
  differentials: { countLabel: 'Motivos' },
  reviews: { panelLine: 'Nota no Google · 68 avaliações', source: 'Cliente · Avaliação no Google' },
  faq: { open: 'Abrir', close: 'Fechar', openMark: '+', closeMark: '\u2212', more: 'Outra dúvida? É só chamar no WhatsApp.' },
  location: {
    addressLabel: 'Endereço',
    coords: 'Coordenadas',
    mapSchematic: 'Esquema · não está em escala',
  },
  footer: {
    year: 2026,
    addressLabel: 'Endereço',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'E-mail',
    instagramLabel: 'Instagram',
    hoursLabel: 'Horário',
    cnpjLabel: 'CNPJ',
    madeBy: 'Site por',
    rights: '©',
  },
  notFound: { tag: 'Peça não encontrada', label: 'Erro 404' },
  emailAt: 'arroba',
  seoExtra: { ogAlt: 'Kando Garage: seu carro em boas mãos. Nota 5,0 no Google.' },
} as const;

// ---------------------------------------------------------------- JSON-LD
export function openingHoursSpec() {
  return [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
  ];
}

/**
 * AutoRepair + FAQPage. Só entram perguntas com `confirmed: true` e resposta preenchida.
 * Sem Review/AggregateRating: avaliações de terceiros exibidas no próprio site não viram marcação.
 */
export function jsonLd(url: string = company.siteUrl, faqItems: Faq[] = faq) {
  const base = url.replace(/\/+$/, '');
  const c = company;
  const business = {
    '@type': 'AutoRepair',
    '@id': `${base}/#negocio`,
    name: c.name,
    alternateName: c.legalDisplayName,
    slogan: c.slogan,
    description: 'Mecânica geral, preventiva e especializada para veículos nacionais e importados no Tremembé, Zona Norte de São Paulo.',
    url: `${base}/`,
    logo: `${base}/logo.png`,
    image: `${base}/og.jpg`,
    telephone: '+55-11-98836-7054',
    email: c.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.address.street,
      addressLocality: c.address.city,
      addressRegion: c.address.region,
      postalCode: c.address.zip,
      addressCountry: 'BR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: c.geo.lat, longitude: c.geo.lng },
    openingHoursSpecification: openingHoursSpec(),
    areaServed: ['Tremembé', 'Tucuruvi', 'Mandaqui', 'Jaçanã', 'Horto Florestal', 'Zona Norte de São Paulo'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços',
      itemListElement: [
        'Injeção eletrônica', 'Motor', 'Câmbio', 'Suspensão', 'Freios', 'Airbag',
        'Revisões periódicas', 'Sistema de arrefecimento', 'Sistema de combustível',
      ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    },
    sameAs: [c.instagram.url, links.mapsPlace],
  };
  const graph: object[] = [business];
  const visible = faqItems.filter((f) => f.confirmed && f.a.trim());
  if (visible.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: visible.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
