'use client';

// ============================================================
// fliwoX Misure — KPI Strip (4 cards top dashboard)
// ============================================================

import type { CSSProperties } from 'react';
import { MC, MF, MR, MS } from '@/constants/design-system';

interface KPIItem {
  label: string;
  value: number | string;
  color?: string;
  icon?: string;
}

interface Props {
  items: KPIItem[];
}

export default function KPIStrip({ items }: Props) {
  return (
    <div style={S.strip}>
      {items.map((item, i) => (
        <div key={i} style={S.card}>
          {item.icon && <div style={S.icon}>{item.icon}</div>}
          <div style={S.label}>{item.label}</div>
          <div style={{ ...S.value, color: item.color ?? MC.text }}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

const S = {
  strip: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 12,
  } as CSSProperties,
  card: {
    background: MC.card,
    borderRadius: MR.lg,
    border: `1px solid ${MC.border}`,
    boxShadow: MS.card,
    padding: 16,
  } as CSSProperties,
  icon: {
    fontSize: 18,
    marginBottom: 4,
  } as CSSProperties,
  label: {
    fontSize: 11,
    fontWeight: 700,
    color: MC.muted,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    marginBottom: 4,
  } as CSSProperties,
  value: {
    fontSize: 28,
    fontWeight: 800,
    fontFamily: MF.mono,
    lineHeight: 1,
  } as CSSProperties,
};
