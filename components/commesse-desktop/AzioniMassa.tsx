'use client';

// ============================================================
// fliwoX Misure — AzioniMassa (sezione 08 v3)
// Bulk actions con counter selezionate
// ============================================================

import { useState, type CSSProperties, type ReactNode } from 'react';
import { MC, MR } from '@/constants/design-system';

const sw = (path: ReactNode) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const AZIONI: { key: string; label: string; icon: ReactNode; danger?: boolean }[] = [
  { key: 'export', label: 'Esporta selezionate (Excel)', icon: sw(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>) },
  { key: 'stampa', label: 'Stampa selezionate', icon: sw(<><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></>) },
  { key: 'tecnico', label: 'Assegna tecnico', icon: sw(<><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></>) },
  { key: 'stato', label: 'Cambia stato', icon: sw(<><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></>) },
  { key: 'elimina', label: 'Elimina selezionate', icon: sw(<><polyline points="3 6 5 6 21 6" /><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" /></>), danger: true },
];

interface Props {
  selezionateCount?: number;
  onApplica: (azione: string) => void;
  onSelezionaTutte: (sel: boolean) => void;
}

export default function AzioniMassa({ selezionateCount = 2, onApplica, onSelezionaTutte }: Props) {
  const [tutte, setTutte] = useState(false);
  const [scelta, setScelta] = useState('');

  return (
    <section style={S.section}>
      <header style={S.header}>
        <h3 style={S.title}>Azioni di massa</h3>
      </header>

      <label style={S.checkRow}>
        <input
          type="checkbox"
          checked={tutte}
          onChange={(e) => { setTutte(e.target.checked); onSelezionaTutte(e.target.checked); }}
          style={{ accentColor: MC.teal, width: 16, height: 16 }}
        />
        <span style={S.checkLbl}>Seleziona tutte le visibili</span>
      </label>

      <div style={S.list}>
        {AZIONI.map((a) => {
          const isSel = scelta === a.key;
          return (
            <button
              key={a.key}
              onClick={() => setScelta(a.key)}
              style={{
                ...S.btn,
                color: a.danger ? MC.danger : MC.text,
                background: isSel ? MC.tealBg : 'transparent',
              }}
            >
              <span style={{ ...S.icon, color: a.danger ? MC.danger : MC.teal }}>{a.icon}</span>
              <span>{a.label}</span>
            </button>
          );
        })}
      </div>

      <div style={S.footer}>
        <span style={S.counter}>{selezionateCount} commesse selezionate</span>
        <button
          onClick={() => scelta && onApplica(scelta)}
          disabled={!scelta}
          style={{
            ...S.applyBtn,
            opacity: scelta ? 1 : 0.4,
            cursor: scelta ? 'pointer' : 'not-allowed',
          }}
        >
          Applica
        </button>
      </div>
    </section>
  );
}

const S = {
  section: {
    background: MC.bgSoft,
    borderRadius: MR.lg,
    padding: 14,
    border: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  header: { marginBottom: 12 } as CSSProperties,
  title: { fontSize: 11, fontWeight: 800, color: MC.text, margin: 0, textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  checkRow: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 8px', background: MC.cardSoft,
    borderRadius: MR.sm, cursor: 'pointer', marginBottom: 10,
  } as CSSProperties,
  checkLbl: { fontSize: 12, color: MC.text, fontWeight: 600 } as CSSProperties,
  list: { display: 'flex', flexDirection: 'column' as const, gap: 4, marginBottom: 10 } as CSSProperties,
  btn: {
    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
    fontSize: 12, fontWeight: 600,
    textAlign: 'left' as const,
    padding: '10px 8px', borderRadius: MR.sm,
    display: 'flex', alignItems: 'center', gap: 12,
  } as CSSProperties,
  icon: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16 } as CSSProperties,
  footer: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 10, borderTop: `1px solid ${MC.borderSoft}`,
    gap: 10,
  } as CSSProperties,
  counter: { fontSize: 11, color: MC.muted, fontWeight: 700 } as CSSProperties,
  applyBtn: {
    background: MC.teal, color: '#fff', border: 'none',
    borderRadius: MR.sm, padding: '8px 18px',
    fontSize: 11, fontWeight: 800, fontFamily: 'inherit',
    textTransform: 'uppercase' as const, letterSpacing: 0.5,
  } as CSSProperties,
};
