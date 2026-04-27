'use client';

import type { CSSProperties } from 'react';
import { MC } from '@/constants/design-system';

interface Props {
  onAzione: (key: string) => void;
}

const AZIONI = [
  { key: 'apri', label: 'Apri commessa' },
  { key: 'vani', label: 'Vedi vani' },
  { key: 'attivita', label: 'Nuova attività' },
  { key: 'documento', label: 'Aggiungi documento' },
  { key: 'preventivo', label: 'Genera preventivo' },
  { key: 'duplica', label: 'Duplica commessa' },
];

export default function AzioniRapide({ onAzione }: Props) {
  return (
    <div style={S.list}>
      {AZIONI.map((a) => (
        <button key={a.key} onClick={() => onAzione(a.key)} style={S.btn}>
          {a.label}
        </button>
      ))}
      <button onClick={() => onAzione('elimina')} style={{ ...S.btn, color: MC.danger }}>
        Elimina commessa
      </button>
    </div>
  );
}

const S = {
  list: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
  } as CSSProperties,
  btn: {
    background: 'transparent',
    border: 'none',
    color: MC.text,
    fontSize: 12,
    fontWeight: 600,
    textAlign: 'left' as const,
    padding: '8px 4px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
};
