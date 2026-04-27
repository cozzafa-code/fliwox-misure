'use client';

import type { CSSProperties } from 'react';
import { MC } from '@/constants/design-system';
import { TIPO_COLOR, TIPO_LABEL } from '@/lib/calendario';

export default function LegendaColori() {
  return (
    <div style={S.wrap}>
      <span style={S.label}>Tipi di attività · Colori:</span>
      {Object.entries(TIPO_LABEL).map(([k, v]) => (
        <span key={k} style={S.item}>
          <span style={{ ...S.dot, background: TIPO_COLOR[k as keyof typeof TIPO_COLOR] }} />
          <span>{v}</span>
        </span>
      ))}
    </div>
  );
}

const S = {
  wrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '10px 16px',
    background: MC.bgSoft,
    borderTop: `1px solid ${MC.borderSoft}`,
    flexWrap: 'wrap' as const,
    fontSize: 11,
    color: MC.muted,
  } as CSSProperties,
  label: { fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  item: { display: 'flex', alignItems: 'center', gap: 6, color: MC.text } as CSSProperties,
  dot: { width: 12, height: 12, borderRadius: 3, flexShrink: 0 } as CSSProperties,
};
