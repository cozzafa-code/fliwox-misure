'use client';

// ============================================================
// fliwoX Misure — VaniDellaCommessa (sezione 03 v3)
// ============================================================

import type { CSSProperties, ReactNode } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { VANI_MOCK, type StatoVano, STATO_VANO_LABEL, STATO_VANO_BG } from '@/lib/commesse';

const sw = (path: ReactNode) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const ICON_VANO = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <line x1="12" y1="3" x2="12" y2="21" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
);

function StatoIcon({ stato }: { stato: StatoVano }) {
  if (stato === 'misure_ok' || stato === 'check_ok' || stato === 'completato') {
    return sw(<polyline points="20 6 9 17 4 12" />);
  }
  if (stato === 'in_lavorazione') {
    return sw(<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>);
  }
  return sw(<><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>);
}

interface Props { onVediTutti: () => void }

export default function VaniDellaCommessa({ onVediTutti }: Props) {
  return (
    <section style={S.section}>
      <header style={S.header}>
        <h3 style={S.title}>Vani della commessa</h3>
      </header>
      <div style={S.list}>
        {VANI_MOCK.map((v) => (
          <div key={v.id} style={S.row}>
            <div style={S.iconCol}>{ICON_VANO}</div>
            <div style={S.content}>
              <div style={S.nome}>{v.nome}</div>
              <div style={S.tipo}>{v.tipo}</div>
            </div>
            <div style={S.statoCol}>
              <span style={{ ...S.statoBadge, background: STATO_VANO_BG[v.stato] }}>
                <StatoIcon stato={v.stato} />
                <span style={S.statoLbl}>{STATO_VANO_LABEL[v.stato]}</span>
                {v.sub && <span style={S.statoSub}>{v.sub}</span>}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onVediTutti} style={S.btnPrimary}>Vedi tutti i vani</button>
    </section>
  );
}

const S = {
  section: {
    background: MC.cardSoft,
    borderRadius: MR.lg,
    padding: 14,
    border: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  header: { marginBottom: 12 } as CSSProperties,
  title: {
    fontSize: 11, fontWeight: 800, color: MC.text, margin: 0,
    textTransform: 'uppercase' as const, letterSpacing: 0.5,
  } as CSSProperties,
  list: { display: 'flex', flexDirection: 'column' as const, gap: 8, marginBottom: 14 } as CSSProperties,
  row: {
    display: 'grid',
    gridTemplateColumns: '32px 1fr auto',
    alignItems: 'center',
    gap: 12,
    padding: '8px 10px',
    background: MC.bgSoft,
    borderRadius: MR.sm,
  } as CSSProperties,
  iconCol: { color: MC.muted, display: 'flex', alignItems: 'center', justifyContent: 'center' } as CSSProperties,
  content: { minWidth: 0 } as CSSProperties,
  nome: { fontSize: 12, fontWeight: 700, color: MC.text } as CSSProperties,
  tipo: { fontSize: 10, color: MC.muted, marginTop: 2 } as CSSProperties,
  statoCol: {} as CSSProperties,
  statoBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '5px 10px',
    borderRadius: MR.sm,
    color: '#fff',
    fontSize: 10,
    fontWeight: 800,
  } as CSSProperties,
  statoLbl: { textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  statoSub: { fontFamily: MF.mono, opacity: 0.9 } as CSSProperties,
  btnPrimary: {
    width: '100%',
    background: MC.teal, color: '#fff', border: 'none',
    borderRadius: MR.md, padding: '12px 0',
    fontSize: 12, fontWeight: 800, cursor: 'pointer',
    fontFamily: 'inherit',
    textTransform: 'uppercase' as const, letterSpacing: 0.5,
  } as CSSProperties,
};
