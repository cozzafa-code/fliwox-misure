'use client';

import type { CSSProperties, ReactNode } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { DOCUMENTI_MOCK } from '@/lib/commesse';

const sw = (path: ReactNode, w = 14) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const ICON_PDF = sw(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>, 16);
const ICON_DL = sw(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>);
const ICON_DOTS = sw(<><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></>);

export default function DocumentiCommessa() {
  return (
    <section style={S.section}>
      <header style={S.header}>
        <h3 style={S.title}>Documenti e file</h3>
      </header>
      <div style={S.list}>
        {DOCUMENTI_MOCK.map((d, i) => (
          <div key={i} style={S.row}>
            <span style={{ ...S.icon, color: MC.danger }}>{ICON_PDF}</span>
            <span style={S.nome}>{d.nome}</span>
            <span style={S.data}>{d.data}</span>
            <button style={S.dl}>{ICON_DL}</button>
            <button style={S.dots}>{ICON_DOTS}</button>
          </div>
        ))}
        <div style={S.row}>
          <span style={{ ...S.icon, color: MC.muted }}>{ICON_PDF}</span>
          <span style={S.nome}>Altri documenti.zip</span>
          <span style={S.data}>25/05/2024</span>
          <button style={S.dl}>{ICON_DL}</button>
          <button style={S.dots}>{ICON_DOTS}</button>
        </div>
      </div>
      <button style={S.btnPrimary}>Carica documento</button>
    </section>
  );
}

const S = {
  section: { background: MC.cardSoft, borderRadius: MR.lg, padding: 14, border: `1px solid ${MC.borderSoft}` } as CSSProperties,
  header: { marginBottom: 10 } as CSSProperties,
  title: { fontSize: 11, fontWeight: 800, color: MC.text, margin: 0, textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  list: { display: 'flex', flexDirection: 'column' as const, gap: 6, marginBottom: 12 } as CSSProperties,
  row: { display: 'grid', gridTemplateColumns: '20px 1fr 80px 24px 24px', alignItems: 'center', gap: 8, padding: '6px 8px', background: MC.bgSoft, borderRadius: MR.sm } as CSSProperties,
  icon: { display: 'flex', alignItems: 'center' } as CSSProperties,
  nome: { fontSize: 12, color: MC.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const } as CSSProperties,
  data: { fontSize: 10, color: MC.muted, fontFamily: MF.mono, textAlign: 'right' as const } as CSSProperties,
  dl: { background: 'transparent', border: 'none', color: MC.teal, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' } as CSSProperties,
  dots: { background: 'transparent', border: 'none', color: MC.muted, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' } as CSSProperties,
  btnPrimary: {
    width: '100%',
    background: MC.teal, color: '#fff', border: 'none',
    borderRadius: MR.md, padding: '12px 0',
    fontSize: 12, fontWeight: 800, cursor: 'pointer',
    fontFamily: 'inherit',
    textTransform: 'uppercase' as const, letterSpacing: 0.5,
  } as CSSProperties,
};
