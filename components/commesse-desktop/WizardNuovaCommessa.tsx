'use client';

// ============================================================
// fliwoX Misure — WizardNuovaCommessa (5 step)
// 1 Dati cliente · 2 Indirizzo · 3 Tipo intervento · 4 Dettagli · 5 Riepilogo
// ============================================================

import { useState, type CSSProperties, type ReactNode } from 'react';
import { MC, MF, MR, MS } from '@/constants/design-system';
import { IconClose } from '@/components/icons';
import { TIPO_INT_LABEL, TECNICI_LIST, type TipoIntervento } from '@/lib/commesse';

interface Props {
  onClose: () => void;
  onSalva: (form: WizardForm) => void;
}

export interface WizardForm {
  nome: string;
  riferimento: string;
  telefono: string;
  email: string;
  indirizzo: string;
  citta: string;
  cap: string;
  tipo: TipoIntervento;
  tecnico: string;
  importo: string;
  dataSopralluogo: string;
  note: string;
}

const STEPS = [
  { n: 1, label: 'Dati cliente' },
  { n: 2, label: 'Indirizzo' },
  { n: 3, label: 'Tipo intervento' },
  { n: 4, label: 'Dettagli commessa' },
  { n: 5, label: 'Riepilogo' },
];

export default function WizardNuovaCommessa({ onClose, onSalva }: Props) {
  const [step, setStep] = useState(1);
  const [f, setF] = useState<WizardForm>({
    nome: '', riferimento: '', telefono: '', email: '',
    indirizzo: '', citta: '', cap: '',
    tipo: 'serramenti', tecnico: TECNICI_LIST[0], importo: '', dataSopralluogo: '', note: '',
  });
  const upd = (k: keyof WizardForm, v: any) => setF((p) => ({ ...p, [k]: v }));

  return (
    <div style={S.backdrop} onClick={onClose}>
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        <header style={S.header}>
          <h2 style={S.title}>Nuova commessa</h2>
          <button onClick={onClose} style={S.closeBtn}><IconClose size={18} /></button>
        </header>

        <div style={S.body}>
          {/* Stepper sinistra */}
          <div style={S.stepperCol}>
            {STEPS.map((s) => {
              const active = s.n === step;
              const done = s.n < step;
              return (
                <button key={s.n} onClick={() => setStep(s.n)} style={S.stepRow}>
                  <span
                    style={{
                      ...S.stepDot,
                      background: active ? MC.teal : done ? MC.success : 'transparent',
                      borderColor: active || done ? 'transparent' : MC.border,
                      color: active || done ? '#fff' : MC.muted,
                    }}
                  >
                    {done ? '✓' : s.n}
                  </span>
                  <span
                    style={{
                      ...S.stepLabel,
                      color: active ? MC.text : done ? MC.muted : MC.mutedSoft,
                      fontWeight: active ? 800 : 600,
                    }}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Form destra */}
          <div style={S.formCol}>
            {step === 1 && (
              <>
                <div style={S.colTitle}>Dati cliente</div>
                <Field label="Nome cliente"><Input v={f.nome} on={(v) => upd('nome', v)} ph="Cliente Rossi" /></Field>
                <Field label="Riferimento"><Input v={f.riferimento} on={(v) => upd('riferimento', v)} ph="Mario Rossi" /></Field>
                <Field label="Telefono"><Input v={f.telefono} on={(v) => upd('telefono', v)} ph="333-1234567" /></Field>
                <Field label="Email"><Input v={f.email} on={(v) => upd('email', v)} ph="email@esempio.it" /></Field>
              </>
            )}
            {step === 2 && (
              <>
                <div style={S.colTitle}>Indirizzo</div>
                <Field label="Via e civico"><Input v={f.indirizzo} on={(v) => upd('indirizzo', v)} ph="Via Roma 12" /></Field>
                <div style={S.row2}>
                  <Field label="Città"><Input v={f.citta} on={(v) => upd('citta', v)} ph="Milano" /></Field>
                  <Field label="CAP"><Input v={f.cap} on={(v) => upd('cap', v)} ph="20100" /></Field>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div style={S.colTitle}>Tipo intervento</div>
                <Field label="Tipo">
                  <select value={f.tipo} onChange={(e) => upd('tipo', e.target.value)} style={S.input}>
                    {Object.entries(TIPO_INT_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </Field>
              </>
            )}
            {step === 4 && (
              <>
                <div style={S.colTitle}>Dettagli commessa</div>
                <Field label="Tecnico assegnato">
                  <select value={f.tecnico} onChange={(e) => upd('tecnico', e.target.value)} style={S.input}>
                    {TECNICI_LIST.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Data sopralluogo"><Input type="date" v={f.dataSopralluogo} on={(v) => upd('dataSopralluogo', v)} /></Field>
                <Field label="Importo (€)"><Input v={f.importo} on={(v) => upd('importo', v)} ph="12450" /></Field>
                <Field label="Note">
                  <textarea value={f.note} onChange={(e) => upd('note', e.target.value)} rows={3} style={{ ...S.input, resize: 'vertical' }} />
                </Field>
              </>
            )}
            {step === 5 && (
              <>
                <div style={S.colTitle}>Riepilogo</div>
                <Riep label="Cliente" v={`${f.nome} (${f.riferimento})`} />
                <Riep label="Contatti" v={`${f.telefono} · ${f.email}`} />
                <Riep label="Indirizzo" v={`${f.indirizzo}, ${f.citta} ${f.cap}`} />
                <Riep label="Tipo intervento" v={TIPO_INT_LABEL[f.tipo]} />
                <Riep label="Tecnico" v={f.tecnico} />
                <Riep label="Data sopralluogo" v={f.dataSopralluogo || '—'} />
                <Riep label="Importo" v={f.importo ? `€ ${f.importo}` : '—'} />
              </>
            )}
          </div>
        </div>

        <footer style={S.footer}>
          <button onClick={onClose} style={{ ...S.btn, background: MC.bg, color: MC.text }}>Annulla</button>
          {step > 1 && (
            <button onClick={() => setStep((s) => s - 1)} style={{ ...S.btn, background: MC.bg, color: MC.text }}>Indietro</button>
          )}
          {step < 5 ? (
            <button onClick={() => setStep((s) => s + 1)} style={{ ...S.btn, background: MC.teal, color: '#fff' }}>Avanti</button>
          ) : (
            <button onClick={() => onSalva(f)} style={{ ...S.btn, background: MC.teal, color: '#fff' }}>Crea commessa</button>
          )}
        </footer>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div style={S.field}><div style={S.fieldLabel}>{label}</div>{children}</div>;
}
function Input({ v, on, ph, type = 'text' }: { v: string; on: (val: string) => void; ph?: string; type?: string }) {
  return <input type={type} value={v} onChange={(e) => on(e.target.value)} placeholder={ph} style={S.input} />;
}
function Riep({ label, v }: { label: string; v: string }) {
  return <div style={S.field}><div style={S.fieldLabel}>{label}</div><div style={{ fontSize: 13, color: MC.text, fontWeight: 600 }}>{v}</div></div>;
}

const S = {
  backdrop: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 200 } as CSSProperties,
  modal: { background: MC.card, borderRadius: MR['2xl'], width: '100%', maxWidth: 720, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, boxShadow: MS.card, color: MC.text, fontFamily: MF.ui } as CSSProperties,
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${MC.border}` } as CSSProperties,
  title: { fontSize: 16, fontWeight: 800, margin: 0 } as CSSProperties,
  closeBtn: { width: 32, height: 32, background: MC.bg, border: 'none', borderRadius: MR.md, color: MC.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' } as CSSProperties,
  body: { flex: 1, overflow: 'hidden', display: 'grid', gridTemplateColumns: '180px 1fr' } as CSSProperties,
  stepperCol: { padding: '20px 12px', background: MC.bgSoft, display: 'flex', flexDirection: 'column' as const, gap: 8, borderRight: `1px solid ${MC.borderSoft}` } as CSSProperties,
  stepRow: { display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px 8px', fontFamily: 'inherit' } as CSSProperties,
  stepDot: { width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, border: '1px solid', flexShrink: 0 } as CSSProperties,
  stepLabel: { fontSize: 12 } as CSSProperties,
  formCol: { padding: '20px 24px', overflow: 'auto', display: 'flex', flexDirection: 'column' as const, gap: 12 } as CSSProperties,
  colTitle: { fontSize: 14, fontWeight: 800, color: MC.text, marginBottom: 4 } as CSSProperties,
  field: { display: 'flex', flexDirection: 'column' as const, gap: 6 } as CSSProperties,
  fieldLabel: { fontSize: 10, fontWeight: 700, color: MC.muted, textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  input: { background: MC.bg, color: MC.text, border: `1px solid ${MC.border}`, borderRadius: MR.md, padding: '10px 12px', fontSize: 13, fontFamily: 'inherit', outline: 'none' } as CSSProperties,
  row2: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 } as CSSProperties,
  footer: { display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '12px 16px', borderTop: `1px solid ${MC.border}` } as CSSProperties,
  btn: { padding: '10px 20px', border: 'none', borderRadius: MR.md, fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' } as CSSProperties,
};
