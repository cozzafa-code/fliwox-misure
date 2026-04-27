'use client';

import type { CSSProperties } from 'react';
import { MC, MF } from '@/constants/design-system';
import { SETTIMANA_DEMO } from '@/lib/calendario';

interface Props {
  selDay: number;
  onSelect: (i: number) => void;
}

export default function RigaGiorni({ selDay, onSelect }: Props) {
  return (
    <div style={S.row}>
      {SETTIMANA_DEMO.map((g, i) => {
        const sel = i === selDay;
        return (
          <button key={g.num} onClick={() => onSelect(i)} style={S.btn}>
            <span style={S.lbl}>{g.lbl}</span>
            <span
              style={{
                ...S.num,
                background: sel ? MC.teal : 'transparent',
                color: sel ? '#fff' : MC.text,
              }}
            >
              {g.num}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const S = {
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    padding: '12px 16px',
    background: MC.bgSoft,
    borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  btn: {
    background: 'transparent', border: 'none', cursor: 'pointer',
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
    gap: 4, padding: '4px 0', fontFamily: 'inherit',
  } as CSSProperties,
  lbl: {
    fontSize: 9, fontWeight: 700, color: MC.muted,
    letterSpacing: 0.5, textTransform: 'uppercase' as const,
  } as CSSProperties,
  num: {
    fontSize: 14, fontWeight: 800, fontFamily: MF.mono,
    width: 30, height: 30, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  } as CSSProperties,
};
