'use client';

// ============================================================
// fliwoX Misure — ModalNuovaAttivita (specifica sezione 04)
// Form creazione nuova attività
// ============================================================

import { useState, type CSSProperties } from 'react';
import { MC, MF, MR, MS } from '@/constants/design-system';
import { IconClose } from '@/components/icons';
import {
  type Tecnico, type TipoAttivita,
  TIPO_LABEL,
} from '@/lib/calendario';

interface Props {
  tecnici: Tecnico[];
  giornoIso?: string;
  onClose: () => void;
  onSalva: (form: FormNuovaAttivita) => void;
}

export interface FormNuovaAttivita {
  titolo: string;
  tipo: TipoAttivita;
  tecnicoId: string;
  data: string;
  oraInizio: string;
  oraFine: string;
  cliente: string;
  indirizzo: string;
  note: string;
  promemoria: string;
  allegati: boolean;
}

export default function ModalNuovaAttivita({ tecnici, giornoIso, onClose, onSalva }: Props) {
  const [form, setForm] = useState<FormNuovaAttivita>({
    titolo: '',
    tipo: 'sopralluogo',
    tecnicoId: tecnici[0]?.id ?? '',
    data: giornoIso ?? '',
    oraInizio: '10:00',
    oraFine: '11:00',
    cliente: '',
    indirizzo: '',
    note: '',
    promemoria: '30',
    allegati: false,
  });

  const upd = (k: keyof FormNuovaAttivita, v: any) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div style={S.backdrop} onClick={onClose}>
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        <header style={S.header}>
          <h2 style={S.title}>Nuova attività</h2>
          <button onClick={onClose} style={S.closeBtn}><IconClose size={18} /></button>
        </header>

        <div style={S.body}>
          <Field label="Titolo">
            <input
              value={form.titolo}
              onChange={(e) => upd('titolo', e.target.value)}
              placeholder="Es. Sopralluogo Cliente Rossi"
              style={S.input}
            />
          </Field>

          <Field label="Tipo attività">
            <select value={form.tipo} onChange={(e) => upd('tipo', e.target.value)} style={S.input}>
              {Object.keys(TIPO_LABEL).map((k) => (
                <option key={k} value={k}>{TIPO_LABEL[k as TipoAttivita]}</option>
              ))}
            </select>
          </Field>

          <Field label="Tecnico">
            <select value={form.tecnicoId} onChange={(e) => upd('tecnicoId', e.target.value)} style={S.input}>
              {tecnici.map((t) => (
                <option key={t.id} value={t.id}>{t.nome}</option>
              ))}
            </select>
          </Field>

          <Field label="Data">
            <input type="date" value={form.data} onChange={(e) => upd('data', e.target.value)} style={S.input} />
          </Field>

          <div style={S.row2}>
            <Field label="Ora inizio">
              <input type="time" value={form.oraInizio} onChange={(e) => upd('oraInizio', e.target.value)} style={S.input} />
            </Field>
            <Field label="Ora fine">
              <input type="time" value={form.oraFine} onChange={(e) => upd('oraFine', e.target.value)} style={S.input} />
            </Field>
          </div>

          <Field label="Cliente">
            <input value={form.cliente} onChange={(e) => upd('cliente', e.target.value)} placeholder="Cliente Rossi" style={S.input} />
          </Field>

          <Field label="Indirizzo">
            <input value={form.indirizzo} onChange={(e) => upd('indirizzo', e.target.value)} placeholder="Via Roma 12, Milano" style={S.input} />
          </Field>

          <Field label="Note">
            <textarea value={form.note} onChange={(e) => upd('note', e.target.value)} placeholder="Materiali e avvisi" rows={3} style={{ ...S.input, resize: 'vertical' }} />
          </Field>

          <Field label="Promemoria">
            <select value={form.promemoria} onChange={(e) => upd('promemoria', e.target.value)} style={S.input}>
              <option value="0">Nessuno</option>
              <option value="15">15 minuti prima</option>
              <option value="30">30 minuti prima</option>
              <option value="60">1 ora prima</option>
            </select>
          </Field>

          <div style={S.toggleRow}>
            <span style={S.fieldLabel}>Allegati</span>
            <button onClick={() => upd('allegati', !form.allegati)} style={S.linkBtn}>
              + Aggiungi allegati
            </button>
          </div>
        </div>

        <footer style={S.footer}>
          <button onClick={onClose} style={{ ...S.btn, background: MC.bg, color: MC.text }}>Annulla</button>
          <button onClick={() => onSalva(form)} style={{ ...S.btn, background: MC.teal, color: '#fff' }}>Salva</button>
        </footer>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: any }) {
  return (
    <div style={S.field}>
      <div style={S.fieldLabel}>{label}</div>
      {children}
    </div>
  );
}

const S = {
  backdrop: {
    position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 16, zIndex: 200,
  } as CSSProperties,
  modal: {
    background: MC.card, borderRadius: MR['2xl'],
    width: '100%', maxWidth: 480, maxHeight: '90vh',
    overflow: 'hidden', display: 'flex', flexDirection: 'column' as const,
    boxShadow: MS.card, color: MC.text, fontFamily: MF.ui,
  } as CSSProperties,
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 20px', borderBottom: `1px solid ${MC.border}`,
  } as CSSProperties,
  title: { fontSize: 16, fontWeight: 800, margin: 0 } as CSSProperties,
  closeBtn: {
    width: 32, height: 32, background: MC.bg, border: 'none',
    borderRadius: MR.md, color: MC.text, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit',
  } as CSSProperties,
  body: { flex: 1, overflow: 'auto', padding: '12px 20px', display: 'flex', flexDirection: 'column' as const, gap: 10 } as CSSProperties,
  field: { display: 'flex', flexDirection: 'column' as const, gap: 6 } as CSSProperties,
  fieldLabel: { fontSize: 10, fontWeight: 700, color: MC.muted, textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  input: {
    background: MC.bg, color: MC.text, border: `1px solid ${MC.border}`,
    borderRadius: MR.md, padding: '10px 12px', fontSize: 13,
    fontFamily: 'inherit', outline: 'none',
  } as CSSProperties,
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } as CSSProperties,
  toggleRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 0',
  } as CSSProperties,
  linkBtn: {
    background: 'transparent', border: 'none', color: MC.teal,
    fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
  } as CSSProperties,
  footer: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
    padding: '12px 16px', borderTop: `1px solid ${MC.border}`,
  } as CSSProperties,
  btn: {
    padding: '12px 0', border: 'none', borderRadius: MR.md,
    fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
  } as CSSProperties,
};
