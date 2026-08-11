import { BookOpen, Eye, Map, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { ruralChapters, ruralPhaseSupport } from '../../lib/rural-pilot';

export const metadata = {
  title: 'Facilitador - Trilha Nossa Terra',
  description: 'Guia operacional da Trilha Nossa Terra para crianças de 7 a 10 anos.',
};

export default function FacilitatorPage() {
  return (
    <main className="facilitator-portal">
      <header className="facilitator-portal-hero">
        <div>
          <p className="eyebrow">Área separada do adulto</p>
          <h1>Guia do Facilitador</h1>
          <p>Prepare cada encontro, proteja a autoria da criança e observe evidências sem transformar a trilha em avaliação de personalidade.</p>
        </div>
        <UserRoundCheck size={54} />
      </header>

      <section className="facilitator-principles">
        <article><Map /><strong>Mesmo caminho</strong><span>As mesmas 14 fases da criança, com outra camada de orientação.</span></article>
        <article><Eye /><strong>Fique de olho</strong><span>Riscos de exposição, participação desigual, abstração e autoria.</span></article>
        <article><ShieldCheck /><strong>Cuidado primeiro</strong><span>Consentimento, privacidade, segurança e direito de pausar.</span></article>
        <article><BookOpen /><strong>Evidência descritiva</strong><span>Registrar ações observáveis, nunca selo, ranking ou perfil fixo.</span></article>
      </section>

      <section className="facilitator-chapters">
        {ruralChapters.map((chapter) => (
          <article key={chapter.title}>
            <span>{chapter.icon}</span><div><small>Missões {chapter.phases}</small><h2>{chapter.title}</h2><p>{chapter.text}</p></div>
          </article>
        ))}
      </section>

      <section className="facilitator-phase-list">
        {ruralPhaseSupport.map((phase) => (
          <article className="facilitator-phase-card" key={phase.phase}>
            <div className="facilitator-phase-number">{String(phase.phase).padStart(2, '0')}</div>
            <div>
              <p className="eyebrow">{phase.chapter} · {phase.duration}</p>
              <h2>{phase.childCall}</h2>
              <p>{phase.facilitatorGoal}</p>
              <details open><summary>Preparar e perguntar</summary><p><strong>Preparar:</strong> {phase.prepare}</p><p><strong>Pergunta:</strong> {phase.ask}</p></details>
              <details><summary>Fique de olho</summary><p>{phase.watch}</p><p><strong>Evidência:</strong> {phase.behavior}</p></details>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
