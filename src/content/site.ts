/**
 * Fonte única de conteúdo do site Kando Garage.
 * Nada de texto de interface fora deste arquivo.
 * Itens com `confirmed: false` dependem de confirmação do cliente e NÃO são renderizados.
 * Lista completa em docs/pendencias.md.
 */

export interface Confirmable {
  confirmed: boolean;
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
  // CONFIRMAR: domínio definitivo.
  siteUrl: process.env.SITE_URL ?? 'https://kandogarage.com.br',
  credit: { name: 'Toss Lab' },
} as const;

export const links = {
  maps: `https://www.google.com/maps/search/?api=1&query=Kando+Garage&query_place_id=${company.placeId}`,
  mapsPlace: `https://www.google.com/maps/place/?q=place_id:${company.placeId}`,
  mapsReviews: `https://www.google.com/maps/place/?q=place_id:${company.placeId}`,
  writeReview: `https://search.google.com/local/writereview?placeid=${company.placeId}`,
  mapsEmbed: `https://www.google.com/maps?q=${company.geo.lat},${company.geo.lng}&z=17&output=embed`,
  tel: `tel:${company.phoneE164}`,
  instagram: company.instagram.url,
};

/** Link wa.me com mensagem URL-encoded. Não coleta nada: é só um link. */
export function wa(message: string): string {
  return `https://wa.me/${company.phoneWa}?text=${encodeURIComponent(message)}`;
}

export const waDefault = wa('Olá! Vim pelo site e gostaria de falar sobre meu carro.');

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

// ---------------------------------------------------------------- navegação
export const nav = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-trabalhamos', label: 'Como trabalhamos' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#onde-estamos', label: 'Onde estamos' },
];

export const ui = {
  ctaWhatsapp: 'Chamar no WhatsApp',
  ctaWhatsappNow: 'Chamar no WhatsApp agora',
  call: 'Ligar',
  directions: 'Como chegar',
  email: 'E-mail',
  menuOpen: 'Abrir menu',
  menuClose: 'Fechar menu',
  skip: 'Ir para o conteúdo',
};

// ---------------------------------------------------------------- hero
export const hero = {
  eyebrow: 'Mecânica geral, preventiva e especializada · Tremembé, Zona Norte de SP',
  h1: 'Seu carro em boas mãos.',
  sub: 'Diagnóstico explicado, orçamento antes do serviço e cada peça trocada mostrada a você. Nacionais e importados.',
  proof: 'no Google',
  ctaSecondary: 'O que meu carro tem?',
};

export const trust = [
  { icon: 'star', title: '5,0 ★ no Google', text: '68 avaliações' },
  { icon: 'eye', title: 'Peça trocada, peça mostrada', text: 'Você vê tudo' },
  { icon: 'receipt', title: 'Orçamento antes de mexer', text: 'Só fazemos o que você aprovar' },
  { icon: 'car', title: 'Nacionais e importados', text: 'Diagnóstico com equipamento' },
];

// ---------------------------------------------------------------- sintomas
export interface Symptom {
  id: string;
  icon: string;
  label: string;
  message: string;
  warning?: string;
}

export const symptomsSection = {
  h2: 'O que seu carro está fazendo?',
  sub: 'Toque no sintoma e fale direto com a gente no WhatsApp. A mensagem já vai pronta.',
  micro: 'Não sabe explicar? Tudo bem. Manda um áudio ou um vídeo do barulho no WhatsApp que a gente te ajuda.',
};

export const symptoms: Symptom[] = [
  { id: 'injecao', icon: 'zap', label: 'Luz da injeção acesa / carro falhando', message: 'Olá! Vim pelo site. A luz da injeção acendeu / o carro está falhando. Podem avaliar?' },
  { id: 'motor', icon: 'engine', label: 'Perdeu força, fumaça ou barulho no motor', message: 'Olá! Vim pelo site. Meu carro está com problema no motor (perda de força/barulho/fumaça). Podem avaliar?' },
  { id: 'cambio', icon: 'gearbox', label: 'Marcha arranhando, câmbio pesado ou trancos', message: 'Olá! Vim pelo site. Estou com problema no câmbio (marcha arranhando/tranco). Podem avaliar?' },
  { id: 'suspensao', icon: 'spring', label: 'Barulho em buraco, carro "batendo"', message: 'Olá! Vim pelo site. Meu carro está com barulho na suspensão. Podem avaliar?' },
  { id: 'freios', icon: 'disc', label: 'Freio chiando, pedal mole ou carro puxando', message: 'Olá! Vim pelo site. Estou com problema no freio. Podem avaliar?' },
  { id: 'airbag', icon: 'airbag', label: 'Luz do airbag acesa', message: 'Olá! Vim pelo site. A luz do airbag está acesa no painel. Podem avaliar?' },
  { id: 'arrefecimento', icon: 'thermo', label: 'Temperatura subindo / vazando água', message: 'Olá! Vim pelo site. A temperatura do carro está subindo / vazando água. Podem avaliar?' },
  {
    id: 'combustivel',
    icon: 'fuel',
    label: 'Cheiro ou vazamento de combustível',
    message: 'Olá! Vim pelo site. Estou sentindo cheiro / vendo vazamento de combustível. Podem avaliar?',
    warning: 'Se o cheiro for forte, não dê partida. Fale com a gente.',
  },
  { id: 'revisao', icon: 'clipboard', label: 'Hora da revisão', message: 'Olá! Vim pelo site. Quero agendar a revisão do meu carro. Modelo/ano/km: ' },
  { id: 'outro', icon: 'chat', label: 'Outro problema', message: 'Olá! Vim pelo site. Meu carro está com o seguinte problema: ' },
];

