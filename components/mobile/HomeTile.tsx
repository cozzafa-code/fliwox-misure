'use client';

// ============================================================
// fliwoX Misure — HomeTile (mobile)
// Tile colorato grande della home (6 sulla home)
// ============================================================

import { useRouter } from 'next/navigation';
import type { CSSProperties, ReactNode } from 'react';
import { MC, MR, MS } from '@/constants/design-system';

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
      <div style={S.content}>
        <div style={S.label}>{label}</div>
        <div style={S.count}>{count}</div>
      </div>
    </button>
  );
}

const S = {
  tile: {
    aspectRatio: '1 / 1',
    border: 'none',
    borderRadius: MR.xl,
    padding: 14,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    boxShadow: MS.tile,
    color: '#fff',
    fontFamily: 'inherit',
    textAlign: 'left' as const,
    transition: 'transform 0.1s',
    minWidth: 0,
  } as CSSProperties,
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: MR.md,
    background: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  } as CSSProperties,
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
  } as CSSProperties,
  label: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    lineHeight: 1.2,
    opacity: 0.95,
  } as CSSProperties,
  count: {
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1,
    fontFamily: '"JetBrains Mono", monospace',
  } as CSSProperties,
};
