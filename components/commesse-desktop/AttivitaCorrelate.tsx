'use client';

import type { CSSProperties, ReactNode } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { ATTIVITA_CORR_MOCK } from '@/lib/commesse';

const sw = (path: ReactNode) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

export default function AttivitaCorrelate() {
  return (
    <section style={S.section}>
      <header style={S.header}>
        <h3 style={S.title}>Attività correlate</h3>
        <button style={S.btn}>+ Nuova attività</button>
      </header>
      <div style={S.list}>
        {ATTIVITA_CORR_MOCK.map((a) => {
          const color = a.stato === 'completato' ? MC.success : a.stato === 'in_corso' ? MC.warning : '#3A4148';
          const icon = a.stato === 'completato'
            ? sw(<polyline points="20 6 9 17 4 12" />)
            : a.stato === 'in_corso'
              ? sw(<><circle cx="12" cy="12" r="3" fill="white" stroke="none" /></>)
              : sw(<circle cx="12" cy="12" r="8" />);
          return (
            <div key={a.id} style={S.row}>
              <span style={S.titolo}>{a.titolo}</span>
              <span style={S.data}>{a.data ?? '—'}</span>
              <span style={{ ...S.badge, background: color }}>{icon}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const S = {
  section: { background: MC.bgSoft, borderRadius: MR.lg, padding: 14, border: `1px solid ${MC.borderSoft}` } as CSSProperties,
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } as CSSProperties,
  title: { fontSize: 11, fontWeight: 800, color: MC.text, margin: 0, textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  btn: { background: MC.teal, color: '#fff', border: 'none', borderRadius: MR.sm, padding: '5px 10px', fontSize: 10, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  list: { display: 'flex', flexDirection: 'column' as const, gap: 6 } as CSSProperties,
  row: { display: 'grid', gridTemplateColumns: '1fr 80px 24px', alignItems: 'center', gap: 10, padding: '8px 10px', background: MC.cardSoft, borderRadius: MR.sm } as CSSProperties,
  titolo: { fontSize: 12, color: MC.text } as CSSProperties,
  data: { fontSize: 10, color: MC.muted, fontFamily: MF.mono, textAlign: 'right' as const } as CSSProperties,
  badge: { width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' } as CSSProperties,
};
