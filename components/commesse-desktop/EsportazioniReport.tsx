'use client';

import type { CSSProperties } from 'react';
import { MC, MR } from '@/constants/design-system';

const AZIONI = [
  { key: 'excel', label: 'Esporta elenco commesse (Excel)', icon: '⬇' },
  { key: 'pdf', label: 'Esporta dettagli commessa (PDF)', icon: '⬇' },
  { key: 'avanzamento', label: 'Report stato avanzamento', icon: '▥' },
  { key: 'fatturato', label: 'Report fatturato per periodo', icon: '▥' },
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
    background: MC.cardSoft,
    border: `1px solid ${MC.borderSoft}`,
    borderRadius: MR.sm,
    padding: '10px 12px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    color: MC.text,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    textAlign: 'left' as const,
  } as CSSProperties,
  icon: { fontSize: 14, color: MC.teal, width: 16 } as CSSProperties,
  label: { fontSize: 12, fontWeight: 600, flex: 1 } as CSSProperties,
};
