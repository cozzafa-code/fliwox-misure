'use client';

// ============================================================
// fliwoX Misure — VanoFoto (sub-tabs + grid 2x3 foto)
// ============================================================

import { useState, type CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';

interface Props { vanoId?: string }

type SubTab = 'panoramica' | 'spallette' | 'soglia' | 'dettagli';
const SUBTABS: { key: SubTab; label: string }[] = [
  { key: 'panoramica', label: 'Panoramica' },
  { key: 'spallette', label: 'Spallette' },
  { key: 'soglia', label: 'Soglia' },
  { key: 'dettagli', label: 'Dettagli' },
];

export default function VanoFoto(_props: Props) {
  const [sub, setSub] = useState<SubTab>('panoramica');
  // Mock: 4 foto + 1 add button
  const photos = [1, 2, 3, 4];

  return (
    <div style={S.wrap}>
      <div style={S.subtabs}>
        {SUBTABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setSub(t.key)}
            style={{
              ...S.subtab,
              color: sub === t.key ? MC.teal : MC.muted,
              borderBottomColor: sub === t.key ? MC.teal : 'transparent',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={S.grid}>
        {photos.map((p) => (
          <div key={p} style={S.photo}>
            <div style={S.photoPlaceholder}>📷</div>
          </div>
        ))}
        <button style={S.addPhoto}>
          <div style={S.addIcon}>📷</div>
          <div style={S.addText}>Aggiungi foto</div>
        </button>
      </div>

      <div style={S.actionRow}>
        <button style={S.btnPrimary}>✓ Foto complete</button>
      </div>
    </div>
  );
}

const S = {
  wrap: { display: 'flex', flexDirection: 'column' as const, height: '100%' } as CSSProperties,
  subtabs: {
    display: 'flex',
    padding: '0 20px',
    borderBottom: `1px solid ${MC.borderSoft}`,
    gap: 0,
  } as CSSProperties,
  subtab: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 16px',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    fontFamily: 'inherit',
    borderBottom: '2px solid',
  } as CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 8,
    padding: 16,
    flex: 1,
  } as CSSProperties,
  photo: {
    aspectRatio: '1 / 1',
    borderRadius: MR.lg,
    background: '#1A1F26',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,
  photoPlaceholder: {
    fontSize: 32,
    opacity: 0.3,
  } as CSSProperties,
  addPhoto: {
    aspectRatio: '1 / 1',
    borderRadius: MR.lg,
    background: 'transparent',
    border: `1.5px dashed ${MC.border}`,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    color: MC.muted,
    fontFamily: 'inherit',
  } as CSSProperties,
  addIcon: { fontSize: 24, opacity: 0.6 } as CSSProperties,
  addText: { fontSize: 11, fontWeight: 600 } as CSSProperties,
  actionRow: { padding: '0 16px 20px' } as CSSProperties,
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
    letterSpacing: 0.3,
  } as CSSProperties,
};
