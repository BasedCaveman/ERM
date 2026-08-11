import type { LucideIcon } from 'lucide-react';
import { Bike, Bus, CloudSun, Flower2, HandHeart, Leaf, MapPinned, PackageCheck, Palette, Sprout, Store, Utensils } from 'lucide-react';

export type TrackId = 'rural-kids' | 'urban-kids' | 'rural-youth' | 'urban-youth';

export type JourneyVariant = {
  id?: string;
  title: string;
  interests: string[];
  question: string;
  output: string;
  icon: LucideIcon;
  location?: string;
  people?: string;
  subject?: string;
  material?: string;
};

export type JourneyProfile = {
  name: string;
  shortName: string;
  age: string;
  contextLabel: string;
  intro: string;
  artifact: string;
  invitation: string;
  palette: string;
  language: string;
  hero: string;
  heroAlt: string;
  variants: JourneyVariant[];
};

export const journeyProfiles: Record<TrackId, JourneyProfile> = {
  'rural-kids': {
    name: 'Nossa Terra',
    shortName: 'Nossa Terra',
    age: '7-10',
    contextLabel: 'zona rural e cidade pequena',
    intro: 'Investigar a feira semanal, a escola, os quintais, as estradas, os pequenos comércios, os serviços e os saberes de uma cidade rural pequena.',
    artifact: 'Mapa da Nossa Terra',
    invitation: 'Abrir o mapa da Nossa Terra, escolher uma pista e criar uma melhoria pequena com quem conhece o lugar.',
    palette: 'Praça, feira, horta, chuva, oficina, estrada, rádio e vizinhança',
    language: 'reparar, prosear, combinar, experimentar, cuidar, trocar, medir, perguntar e mostrar',
    hero: '/images/journeys/nossa-terra-mapa.png',
    heroAlt: 'Mapa ilustrado de uma pequena cidade rural brasileira com feira, escola, horta, oficina, comunidade e crianças investigadoras.',
    variants: [
      {
        id: 'horta-clima',
        title: 'Horta esperta',
        interests: ['Horta', 'Natureza', 'Comida', 'Clima'],
        question: 'O que ajuda uma planta a crescer melhor aqui?',
        output: 'Placa de cuidado, calendário de rega ou mini experimento de sombra e água.',
        icon: Sprout,
        location: 'uma horta, um quintal ou um canteiro',
        people: 'quem planta ou cuida da água',
        subject: 'a relação entre planta, água, solo, sombra e tempo',
        material: 'sementes, terra, potes reaproveitados e desenho',
      },
      {
        id: 'feira-sabores',
        title: 'Feira viva',
        interests: ['Feira', 'Comida', 'Família', 'Desenho'],
        question: 'Como uma banca mostra melhor o valor do que vende?',
        output: 'Etiqueta visual, combinação de cestas ou história curta do produto.',
        icon: Store,
        location: 'uma feira, uma venda ou uma cozinha da comunidade',
        people: 'quem produz, prepara, vende ou compra alimentos',
        subject: 'o caminho do alimento e o que ajuda uma pessoa a escolher',
        material: 'embalagens limpas, etiquetas, cestas e desenho',
      },
      {
        id: 'cuidado-animal',
        title: 'Cuidado animal',
        interests: ['Animais', 'Cuidar de pessoas', 'Natureza'],
        question: 'O que os animais mostram quando precisam de cuidado?',
        output: 'Guia de observação, rotina combinada ou protótipo de aviso.',
        icon: HandHeart,
        location: 'um quintal, um pasto ou um espaço onde os animais vivem',
        people: 'quem alimenta, observa ou cuida dos animais',
        subject: 'os sinais de bem-estar, sede, fome, abrigo e segurança',
        material: 'cartões de sinais, barbante, papelão e desenho',
      },
      {
        id: 'clima-tecnologia',
        title: 'Oficina do clima',
        interests: ['Clima', 'Tecnologia', 'Jogos'],
        question: 'Como perceber sinais do tempo antes que atrapalhem a rotina?',
        output: 'Diário do tempo, medidor simples ou mapa de sinais do lugar.',
        icon: CloudSun,
        location: 'uma escola, uma estrada ou um ponto aberto da comunidade',
        people: 'quem precisa decidir olhando o tempo',
        subject: 'os sinais de chuva, calor, vento e mudança na rotina',
        material: 'garrafa, barbante, calendário, lápis e observação do céu',
      },
      {
        id: 'caminhos-comunidade',
        title: 'Caminhos da comunidade',
        interests: ['Escola', 'Transporte', 'Praça', 'Esporte'],
        question: 'O que pode tornar um caminho importante mais fácil, seguro ou acolhedor?',
        output: 'Mapa de caminho, placa de orientação ou combinado de cuidado.',
        icon: MapPinned,
        location: 'caminhos entre casa, escola, praça e outros pontos importantes',
        people: 'quem caminha, pedala, dirige, estuda ou brinca por ali',
        subject: 'os pontos fáceis, difíceis, seguros e confusos do caminho',
        material: 'mapa em papel, sementes para marcar pontos e cartões de percurso',
      },
      {
        id: 'historias-sons',
        title: 'Histórias que circulam',
        interests: ['Histórias', 'Música', 'Desenho', 'Família'],
        question: 'Que história ou som daqui merece ser lembrado e compartilhado?',
        output: 'Varal de histórias, mapa sonoro, desenho narrado ou programa curto de rádio.',
        icon: Palette,
        location: 'um lugar de encontro, uma casa, uma escola ou uma praça',
        people: 'quem guarda histórias, músicas, brincadeiras e memórias do lugar',
        subject: 'as histórias e os sons que ajudam a comunidade a se reconhecer',
        material: 'papel, lápis, barbante, objetos sonoros e gravação autorizada',
      },
    ],
  },
  'urban-kids': {
    name: 'Missao Bairro',
    shortName: 'Bairro',
    age: '7-10',
    contextLabel: 'urbano',
    intro: 'Explorar escola, bairro, praca, cantina, transporte e combinados comunitarios.',
    artifact: 'Mapa do bairro',
    invitation: 'Investigar escola, praca, cantina e combinados que melhoram a vida perto de casa.',
    palette: 'Bairro, escola, praca, transporte e vizinhanca',
    language: 'missao, pista, rota, combinado, cuidado, teste e vizinhanca',
    hero: '/images/journeys/missao-bairro-hero.jpg',
    heroAlt: 'Crianças investigando escola, praça, cantina e rotas de bairro.',
    variants: [
      {
        title: 'Rota segura',
        interests: ['Escola', 'Transporte', 'Esporte'],
        question: 'O que torna um caminho mais facil ou mais dificil?',
        output: 'Mapa de pontos de atencao ou proposta de combinados.',
        icon: Bus,
      },
      {
        title: 'Praca que chama',
        interests: ['Praca', 'Historias', 'Musica', 'Natureza'],
        question: 'Por que algumas pessoas usam mais a praca que outras?',
        output: 'Convite visual, roteiro de uso ou mini evento.',
        icon: Flower2,
      },
      {
        title: 'Cantina melhor',
        interests: ['Comida', 'Feira', 'Desenho'],
        question: 'Como a fila, a escolha ou a informacao podem melhorar?',
        output: 'Placa, organizador de fila ou card de sugestoes.',
        icon: Utensils,
      },
      {
        title: 'Ajuda entre vizinhos',
        interests: ['Cuidar de pessoas', 'Tecnologia', 'Historias'],
        question: 'Que ajuda pequena falta no bairro?',
        output: 'Mural de trocas, bilhete ou prototipo de servico simples.',
        icon: HandHeart,
      },
    ],
  },
  'rural-youth': {
    name: 'Laboratorio das Colinas',
    shortName: 'Colinas',
    age: '12-14',
    contextLabel: 'rural',
    intro: 'Investigar producao local, turismo, logistica, clima, comercializacao e servicos comunitarios.',
    artifact: 'Mapa das colinas',
    invitation: 'Conectar producao local, turismo, clima, logistica e redes comunitarias.',
    palette: 'Producao, trilhas, ferramentas, clima e comercio local',
    language: 'sistemas, sinais, padroes, tradeoffs, evidencias, recursos, prototipo e impacto local',
    hero: '/images/journeys/laboratorio-das-colinas-hero.jpg',
    heroAlt: 'Jovens analisando produção rural, clima, logística e protótipos comunitários.',
    variants: [
      {
        title: 'Producao com historia',
        interests: ['Comida', 'Familia', 'Desenho', 'Tecnologia'],
        question: 'Como mostrar melhor a origem e o valor de um produto local?',
        output: 'Etiqueta narrativa, roteiro de venda ou pagina simples.',
        icon: PackageCheck,
      },
      {
        title: 'Clima e decisao',
        interests: ['Clima', 'Natureza', 'Tecnologia'],
        question: 'Quais sinais ajudam uma familia ou produtor a decidir melhor?',
        output: 'Painel de sinais, calendario ou protocolo de alerta.',
        icon: CloudSun,
      },
      {
        title: 'Rota do produto',
        interests: ['Feira', 'Transporte', 'Jogos'],
        question: 'Onde a logistica perde tempo, dinheiro ou qualidade?',
        output: 'Mapa de rota, checklist ou teste de embalagem.',
        icon: MapPinned,
      },
      {
        title: 'Turismo de cuidado',
        interests: ['Historias', 'Natureza', 'Musica'],
        question: 'Como receber visitantes sem descaracterizar o territorio?',
        output: 'Roteiro de visita, codigo de respeito ou mapa interpretativo.',
        icon: Leaf,
      },
    ],
  },
  'urban-youth': {
    name: 'Cidade Infinita',
    shortName: 'Cidade',
    age: '12-14',
    contextLabel: 'urbano',
    intro: 'Trabalhar mobilidade, consumo, cultura, estudos, servicos digitais locais e vida de bairro.',
    artifact: 'Mapa da cidade infinita',
    invitation: 'Explorar mobilidade, estudos, cultura, consumo e servicos digitais locais.',
    palette: 'Mobilidade, cultura, estudos, consumo e tecnologia',
    language: 'friccao, padrao, jornada, dados, confianca, acesso, custo, inclusao, prototipo e impacto',
    hero: '/images/journeys/cidade-infinita-hero.jpg',
    heroAlt: 'Jovens mapeando mobilidade, cultura urbana, estudos e serviços digitais locais.',
    variants: [
      {
        title: 'Mobilidade do dia real',
        interests: ['Transporte', 'Esporte', 'Tecnologia'],
        question: 'Onde a cidade faz as pessoas perderem tempo ou energia?',
        output: 'Mapa de jornada, sugestao de rota ou guia de combinados.',
        icon: Bike,
      },
      {
        title: 'Cultura que circula',
        interests: ['Musica', 'Historias', 'Desenho'],
        question: 'Como uma ideia cultural chega a mais pessoas do bairro?',
        output: 'Agenda visual, roteiro de divulgacao ou microevento.',
        icon: Palette,
      },
      {
        title: 'Consumo consciente',
        interests: ['Comida', 'Feira', 'Tecnologia'],
        question: 'Como escolher melhor sem cair em impulso ou desperdicio?',
        output: 'Comparador simples, etiqueta ou desafio de escolha.',
        icon: Store,
      },
      {
        title: 'Estudos sem caos',
        interests: ['Jogos', 'Tecnologia', 'Cuidar de pessoas'],
        question: 'Como organizar estudo sem virar vigilancia ou culpa?',
        output: 'Planner, ritual de foco ou prototipo de lembrete.',
        icon: HandHeart,
      },
    ],
  },
};

export const baseInterestOptions = [
  'Animais',
  'Horta',
  'Jogos',
  'Desenho',
  'Tecnologia',
  'Música',
  'Feira',
  'Natureza',
  'Comida',
  'Esporte',
  'Histórias',
  'Cuidar de pessoas',
  'Clima',
  'Transporte',
  'Escola',
  'Praça',
  'Família',
];

export function getInterestOptionsForTrack(trackId: TrackId) {
  const suggested = journeyProfiles[trackId].variants.flatMap((variant) => variant.interests);

  return Array.from(new Set([...suggested, ...baseInterestOptions]));
}

export function getVariantForInterests(trackId: TrackId, interests: string[]) {
  const profile = journeyProfiles[trackId];
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const selected = interests.map(normalize);

  return (
    profile.variants
      .map((variant) => ({
        variant,
        score: variant.interests.reduce((score, interest) => {
          const position = selected.indexOf(normalize(interest));
          return position < 0 ? score : score + position + 1;
        }, 0),
      }))
      .sort((a, b) => b.score - a.score)[0]?.variant ?? profile.variants[0]
  );
}
