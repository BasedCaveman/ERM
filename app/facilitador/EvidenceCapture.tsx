'use client';

import { Camera, CheckCircle2, FileAudio, Images, ShieldCheck, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChildProfile } from '../../lib/child-profiles';
import { readLocalRecord, readLocalWorkspace, writeLocalRecord } from '../../lib/local-vault';

type TemporaryEvidence = {
  id: string;
  file: File;
  previewUrl: string;
  profileId: string;
  kind: 'image' | 'audio';
};

type MediaConfirmation = {
  id: string;
  profileId: string;
  kind: 'image' | 'audio';
  confirmedAt: string;
};

type WorkspaceProfiles = { childProfiles?: ChildProfile[]; activeChildId?: string };
const CONFIRMATIONS_KEY = 'media-confirmations';

export default function EvidenceCapture() {
  const [adultConfirmed, setAdultConfirmed] = useState(false);
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [items, setItems] = useState<TemporaryEvidence[]>([]);
  const [confirmations, setConfirmations] = useState<MediaConfirmation[]>([]);
  const [notice, setNotice] = useState('');
  const itemsRef = useRef<TemporaryEvidence[]>([]);
  itemsRef.current = items;

  useEffect(() => {
    void Promise.all([
      readLocalWorkspace<WorkspaceProfiles>(),
      readLocalRecord<MediaConfirmation[]>(CONFIRMATIONS_KEY),
    ])
      .then(([workspace, savedConfirmations]) => {
        setProfiles(workspace?.childProfiles ?? []);
        setConfirmations(savedConfirmations ?? []);
      })
      .catch(() => setNotice('Não foi possível abrir os perfis locais neste navegador.'));
  }, []);

  useEffect(() => () => itemsRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl)), []);

  const assignedCount = useMemo(() => items.filter((item) => item.profileId).length, [items]);

  function addFiles(files: FileList | null) {
    if (!files?.length) return;
    const next = Array.from(files).map((file) => ({
      id: window.crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      profileId: profiles.length === 1 ? profiles[0].id : '',
      kind: file.type.startsWith('audio/') ? 'audio' as const : 'image' as const,
    }));
    setItems((current) => [...current, ...next]);
    setNotice('');
  }

  function removeItem(id: string) {
    setItems((current) => {
      const target = current.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return current.filter((item) => item.id !== id);
    });
  }

  async function confirmAndDiscard() {
    const ready = items.filter((item) => item.profileId);
    if (!ready.length) return;
    const nextConfirmations = [
      ...confirmations,
      ...ready.map((item) => ({
        id: window.crypto.randomUUID(),
        profileId: item.profileId,
        kind: item.kind,
        confirmedAt: new Date().toISOString(),
      })),
    ];
    await writeLocalRecord(CONFIRMATIONS_KEY, nextConfirmations);
    ready.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setConfirmations(nextConfirmations);
    setItems((current) => current.filter((item) => !item.profileId));
    setNotice(`${ready.length} ${ready.length === 1 ? 'registro confirmado' : 'registros confirmados'}. Os arquivos foram descartados.`);
  }

  return (
    <section className="adult-capture" id="captura-evidencias" aria-labelledby="adult-capture-title">
      <div className="adult-capture-heading">
        <div>
          <p className="eyebrow">Registro com acompanhamento adulto</p>
          <h2 id="adult-capture-title">Confirmar fotos e áudios sem guardar os arquivos</h2>
          <p>Use individualmente ou selecione vários desenhos da turma. Tudo fica temporariamente na memória deste navegador.</p>
        </div>
        <ShieldCheck size={42} />
      </div>

      {!adultConfirmed ? (
        <div className="adult-entry-gate">
          <ShieldCheck size={28} />
          <div>
            <strong>Entrada reservada a responsáveis e facilitadores</strong>
            <p>Este aviso protege o fluxo do piloto neste aparelho; ainda não substitui a autenticação Google do adulto.</p>
          </div>
          <button className="primary-action" type="button" onClick={() => setAdultConfirmed(true)}>
            Sou responsável ou facilitador
          </button>
        </div>
      ) : profiles.length === 0 ? (
        <div className="capture-empty">Crie primeiro um perfil infantil na plataforma deste aparelho.</div>
      ) : (
        <>
          <div className="capture-actions">
            <label><Camera size={20} /><span>Tirar ou escolher foto</span><input accept="image/*" capture="environment" type="file" onChange={(event) => addFiles(event.target.files)} /></label>
            <label><FileAudio size={20} /><span>Gravar ou escolher áudio</span><input accept="audio/*" capture type="file" onChange={(event) => addFiles(event.target.files)} /></label>
            <label><Images size={20} /><span>Selecionar vários desenhos</span><input accept="image/*" multiple type="file" onChange={(event) => addFiles(event.target.files)} /></label>
          </div>

          {items.length > 0 && (
            <div className="temporary-evidence-grid">
              {items.map((item) => (
                <article key={item.id}>
                  {item.kind === 'image' ? <img alt="Prévia temporária do registro" src={item.previewUrl} /> : <audio controls src={item.previewUrl} />}
                  <label>Associar a
                    <select value={item.profileId} onChange={(event) => setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, profileId: event.target.value } : entry))}>
                      <option value="">Escolha um perfil</option>
                      {profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.displayName}</option>)}
                    </select>
                  </label>
                  <button aria-label="Descartar arquivo" type="button" onClick={() => removeItem(item.id)}><Trash2 size={17} /> Descartar</button>
                </article>
              ))}
            </div>
          )}

          <div className="capture-confirmation">
            <p><strong>{assignedCount}</strong> de {items.length} associados a um perfil.</p>
            <button className="primary-action" disabled={assignedCount === 0} type="button" onClick={confirmAndDiscard}><CheckCircle2 size={18} /> Confirmar e apagar arquivos</button>
          </div>
          {notice && <p className="capture-notice" role="status">{notice}</p>}
          <small>Nenhuma imagem ou gravação é enviada para servidor ou mantida após a confirmação.</small>
        </>
      )}
    </section>
  );
}
