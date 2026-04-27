'use client';

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';

interface Props { vanoId?: string }

export default function VanoNote(_props: Props) {
  return (
    <div style={S.wrap}>
      <textarea
        placeholder="Scrivi note tecniche per questo vano…"
        style={S.textarea}
      />
      <div style={S.actionRow}>
        <button style={S.btnPrimary}>Salva note</button>
      </div>
    </div>
  );
}

const S = {
  wrap: { padding: 20, display: 'flex', flexDirection: 'column' as const, gap: 16 } as CSSProperties,
  textarea: {
    width: '100%',
    minHeight: 240,
    background: MC.cardSoft,
    border: `1px solid ${MC.border}`,
    borderRadius: MR.lg,
    padding: 14,
    color: MC.text,
    fontSize: 14,
    fontFamily: MF.ui,
    resize: 'vertical' as const,
    outline: 'none',
  } as CSSProperties,
  actionRow: {} as CSSProperties,
  btnPrimary: {
    width: '100%',
    background: MC.teal,
    color: '#fff',
    border: 'none',
    borderRadius: MR.lg,
    padding: '14px 0',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
  } as CSSProperties,
};