// ---------------------------------------------------------------- serviços
export interface Service {
  id: string;
  icon: string;
  title: string;
  text: string;
  message: string;
  /** 'oficial' = texto da própria empresa (WhatsApp Business); 'clientes' = citado nas avaliações */
  source: 'oficial' | 'clientes';
}

export const servicesSection = {
  h2: 'Mecânica geral, preventiva e especializada',
  intro: 'Trabalhamos com veículos nacionais e importados, com serviço e diagnóstico em todas estas áreas:',
  link: 'Falar sobre isso',
  outroH: 'Não achou o seu problema?',
  outroText: 'Descreva no WhatsApp, ou mande um áudio, que a gente explica.',
};

const svcMsg = (what: string) => `Olá! Vim pelo site. Gostaria de falar sobre ${what}. Podem avaliar?`;

export const services: Service[] = [
  { id: 'injecao', icon: 'zap', title: 'Injeção eletrônica', text: 'Diagnóstico com scanner para falhas, perda de potência, consumo alto e luz da injeção acesa.', message: svcMsg('injeção eletrônica'), source: 'oficial' },
  { id: 'motor', icon: 'engine', title: 'Motor', text: 'Ruídos, vazamentos, superaquecimento, correias e manutenção completa do motor.', message: svcMsg('o motor do meu carro'), source: 'oficial' },
  { id: 'cambio', icon: 'gearbox', title: 'Câmbio', text: 'Marchas arranhando, trancos, câmbio pesado ou ruidoso. Diagnóstico e reparo.', message: svcMsg('o câmbio do meu carro'), source: 'oficial' },
  { id: 'suspensao', icon: 'spring', title: 'Suspensão', text: 'Amortecedores, molas, buchas e terminais. Fim do barulho e mais estabilidade.', message: svcMsg('a suspensão do meu carro'), source: 'oficial' },
  { id: 'freios', icon: 'disc', title: 'Freios', text: 'Pastilhas, discos, fluido e diagnóstico de ruídos e pedal mole. Segurança em primeiro lugar.', message: svcMsg('os freios do meu carro'), source: 'oficial' },
  { id: 'airbag', icon: 'airbag', title: 'Air bag', text: 'Diagnóstico da luz do airbag acesa e do sistema de segurança do veículo.', message: svcMsg('o airbag do meu carro'), source: 'oficial' },
  { id: 'revisoes', icon: 'clipboard', title: 'Revisões periódicas', text: 'Seguimos a agenda de revisão do seu veículo, sem empurrar serviço desnecessário.', message: 'Olá! Vim pelo site. Quero agendar a revisão do meu carro. Modelo/ano/km: ', source: 'oficial' },
  { id: 'arrefecimento', icon: 'thermo', title: 'Arrefecimento', text: 'Limpeza do sistema, radiador, mangueiras e controle de temperatura.', message: svcMsg('o sistema de arrefecimento'), source: 'clientes' },
  { id: 'combustivel', icon: 'fuel', title: 'Sistema de combustível', text: 'Diagnóstico e correção de vazamentos e falhas na alimentação.', message: svcMsg('o sistema de combustível'), source: 'clientes' },
];

