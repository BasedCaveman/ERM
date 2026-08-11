'use client';

import {
  BookOpen,
  Bot,
  Camera,
  CheckCircle2,
  ClipboardList,
  Compass,
  Download,
  FileText,
  Lightbulb,
  Map,
  MessageSquareText,
  Mic2,
  Plus,
  Radio,
  RotateCcw,
  Route,
  Save,
  Share2,
  Sparkles,
  Trash2,
  UserRoundCheck,
  WandSparkles,
  X,
} from 'lucide-react';
import { animate, stagger } from 'animejs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { content } from '../lib/content';
import { getInterestOptionsForTrack, getVariantForInterests, journeyProfiles, type TrackId } from '../lib/journeys';
import { getConceptDeckForTrack } from '../lib/support-concepts';
import { getRuralPhaseSupport, ruralChapters } from '../lib/rural-pilot';
import { getInterestDrivenMission } from '../lib/rural-interest-paths';

type ViewId = 'gateway' | 'map' | 'mission' | 'fieldbook' | 'mural';

type FieldDraft = {
  kind: string;
  observation: string;
  hypothesis: string;
  evidence: string;
  decision: string;
  nextTest: string;
  shared: boolean;
};

type FieldEntry = FieldDraft & {
  id: string;
  trackId: TrackId;
  missionId: string;
  missionTitle: string;
  phase: number;
  createdAt: string;
};

type SavedWorkspace = {
  activePhase?: number;
  done?: Record<string, boolean>;
  fieldEntries?: FieldEntry[];
  interests?: string[];
  pilotProfile?: PilotProfile;
  roadblocks?: Roadblock[];
  trackId?: TrackId;
};

type PilotProfile = {
  school: string;
  className: string;
  groupName: string;
  facilitator: string;
  territory: string;
  window: string;
  safeguards: Record<string, boolean>;
};

type Roadblock = {
  id: string;
  note: string;
  status: 'aberto' | 'acolhido';
  createdAt: string;
};

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type NarrativeSeed = {
  scene: string;
  tension: string;
  helper: string;
  artifact: string;
};

const STORAGE_KEY = 'erm:v2:workspace';
const INSTALL_BANNER_DISMISSED_KEY = 'erm:pwa-install-dismissed';

const views = [
  { id: 'gateway', label: 'Início', icon: Compass },
  { id: 'map', label: 'Caminho', icon: Map },
  { id: 'mission', label: 'Missão', icon: Route },
  { id: 'fieldbook', label: 'Pistas', icon: BookOpen },
  { id: 'mural', label: 'Mural', icon: MessageSquareText },
] satisfies Array<{ id: ViewId; label: string; icon: typeof Map }>;

const narrativeSeeds: Record<TrackId, NarrativeSeed[]> = {
  'rural-kids': [
    {
      scene: 'a feira acordando cedo',
      tension: 'algo bom do territorio nao chega facil para todo mundo',
      helper: 'uma pessoa que cuida, planta, vende ou transporta',
      artifact: 'um desenho de solucao com materiais simples',
    },
    {
      scene: 'a horta depois da chuva',
      tension: 'um recurso importante esta sendo desperdicado ou mal entendido',
      helper: 'alguem da familia que conhece o ritmo do campo',
      artifact: 'um mapa de pistas com cheiros, sons e caminhos',
    },
  ],
  'urban-kids': [
    {
      scene: 'o caminho entre casa, escola e praca',
      tension: 'uma rotina comum esconde um problema que ninguem parou para escutar',
      helper: 'uma pessoa da cantina, portaria, familia ou vizinhanca',
      artifact: 'um mapa do bairro com uma melhoria possivel',
    },
    {
      scene: 'a escola no intervalo',
      tension: 'um combinado pequeno pode melhorar a vida de muita gente',
      helper: 'alguem que usa o espaco todos os dias',
      artifact: 'um prototipo de combinados, placa, jogo ou servico',
    },
  ],
  'rural-youth': [
    {
      scene: 'uma cadeia local de producao e entrega',
      tension: 'valor se perde entre quem produz, quem transporta e quem compra',
      helper: 'um produtor, comerciante, guia ou lider comunitario',
      artifact: 'um canvas simples com gargalo, parceiro e teste',
    },
    {
      scene: 'um atrativo natural ou cultural pouco aproveitado',
      tension: 'a comunidade tem potencia, mas precisa organizar narrativa, acesso ou servico',
      helper: 'alguem que conhece a historia e os limites do lugar',
      artifact: 'um roteiro de experiencia com evidencias e cuidados',
    },
  ],
  'urban-youth': [
    {
      scene: 'uma rotina de mobilidade, estudo, cultura ou consumo',
      tension: 'tempo, atencao ou informacao se perdem no caminho',
      helper: 'um usuario real do bairro, da escola ou de um servico local',
      artifact: 'um fluxo digital ou fisico para testar com usuarios',
    },
    {
      scene: 'um ponto de encontro da cidade',
      tension: 'pessoas diferentes usam o mesmo espaco com necessidades invisiveis',
      helper: 'alguem que observa a rua todos os dias',
      artifact: 'um prototipo de servico, campanha, mapa ou ferramenta',
    },
  ],
};

const phaseMoments = [
  { max: 4, verb: 'observar', output: 'uma pergunta investigativa' },
  { max: 7, verb: 'escutar', output: 'um insight com evidencia' },
  { max: 10, verb: 'prototipar', output: 'um teste pequeno e criticavel' },
  { max: 14, verb: 'comunicar', output: 'uma melhoria explicada com honestidade' },
];

const cognitiveLoop = [
  'Predizer o que a turma acha que vai acontecer.',
  'Observar uma contradicao no territorio.',
  'Escolher uma decisao pequena de time.',
  'Testar fora da tela com alguem real.',
  'Registrar evidencia e refletir em roda.',
];

const learningPrinciples = [
  {
    title: 'Escolha real',
    text: 'A turma escolhe trilha, interesses e pergunta investigativa para sustentar autonomia.',
  },
  {
    title: 'Recuperar antes',
    text: 'Antes da explicacao, o grupo tenta lembrar, predizer e separar palpite de evidencia.',
  },
  {
    title: 'Revisitar depois',
    text: 'Cada fase deve puxar uma evidencia antiga e transformar memoria em proximo teste.',
  },
  {
    title: 'IA criticavel',
    text: 'A resposta da IA vira rascunho: o time compara com o territorio e decide o que usar.',
  },
];

