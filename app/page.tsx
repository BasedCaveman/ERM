
'use client';

type TrackId = "rural-kids" | "urban-kids" | "rural-youth" | "urban-youth";
import { useMemo, useState } from 'react';
import { content } from '../lib/content';

type Lang = 'pt'|'en'|'es';
const langNames: Record<Lang,string> = { pt:'Português', en:'English', es:'Español' };

function tMission(m:any, lang:Lang){
  if(lang==='pt') return m;
  const dict:any = {
    en:{storyPt:'Today the group opens a new door: observe the local example with the eyes of someone who cares, asks, creates and improves.',screenPt:'Use the project board to register one discovery, one doubt and one team decision.',offlinePt:'Observe your place without a phone. Bring a drawing, note or authorized photo showing a real need.',reflectionPt:'What did we discover that we did not know before?',aiPrepPt:'Use AI as an organizer, not as the owner of the answer. The team decides.',scratchPt:'Create a simple Scratch screen, button, character or flow that represents the solution.'},
    es:{storyPt:'Hoy el grupo abre una nueva puerta: observar el contexto local con ojos de quien cuida, pregunta, crea y mejora.',screenPt:'Usa el tablero del proyecto para registrar un descubrimiento, una duda y una decisión del equipo.',offlinePt:'Observa tu lugar sin celular. Trae un dibujo, nota o foto autorizada que muestre una necesidad real.',reflectionPt:'¿Qué descubrimos que antes no sabíamos?',aiPrepPt:'Usa la IA como organizadora, no como dueña de la respuesta. El equipo decide.',scratchPt:'Crea en Scratch una pantalla, botón, personaje o flujo simple que represente la solución.'}
  };
  return {...m, ...dict[lang], title: lang==='en'? ['Start','What is entrepreneurship?','Simulator','Challenges and teams','Empathy: activate','Insights','Having ideas','Prototype','Canvas','Learning from tests','Creation sprint','Preparing the pitch','Pitch','What now?'][m.phase-1] : ['Largada','¿Qué es emprender?','Simulador','Desafíos y equipos','Empatía: activar','Descubrimientos','Tener ideas','Prototipo','Canvas','Aprender con pruebas','Maratón de creación','Preparar la presentación','Presentación','¿Y ahora?'][m.phase-1]}
}

export default function Home(){
  const [lang,setLang]=useState<Lang>('pt');
  const [trackId,setTrackId]=useState<TrackId>("rural-kids");
  const [done,setDone]=useState<Record<string,boolean>>({});
  const track = useMemo(()=>content.tracks.find(t=>t.id===trackId)!,[trackId]);
  const labels = content.translations[lang];
  const complete = track.missions.filter(m=>done[m.id]).length;
  const pct = Math.round((complete/track.missions.length)*100);
  const trackTitle = (track as any)[lang] || track.pt;
  return <main className="shell">
    <section className="hero">
      <div className="panel">
        <div className="eyebrow">PWA · empreendedorismo · IA com curadoria</div>
        <h1 className="title">Trilhas Empreendedoras Mirins</h1>
        <p className="subtitle">Um website instalável para crianças e jovens criarem soluções úteis, testarem ideias em comunidade e chegarem prontos para usar IA como parceira de prototipagem, sem virar dependência de tela.</p>
        <div className="tabs">{(['pt','en','es'] as Lang[]).map(l=><button className={'button '+(lang===l?'':'ghost')} key={l} onClick={()=>setLang(l)}>{langNames[l]}</button>)}</div>
      </div>
      <div className="panel assistant">
        <div className="eyebrow">{labels.facilitator}</div>
        <h2>Guia vivo da trilha 🌿</h2>
        <p>O assistente usa o manual do adviser como bússola: faz perguntas, organiza a roda, sugere pausas fora da tela e nunca entrega a resposta pronta.</p>
        <p className="small">Regra de ouro: criança observa primeiro, conversa depois, prototipa pequeno, testa com gente real e só então pede ajuda para a IA organizar ou melhorar.</p>
      </div>
    </section>
    <section className="grid">{content.tracks.map(tr=><article className="card" key={tr.id}><h2>{(tr as any)[lang] || tr.pt}</h2><p>{tr.age} · {tr.context==='rural'?'zona rural':'centro urbano'}</p><p className="small">Tom: {tr.tone}</p><button className="button" onClick={()=>setTrackId(tr.id)}>{labels.start}</button></article>)}</section>
    <section className="panel" style={{marginTop:24}}>
      <div className="eyebrow">{trackTitle}</div><h2>{labels.progress}: {complete}/14</h2><div className="progress"><div className="bar" style={{width:pct+'%'}} /></div>
      <div className="two" style={{marginTop:18}}>
        <div>{track.missions.map(raw=>{const m=tMission(raw,lang);return <div className="mission" key={m.id}><div className="icon">{m.icon}</div><div><h3>{String(m.phase).padStart(2,'0')}. {m.title}</h3><p>{m.storyPt}</p><span className="pill">{labels.badge}: {m.badgePt}</span><p><b>{labels.screen}:</b> {m.screenPt}</p><p><b>{labels.offline}:</b> {m.offlinePt}</p><p><b>Scratch:</b> {m.scratchPt}</p><p><b>{labels.reflection}:</b> {m.reflectionPt}</p><p><b>IA:</b> {m.aiPrepPt}</p><button className="button ghost" onClick={()=>setDone(d=>({...d,[m.id]:!d[m.id]}))}>{done[m.id]?'✓ concluída':'marcar conclusão'}</button></div></div>})}</div>
        <aside className="card assistant"><h2>Modelo de gamificação</h2><p><b>Sementes:</b> pontos leves por presença, colaboração e missão fora da tela.</p><p><b>Insígnias:</b> olhar curioso, escuta atenta, protótipo brotando, teste corajoso e apresentação clara.</p><p><b>Moedas sem competição:</b> cada time junta recursos para desbloquear cartas de ajuda, não ranking.</p><p><b>Ritual:</b> a cada fase, um registro digital e uma evidência do mundo real.</p><h3>Assistente interno</h3><p className="small">Prompt-base: aja como facilitador paciente. Faça no máximo uma pergunta por vez. Adapte exemplos ao contexto da trilha. Incentive investigação, conversa com adultos responsáveis e pausas fora da tela. Não resolva o projeto pela criança.</p></aside>
      </div>
    </section>
  </main>
}