// ---------------------------------------------------------------- como trabalhamos
export const how = {
  h2: 'Transparência do diagnóstico à entrega',
  intro: 'É assim com qualquer carro que entra aqui.',
  halves: [
    {
      id: 'diagnostico',
      icon: 'gears',
      title: 'Diagnóstico',
      steps: [
        { title: 'Avaliamos e explicamos', text: 'Mostramos o problema para você, de preferência com o carro na sua frente.' },
        { title: 'Orçamento antes de mexer', text: 'Você recebe o orçamento detalhado e só fazemos o que aprovar.' },
      ],
    },
    {
      id: 'servico',
      icon: 'tools',
      title: 'Serviço',
      steps: [
        { title: 'Serviço no prazo combinado', text: 'Executamos o serviço e mantemos você informado pelo WhatsApp.' },
        { title: 'Peça trocada, peça mostrada', text: 'Na entrega, você vê as peças substituídas e entende o que foi feito.' },
      ],
    },
  ],
  highlight: {
    title: 'Peça trocada, peça mostrada',
    text: 'É o elogio que mais se repete nas avaliações, e virou promessa: você vê cada peça substituída e entende o que foi feito no seu carro.',
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
  text: 'Seu manual tem uma agenda de revisões por km ou tempo. A gente segue a agenda do seu carro, sem empurrar serviço que ele ainda não precisa.',
  cta: 'Agendar minha revisão',
  message: 'Olá! Vim pelo site. Quero agendar a revisão do meu carro. Modelo/ano/km: ',
};

// ---------------------------------------------------------------- diferenciais
export const differentials = {
  h2: 'Por que os clientes voltam e indicam',
  items: [
    { icon: 'star', title: 'Honestidade comprovada', text: '5,0 no Google em 68 avaliações.' },
    { icon: 'receipt', title: 'Preço justo', text: 'Orçamento claro, sem troca desnecessária.' },
    { icon: 'chat', title: 'A gente explica', text: 'Você entende o que acontece com o seu carro, sem "mecaniquês".' },
    { icon: 'coffee', title: 'Ambiente limpo e confortável', text: 'Área de descanso com cafezinho enquanto você espera.' },
    // CONFIRMAR: nome/função do Diego antes de citá-lo aqui.
    { icon: 'user', title: 'Atendimento direto', text: 'Você fala com quem cuida do seu carro.' },
  ],
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
  { confirmed: true, q: 'Vocês atendem carros importados?', a: 'Sim. Trabalhamos com veículos nacionais e importados.' },
  { confirmed: true, q: 'Vocês mostram as peças trocadas?', a: 'Sim. Todas as peças substituídas são mostradas na entrega.' },
  // CONFIRMAR se atende sem agendamento
  { confirmed: true, q: 'Preciso agendar?', a: 'Recomendamos chamar no WhatsApp antes para garantir o melhor horário.' },
  { confirmed: true, q: 'A luz do airbag acendeu. É perigoso?', a: 'Pode indicar que o airbag não vai funcionar em caso de batida. Vale fazer o diagnóstico o quanto antes.' },
  { confirmed: true, q: 'Como funciona a revisão?', a: 'Seguimos a agenda de revisão indicada para o seu veículo, por quilometragem ou tempo, sem incluir serviço que ele ainda não precisa.' },
  { confirmed: true, q: 'Quanto tempo leva o serviço?', a: 'Depende do diagnóstico. O prazo vem junto com o orçamento e você é avisado pelo WhatsApp.' },
  // CONFIRMAR: respostas abaixo dependem do cliente
  { confirmed: false, q: 'O orçamento é cobrado?', a: '' },
  { confirmed: false, q: 'Quais formas de pagamento aceitam?', a: '' },
  { confirmed: false, q: 'Os serviços têm garantia?', a: '' },
];

// ---------------------------------------------------------------- local
export const location = {
  h2: 'Venha nos visitar no Tremembé',
  hoursTitle: 'Horário de funcionamento',
  today: 'hoje',
  areaTitle: 'Atendemos toda a Zona Norte',
  area: ['Tremembé', 'Jardim Tremembé', 'Tucuruvi', 'Mandaqui', 'Jaçanã', 'Vila Irmãos Arnoni', 'Horto Florestal'],
  areaTail: 'e região.',
  openMaps: 'Abrir no Google Maps',
  loadMap: 'Carregar mapa interativo',
  mapNote: 'Ilustração esquemática. O mapa interativo só carrega quando você pedir.',
};

export const ctaFinal = {
  h2: 'Seu carro está dando sinal?',
  text: 'Fale com quem explica antes de mexer.',
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
    'Os botões de contato levam a serviços de terceiros (WhatsApp, Google Maps, Instagram e seu aplicativo de e-mail). Ao clicar, você passa a seguir as políticas de privacidade deles.',
    'O mapa interativo do Google só é carregado se você clicar em "Carregar mapa interativo".',
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
};

/** Medição: desligada por padrão. Quando ligada, o script só chama o provedor se ele existir na página. */
export const analytics = {
  enabled: false,
  // CONFIRMAR: provedor cookieless (Vercel Web Analytics, Plausible ou Umami) e, se houver, domínio para a CSP
  provider: 'none' as 'none' | 'vercel' | 'plausible' | 'umami',
};

export function openingHoursSpec() {
  return [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
  ];
}

export function jsonLd(url: string, faqItems: Faq[]) {
  const c = company;
  const business = {
    '@type': 'AutoRepair',
    '@id': `${url}/#negocio`,
    name: c.name,
    alternateName: c.legalDisplayName,
    slogan: c.slogan,
    description: 'Mecânica geral, preventiva e especializada para veículos nacionais e importados no Tremembé, Zona Norte de São Paulo.',
    url,
    logo: `${url}/logo.png`,
    image: `${url}/og.jpg`,
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
        'Injeção eletrônica', 'Motor', 'Câmbio', 'Suspensão', 'Freios', 'Air bag',
        'Revisões periódicas', 'Sistema de arrefecimento', 'Sistema de combustível',
      ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    },
    sameAs: [c.instagram.url, links.mapsPlace],
  };
  const graph: object[] = [business];
  if (faqItems.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  // Sem AggregateRating/Review: avaliações de terceiros exibidas no próprio site não devem virar marcação.
  return { '@context': 'https://schema.org', '@graph': graph };
}
