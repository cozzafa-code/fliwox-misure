'use client';

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { type StatoCom, STATO_COM_LABEL } from '@/lib/commesse';

type TabKey = 'all' | StatoCom;

interface Props {
  active: TabKey;
  counts: Record<TabKey, number>;
  onChange: (k: TabKey) => void;
}

const ORDER: TabKey[] = ['all', 'in_corso', 'in_attesa', 'in_sospeso', 'chiusa'];
const LABEL: Record<TabKey, string> = {
  all: 'Tutte',
  in_corso: 'In corso',
  in_attesa: 'In attesa',
  in_sospeso: 'In sospeso',
  chiusa: 'Chiuse',
};

export default function CommesseTabs({ active, counts, onChange }: Props) {
  return (
    <div style={S.row}>
      {ORDER.map((k) => {
        const isActive = k === active;
        return (
          <button
            key={k}
            onClick={() => onChange(k)}
            style={{
              ...S.tab,
              color: isActive ? MC.teal : MC.muted,
              borderBottomColor: isActive ? MC.teal : 'transparent',
            }}
          >
            <span>{LABEL[k]}</span>
            <span style={S.count}>{counts[k] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}

const S = {
  row: {
    display: 'flex',
    gap: 0,
    padding: '0 24px',
    background: MC.bg,
    borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  tab: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '12px 0',
    marginRight: 26,
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.6,
    fontFamily: 'inherit',
    borderBottom: '2px solid',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  } as CSSProperties,
  count: {
    background: 'rgba(255,255,255,0.06)',
    color: 'inherit',
    padding: '2px 8px',
    borderRadius: MR.full,
    fontSize: 10,
    fontFamily: MF.mono,
  } as CSSProperties,
};
