'use client';

import {
  BookOpen,
  Bot,
  CheckCircle2,
  ClipboardList,
  Hammer,
  Map,
  MessageSquareText,
  Mic2,
  Radio,
  Route,
  Sparkles,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { content } from '../lib/content';

type TrackId = 'rural-kids' | 'urban-kids' | 'rural-youth' | 'urban-youth';
type ViewId = 'map' | 'mission' | 'fieldbook' | 'radio' | 'mural';

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

export default function Home() {
  const [trackId, setTrackId] = useState<TrackId>('rural-kids');
  const [view, setView] = useState<ViewId>('map');
  const [activePhase, setActivePhase] = useState(1);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const track = useMemo(() => content.tracks.find((item) => item.id === trackId)!, [trackId]);
  const mission = track.missions.find((item) => item.phase === activePhase) ?? track.missions[0];
  const complete = track.missions.filter((item) => done[item.id]).length;
  const pct = Math.round((complete / track.missions.length) * 100);

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
              <div className="notebook-grid">
                {['Desenho', 'Foto autorizada', 'Audio curto', 'Frase de entrevista', 'Hipotese', 'Teste'].map(
                  (item) => (
                    <article className="notebook-card" key={item}>
                      <span />
                      <h3>{item}</h3>
                      <p>Espaco para transformar mundo real em material de reflexao do grupo.</p>
                    </article>
                  ),
                )}
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
                {[
                  ['Escuta', 'Uma frase de alguem da comunidade que mudou a ideia inicial.'],
                  ['Contradicao', 'Algo que parecia simples, mas mostrou outro lado do sistema.'],
                  ['Prototipo', 'Um teste pequeno feito com papel, conversa, Scratch ou encenacao.'],
                  ['Melhoria', 'Uma decisao tomada depois de ouvir critica real.'],
                ].map(([title, text]) => (
                  <article className="mural-note" key={title}>
                    <h3>{title}</h3>
                    <p>{text}</p>
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
