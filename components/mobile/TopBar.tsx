'use client';

// ============================================================
// fliwoX Misure — Top bar mobile (mockup-fedele)
// Logo fliwoX (X teal in cerchio) centrato + icone SVG laterali
// ============================================================

import type { CSSProperties, ReactNode } from 'react';
import { MC, MR } from '@/constants/design-system';
import { IconBell, IconChevronLeft, IconClose, IconSearch, IconLogoX } from '@/components/icons';

type IconKey = 'bell' | 'back' | 'close' | 'search' | null;

interface Props {
  rightIcon?: IconKey;
  onRightClick?: () => void;
  leftIcon?: IconKey;
  onLeftClick?: () => void;
  title?: ReactNode;
}

function renderIcon(key: IconKey | undefined) {
  switch (key) {
    case 'bell': return <IconBell size={22} />;
    case 'back': return <IconChevronLeft size={24} />;
    case 'close': return <IconClose size={22} />;
    case 'search': return <IconSearch size={22} />;
    default: return null;
  }
}

export default function TopBar({ rightIcon, onRightClick, leftIcon, onLeftClick, title }: Props) {
  return (
    <header style={S.bar}>
      <div style={S.side}>
        {leftIcon && (
          <button onClick={onLeftClick} style={S.iconBtn} aria-label="Indietro">
            {renderIcon(leftIcon)}
          </button>
        )}
      </div>
      <div style={S.center}>
        {title ?? <Brand />}
      </div>
      <div style={S.side}>
        {rightIcon && (
          <button onClick={onRightClick} style={S.iconBtn} aria-label="Azione">
            {renderIcon(rightIcon)}
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
        <IconLogoX size={14} strokeWidth={3} />
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
    cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  } as CSSProperties,
  brandLogo: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: 'rgba(20,184,166,0.15)',
    border: `1.5px solid ${MC.teal}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: MC.teal,
  } as CSSProperties,
  brandText: {
    color: MC.text,
    fontSize: 16,
    fontWeight: 800,
    letterSpacing: -0.3,
  } as CSSProperties,
};
