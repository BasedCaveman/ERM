'use client';

import {
  BookOpen,
  Bot,
  Camera,
  CheckCircle2,
  ClipboardList,
  FileText,
  Hammer,
  Lightbulb,
  Map,
  MessageSquareText,
  Mic2,
  Plus,
  Radio,
  RotateCcw,
  Route,
  Save,
  Sparkles,
  Trash2,
  Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { content } from '../lib/content';

type TrackId = 'rural-kids' | 'urban-kids' | 'rural-youth' | 'urban-youth';
type ViewId = 'map' | 'mission' | 'fieldbook' | 'radio' | 'mural';

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
  trackId?: TrackId;
};

const STORAGE_KEY = 'erm:v2:workspace';

const trackNames: Record<TrackId, string> = {
  'rural-kids': 'Oficina da Vila',
  'urban-kids': 'Missao Bairro',
  'rural-youth': 'Laboratorio das Colinas',
  'urban-youth': 'Cidade Infinita',
};

const trackIntros: Record<TrackId, string> = {
  'rural-kids':
    'Criancas pequenas investigam feira, horta, familia, animais, clima e vizinhanca com linguagem concreta.',
  'urban-kids':
    'Criancas pequenas exploram escola, bairro, praca, cantina, transporte e pequenos combinados comunitarios.',
  'rural-youth':
    'Jovens investigam producao local, turismo, logistica, clima, comercio e servicos comunitarios.',
  'urban-youth':
    'Jovens trabalham mobilidade, consumo, cultura, estudos, servicos digitais locais e vida de bairro.',
};

const regions = [
  { title: 'Oficina', icon: Hammer, text: 'Prototipos pequenos, materiais simples e testes rapidos.' },
  { title: 'Caderno', icon: BookOpen, text: 'Notas, desenhos, fotos autorizadas, audios e hipoteses.' },
  { title: 'Radio', icon: Radio, text: 'Chamados da comunidade, perguntas de roda e relatos curtos.' },
  { title: 'Mural', icon: Users, text: 'Descobertas dos times viram patrimonio compartilhado.' },
];

const views = [
  { id: 'map', label: 'Mapa', icon: Map },
  { id: 'mission', label: 'Missao', icon: Route },
  { id: 'fieldbook', label: 'Caderno', icon: BookOpen },
  { id: 'radio', label: 'Radio', icon: Mic2 },
  { id: 'mural', label: 'Mural', icon: MessageSquareText },
] satisfies Array<{ id: ViewId; label: string; icon: typeof Map }>;

const cognitiveLoop = [
  'Predizer o que a turma acha que vai acontecer.',
  'Observar uma contradicao no territorio.',
  'Escolher uma decisao pequena de time.',
  'Testar fora da tela com alguem real.',
  'Registrar evidencia e refletir em roda.',
];

