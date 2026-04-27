'use client';

import type { CSSProperties, ReactNode } from 'react';
import { MC, MR } from '@/constants/design-system';

const sw = (path: ReactNode) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const AZIONI: { key: string; label: string; icon: ReactNode }[] = [
  { key: 'excel', label: 'Esporta elenco commesse (Excel)', icon: sw(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>) },
  { key: 'pdf', label: 'Esporta dettagli commessa (PDF)', icon: sw(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>) },
  { key: 'avanzamento', label: 'Report stato avanzamento', icon: sw(<><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>) },
  { key: 'fatturato', label: 'Report fatturato per periodo', icon: sw(<><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>) },
];

export default function EsportazioniReport() {
  return (
    <section style={S.section}>
      <header style={S.header}>
        <h3 style={S.title}>Esportazioni e report</h3>
      </header>
      <div style={S.list}>
        {AZIONI.map((a) => (
          <button key={a.key} style={S.btn}>
            <span style={S.icon}>{a.icon}</span>
            <span style={S.label}>{a.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

const S = {
  section: { background: MC.bgSoft, borderRadius: MR.lg, padding: 14, border: `1px solid ${MC.borderSoft}` } as CSSProperties,
  header: { marginBottom: 10 } as CSSProperties,
  title: { fontSize: 11, fontWeight: 800, color: MC.text, margin: 0, textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  list: { display: 'flex', flexDirection: 'column' as const, gap: 6 } as CSSProperties,
  btn: {
    background: MC.cardSoft, border: `1px solid ${MC.borderSoft}`,
    borderRadius: MR.sm, padding: '10px 12px',
    cursor: 'pointer', fontFamily: 'inherit', color: MC.text,
    display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' as const,
  } as CSSProperties,
  icon: { color: MC.teal, width: 16, display: 'flex', alignItems: 'center' } as CSSProperties,
  label: { fontSize: 12, fontWeight: 600, flex: 1 } as CSSProperties,
};
