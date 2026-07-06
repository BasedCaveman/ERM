import type { LucideIcon } from 'lucide-react';
import {
  CircleDot,
  ClipboardCheck,
  Eye,
  GitBranch,
  Handshake,
  HeartHandshake,
  Layers3,
  Lightbulb,
  MessageCircleQuestion,
  Orbit,
  Repeat2,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import type { TrackId } from './journeys';

type AgeBand = 'all' | 'kids' | 'youth';

export type SupportConcept = {
  id: string;
  adultName: string;
  kidTitle: string;
  moment: string;
  fieldMove: string;
  deductionQuestion: string;
  evidence: string;
  facilitatorReveal: string;
  icon: LucideIcon;
  age: AgeBand;
};

export const supportConcepts: SupportConcept[] = [
  {
    id: 'golden-circle',
    adultName: 'Golden Circle',
    kidTitle: 'Comece pelo motivo',
    moment: 'Quando a ideia parece bonita, mas ninguem sabe por que ela importa.',
    fieldMove: 'Peca para o grupo responder em voz alta: para quem isso muda alguma coisa? Depois so entao desenhe o que sera feito.',
    deductionQuestion: 'O que muda quando a gente comeca pelo motivo antes de escolher o objeto, cartaz, app ou servico?',
    evidence: 'Uma frase que comece com "isso importa porque..." e venha de alguem real.',
    facilitatorReveal: 'A turma praticou a ordem motivo, jeito e entrega. O nome adulto pode vir depois.',
    icon: CircleDot,
    age: 'all',
  },
  {
    id: 'empathy',
    adultName: 'Empatia',
    kidTitle: 'Escute antes de adivinhar',
    moment: 'Quando o grupo acha que ja sabe o problema da outra pessoa.',
    fieldMove: 'Troque uma opiniao por uma pergunta simples e escute sem corrigir a resposta.',
    deductionQuestion: 'O que apareceu na fala da pessoa que nao estava no nosso palpite?',
    evidence: 'Uma frase ou desenho autorizado que contradiz ou melhora a primeira ideia.',
    facilitatorReveal: 'Empatia aqui nao e sentir pelo outro; e investigar a experiencia do outro com respeito.',
    icon: HeartHandshake,
    age: 'all',
  },
  {
    id: 'design-thinking',
    adultName: 'Design thinking',
    kidTitle: 'Investigue, crie, teste, mude',
    moment: 'Quando a turma quer pular direto para a solucao final.',
    fieldMove: 'Faca uma versao feia e pequena em papel. Mostre para uma pessoa e mude uma coisa antes de caprichar.',
    deductionQuestion: 'O que o teste ensinou que uma conversa dentro da sala nao mostraria?',
    evidence: 'Foto autorizada do antes/depois ou lista de uma critica que mudou o prototipo.',
    facilitatorReveal: 'A turma viveu o ciclo de entender, idear, prototipar, testar e aprender.',
    icon: Repeat2,
    age: 'all',
  },
  {
    id: 'holacracy',
    adultName: 'Holocracia',
    kidTitle: 'Papeis claros, decisao leve',
    moment: 'Quando todo mundo quer mandar ou ninguem sabe quem cuida de que.',
    fieldMove: 'Em vez de escolher chefe, escolha papeis por 20 minutos: escuta, mapa, prototipo, tempo e relato.',
    deductionQuestion: 'O que ficou mais facil quando cada pessoa cuidou de um papel claro?',
    evidence: 'Um combinado de papeis com uma decisao tomada sem esperar uma unica pessoa mandar.',
    facilitatorReveal: 'A turma experimentou autoridade distribuida por papeis, nao por cargo fixo.',
    icon: Orbit,
    age: 'youth',
  },
  {
    id: 'self-management-kids',
    adultName: 'Autogestao em papeis',
    kidTitle: 'Cada pessoa segura uma parte',
    moment: 'Quando criancas menores precisam colaborar sem virar disputa de lider.',
    fieldMove: 'Distribua pulseiras ou fichas de papel: quem pergunta, quem desenha, quem observa, quem conta o tempo.',
    deductionQuestion: 'Qual parte do trabalho quase foi esquecida? Quem cuidou dela?',
    evidence: 'Um desenho dos papeis do grupo e uma troca feita quando alguem precisou de ajuda.',
    facilitatorReveal: 'Versao infantil do principio de papeis claros e responsabilidade compartilhada.',
    icon: UsersRound,
    age: 'kids',
  },
  {
    id: 'systems-thinking',
    adultName: 'Pensamento sistemico',
    kidTitle: 'O problema tem caminhos',
    moment: 'Quando o problema parece culpa de uma pessoa so.',
    fieldMove: 'Desenhe tres coisas ligadas ao problema: pessoas, lugares, objetos, horarios ou regras.',
    deductionQuestion: 'Que parte do caminho muda o resultado sem culpar alguem?',
    evidence: 'Um mapa com pelo menos tres ligacoes e uma alavanca pequena para testar.',
    facilitatorReveal: 'A turma procurou relacoes e alavancas, nao culpados simples.',
    icon: GitBranch,
    age: 'youth',
  },
  {
    id: 'evidence-opinion',
    adultName: 'Evidencia versus opiniao',
    kidTitle: 'Palpite nao e pista',
    moment: 'Quando a turma fala "todo mundo acha" sem ter observado ou perguntado.',
    fieldMove: 'Separe o quadro em duas colunas: o que a gente acha e o que a gente viu/ouviu/testou.',
    deductionQuestion: 'Qual palpite ficou mais fraco depois que apareceu uma pista real?',
    evidence: 'Uma coluna de palpites e uma coluna de evidencias com pelo menos uma mudanca de ideia.',
    facilitatorReveal: 'Base para pensamento cientifico, pesquisa de usuario e decisao responsavel.',
    icon: ClipboardCheck,
    age: 'all',
  },
  {
    id: 'feedback',
    adultName: 'Feedback e iteracao',
    kidTitle: 'Critica que melhora',
    moment: 'Quando uma critica faz o grupo defender a ideia em vez de aprender.',
    fieldMove: 'Peca que cada critica vire uma frase: "a proxima versao precisa..."',
    deductionQuestion: 'Que critica deixou a ideia mais forte, mesmo sendo desconfortavel?',
    evidence: 'Uma mudanca feita depois de ouvir alguem de fora do grupo.',
    facilitatorReveal: 'A turma praticou iteracao: usar retorno real para melhorar uma versao.',
    icon: MessageCircleQuestion,
    age: 'all',
  },
  {
    id: 'ethics-consent',
    adultName: 'Etica, consentimento e cuidado',
    kidTitle: 'Nem toda pista pode virar post',
    moment: 'Quando aparece foto, audio, historia sensivel ou dado de outra pessoa.',
    fieldMove: 'Antes de registrar, pergunte: a pessoa permitiu? Isso expoe alguem? Da para contar sem identificar?',
    deductionQuestion: 'Como a gente pode aprender com a pista sem expor a pessoa?',
    evidence: 'Um registro reescrito com menos dados pessoais ou uma midia marcada como nao publicavel.',
    facilitatorReveal: 'Cuidado etico nao e burocracia; e parte da confianca com a comunidade.',
    icon: ShieldCheck,
    age: 'all',
  },
  {
    id: 'opportunity',
    adultName: 'Oportunidade empreendedora',
    kidTitle: 'Ajuda pequena que alguem usaria',
    moment: 'Quando a turma confunde ideia legal com valor real.',
    fieldMove: 'Mostre a ideia para uma pessoa e pergunte: em que momento isso te ajudaria de verdade?',
    deductionQuestion: 'Qual parte da ideia alguem realmente usaria, pediria ou indicaria?',
    evidence: 'Uma situacao concreta de uso, com pessoa, momento e motivo.',
    facilitatorReveal: 'A turma conectou desejo, contexto e valor para alguem real.',
    icon: Lightbulb,
    age: 'all',
  },
  {
    id: 'research-lens',
    adultName: 'Lente de pesquisa',
    kidTitle: 'Olhe de novo, agora com foco',
    moment: 'Quando a observacao esta grande demais e a turma se perde.',
    fieldMove: 'Escolha uma lente por 10 minutos: fila, tempo, barulho, sombra, informacao, caminho ou ajuda.',
    deductionQuestion: 'O que apareceu quando todo mundo olhou para a mesma coisa?',
    evidence: 'Tres observacoes do mesmo foco, feitas por pessoas diferentes do grupo.',
    facilitatorReveal: 'A turma praticou recorte de pesquisa e reduziu ruido cognitivo.',
    icon: Eye,
    age: 'kids',
  },
  {
    id: 'layers-of-value',
    adultName: 'Camadas de valor',
    kidTitle: 'Nao e so o objeto',
    moment: 'Quando o grupo olha apenas para o produto e esquece experiencia, historia ou confianca.',
    fieldMove: 'Liste o que a pessoa recebe alem da coisa: tempo, orgulho, seguranca, beleza, pertencimento ou praticidade.',
    deductionQuestion: 'Qual valor invisivel pode ser mais importante que a entrega visivel?',
    evidence: 'Uma lista de tres valores invisiveis e uma mudanca no prototipo para mostrar um deles.',
    facilitatorReveal: 'Ajuda a sair do objeto e perceber proposta de valor mais ampla.',
    icon: Layers3,
    age: 'youth',
  },
  {
    id: 'community-agreement',
    adultName: 'Acordos de governanca',
    kidTitle: 'Combinado que protege a ideia',
    moment: 'Quando uma ideia depende de varias pessoas cuidando dela depois.',
    fieldMove: 'Crie um combinado simples: quem cuida, quando revisa, como pede ajuda e o que fazer se nao funcionar.',
    deductionQuestion: 'Que regra pequena evita confusao sem travar a criatividade?',
    evidence: 'Um combinado escrito em linguagem da turma e testado por uma rodada.',
    facilitatorReveal: 'A turma praticou governanca leve: regras minimas para cooperar melhor.',
    icon: Handshake,
    age: 'youth',
  },
];

export function getConceptDeckForTrack(trackId: TrackId) {
  const ageBand: AgeBand = trackId.endsWith('kids') ? 'kids' : 'youth';

  return supportConcepts.filter((concept) => concept.age === 'all' || concept.age === ageBand);
}
