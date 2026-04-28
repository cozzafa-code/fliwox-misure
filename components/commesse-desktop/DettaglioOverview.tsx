'use client';

// ============================================================
// fliwoX Misure — DettaglioOverview (sezione 02 v3)
// 3 colonne: INFORMAZIONI / RIEPILOGO con barre / AZIONI RAPIDE
// + Header con back/breadcrumb + bottoni CHIAMA / NAVIGATORE
// ============================================================

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { type ComRow, STATO_COM_LABEL, STATO_COM_BG, STATO_COM_FG, TIPO_INT_LABEL, fmtEuro } from '@/lib/commesse';
import { IconChevronLeft } from '@/components/icons';
import RiepilogoBarre from './RiepilogoBarre';
import AzioniRapide from './AzioniRapide';

interface Props {
  com: ComRow;
  onBack: () => void;
  onModifica: () => void;
  onAzione: (key: string) => void;
  onChiama: () => void;
  onNavigatore: () => void;
}

export default function DettaglioOverview({ com, onBack, onModifica, onAzione, onChiama, onNavigatore }: Props) {
  return (
    <div style={S.wrap}>
      <header style={S.header}>
        <button onClick={onBack} style={S.backBtn}>
          <IconChevronLeft size={16} />
          <span>Indietro</span>
        </button>
        <span style={S.bcSep}>|</span>
        <span style={S.bcText}>Commesse / {com.numero}</span>
        <div style={{ flex: 1 }} />
        <button onClick={onModifica} style={S.btnSec}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Modifica</span>
        </button>
        <button style={S.dotsBtn}>⋯</button>
      </header>

      <div style={S.content}>
        {/* COLONNA 1 — Informazioni principali */}
        <div style={S.col}>
          <div style={S.colHeader}>
            <h2 style={S.colTitle}>Informazioni principali</h2>
            <span style={S.collapse}>⌃</span>
          </div>

          <Field label="N° commessa" value={com.numero} mono />
          <Field label="Cliente" value={com.cliente} bold />
          <Field label="Indirizzo" value={com.indirizzo} />
          <Field label="Tipo intervento" value={TIPO_INT_LABEL[com.tipo]} />
          <FieldBadge
            label="Stato"
            text={STATO_COM_LABEL[com.stato]}
            bg={STATO_COM_BG[com.stato]}
            fg={STATO_COM_FG[com.stato]}
          />
          <Field label="Data sopralluogo" value={`${com.dataSopralluogo} 09:30`} mono />
          <Field label="Tecnico assegnato" value={com.tecnico} />
          <Field label="Importo totale" value={fmtEuro(com.importo)} mono bold />
          {com.acconto != null && <Field label="Acconto" value={fmtEuro(com.acconto)} mono />}
          {com.saldo != null && <Field label="Saldo" value={fmtEuro(com.saldo)} mono warning />}
          {com.dataConsegna && <Field label="Data prevista consegna" value={com.dataConsegna} mono />}
          {com.note && <Field label="Note" value={com.note} />}

          <div style={S.actionRow}>
            <button onClick={onChiama} style={S.btnTeal}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Chiama cliente</span>
            </button>
            <button onClick={onNavigatore} style={S.btnTeal}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              <span>Apri navigatore</span>
            </button>
          </div>
        </div>

        {/* COLONNA 2 — Riepilogo attività con barre */}
        <div style={S.col}>
          <div style={S.colHeader}>
            <h2 style={S.colTitle}>Riepilogo attività</h2>
          </div>
          <RiepilogoBarre com={com} />
        </div>

        {/* COLONNA 3 — Azioni rapide */}
        <div style={S.col}>
          <div style={S.colHeader}>
            <h2 style={S.colTitle}>Azioni rapide</h2>
          </div>
          <AzioniRapide onAzione={onAzione} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, mono, bold, warning }: { label: string; value: string; mono?: boolean; bold?: boolean; warning?: boolean }) {
  return (
    <div style={S.field}>
      <div style={S.fieldLabel}>{label}</div>
      <div
        style={{
          fontSize: 13,
          color: warning ? MC.warning : MC.text,
          fontWeight: bold ? 800 : 600,
          fontFamily: mono ? MF.mono : MF.ui,
          marginTop: 2,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function FieldBadge({ label, text, bg, fg }: { label: string; text: string; bg: string; fg: string }) {
  return (
    <div style={S.field}>
      <div style={S.fieldLabel}>{label}</div>
      <span
        style={{
          background: bg, color: fg,
          padding: '3px 10px', borderRadius: MR.xs,
          fontSize: 9, fontWeight: 800,
          textTransform: 'uppercase' as const, letterSpacing: 0.5,
          display: 'inline-block', marginTop: 4,
        }}
      >
        {text}
      </span>
    </div>
  );
}

const S = {
  wrap: { background: MC.cardSoft, borderTop: `1px solid ${MC.border}` } as CSSProperties,
  header: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '12px 20px',
    borderBottom: `1px solid ${MC.borderSoft}`,
    background: MC.bg,
  } as CSSProperties,
  backBtn: {
    display: 'flex', alignItems: 'center', gap: 4,
    background: 'transparent', border: 'none',
    color: MC.text, cursor: 'pointer',
    fontSize: 12, fontWeight: 700, fontFamily: 'inherit',
  } as CSSProperties,
  bcSep: { color: MC.mutedSoft, fontSize: 12 } as CSSProperties,
  bcText: { fontSize: 13, fontWeight: 800, color: MC.text, fontFamily: MF.mono } as CSSProperties,
  btnSec: {
    background: MC.cardSoft, border: `1px solid ${MC.border}`,
    borderRadius: MR.md, padding: '6px 12px',
    color: MC.text, cursor: 'pointer', fontFamily: 'inherit',
    fontSize: 12, fontWeight: 700,
    display: 'flex', alignItems: 'center', gap: 6,
  } as CSSProperties,
  dotsBtn: {
    width: 32, height: 32,
    background: 'transparent', border: 'none',
    color: MC.muted, cursor: 'pointer', fontSize: 16, fontFamily: 'inherit',
  } as CSSProperties,
  content: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1.2fr 1fr',
    gap: 24,
    padding: '20px 24px',
  } as CSSProperties,
  col: { display: 'flex', flexDirection: 'column' as const, gap: 4 } as CSSProperties,
  colHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 14,
  } as CSSProperties,
  colTitle: {
    fontSize: 11, fontWeight: 800, color: MC.text,
    textTransform: 'uppercase' as const, letterSpacing: 0.5,
    margin: 0,
  } as CSSProperties,
  collapse: { fontSize: 12, color: MC.muted } as CSSProperties,
  field: { padding: '6px 0', borderBottom: `1px solid ${MC.borderSoft}` } as CSSProperties,
  fieldLabel: {
    fontSize: 9, fontWeight: 700, color: MC.muted,
    textTransform: 'uppercase' as const, letterSpacing: 0.5,
  } as CSSProperties,
  actionRow: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
    marginTop: 14,
  } as CSSProperties,
  btnTeal: {
    background: MC.teal, color: '#fff', border: 'none',
    borderRadius: MR.md, padding: '10px 12px',
    fontSize: 11, fontWeight: 800, cursor: 'pointer',
    fontFamily: 'inherit',
    textTransform: 'uppercase' as const, letterSpacing: 0.5,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  } as CSSProperties,
};