const evidenceKinds = [
  { value: 'desenho', label: 'Desenho', icon: FileText },
  { value: 'foto', label: 'Foto autorizada', icon: Camera },
  { value: 'audio', label: 'Audio curto', icon: Mic2 },
  { value: 'entrevista', label: 'Frase de entrevista', icon: MessageSquareText },
  { value: 'hipotese', label: 'Hipotese', icon: Lightbulb },
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

export default function Home() {
  const [trackId, setTrackId] = useState<TrackId>('rural-kids');
  const [view, setView] = useState<ViewId>('map');
  const [activePhase, setActivePhase] = useState(1);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [fieldDraft, setFieldDraft] = useState<FieldDraft>(emptyDraft);
  const [fieldEntries, setFieldEntries] = useState<FieldEntry[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  const track = useMemo(() => content.tracks.find((item) => item.id === trackId)!, [trackId]);
  const mission = track.missions.find((item) => item.phase === activePhase) ?? track.missions[0];
  const complete = track.missions.filter((item) => done[item.id]).length;
  const pct = Math.round((complete / track.missions.length) * 100);
  const currentEntries = fieldEntries.filter((entry) => entry.trackId === trackId);
  const missionEntries = currentEntries.filter((entry) => entry.missionId === mission.id);
  const sharedEntries = fieldEntries.filter((entry) => entry.shared);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);

      if (raw) {
        const saved = JSON.parse(raw) as SavedWorkspace;

        if (saved.trackId && saved.trackId in trackNames) {
          setTrackId(saved.trackId);
        }

        if (typeof saved.activePhase === 'number' && saved.activePhase >= 1 && saved.activePhase <= 14) {
          setActivePhase(saved.activePhase);
        }

        if (saved.done && typeof saved.done === 'object') {
          setDone(saved.done);
        }

        if (Array.isArray(saved.fieldEntries)) {
          setFieldEntries(saved.fieldEntries);
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHasHydrated(true);
    }
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
        trackId,
      } satisfies SavedWorkspace),
    );
  }, [activePhase, done, fieldEntries, hasHydrated, trackId]);

  function updateFieldDraft(field: keyof FieldDraft, value: string | boolean) {
    setFieldDraft((draft) => ({ ...draft, [field]: value }));
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
  }

  function removeFieldEntry(id: string) {
    setFieldEntries((entries) => entries.filter((entry) => entry.id !== id));
  }

  function resetWorkspace() {
    window.localStorage.removeItem(STORAGE_KEY);
    setDone({});
    setFieldDraft(emptyDraft);
    setFieldEntries([]);
    setActivePhase(1);
  }

  return (
    <main className="shell">
      <section className="workspace">
        <aside className="sidebar" aria-label="Navegacao do ecossistema">
          <div>
            <p className="eyebrow">ERM V2</p>
            <h1>Ecossistema vivo de aprendizagem</h1>
            <p className="lede">
              Um mapa narrativo para observar sistemas, conversar com pessoas, criar hipoteses,
              prototipar e usar IA sem terceirizar autoria.
            </p>
          </div>

          <div className="track-list">
            {content.tracks.map((item) => {
              const id = item.id as TrackId;
              return (
                <button
                  className={`track-button ${trackId === id ? 'selected' : ''}`}
                  key={item.id}
                  onClick={() => {
                    setTrackId(id);
                    setActivePhase(1);
                  }}
                >
                  <span>{trackNames[id]}</span>
                  <small>
                    {item.age} anos · {item.context === 'rural' ? 'rural' : 'urbano'}
                  </small>
                </button>
              );
            })}
          </div>

          <div className="progress-panel">
            <div>
              <span>{complete}/14 missoes concluidas</span>
              <strong>{pct}%</strong>
            </div>
            <div className="progress" aria-label={`Progresso ${pct}%`}>
              <span style={{ width: `${pct}%` }} />
            </div>
            <div className="storage-panel">
              <span>
                <Save size={15} />
                {hasHydrated ? 'Salvo neste navegador' : 'Preparando memoria local'}
              </span>
              <button className="text-action" type="button" onClick={resetWorkspace}>
                <RotateCcw size={15} />
                Limpar registros
              </button>
            </div>
          </div>
        </aside>

        <section className="mainstage">
          <nav className="view-tabs" aria-label="Areas do ecossistema">
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
            <section className="map-view">
              <div className="section-head">
                <p className="eyebrow">{trackNames[trackId]}</p>
                <h2>{track.pt}</h2>
                <p>{trackIntros[trackId]}</p>
              </div>

              <div className="map-grid">
                {regions.map((region) => {
                  const Icon = region.icon;
                  return (
                    <article className="region-card" key={region.title}>
                      <Icon size={24} />
                      <h3>{region.title}</h3>
                      <p>{region.text}</p>
                    </article>
                  );
                })}
              </div>

              <div className="phase-map" aria-label="Mapa de missoes">
                {track.missions.map((item) => (
                  <button
                    className={`phase-node ${item.phase === activePhase ? 'current' : ''} ${
                      done[item.id] ? 'done' : ''
                    }`}
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
            <section className="mission-view">
              <div className="mission-hero">
                <div>
                  <p className="eyebrow">Missao {String(mission.phase).padStart(2, '0')}</p>
                  <h2>{mission.title}</h2>
                  <p>{mission.storyPt}</p>
                </div>
                <button
                  className="primary-action"
                  onClick={() => setDone((state) => ({ ...state, [mission.id]: !state[mission.id] }))}
                >
                  <CheckCircle2 size={18} />
                  {done[mission.id] ? 'Concluida' : 'Marcar evidencia'}
                </button>
              </div>

              <div className="mission-layout">
                <article className="task-card">
                  <ClipboardList size={22} />
                  <h3>Na tela</h3>
                  <p>{mission.screenPt}</p>
                </article>
                <article className="task-card strong">
                  <Route size={22} />
                  <h3>Fora da tela</h3>
                  <p>{mission.offlinePt}</p>
                </article>
                <article className="task-card">
                  <Bot size={22} />
                  <h3>IA facilitadora</h3>
                  <p>{mission.aiPrepPt}</p>
                </article>
              </div>

              <div className="loop-panel">
                <h3>Cena cognitiva</h3>
                <ol>
                  {cognitiveLoop.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </section>
          )}

          {view === 'fieldbook' && (
            <section className="fieldbook-view">
              <div className="section-head">
                <p className="eyebrow">Caderno de campo</p>
                <h2>Memoria viva da jornada</h2>
                <p>
                  Cada registro deve separar observacao, hipotese, evidencia, decisao e proximo teste.
                </p>
              </div>

              <div className="fieldbook-layout">
                <form className="field-form" onSubmit={addFieldEntry}>
                  <div className="form-heading">
                    <div>
                      <p className="eyebrow">Registro da missao atual</p>
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
                    Tipo de evidencia
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
                      Observacao
                      <textarea
                        value={fieldDraft.observation}
                        onChange={(event) => updateFieldDraft('observation', event.target.value)}
                        placeholder="O que vimos, ouvimos ou percebemos?"
                      />
                    </label>
                    <label>
                      Hipotese
                      <textarea
                        value={fieldDraft.hypothesis}
                        onChange={(event) => updateFieldDraft('hypothesis', event.target.value)}
                        placeholder="O que achamos que pode estar acontecendo?"
                      />
                    </label>
                    <label>
                      Evidencia
                      <textarea
                        value={fieldDraft.evidence}
                        onChange={(event) => updateFieldDraft('evidence', event.target.value)}
                        placeholder="Qual desenho, frase, foto autorizada ou teste sustenta isso?"
                      />
                    </label>
                    <label>
                      Decisao do time
                      <textarea
                        value={fieldDraft.decision}
                        onChange={(event) => updateFieldDraft('decision', event.target.value)}
                        placeholder="O que o grupo decidiu fazer agora?"
                      />
                    </label>
                  </div>

                  <label>
                    Proximo teste pequeno
                    <input
                      value={fieldDraft.nextTest}
                      onChange={(event) => updateFieldDraft('nextTest', event.target.value)}
                      placeholder="Ex.: conversar com 2 pessoas da feira"
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

                <aside className="entry-panel">
                  <div className="entry-panel-head">
                    <div>
                      <p className="eyebrow">Registros desta trilha</p>
                      <h3>{currentEntries.length} evidencias</h3>
                    </div>
                    <span>{missionEntries.length} nesta missao</span>
                  </div>

                  <div className="entry-list">
                    {currentEntries.length === 0 ? (
                      <article className="empty-state">
                        <BookOpen size={24} />
                        <p>O primeiro registro do grupo vai aparecer aqui.</p>
                      </article>
                    ) : (
                      currentEntries.map((entry) => {
                        const kind = evidenceKinds.find((item) => item.value === entry.kind);
                        const Icon = kind?.icon ?? FileText;

                        return (
                          <article className="entry-card" key={entry.id}>
                            <div className="entry-meta">
                              <span>
                                <Icon size={16} />
                                {kind?.label ?? entry.kind}
                              </span>
                              <small>
                                Missao {String(entry.phase).padStart(2, '0')} · {entry.createdAt}
                              </small>
                            </div>
                            <h4>{entry.missionTitle}</h4>
                            <p>{entry.observation || entry.evidence}</p>
                            {entry.nextTest && <strong>Proximo teste: {entry.nextTest}</strong>}
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

          {view === 'radio' && (
            <section className="radio-view">
              <div className="section-head">
                <p className="eyebrow">Radio comunitaria</p>
                <h2>O facilitador pergunta antes de explicar</h2>
              </div>
              <div className="broadcast">
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
                  <div className="rule" key={rule}>
                    <Sparkles size={18} />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {view === 'mural' && (
            <section className="mural-view">
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
                      <article className="mural-note" key={title}>
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </article>
                    ))
                  : sharedEntries.map((entry) => (
                      <article className="mural-note" key={entry.id}>
                        <span className="note-kicker">
                          {trackNames[entry.trackId]} · Missao {String(entry.phase).padStart(2, '0')}
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
