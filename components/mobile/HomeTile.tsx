'use client';

// ============================================================
// fliwoX Misure — HomeTile (mobile, mockup-fedele)
// Tile colorato grande con icona SVG outline in box semi-trasparente
// ============================================================

import { useRouter } from 'next/navigation';
import type { CSSProperties, ReactNode } from 'react';
import { MR, MS } from '@/constants/design-system';

interface Props {
  label: string;
  count: number;
  color: string;
  href: string;
  icon: ReactNode;
}

export default function HomeTile({ label, count, color, href, icon }: Props) {
  const router = useRouter();
  return (
    <button onClick={() => router.push(href)} style={{ ...S.tile, background: color }}>
      <div style={S.iconWrap}>{icon}</div>
      <div style={S.bottom}>
        <div style={S.count}>{count}</div>
        <div style={S.label}>{label}</div>
      </div>
    </button>
  );
}

const S = {
  tile: {
    aspectRatio: '1 / 1',
    border: 'none',
    borderRadius: MR.xl,
    padding: 16,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    boxShadow: MS.tile,
    color: '#fff',
    fontFamily: 'inherit',
    textAlign: 'left' as const,
    transition: 'transform 0.1s',
    minWidth: 0,
    width: '100%',
  } as CSSProperties,
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: MR.md,
    background: 'rgba(255,255,255,0.22)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  } as CSSProperties,
  bottom: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
    width: '100%',
  } as CSSProperties,
  count: {
    fontSize: 40,
    fontWeight: 800,
    lineHeight: 1,
    fontFamily: '"JetBrains Mono", monospace',
  } as CSSProperties,
  label: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.6,
    lineHeight: 1.2,
    opacity: 0.95,
  } as CSSProperties,
};
