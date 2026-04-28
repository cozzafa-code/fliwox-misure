'use client';

// ============================================================
// fliwoX Misure — LegendaStati (sotto tabella)
// ============================================================

import type { CSSProperties } from 'react';
import { MC } from '@/constants/design-system';
import { type StatoCom, STATO_COM_LABEL, STATO_COM_BG } from '@/lib/commesse';

const ORDER: StatoCom[] = ['in_corso', 'in_attesa', 'in_sospeso', 'chiusa'];
// Stato extra "completata" (non filtrabile ma usato come stato avanzamento)
const EXTRA = [{ key: 'completata', label: 'Completata', color: '#6CC0A4' }];

export default function LegendaStati() {
  return (
    <div style={S.bar}>
      <span style={S.title}>Stati commessa</span>
      {ORDER.map((k) => (
        <span key={k} style={S.item}>
          <span style={{ ...S.dot, background: STATO_COM_BG[k] }} />
          <span style={S.lbl}>{STATO_COM_LABEL[k]}</span>
        </span>
      ))}
      {EXTRA.map((e) => (
        <span key={e.key} style={S.item}>
          <span style={{ ...S.dot, background: e.color }} />
          <span style={S.lbl}>{e.label}</span>
        </span>
      ))}
    </div>
  );
}

const S = {
  bar: {
    display: 'flex',
    alignItems: 'center',
    gap: 18,
    padding: '12px 24px',
    background: MC.bgSoft,
    borderTop: `1px solid ${MC.borderSoft}`,
    borderBottom: `1px solid ${MC.borderSoft}`,
    flexWrap: 'wrap' as const,
  } as CSSProperties,
  title: {
    fontSize: 10,
    fontWeight: 800,
    color: MC.muted,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.6,
    marginRight: 8,
  } as CSSProperties,
  item: { display: 'flex', alignItems: 'center', gap: 8 } as CSSProperties,
  dot: { width: 12, height: 12, borderRadius: '50%', flexShrink: 0 } as CSSProperties,
  lbl: { fontSize: 11, color: MC.text, fontWeight: 600 } as CSSProperties,
};
