'use client';

import type { CSSProperties, ReactNode } from 'react';
import { MC, MR } from '@/constants/design-system';

const sw = (path: ReactNode) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const AZIONI: { key: string; label: string; icon: ReactNode }[] = [
  { key: 'apri', label: 'Apri commessa', icon: sw(<><path d="M14 3h7v7" /><path d="M10 14L21 3" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" /></>) },
  { key: 'vani', label: 'Vedi vani', icon: sw(<><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>) },
  { key: 'misure', label: 'Vedi misure', icon: sw(<path d="M21.3 8.7L8.7 21.3a2.41 2.41 0 0 1-3.4 0l-2.6-2.6a2.41 2.41 0 0 1 0-3.4L15.3 2.7a2.41 2.41 0 0 1 3.4 0l2.6 2.6a2.41 2.41 0 0 1 0 3.4z" />) },
  { key: 'foto', label: 'Vedi foto', icon: sw(<><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>) },
  { key: 'check', label: 'Vedi check', icon: sw(<polyline points="20 6 9 17 4 12" />) },
  { key: 'documenti', label: 'Documenti', icon: sw(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>) },
  { key: 'preventivo', label: 'Preventivo', icon: sw(<><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>) },
  { key: 'duplica', label: 'Duplica commessa', icon: sw(<><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>) },
];

interface Props { onAzione: (key: string) => void }

export default function AzioniRapide({ onAzione }: Props) {
  return (
    <div style={S.list}>
      {AZIONI.map((a) => (
        <button key={a.key} onClick={() => onAzione(a.key)} style={S.btn}>
          <span style={S.icon}>{a.icon}</span>
          <span>{a.label}</span>
        </button>
      ))}
      <button onClick={() => onAzione('elimina')} style={{ ...S.btn, color: MC.danger }}>
        <span style={{ ...S.icon, color: MC.danger }}>
          {sw(<><polyline points="3 6 5 6 21 6" /><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" /></>)}
        </span>
        <span>Elimina commessa</span>
      </button>
    </div>
  );
}

const S = {
  list: { display: 'flex', flexDirection: 'column' as const, gap: 4 } as CSSProperties,
  btn: {
    background: 'transparent', border: 'none', color: MC.text,
    fontSize: 12, fontWeight: 600,
    textAlign: 'left' as const,
    padding: '10px 4px',
    cursor: 'pointer', fontFamily: 'inherit',
    borderBottom: `1px solid ${MC.borderSoft}`,
    display: 'flex', alignItems: 'center', gap: 12,
  } as CSSProperties,
  icon: { color: MC.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16 } as CSSProperties,
};
