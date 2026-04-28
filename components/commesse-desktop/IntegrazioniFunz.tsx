'use client';

// ============================================================
// fliwoX Misure — IntegrazioniFunzionalitaAvanzate (sezione 09 v3)
// 5 box: Sincronizzazione / Notifiche / Calendario / Produzione / Report
// ============================================================

import type { CSSProperties, ReactNode } from 'react';
import { MC, MR } from '@/constants/design-system';

const sw = (path: ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const FEATURES: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: sw(<><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></>),
    title: 'Sincronizzazione',
    desc: 'Dati sempre aggiornati su tutti i dispositivi in tempo reale.',
  },
  {
    icon: sw(<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>),
    title: 'Notifiche intelligenti',
    desc: 'Promemoria per scadenze, appuntamenti e attività.',
  },
  {
    icon: sw(<><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>),
    title: 'Collegamento calendario',
    desc: 'Ogni commessa genera attività visibili nel Super Calendario.',
  },
  {
    icon: sw(<><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></>),
    title: 'Produzione e magazzino',
    desc: 'Collegamento diretto con ordini di produzione e giacenze materiali.',
  },
  {
    icon: sw(<><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>),
    title: 'Report e analisi',
    desc: 'Statistiche su stato commesse, fatturato, tempi reali, ecc.',
  },
];

export default function IntegrazioniFunz() {
  return (
    <section style={S.section}>
      <h3 style={S.title}>Integrazioni e funzionalità avanzate</h3>
      <div style={S.grid}>
        {FEATURES.map((f, i) => (
          <div key={i} style={S.box}>
            <span style={S.icon}>{f.icon}</span>
            <div style={S.boxContent}>
              <div style={S.boxTitle}>{f.title}</div>
              <div style={S.boxDesc}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const S = {
  section: { padding: '24px', borderTop: `1px solid ${MC.borderSoft}`, background: MC.bgSoft } as CSSProperties,
  title: {
    fontSize: 12, fontWeight: 800, color: MC.text,
    textTransform: 'uppercase' as const, letterSpacing: 0.6,
    margin: '0 0 16px 0',
  } as CSSProperties,
  grid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 } as CSSProperties,
  box: {
    background: MC.cardSoft,
    borderRadius: MR.md,
    padding: 14,
    display: 'flex', gap: 12, alignItems: 'flex-start',
  } as CSSProperties,
  icon: {
    width: 36, height: 36, borderRadius: MR.sm,
    background: MC.tealBg, color: MC.teal,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  } as CSSProperties,
  boxContent: { minWidth: 0 } as CSSProperties,
  boxTitle: { fontSize: 11, fontWeight: 800, color: MC.text, textTransform: 'uppercase' as const, letterSpacing: 0.4 } as CSSProperties,
  boxDesc: { fontSize: 10, color: MC.muted, marginTop: 4, lineHeight: 1.4 } as CSSProperties,
};
