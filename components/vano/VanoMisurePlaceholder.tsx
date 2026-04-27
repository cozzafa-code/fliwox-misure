'use client';

// ============================================================
// fliwoX Misure — VanoMisure (PLACEHOLDER)
// SOSTITUIRE con VanoDetailPanel.tsx pari pari da mastro-erp-new
// ============================================================

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';

interface Props {
  vanoId?: string;
  commessaId?: string;
}

export default function VanoMisurePlaceholder(_props: Props) {
  return (
    <div style={S.wrap}>
      <div style={S.card}>
        <div style={S.icon}>📐</div>
        <h2 style={S.title}>Pannello Misure</h2>
        <p style={S.text}>
          Qui verrà caricato il <code style={S.code}>VanoDetailPanel</code> esistente
          di <code style={S.code}>mastro-erp-new</code>, identico, senza modifiche.
        </p>
        <p style={S.text}>
          In attesa che Fabio carichi i file dal repo locale.
        </p>
      </div>
    </div>
  );
}

const S = {
  wrap: { padding: 20 } as CSSProperties,
  card: {
    background: MC.cardSoft,
    border: `1px dashed ${MC.border}`,
    borderRadius: MR.lg,
    padding: 32,
    textAlign: 'center' as const,
  } as CSSProperties,
  icon: { fontSize: 40, marginBottom: 12 } as CSSProperties,
  title: { fontSize: 16, fontWeight: 800, color: MC.text, margin: '0 0 8px 0' } as CSSProperties,
  text: { fontSize: 13, color: MC.muted, margin: '8px 0', lineHeight: 1.5 } as CSSProperties,
  code: {
    background: '#1A1F26',
    color: MC.teal,
    padding: '2px 6px',
    borderRadius: 4,
    fontSize: 11,
    fontFamily: MF.mono,
  } as CSSProperties,
};