const aiLiteracyProtocol = [
  'Perguntar ao territorio antes de pedir resposta.',
  'Usar IA para organizar, variar e prototipar.',
  'Comparar sugestoes com evidencias reais.',
  'Registrar o que foi decisao humana.',
];

const makerCards = [
  {
    title: 'Papel primeiro',
    text: 'Desenhe a solucao em uma folha antes de abrir qualquer ferramenta digital.',
    tool: 'Papel, caneta, fita, objetos simples',
  },
  {
    title: 'Scratch ou encenacao',
    text: 'Transforme a ideia em uma cena, botao, personagem, fluxo ou teatro curto.',
    tool: 'Scratch, celular do facilitador ou corpo em movimento',
  },
  {
    title: 'IA como dupla',
    text: 'Peca variacoes, nomes, perguntas de teste ou uma explicacao mais clara.',
    tool: 'Prompt curto com evidencia e limite',
  },
  {
    title: 'Teste com alguem real',
    text: 'Mostre o prototipo para uma pessoa e registre uma critica que mude algo.',
    tool: 'Entrevista curta e caderno de campo',
  },
];

const supportCards = [
  {
    title: 'Pergunta melhor',
    moment: 'Quando a turma pula direto para solucao',
    prompt: 'Que evidencia faria a gente mudar de ideia?',
    action: 'Voltar ao territorio e coletar uma frase, desenho ou observacao.',
  },
  {
    title: 'Teste rapido',
    moment: 'Quando a ideia parece grande demais',
    prompt: 'Qual versao minuscula cabe em 20 minutos?',
    action: 'Fazer papel, encenacao, Scratch simples ou conversa com uma pessoa.',
  },
  {
    title: 'Melhoria visual',
    moment: 'Quando o prototipo existe, mas ninguem entende',
    prompt: 'O que uma pessoa precisa ver primeiro?',
    action: 'Reorganizar a historia em problema, evidencia, solucao e proximo teste.',
  },
  {
    title: 'Apresentacao honesta',
    moment: 'Quando chegou a hora de compartilhar',
    prompt: 'O que aprendemos que nao sabiamos no comeco?',
    action: 'Mostrar tambem duvidas, limites, criticas recebidas e mudancas feitas.',
  },
];

const learningFlow = [
  { label: 'Observar', value: 18, text: 'territorio e sinais' },
  { label: 'Escutar', value: 34, text: 'pessoas reais' },
  { label: 'Criar', value: 52, text: 'ideias e prototipos' },
  { label: 'Testar', value: 72, text: 'evidencias e criticas' },
  { label: 'Compartilhar', value: 92, text: 'mural, radio e comunidade' },
];

const ecosystemSignals = [
  ['Tela', 'organiza a missao'],
  ['Mundo', 'gera evidencia'],
  ['IA', 'faz perguntas e rascunhos'],
  ['Humano', 'acolhe bloqueios'],
];

const evidenceKinds = [
  { value: 'desenho', label: 'Desenho', icon: FileText },
  { value: 'foto', label: 'Foto autorizada', icon: Camera },
  { value: 'audio', label: 'Áudio curto', icon: Mic2 },
  { value: 'entrevista', label: 'Frase de entrevista', icon: MessageSquareText },
  { value: 'hipotese', label: 'Hipótese', icon: Lightbulb },
  { value: 'teste', label: 'Teste', icon: ClipboardList },
];

const emptyDraft: FieldDraft = {
  kind: 'desenho',
  observation: '',
  hypothesis: '',
  evidence: '',
  decision: '',
  nextTest: '',
  shared: true,
};

const emptyPilotProfile: PilotProfile = {
  school: '',
  className: '',
  groupName: '',
  facilitator: '',
  territory: '',
  window: '',
  safeguards: {},
};

const safeguardItems = [
  {
    id: 'guardianConsent',
    label: 'Autorizacao de responsaveis',
    report: 'Autorizacao de responsaveis registrada',
  },
  {
    id: 'minimalData',
    label: 'Dados minimos no registro',
    report: 'Registros evitam dados pessoais desnecessarios',
  },
  {
    id: 'mediaConsent',
    label: 'Fotos e audios autorizados',
    report: 'Midias usadas apenas quando autorizadas',
  },
  {
    id: 'aiReviewed',
    label: 'Resposta da IA revisada por humano',
    report: 'Sugestoes da IA passam por revisao humana',
  },
  {
    id: 'communityRespect',
    label: 'Comunidade descrita com respeito',
    report: 'Relatos evitam exposicao ou julgamento da comunidade',
  },
  {
    id: 'humanEscalation',
    label: 'Roadblocks sensiveis vao para humano',
    report: 'Bloqueios sensiveis sao escalados para facilitador humano',
  },
];

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function buildNarrative(trackId: TrackId, interests: string[], mission: { phase: number; title: string; goal: string }) {
  const profile = journeyProfiles[trackId];
  const variant = getVariantForInterests(trackId, interests);
  const seeds = narrativeSeeds[trackId];
  const seed = seeds[(mission.phase - 1) % seeds.length];
  const moment = phaseMoments.find((item) => mission.phase <= item.max) ?? phaseMoments[phaseMoments.length - 1];
  const interestLine = interests.length ? interests.join(', ') : 'curiosidades que a turma escolher';
  const firstInterest = interests[0] ?? variant.interests[0] ?? 'uma pista do territorio';
  const secondInterest = interests[1] ?? variant.interests[1] ?? 'a rotina das pessoas';
  const variantOutput = variant.output.replace(/\.$/, '');

  return {
    interestLine,
    hook: `Hoje a ${profile.name} entra em ${seed.scene}. A turma usa ${interestLine} para ${moment.verb} e transformar ${mission.goal} em ${moment.output}.`,
    scene: seed.scene,
    tension: seed.tension,
    guideQuestion:
      interests.length > 0
        ? `Onde ${firstInterest} encontra ${secondInterest} no territorio, e que problema real aparece quando olhamos com calma?`
        : variant.question,
    evidencePrompt: `Tragam uma evidencia pequena: uma frase de ${seed.helper}, um desenho, uma foto autorizada ou um teste que mostre ${seed.tension}.`,
    prototypePrompt: `Construam uma versao pequena: ${variantOutput || seed.artifact}. Depois comparem com a evidencia antes de pedir ajuda da IA.`,
    nextTest: `Testar a ideia com ${seed.helper} e registrar o que mudou no pensamento do grupo.`,
    variant,
  };
}

