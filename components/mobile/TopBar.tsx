'use client';

// ============================================================
// fliwoX Misure — Top bar mobile
// Logo fliwoX centrato + icona destra opzionale
// ============================================================

import type { CSSProperties, ReactNode } from 'react';
import { MC, MR } from '@/constants/design-system';

interface Props {
  rightIcon?: string;
  onRightClick?: () => void;
  leftIcon?: string;
  onLeftClick?: () => void;
  title?: ReactNode;
}

export default function TopBar({ rightIcon, onRightClick, leftIcon, onLeftClick, title }: Props) {
  return (
    <header style={S.bar}>
      <div style={S.side}>
        {leftIcon && (
          <button onClick={onLeftClick} style={S.iconBtn} aria-label="Indietro">
            {leftIcon}
          </button>
        )}
      </div>
      <div style={S.center}>
        {title ?? <Brand />}
      </div>
      <div style={S.side}>
        {rightIcon && (
          <button onClick={onRightClick} style={S.iconBtn} aria-label="Azione">
            {rightIcon}
          </button>
        )}
      </div>
    </header>
  );
}

function Brand() {
  return (
    <div style={S.brand}>
      <span style={S.brandLogo}>
        <span style={S.brandX}>✕</span>
      </span>
      <span style={S.brandText}>
        fliwo<span style={{ color: MC.teal }}>X</span>
      </span>
    </div>
  );
}

const S = {
  bar: {
    background: MC.bg,
    height: 56,
    display: 'grid',
    gridTemplateColumns: '56px 1fr 56px',
    alignItems: 'center',
    paddingTop: 'env(safe-area-inset-top, 0)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 50,
  } as CSSProperties,
  side: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: MR.md,
    background: 'transparent',
    border: 'none',
    color: MC.text,
    fontSize: 20,
    cursor: 'pointer',
    fontFamily: 'inherit',
  } as CSSProperties,
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  } as CSSProperties,
  brandLogo: {
    width: 22,
    height: 22,
    borderRadius: MR.sm,
    background: 'rgba(20,184,166,0.15)',
    border: `1.5px solid ${MC.teal}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,
  brandX: {
    color: MC.teal,
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 1,
  } as CSSProperties,
  brandText: {
    color: MC.text,
    fontSize: 16,
    fontWeight: 800,
    letterSpacing: -0.3,
  } as CSSProperties,
};
