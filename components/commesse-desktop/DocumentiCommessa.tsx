'use client';

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { DOCUMENTI_MOCK } from '@/lib/commesse';

export default function DocumentiCommessa() {
  return (
    <section style={S.section}>
      <header style={S.header}>
        <h3 style={S.title}>Documenti</h3>
        <button style={S.btnCarica}>+ Carica</button>
      </header>
      <div style={S.list}>
        {DOCUMENTI_MOCK.map((d, i) => (
          <div key={i} style={S.row}>
            <span style={S.icon}>📄</span>
            <span style={S.nome}>{d.nome}</span>
            <span style={S.data}>{d.data}</span>
            <button style={S.dl}>↓</button>
            <button style={S.dots}>⋯</button>
          </div>
        ))}
      </div>
    </section>
  );
}

const S = {
  section: { background: MC.bgSoft, borderRadius: MR.lg, padding: 14, border: `1px solid ${MC.borderSoft}` } as CSSProperties,
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } as CSSProperties,
  title: { fontSize: 11, fontWeight: 800, color: MC.text, margin: 0, textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  btnCarica: { background: MC.teal, color: '#fff', border: 'none', borderRadius: MR.sm, padding: '5px 10px', fontSize: 10, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  list: { display: 'flex', flexDirection: 'column' as const, gap: 6 } as CSSProperties,
  row: { display: 'grid', gridTemplateColumns: '20px 1fr 80px 24px 24px', alignItems: 'center', gap: 8, padding: '6px 8px', background: MC.cardSoft, borderRadius: MR.sm } as CSSProperties,
  icon: { fontSize: 13 } as CSSProperties,
  nome: { fontSize: 12, color: MC.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const } as CSSProperties,
  data: { fontSize: 10, color: MC.muted, fontFamily: MF.mono, textAlign: 'right' as const } as CSSProperties,
  dl: { background: 'transparent', border: 'none', color: MC.teal, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' } as CSSProperties,
  dots: { background: 'transparent', border: 'none', color: MC.muted, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' } as CSSProperties,
};
