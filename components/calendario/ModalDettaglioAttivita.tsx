'use client';

// ============================================================
// fliwoX Misure — ModalDettaglioAttivita (specifica sezione 03)
// Pop-up cliccando un evento del calendario
// ============================================================

import type { CSSProperties } from 'react';
import { MC, MF, MR, MS } from '@/constants/design-system';
import { IconClose } from '@/components/icons';
import {
  type AttivitaCal, type Tecnico,
  TIPO_LABEL, STATO_LABEL_ATT, STATO_COLOR_ATT,
} from '@/lib/calendario';

interface Props {
  attivita: AttivitaCal | null;
  tecnici: Tecnico[];
  onClose: () => void;
  onElimina: (id: string) => void;
  onDuplica: (a: AttivitaCal) => void;
  onModifica: (a: AttivitaCal) => void;
}

export default function ModalDettaglioAttivita({
  attivita, tecnici, onClose, onElimina, onDuplica, onModifica,
}: Props) {
  if (!attivita) return null;
  const tecnicoNome = tecnici.find((t) => t.id === attivita.tecnicoId)?.nome ?? '—';

  return (
    <div style={S.backdrop} onClick={onClose}>
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        <header style={S.header}>
          <h2 style={S.title}>{TIPO_LABEL[attivita.tipo]} {attivita.cliente}</h2>
          <button onClick={onClose} style={S.closeBtn}><IconClose size={18} /></button>
        </header>

        <div style={S.body}>
          <Field label="Cliente" value={attivita.cliente} />
          <Field label="Indirizzo" value={attivita.indirizzo || '—'} />
          <Field label="Data e ora" value={`${formatData(attivita.data)} ${attivita.oraInizio} - ${attivita.oraFine}`} />
          <Field label="Tecnico assegnato" value={tecnicoNome} />
          <Field label="Tipo attività" value={TIPO_LABEL[attivita.tipo]} />
          <FieldBadge
            label="Stato"
            text={STATO_LABEL_ATT[attivita.stato]}
            color={STATO_COLOR_ATT[attivita.stato]}
          />
          {attivita.note && <Field label="Note" value={attivita.note} />}
          {attivita.promemoria && (
            <Field label="Promemoria" value={`🔔 ${attivita.promemoria}`} />
          )}
          {attivita.allegatiCount != null && attivita.allegatiCount > 0 && (
            <Field label="Allegati" value={`📎 ${attivita.allegatiCount} allegati`} />
          )}
        </div>

        <footer style={S.footer}>
          <button onClick={() => onElimina(attivita.id)} style={{ ...S.btn, background: MC.dangerSoft, color: MC.danger }}>
            Elimina
          </button>
          <button onClick={() => onDuplica(attivita)} style={{ ...S.btn, background: MC.cardSoft, color: MC.text }}>
            Duplica
          </button>
          <button onClick={() => onModifica(attivita)} style={{ ...S.btn, background: MC.teal, color: '#fff' }}>
            Modifica
          </button>
        </footer>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={S.field}>
      <div style={S.fieldLabel}>{label}</div>
      <div style={S.fieldValue}>{value}</div>
    </div>
  );
}

function FieldBadge({ label, text, color }: { label: string; text: string; color: string }) {
  return (
    <div style={S.field}>
      <div style={S.fieldLabel}>{label}</div>
      <span
        style={{
          ...S.fieldValue,
          background: color,
          color: '#fff',
          padding: '4px 10px',
          borderRadius: MR.sm,
          fontSize: 11,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          display: 'inline-block',
          marginTop: 2,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function formatData(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

const S = {
  backdrop: {
    position: 'fixed' as const,
    inset: 0, background: 'rgba(0,0,0,0.7)',
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
  body: { flex: 1, overflow: 'auto', padding: '12px 20px' } as CSSProperties,
  field: { padding: '8px 0', borderBottom: `1px solid ${MC.borderSoft}` } as CSSProperties,
  fieldLabel: { fontSize: 10, fontWeight: 700, color: MC.muted, textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  fieldValue: { fontSize: 13, fontWeight: 600, color: MC.text, marginTop: 2 } as CSSProperties,
  footer: {
    display: 'grid', gridTemplateColumns: '1fr 1fr 1.4fr',
    gap: 8, padding: '12px 16px',
    borderTop: `1px solid ${MC.border}`,
  } as CSSProperties,
  btn: {
    padding: '12px 0', border: 'none', borderRadius: MR.md,
    fontSize: 12, fontWeight: 800, cursor: 'pointer',
    fontFamily: 'inherit', textTransform: 'uppercase' as const, letterSpacing: 0.5,
  } as CSSProperties,
};