export default function Home() {
  const [trackId, setTrackId] = useState<TrackId>('rural-kids');
  const [view, setView] = useState<ViewId>('gateway');
  const [activePhase, setActivePhase] = useState(1);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [fieldDraft, setFieldDraft] = useState<FieldDraft>(emptyDraft);
  const [fieldEntries, setFieldEntries] = useState<FieldEntry[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [pilotProfile, setPilotProfile] = useState<PilotProfile>(emptyPilotProfile);
  const [roadblockDraft, setRoadblockDraft] = useState('');
  const [roadblocks, setRoadblocks] = useState<Roadblock[]>([]);
  const [reportStatus, setReportStatus] = useState('');
  const [hasHydrated, setHasHydrated] = useState(false);
  const [motionSignal, setMotionSignal] = useState(0);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosInstall, setShowIosInstall] = useState(false);
  const mainstageRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const track = useMemo(() => content.tracks.find((item) => item.id === trackId)!, [trackId]);
  const trackProfile = journeyProfiles[trackId];
  const interestOptions = useMemo(() => getInterestOptionsForTrack(trackId), [trackId]);
  const conceptDeck = useMemo(() => getConceptDeckForTrack(trackId), [trackId]);
  const mission = track.missions.find((item) => item.phase === activePhase) ?? track.missions[0];
  const complete = track.missions.filter((item) => done[item.id]).length;
  const pct = Math.round((complete / track.missions.length) * 100);
  const currentEntries = fieldEntries.filter((entry) => entry.trackId === trackId);
  const missionEntries = currentEntries.filter((entry) => entry.missionId === mission.id);
  const sharedEntries = fieldEntries.filter((entry) => entry.shared);
  const openRoadblocks = roadblocks.filter((item) => item.status === 'aberto').length;
  const pilotSignal =
    currentEntries.length === 0
      ? 'Ainda falta a primeira evidencia para avaliar a trilha.'
      : openRoadblocks > 0
        ? 'Prioridade humana: acolher roadblocks antes de acelerar a turma.'
        : 'Boa hora para escolher uma evidencia antiga e planejar o proximo teste.';
  const narrative = buildNarrative(trackId, interests, mission);
  const basePhaseSupport = getRuralPhaseSupport(activePhase);
  const activeVariant = narrative.variant;
  const interestMission = getInterestDrivenMission(activeVariant, activePhase);
  const phaseSupport = {
    ...basePhaseSupport,
    childMove: interests.length ? interestMission.movement : basePhaseSupport.childMove,
    evidence: interests.length ? interestMission.evidence : basePhaseSupport.evidence,
  };
  const pilotIdentity = [
    pilotProfile.school || 'Escola/rede a definir',
    pilotProfile.className || 'turma a definir',
    pilotProfile.groupName || 'grupo a definir',
  ].join(' · ');
  const aiQuickResponse = `Comece perguntando: "${interestMission.question}" Depois peça a evidência antes de qualquer solução. Se a turma travar, ofereça duas opções de próximo passo, mas deixe o grupo escolher.`;
  const latestEntries = currentEntries.slice(0, 3);
  const checkedSafeguards = safeguardItems.filter((item) => pilotProfile.safeguards[item.id]);
  const missingSafeguards = safeguardItems.length - checkedSafeguards.length;
  const pilotReport = [
    `Relatorio de piloto ERM - ${trackProfile.name}`,
    `Identificacao: ${pilotIdentity}`,
    `Facilitador: ${pilotProfile.facilitator || 'a definir'}`,
    `Territorio observado: ${pilotProfile.territory || 'a definir'}`,
    `Janela do piloto: ${pilotProfile.window || 'a definir'}`,
    `Trilha: ${trackProfile.name} (${track.age} anos, ${track.context === 'rural' ? 'rural' : 'urbano'})`,
    `Variante sugerida: ${activeVariant.title}`,
    `Interesses declarados: ${narrative.interestLine}`,
    `Missao atual: ${String(mission.phase).padStart(2, '0')} - ${mission.title}`,
    `Gancho narrativo: ${narrative.hook}`,
    `Pergunta-guia: ${narrative.guideQuestion}`,
    '',
    'Sinais da turma',
    `- Missoes com evidencia: ${complete}/14`,
    `- Registros no caderno: ${currentEntries.length}`,
    `- Descobertas no mural: ${sharedEntries.length}`,
    `- Roadblocks abertos: ${openRoadblocks}`,
    `- Leitura do facilitador: ${pilotSignal}`,
    '',
    'Cuidados de seguranca e consentimento',
    ...(checkedSafeguards.length
      ? checkedSafeguards.map((item) => `- ${item.report}`)
      : ['- Nenhum cuidado foi marcado ainda.']),
    missingSafeguards > 0 ? `- Pendencias de cuidado: ${missingSafeguards}` : '- Checklist de cuidado completo',
    '',
    'Evidencias recentes',
    ...(latestEntries.length
      ? latestEntries.map(
          (entry) =>
            `- Missao ${String(entry.phase).padStart(2, '0')} (${entry.missionTitle}): ${
              entry.observation || entry.evidence || 'registro sem resumo'
            }${entry.nextTest ? ` | Proximo teste: ${entry.nextTest}` : ''}`,
        )
      : ['- Ainda nao ha evidencias registradas.']),
    '',
    'Roadblocks humanos',
    ...(roadblocks.length
      ? roadblocks
          .slice(0, 3)
          .map((item) => `- ${item.status === 'aberto' ? 'Aberto' : 'Acolhido'}: ${item.note}`)
      : ['- Nenhum roadblock registrado.']),
    '',
    'Proximo passo recomendado',
    `- ${narrative.nextTest}`,
  ].join('\n');

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);

      if (raw) {
        const saved = JSON.parse(raw) as SavedWorkspace;

        setTrackId('rural-kids');

        if (typeof saved.activePhase === 'number' && saved.activePhase >= 1 && saved.activePhase <= 14) {
          setActivePhase(saved.activePhase);
        }

        if (saved.done && typeof saved.done === 'object') {
          setDone(saved.done);
        }

        if (Array.isArray(saved.fieldEntries)) {
          setFieldEntries(saved.fieldEntries);
        }

        if (Array.isArray(saved.interests)) {
          setInterests(saved.interests.filter((item) => typeof item === 'string'));
        }

        if (saved.pilotProfile && typeof saved.pilotProfile === 'object') {
          setPilotProfile({ ...emptyPilotProfile, ...saved.pilotProfile });
        }

        if (Array.isArray(saved.roadblocks)) {
          setRoadblocks(saved.roadblocks);
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };
    const installed = window.matchMedia('(display-mode: standalone)').matches || navigatorWithStandalone.standalone;
    const dismissed = window.localStorage.getItem(INSTALL_BANNER_DISMISSED_KEY) === 'true';

    if (installed || dismissed) {
      return;
    }

    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);

    if (isIos) {
      setShowIosInstall(true);
    }

    const captureInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const hideAfterInstall = () => {
      setInstallPrompt(null);
      setShowIosInstall(false);
    };

    window.addEventListener('beforeinstallprompt', captureInstallPrompt);
    window.addEventListener('appinstalled', hideAfterInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', captureInstallPrompt);
      window.removeEventListener('appinstalled', hideAfterInstall);
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activePhase,
        done,
        fieldEntries,
        interests,
        pilotProfile,
        roadblocks,
        trackId,
      } satisfies SavedWorkspace),
    );
  }, [activePhase, done, fieldEntries, hasHydrated, interests, pilotProfile, roadblocks, trackId]);

  useEffect(() => {
    if (!hasHydrated || prefersReducedMotion()) {
      return;
    }

    const root = mainstageRef.current;

    if (!root) {
      return;
    }

    const surface = root.querySelector('[data-motion-surface]');
    const anchors = root.querySelectorAll('[data-motion-anchor]');
    const surfaceAnimation = surface
      ? animate(surface, {
          duration: 280,
          ease: 'out(3)',
          opacity: [0, 1],
          y: [8, 0],
        })
      : null;
    const anchorAnimation = anchors.length
      ? animate(anchors, {
          delay: stagger(45),
          duration: 300,
          ease: 'out(2)',
          opacity: [0, 1],
          y: [8, 0],
        })
      : null;

    return () => {
      surfaceAnimation?.revert();
      anchorAnimation?.revert();
    };
  }, [activePhase, hasHydrated, motionSignal, trackId, view]);

  useEffect(() => {
    if (!hasHydrated || prefersReducedMotion() || complete === 0) {
      return;
    }

    const progress = progressRef.current;

    if (!progress) {
      return;
    }

    const animation = animate(progress, {
      duration: 360,
      ease: 'out(3)',
      scaleX: [0.985, 1],
    });

    return () => {
      animation.revert();
    };
  }, [complete, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated || prefersReducedMotion() || !done[mission.id]) {
      return;
    }

    const ticket = mainstageRef.current?.querySelector('[data-evidence-ticket]');

    if (!ticket) {
      return;
    }

    const animation = animate(ticket, {
      duration: 360,
      ease: 'out(4)',
      scale: [0.97, 1],
      rotate: [-0.6, 0],
    });

    return () => {
      animation.revert();
    };
  }, [done, hasHydrated, mission.id]);

  function updateFieldDraft(field: keyof FieldDraft, value: string | boolean) {
    setFieldDraft((draft) => ({ ...draft, [field]: value }));
  }

  function updatePilotProfile(field: Exclude<keyof PilotProfile, 'safeguards'>, value: string) {
    setPilotProfile((profile) => ({ ...profile, [field]: value }));
    setReportStatus('');
  }

  function toggleSafeguard(id: string) {
    setPilotProfile((profile) => ({
      ...profile,
      safeguards: {
        ...profile.safeguards,
        [id]: !profile.safeguards[id],
      },
    }));
    setReportStatus('');
  }

  function addFieldEntry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fieldDraft.observation.trim() && !fieldDraft.evidence.trim()) {
      return;
    }

    const entry: FieldEntry = {
      ...fieldDraft,
      id: `${mission.id}-${Date.now()}`,
      trackId,
      missionId: mission.id,
      missionTitle: mission.title,
      phase: mission.phase,
      createdAt: new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setFieldEntries((entries) => [entry, ...entries]);
    setDone((state) => ({ ...state, [mission.id]: true }));
    setFieldDraft(emptyDraft);
    setMotionSignal((signal) => signal + 1);
  }

  function removeFieldEntry(id: string) {
    setFieldEntries((entries) => entries.filter((entry) => entry.id !== id));
  }

  function toggleInterest(interest: string) {
    setInterests((current) => {
      if (current.includes(interest)) {
        return current.filter((item) => item !== interest);
      }

      return current.length >= 2 ? [current[1], interest] : [...current, interest];
    });
    setMotionSignal((signal) => signal + 1);
  }

  function enterTrack(id: TrackId) {
    setTrackId(id);
    setActivePhase(1);
    setView('mission');
  }

  function addRoadblock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!roadblockDraft.trim()) {
      return;
    }

    setRoadblocks((items) => [
      {
        id: `roadblock-${Date.now()}`,
        note: roadblockDraft.trim(),
        status: 'aberto',
        createdAt: new Date().toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
      ...items,
    ]);
    setRoadblockDraft('');
  }

  function toggleRoadblock(id: string) {
    setRoadblocks((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: item.status === 'aberto' ? 'acolhido' : 'aberto' } : item,
      ),
    );
  }

  function resetWorkspace() {
    window.localStorage.removeItem(STORAGE_KEY);
    setDone({});
    setFieldDraft(emptyDraft);
    setFieldEntries([]);
    setInterests([]);
    setPilotProfile(emptyPilotProfile);
    setRoadblockDraft('');
    setRoadblocks([]);
    setReportStatus('');
    setActivePhase(1);
    setView('gateway');
  }

  async function copyPilotReport() {
    try {
      await window.navigator.clipboard.writeText(pilotReport);
      setReportStatus('Relatorio copiado');
    } catch {
      setReportStatus('Nao foi possivel copiar automaticamente');
    }
  }

  async function installPwa() {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === 'accepted') {
      setInstallPrompt(null);
    }
  }

  function dismissInstallBanner() {
    window.localStorage.setItem(INSTALL_BANNER_DISMISSED_KEY, 'true');
    setInstallPrompt(null);
    setShowIosInstall(false);
  }

  return (
    <main className="shell">
      {(installPrompt || showIosInstall) && (
        <aside className="install-banner" aria-label="Instalar o aplicativo">
          <div className="install-mark" aria-hidden="true">
            <Download size={22} />
          </div>
          <div className="install-copy">
            <strong>Leve a Trilha Nossa Terra com você</strong>
            {showIosInstall ? (
              <span><Share2 size={15} /> Toque em Compartilhar e depois em “Adicionar à Tela de Início”.</span>
            ) : (
              <span>Instale o aplicativo para abrir em tela cheia e acessar sua trilha mais facilmente.</span>
            )}
          </div>
          {!showIosInstall && (
            <button className="install-action" type="button" onClick={installPwa}>
              Instalar
            </button>
          )}
          <button className="install-close" type="button" aria-label="Fechar aviso de instalação" onClick={dismissInstallBanner}>
            <X size={18} />
          </button>
        </aside>
      )}
      <section className="workspace">
        <aside className="sidebar" aria-label="Navegação da trilha">
          <div>
            <p className="eyebrow">Brota!</p>
            <h1>Ideias que começam onde a gente vive</h1>
            <p className="lede">
              Uma trilha para observar, conversar com pessoas, criar ideias e melhorar a Nossa Terra.
            </p>
          </div>

          <div className="track-list">
            <button className="track-button selected" type="button" onClick={() => setView('gateway')}>
              <span>Trilha Nossa Terra</span>
              <small>14 missões · 7–10 anos · zona rural e cidades pequenas</small>
            </button>
          </div>

          <div className="progress-panel">
            <div>
              <span>{complete}/14 missões concluídas</span>
              <strong>{pct}%</strong>
            </div>
            <div className="progress" ref={progressRef} aria-label={`Progresso ${pct}%`}>
              <span style={{ width: `${pct}%` }} />
            </div>
            <div className="storage-panel">
              <span>
                <Save size={15} />
                {hasHydrated ? 'Salvo neste navegador' : 'Preparando memória local'}
              </span>
              <button className="text-action" type="button" onClick={resetWorkspace}>
                <RotateCcw size={15} />
                Limpar registros
              </button>
            </div>
          </div>
        </aside>

        <section className="mainstage" ref={mainstageRef}>
          <nav className="view-tabs" aria-label="Áreas da trilha">
            {views.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  className={view === item.id ? 'active' : ''}
                  key={item.id}
                  onClick={() => setView(item.id)}
                  title={item.label}
                  aria-label={item.label}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {view === 'map' && (
            <section className="map-view" data-motion-surface>
              <div className="map-hero">
                <div className="section-head">
                  <p className="eyebrow">{trackProfile.name}</p>
                  <h2>{trackProfile.name}</h2>
                  <p>{trackProfile.intro}</p>
                  <p className="narrative-line">{interestMission.hook}</p>
                </div>
                <figure className="ecosystem-figure journey-figure" data-motion-anchor>
                  <img src={trackProfile.hero} alt={trackProfile.heroAlt} />
                  <figcaption>
                    <strong>{activeVariant.title}</strong>
                    <span>{activeVariant.question}</span>
                  </figcaption>
                </figure>
              </div>

              <div className="map-grid">
                {ruralChapters.map((chapter) => (
                  <article className="region-card chapter-card" data-motion-item key={chapter.title}>
                    <span className="chapter-icon" aria-hidden="true">{chapter.icon}</span>
                    <small>Missões {chapter.phases}</small>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.text}</p>
                  </article>
                ))}
              </div>

              <div className="phase-map" aria-label="Mapa de missões">
                {track.missions.map((item) => (
                  <button
                    className={`phase-node ${item.phase === activePhase ? 'current' : ''} ${
                      done[item.id] ? 'done' : ''
                    }`}
                    data-motion-item
                    key={item.id}
                    onClick={() => {
                      setActivePhase(item.phase);
                      setView('mission');
                    }}
                  >
                    <span>{String(item.phase).padStart(2, '0')}</span>
                    <small>{item.title}</small>
                  </button>
                ))}
              </div>
            </section>
          )}

          {view === 'mission' && (
            <section className="mission-view" data-motion-surface>
              <div className="mission-hero">
                <div>
                  <p className="eyebrow">{phaseSupport.chapter} · Missão {String(mission.phase).padStart(2, '0')}</p>
                  <h2>{mission.title}</h2>
                  <p>{phaseSupport.childCall}</p>
                  <p className="narrative-line">{interestMission.hook}</p>
                </div>
                <button
                  className="primary-action"
                  onClick={() => setView('fieldbook')}
                >
                  <BookOpen size={18} />
                  {done[mission.id] ? 'Ver minha pista' : 'Guardar minha pista'}
                </button>
              </div>

              <section className="child-mission-guide" data-motion-anchor>
                <article className="child-guide">
                  <div className="guide-heading">
                    <span className="guide-avatar" aria-hidden="true">{phaseSupport.icon}</span>
                    <div>
                      <p className="eyebrow">Caderno da criança</p>
                      <h3>Seu movimento nesta missão</h3>
                    </div>
                  </div>
                  <p>{phaseSupport.childMove}</p>
                  <div className="evidence-ticket" data-evidence-ticket>
                    <strong>Pista que fica</strong>
                    <span>{phaseSupport.evidence}</span>
                  </div>
                  <div className="thermometer" aria-label="Como foi para mim">
                    <span>🌞 Dei conta</span>
                    <span>⛅ Precisei de ajuda</span>
                    <span>🌧️ Quero tentar de outro jeito</span>
                  </div>
                </article>

              </section>

              <details className="mission-more" data-motion-item>
                <summary>Ver pergunta e próximo teste</summary>
                <div>
                  <p className="eyebrow">Sua escolha nesta missão</p>
                  <h3>{activeVariant.title}</h3>
                </div>
                <div className="narrative-grid">
                  <article>
                    <span>Pergunta para investigar</span>
                    <p>{interestMission.question}</p>
                  </article>
                  <article>
                    <span>Próximo teste</span>
                    <p>{interestMission.nextTest}</p>
                  </article>
                </div>
              </details>
            </section>
          )}

          {false && (
            <section className="support-view" data-motion-surface>
              <div className="section-head">
                <p className="eyebrow">Conteudos de apoio</p>
                <h2>Cartas para deduzir conceitos</h2>
                <p>
                  A turma pratica primeiro: observa, escuta, testa e decide. O nome adulto do conceito
                  aparece depois, como apoio do facilitador.
                </p>
              </div>

              <div className="support-layout">
                <section className="support-deck" aria-label="Cartas de apoio">
                  {supportCards.map((card) => (
                    <article className="support-card" data-motion-item key={card.title}>
                      <span>{card.title}</span>
                      <h3>{card.moment}</h3>
                      <p>{card.prompt}</p>
                      <small>{card.action}</small>
                    </article>
                  ))}
                </section>

                <aside className="flow-panel" data-motion-item>
                  <div>
                    <p className="eyebrow">Grafico da trilha</p>
                    <h3>Da observacao ao impacto</h3>
                  </div>
                  <div className="flow-steps">
                    {learningFlow.map((step) => (
                      <div className="flow-step" key={step.label}>
                        <span style={{ width: `${step.value}%` }} />
                        <strong>{step.label}</strong>
                        <small>{step.text}</small>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>

              <div className="ecosystem-signals" data-motion-item>
                {ecosystemSignals.map(([title, text]) => (
                  <article key={title}>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </article>
                ))}
              </div>

              <section className="concept-panel" data-motion-item>
                <div className="split-heading">
                  <Lightbulb size={22} />
                  <div>
                    <p className="eyebrow">Conceitos invisiveis</p>
                    <h3>Aprender fazendo, nomear depois</h3>
                  </div>
                </div>

                <div className="concept-grid">
                  {conceptDeck.map((concept) => {
                    const Icon = concept.icon;

                    return (
                      <article className="concept-card" key={concept.id}>
                        <div className="concept-card-head">
                          <Icon size={20} />
                          <span>{concept.kidTitle}</span>
                        </div>
                        <p>{concept.moment}</p>
                        <div className="concept-move">
                          <strong>Movimento de campo</strong>
                          <span>{concept.fieldMove}</span>
                        </div>
                        <div className="concept-move">
                          <strong>Pergunta para deduzir</strong>
                          <span>{concept.deductionQuestion}</span>
                        </div>
                        <small>{concept.evidence}</small>
                        <details>
                          <summary>Nome para o facilitador</summary>
                          <p>
                            <strong>{concept.adultName}:</strong> {concept.facilitatorReveal}
                          </p>
                        </details>
                      </article>
                    );
                  })}
                </div>
              </section>
            </section>
          )}

          {view === 'gateway' && (
            <section className="gateway-view" data-motion-surface>
              <div className="gateway-hero">
                <div className="section-head">
                  <p className="eyebrow">Sua aventura começa aqui</p>
                  <h2>Vamos descobrir uma pista da Nossa Terra?</h2>
                  <p>
                    Você vai escolher algo que desperta curiosidade, começar pela primeira missão e guardar
                    cada descoberta no seu caderno. Não precisa saber a resposta antes de começar.
                  </p>
                </div>
                <figure className="ecosystem-figure journey-figure" data-motion-anchor>
                  <img src={trackProfile.hero} alt={trackProfile.heroAlt} />
                  <figcaption>
                    <strong>{trackProfile.name}</strong>
                    <span>
                      {trackProfile.age} anos · {trackProfile.contextLabel} · linguagem: {trackProfile.language}
                    </span>
                  </figcaption>
                </figure>
              </div>

              <div className="onboarding-path" aria-label="Como começar">
                <article className="onboarding-step active">
                  <span>1</span>
                  <div><strong>Escolha uma curiosidade</strong><small>Marque uma ou duas coisas que você gosta de observar.</small></div>
                </article>
                <article className="onboarding-step">
                  <span>2</span>
                  <div><strong>Faça a missão de agora</strong><small>A tela mostra um movimento pequeno e possível.</small></div>
                </article>
                <article className="onboarding-step">
                  <span>3</span>
                  <div><strong>Guarde uma pista</strong><small>Desenhe, escreva ou registre o que descobriu.</small></div>
                </article>
              </div>

              <div className="interest-panel onboarding-choice" data-motion-item>
                <div>
                  <p className="eyebrow">Passo 1 de 3</p>
                  <h3>O que chama sua atenção por aí?</h3>
                  <p>Escolha até duas opções. Se ainda não souber, pode começar mesmo assim.</p>
                </div>
                <div className="interest-grid">
                  {interestOptions.map((interest) => (
                    <button
                      className={`interest-chip ${interests.includes(interest) ? 'selected' : ''}`}
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                <div className="story-preview" aria-live="polite">
                  <WandSparkles size={20} />
                  <div>
                    <p><strong>{activeVariant.title}</strong></p>
                    <p>{interests.length ? interestMission.hook : 'Escolha uma curiosidade para adaptar as atividades da trilha.'}</p>
                    {interests.length > 0 && (
                      <ul className="interest-impact-list">
                        {interestMission.changes.map((change) => <li key={change}>{change}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="onboarding-cta">
                  <div>
                    <small>Seu primeiro destino</small>
                    <strong>Missão 01 · Mapa de pistas</strong>
                  </div>
                  <div className="onboarding-actions">
                    <button className="primary-action" type="button" onClick={() => enterTrack('rural-kids')}>
                      Começar minha primeira missão
                      <Route size={18} />
                    </button>
                    <a className="workbook-download" href="/materials/trilha-nossa-terra-caderno-da-crianca.pdf" download>
                      <Download size={17} />
                      Baixar caderno para imprimir
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {view === 'fieldbook' && (
            <section className="fieldbook-view" data-motion-surface>
              <div className="section-head">
                <p className="eyebrow">Caderno de campo</p>
                <h2>Memória viva da trilha</h2>
                <p>
                  Guarde o que você observou, a pista encontrada e o que quer testar depois.
                </p>
              </div>

              <div className="fieldbook-layout">
                <form className="field-form" data-motion-item onSubmit={addFieldEntry}>
                  <div className="form-heading">
                    <div>
                      <p className="eyebrow">Registro da missão atual</p>
                      <h3>
                        {String(mission.phase).padStart(2, '0')}. {mission.title}
                      </h3>
                    </div>
                    <button className="primary-action compact" type="submit">
                      <Plus size={18} />
                      Registrar
                    </button>
                  </div>

                  <label>
                    Tipo de evidência
                    <select
                      value={fieldDraft.kind}
                      onChange={(event) => updateFieldDraft('kind', event.target.value)}
                    >
                      {evidenceKinds.map((kind) => (
                        <option key={kind.value} value={kind.value}>
                          {kind.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="form-grid">
                    <label>
                      Observação
                      <textarea
                        value={fieldDraft.observation}
                        onChange={(event) => updateFieldDraft('observation', event.target.value)}
                        placeholder="O que vimos, ouvimos ou percebemos?"
                      />
                    </label>
                    <label>
                      Hipótese
                      <textarea
                        value={fieldDraft.hypothesis}
                        onChange={(event) => updateFieldDraft('hypothesis', event.target.value)}
                        placeholder="O que achamos que pode estar acontecendo?"
                      />
                    </label>
                    <label>
                      Evidência
                      <textarea
                        value={fieldDraft.evidence}
                        onChange={(event) => updateFieldDraft('evidence', event.target.value)}
                        placeholder="Qual desenho, frase, foto autorizada ou teste sustenta isso?"
                      />
                    </label>
                    <label>
                      Decisão do time
                      <textarea
                        value={fieldDraft.decision}
                        onChange={(event) => updateFieldDraft('decision', event.target.value)}
                        placeholder="O que o grupo decidiu fazer agora?"
                      />
                    </label>
                  </div>

                  <label>
                    Próximo teste pequeno
                    <input
                      value={fieldDraft.nextTest}
                      onChange={(event) => updateFieldDraft('nextTest', event.target.value)}
                      placeholder={interestMission.nextTest}
                    />
                  </label>

                  <label className="check-row">
                    <input
                      checked={fieldDraft.shared}
                      type="checkbox"
                      onChange={(event) => updateFieldDraft('shared', event.target.checked)}
                    />
                    Enviar este registro para o mural coletivo
                  </label>
                </form>

                <aside className="entry-panel" data-motion-item>
                  <div className="entry-panel-head">
                    <div>
                      <p className="eyebrow">Registros desta trilha</p>
                      <h3>{currentEntries.length} {currentEntries.length === 1 ? 'evidência' : 'evidências'}</h3>
                    </div>
                    <span>{missionEntries.length} nesta missão</span>
                  </div>

                  <div className="entry-list">
                    {currentEntries.length === 0 ? (
                      <article className="empty-state" data-motion-item>
                        <BookOpen size={24} />
                        <p>O primeiro registro do grupo vai aparecer aqui.</p>
                      </article>
                    ) : (
                      currentEntries.map((entry) => {
                        const kind = evidenceKinds.find((item) => item.value === entry.kind);
                        const Icon = kind?.icon ?? FileText;

                        return (
                          <article className="entry-card" data-motion-item key={entry.id}>
                            <div className="entry-meta">
                              <span>
                                <Icon size={16} />
                                {kind?.label ?? entry.kind}
                              </span>
                              <small>
                                Missão {String(entry.phase).padStart(2, '0')} · {entry.createdAt}
                              </small>
                            </div>
                            <h4>{entry.missionTitle}</h4>
                            <p>{entry.observation || entry.evidence}</p>
                            {entry.nextTest && <strong>Próximo teste: {entry.nextTest}</strong>}
                            <button
                              className="icon-action"
                              type="button"
                              onClick={() => removeFieldEntry(entry.id)}
                              title="Remover registro"
                              aria-label="Remover registro"
                            >
                              <Trash2 size={16} />
                            </button>
                          </article>
                        );
                      })
                    )}
                  </div>
                </aside>
              </div>
            </section>
          )}

          {false && (
            <section className="radio-view" data-motion-surface>
              <div className="section-head">
                <p className="eyebrow">Radio comunitaria</p>
                <h2>O facilitador pergunta antes de explicar</h2>
              </div>
              <div className="broadcast" data-motion-item>
                <Radio size={32} />
                <p>
                  "Que evidencia voces ja tem? O que ainda e so palpite? Qual pessoa real poderia
                  ajudar a testar a ideia antes da proxima rodada?"
                </p>
              </div>
              <div className="rules-grid">
                {[
                  'Uma pergunta por vez.',
                  'Evidencia antes de solucao.',
                  'Autoria sempre do time.',
                  'Pausa fora da tela quando a missao pedir territorio.',
                ].map((rule) => (
                  <div className="rule" data-motion-item key={rule}>
                    <Sparkles size={18} />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {false && (
            <section className="facilitator-view" data-motion-surface>
              <div className="section-head">
                <p className="eyebrow">Area do facilitador</p>
                <h2>IA rapida, humano profundo</h2>
                <p>
                  O agente ajuda a organizar respostas curtas e construir ganchos narrativos. O
                  facilitador humano entra quando aparecem bloqueios, conflitos, inseguranca ou
                  reflexoes que pedem presenca.
                </p>
              </div>

              <section className="pilot-profile" data-motion-item>
                <div>
                  <p className="eyebrow">Perfil do piloto</p>
                  <h3>{pilotIdentity}</h3>
                </div>
                <div className="pilot-profile-grid">
                  <label>
                    Escola ou rede
                    <input
                      value={pilotProfile.school}
                      onChange={(event) => updatePilotProfile('school', event.target.value)}
                      placeholder="Ex.: Escola Municipal Rio Verde"
                    />
                  </label>
                  <label>
                    Turma
                    <input
                      value={pilotProfile.className}
                      onChange={(event) => updatePilotProfile('className', event.target.value)}
                      placeholder="Ex.: 5o ano B"
                    />
                  </label>
                  <label>
                    Grupo
                    <input
                      value={pilotProfile.groupName}
                      onChange={(event) => updatePilotProfile('groupName', event.target.value)}
                      placeholder="Ex.: Time Horta Viva"
                    />
                  </label>
                  <label>
                    Facilitador
                    <input
                      value={pilotProfile.facilitator}
                      onChange={(event) => updatePilotProfile('facilitator', event.target.value)}
                      placeholder="Nome de quem acompanha"
                    />
                  </label>
                  <label>
                    Territorio observado
                    <input
                      value={pilotProfile.territory}
                      onChange={(event) => updatePilotProfile('territory', event.target.value)}
                      placeholder="Ex.: feira, bairro, escola, horta"
                    />
                  </label>
                  <label>
                    Janela do piloto
                    <input
                      value={pilotProfile.window}
                      onChange={(event) => updatePilotProfile('window', event.target.value)}
                      placeholder="Ex.: agosto a setembro"
                    />
                  </label>
                </div>
                <div className="safeguard-panel">
                  <div>
                    <p className="eyebrow">Cuidado antes de publicar</p>
                    <h4>{missingSafeguards === 0 ? 'Checklist completo' : `${missingSafeguards} cuidados pendentes`}</h4>
                  </div>
                  <div className="safeguard-grid">
                    {safeguardItems.map((item) => (
                      <label className="check-row" key={item.id}>
                        <input
                          checked={Boolean(pilotProfile.safeguards[item.id])}
                          type="checkbox"
                          onChange={() => toggleSafeguard(item.id)}
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              <div className="facilitator-grid">
                <article className="facilitator-card" data-motion-item>
                  <div className="split-heading">
                    <Bot size={22} />
                    <div>
                      <p className="eyebrow">Agente IA</p>
                      <h3>Resposta rapida</h3>
                    </div>
                  </div>
                  <p>{aiQuickResponse}</p>
                  <div className="protocol-list">
                    <span>Organizar evidencias</span>
                    <span>Sugerir pergunta unica</span>
                    <span>Gerar gancho narrativo</span>
                    <span>Propor proximo teste pequeno</span>
                  </div>
                </article>

                <article className="facilitator-card strong" data-motion-item>
                  <div className="split-heading">
                    <UserRoundCheck size={22} />
                    <div>
                      <p className="eyebrow">Humano</p>
                      <h3>Reflexao profunda</h3>
                    </div>
                  </div>
                  <p>
                    Intervir quando a turma precisa de acolhimento, mediacao, leitura emocional,
                    negociacao de papeis ou coragem para testar algo no mundo real.
                  </p>
                  <div className="protocol-list">
                    <span>Escutar sem apressar</span>
                    <span>Nomear tensoes do grupo</span>
                    <span>Devolver autoria</span>
                    <span>Destravar roadblocks humanos</span>
                  </div>
                </article>
              </div>

              <div className="ai-literacy-panel" data-motion-item>
                <div>
                  <p className="eyebrow">Literacia em IA</p>
                  <h3>Protocolo antes de aceitar uma sugestao</h3>
                </div>
                <div className="protocol-list">
                  {aiLiteracyProtocol.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="pilot-panel" data-motion-item>
                <div>
                  <p className="eyebrow">Resumo de piloto</p>
                  <h3>Sinais da turma nesta trilha</h3>
                </div>
                <div className="pilot-grid">
                  <article>
                    <strong>{complete}/14</strong>
                    <span>Missoes com evidencia</span>
                  </article>
                  <article>
                    <strong>{currentEntries.length}</strong>
                    <span>Registros no caderno</span>
                  </article>
                  <article>
                    <strong>{sharedEntries.length}</strong>
                    <span>Descobertas no mural</span>
                  </article>
                  <article>
                    <strong>{openRoadblocks}</strong>
                    <span>Roadblocks abertos</span>
                  </article>
                </div>
                <p>{pilotSignal}</p>
                <div className="pilot-report">
                  <div>
                    <p className="eyebrow">Relatorio rapido</p>
                    <h4>Para colar em Obsidian, Notion ou e-mail da escola</h4>
                  </div>
                  <pre>{pilotReport}</pre>
                  <button className="primary-action compact" type="button" onClick={copyPilotReport}>
                    <ClipboardList size={18} />
                    Copiar relatorio
                  </button>
                  {reportStatus && <span>{reportStatus}</span>}
                </div>
              </div>

              <form className="roadblock-form" data-motion-item onSubmit={addRoadblock}>
                <label>
                  Roadblock para acompanhamento humano
                  <textarea
                    value={roadblockDraft}
                    onChange={(event) => setRoadblockDraft(event.target.value)}
                    placeholder="Ex.: o grupo nao consegue escolher uma ideia sem excluir alguem"
                  />
                </label>
                <button className="primary-action compact" type="submit">
                  <Plus size={18} />
                  Registrar roadblock
                </button>
              </form>

              <div className="roadblock-list">
                {roadblocks.length === 0 ? (
                  <article className="empty-state" data-motion-item>
                    <UserRoundCheck size={24} />
                    <p>Os bloqueios humanos que precisarem de acompanhamento aparecem aqui.</p>
                  </article>
                ) : (
                  roadblocks.map((item) => (
                    <article className={`roadblock-card ${item.status}`} data-motion-item key={item.id}>
                      <div>
                        <span>{item.status === 'aberto' ? 'Aberto' : 'Acolhido'}</span>
                        <small>{item.createdAt}</small>
                      </div>
                      <p>{item.note}</p>
                      <button className="text-action" type="button" onClick={() => toggleRoadblock(item.id)}>
                        {item.status === 'aberto' ? 'Marcar acolhido' : 'Reabrir'}
                      </button>
                    </article>
                  ))
                )}
              </div>
            </section>
          )}

          {view === 'mural' && (
            <section className="mural-view" data-motion-surface>
              <div className="section-head">
                <p className="eyebrow">Mural coletivo</p>
                <h2>Descobertas viram inteligencia da turma</h2>
              </div>
              <div className="mural-grid">
                {sharedEntries.length === 0
                  ? [
                      ['Escuta', 'Uma frase de alguem da comunidade que mudou a ideia inicial.'],
                      ['Contradicao', 'Algo que parecia simples, mas mostrou outro lado do sistema.'],
                      ['Prototipo', 'Um teste pequeno feito com papel, conversa, Scratch ou encenacao.'],
                      ['Melhoria', 'Uma decisao tomada depois de ouvir critica real.'],
                    ].map(([title, text]) => (
                      <article className="mural-note" data-motion-item key={title}>
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </article>
                    ))
                  : sharedEntries.map((entry) => (
                      <article className="mural-note" data-motion-item key={entry.id}>
                        <span className="note-kicker">
                          {journeyProfiles[entry.trackId].name} · Missao {String(entry.phase).padStart(2, '0')}
                        </span>
                        <h3>{entry.missionTitle}</h3>
                        <p>{entry.observation || entry.evidence}</p>
                        {entry.decision && <strong>Decisao: {entry.decision}</strong>}
                      </article>
                    ))}
              </div>
            </section>
          )}
        </section>
      </section>
    </main>
  );
}
