import type { JourneyVariant } from './journeys';

export type InterestDrivenMission = {
  hook: string;
  question: string;
  movement: string;
  evidence: string;
  nextTest: string;
  changes: string[];
};

const phaseMoves = [
  {
    action: 'desenhar onde isso aparece e marcar uma coisa que funciona e outra que desperta curiosidade',
    evidence: 'um mapa com lugar, pessoa e pergunta',
    next: 'comparar o mapa com o olhar de outra pessoa',
  },
  {
    action: 'encontrar uma pessoa que faz esse lugar funcionar e descobrir qual ajuda ela entrega',
    evidence: 'um retrato e uma frase sobre a ajuda dessa pessoa',
    next: 'perguntar o que ficaria difícil sem esse trabalho',
  },
  {
    action: 'escolher entre duas situações imprevistas, explicar o motivo e observar a consequência',
    evidence: 'uma decisão, o motivo e um cuidado adotado',
    next: 'repetir a escolha depois de receber uma pista nova',
  },
  {
    action: 'dividir os papéis de perguntar, observar, desenhar, cuidar do tempo e contar a descoberta',
    evidence: 'um combinado de equipe ligado ao tema escolhido',
    next: 'trocar os papéis e perceber o que muda',
  },
  {
    action: 'preparar três perguntas curtas e escutar alguém que vive essa situação',
    evidence: 'uma fala autorizada, uma surpresa e algo que mudou no palpite',
    next: 'levar a descoberta de volta para o mapa',
  },
  {
    action: 'separar as pistas em vimos, ouvimos, achávamos e ainda precisamos descobrir',
    evidence: 'um painel com uma mudança de opinião marcada',
    next: 'escolher a dúvida que mais precisa de investigação',
  },
  {
    action: 'criar três ideias: uma simples, uma de mutirão e uma inesperada',
    evidence: 'três ideias e um critério claro de escolha',
    next: 'escolher a ideia que pode ensinar mais em um teste pequeno',
  },
  {
    action: 'construir uma primeira versão com materiais simples, sem se preocupar com acabamento',
    evidence: 'um protótipo e a frase “queremos descobrir se...”',
    next: 'mostrar a versão sem explicar antes',
  },
  {
    action: 'mapear quem usa, quem ajuda, o que é preciso e onde a ideia pode emperrar',
    evidence: 'um caminho da ideia com pelo menos um parceiro local',
    next: 'conversar com alguém de uma parte ainda desconhecida do caminho',
  },
  {
    action: 'mostrar a ideia para uma pessoa, observar o uso e fazer duas perguntas curtas',
    evidence: 'uma reação, uma crítica e uma mudança decidida',
    next: 'refazer apenas a parte que mais confundiu',
  },
  {
    action: 'organizar um pequeno mutirão de conserto, clareza, teste e história',
    evidence: 'um antes e depois com o nome da ajuda recebida',
    next: 'testar novamente a parte que mudou',
  },
  {
    action: 'montar uma fala curta com problema, pista, ideia, teste e aprendizado',
    evidence: 'um roteiro que mostra também dúvida e mudança de ideia',
    next: 'ensaiar para alguém que ainda não conhece o projeto',
  },
  {
    action: 'compartilhar a descoberta e abrir espaço para perguntas da comunidade',
    evidence: 'uma pergunta recebida e uma resposta honesta do grupo',
    next: 'anotar qual retorno merece virar melhoria',
  },
  {
    action: 'escolher o que continua, quem pode cuidar e quando o grupo volta a olhar',
    evidence: 'um próximo cuidado com pessoa, data e sinal para observar',
    next: 'voltar ao lugar na data combinada e conferir o que mudou',
  },
] as const;

export function getInterestDrivenMission(variant: JourneyVariant, phase: number): InterestDrivenMission {
  const move = phaseMoves[Math.max(0, Math.min(phase - 1, phaseMoves.length - 1))];
  const location = variant.location ?? 'um lugar importante da comunidade';
  const people = variant.people ?? 'quem conhece esse lugar';
  const subject = variant.subject ?? variant.question.toLowerCase();
  const material = variant.material ?? 'papel, lápis e materiais simples';
  const capitalize = (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

  return {
    hook: `Sua escolha levou a trilha para ${variant.title}. Nesta missão, o grupo vai investigar ${subject}. Ponto de partida: ${location}.`,
    question: `${variant.question} O que ${people} já percebe sobre isso?`,
    movement: `${capitalize(move.action)}. Use ${material}.`,
    evidence: `${capitalize(move.evidence)}, mostrando algo sobre ${subject}.`,
    nextTest: `${capitalize(move.next)}, com ${people}.`,
    changes: [
      `A pergunta passa a olhar para ${subject}.`,
      `A atividade parte de ${location}.`,
      `A próxima pista será conferida com ${people}.`,
    ],
  };
}
