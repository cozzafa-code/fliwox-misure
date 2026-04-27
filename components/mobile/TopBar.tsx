'use client';

// ============================================================
// fliwoX Misure — Top bar mobile (logo ufficiale)
// ============================================================

import type { CSSProperties, ReactNode } from 'react';
import { MC, MR } from '@/constants/design-system';
import { IconBell, IconChevronLeft, IconClose, IconSearch, IconMenu, IconPlus } from '@/components/icons';
import { LogoBrand } from '@/components/icons/Logo';

type IconKey = 'bell' | 'back' | 'close' | 'search' | 'menu' | 'plus' | null;

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
    case 'menu': return <IconMenu size={22} />;
    case 'plus': return <IconPlus size={22} />;
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
        {title ?? <LogoBrand textSize={18} textColor={MC.text} />}
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

const S = {
  bar: {
    background: MC.bg,
    height: 50,
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
    width: 44,
    height: 44,
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
};
