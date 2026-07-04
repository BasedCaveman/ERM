import type { LucideIcon } from 'lucide-react';
import { Bike, Bus, CloudSun, Flower2, HandHeart, Leaf, MapPinned, PackageCheck, Palette, Sprout, Store, Utensils } from 'lucide-react';

export type TrackId = 'rural-kids' | 'urban-kids' | 'rural-youth' | 'urban-youth';

export type JourneyVariant = {
  title: string;
  interests: string[];
  question: string;
  output: string;
  icon: LucideIcon;
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
    name: 'Oficina da Vila',
    shortName: 'Vila',
    age: '7-10',
    contextLabel: 'rural',
    intro: 'Investigar feira, horta, familia, animais, clima e pequenos comercios com linguagem concreta.',
    artifact: 'Mapa de sementes',
    invitation: 'Entrar pela feira, pela horta e pelos pequenos misterios do campo.',
    palette: 'Campo, feira, chuva, animais e familia',
    language: 'observar, combinar, experimentar, cuidar, trocar, medir, perguntar e mostrar',
    hero: '/images/journeys/oficina-da-vila-hero.jpg',
    heroAlt: 'Crianças investigando uma vila rural, feira, horta e protótipos simples.',
    variants: [
      {
        title: 'Horta esperta',
        interests: ['Horta', 'Natureza', 'Comida', 'Clima'],
        question: 'O que ajuda uma planta a crescer melhor aqui?',
        output: 'Placa de cuidado, calendario de rega ou mini experimento de sombra e agua.',
        icon: Sprout,
      },
      {
        title: 'Feira viva',
        interests: ['Feira', 'Comida', 'Familia', 'Desenho'],
        question: 'Como uma banca mostra melhor o valor do que vende?',
        output: 'Etiqueta visual, combinacao de cestas ou historia curta do produto.',
        icon: Store,
      },
      {
        title: 'Cuidado animal',
        interests: ['Animais', 'Cuidar de pessoas', 'Natureza'],
        question: 'O que os animais mostram quando precisam de cuidado?',
        output: 'Guia de observacao, rotina combinada ou prototipo de aviso.',
        icon: HandHeart,
      },
      {
        title: 'Oficina do clima',
        interests: ['Clima', 'Jogos', 'Tecnologia'],
        question: 'Como perceber sinais do tempo antes que atrapalhem a rotina?',
        output: 'Diario do tempo, medidor simples ou mapa de sinais da vila.',
        icon: CloudSun,
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
  'Musica',
  'Feira',
  'Natureza',
  'Comida',
  'Esporte',
  'Historias',
  'Cuidar de pessoas',
  'Clima',
  'Transporte',
  'Escola',
  'Praca',
  'Familia',
];

export function getInterestOptionsForTrack(trackId: TrackId) {
  const suggested = journeyProfiles[trackId].variants.flatMap((variant) => variant.interests);

  return Array.from(new Set([...suggested, ...baseInterestOptions]));
}

export function getVariantForInterests(trackId: TrackId, interests: string[]) {
  const profile = journeyProfiles[trackId];

  return (
    profile.variants
      .map((variant) => ({
        variant,
        score: variant.interests.filter((interest) => interests.includes(interest)).length,
      }))
      .sort((a, b) => b.score - a.score)[0]?.variant ?? profile.variants[0]
  );
}
