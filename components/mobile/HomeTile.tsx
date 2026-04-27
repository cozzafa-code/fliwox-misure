'use client';

// ============================================================
// fliwoX Misure — HomeTile (mockup v3)
// Tile compatto rettangolare, icona piccola top-left, numero+label bottom
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
        <div style={S.label}>{label}</div>
        <div style={S.count}>{count}</div>
      </div>
    </button>
  );
}

const S = {
  tile: {
    height: 120,
    border: 'none',
    borderRadius: MR.lg,
    padding: '12px 14px',
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
    width: 28,
    height: 28,
    borderRadius: MR.sm,
    background: 'rgba(255,255,255,0.22)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  } as CSSProperties,
  bottom: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 0,
    width: '100%',
  } as CSSProperties,
  label: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    lineHeight: 1.15,
    opacity: 0.95,
    marginBottom: 2,
  } as CSSProperties,
  count: {
    fontSize: 26,
    fontWeight: 800,
    lineHeight: 1,
    fontFamily: '"JetBrains Mono", monospace',
  } as CSSProperties,
};
