'use client';

// ============================================================
// fliwoX Misure — Bottom Navigation (mobile)
// 4 voci + FAB teal centrale
// ============================================================

import { usePathname, useRouter } from 'next/navigation';
import type { CSSProperties } from 'react';
import { MC, MR, MS } from '@/constants/design-system';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const NAV_LEFT: NavItem[] = [
  { label: 'Home', href: '/', icon: '⌂' },
  { label: 'Calendario', href: '/calendario', icon: '☷' },
];

const NAV_RIGHT: NavItem[] = [
  { label: 'Commesse', href: '/commesse', icon: '☱' },
  { label: 'Menu', href: '/menu', icon: '☰' },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav style={S.nav}>
      <div style={S.row}>
        {NAV_LEFT.map((it) => (
          <NavBtn key={it.href} item={it} active={pathname === it.href} onClick={() => router.push(it.href)} />
        ))}
        <div style={S.fabWrap}>
          <button onClick={() => router.push('/nuova')} style={S.fab} aria-label="Nuovo">
            +
          </button>
        </div>
        {NAV_RIGHT.map((it) => (
          <NavBtn key={it.href} item={it} active={pathname?.startsWith(it.href) ?? false} onClick={() => router.push(it.href)} />
        ))}
      </div>
    </nav>
  );
}

function NavBtn({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ ...S.btn, color: active ? MC.teal : MC.muted }}>
      <span style={S.icon}>{item.icon}</span>
      <span style={S.label}>{item.label}</span>
    </button>
  );
}

const S = {
  nav: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    background: MC.card,
    borderTop: `1px solid ${MC.border}`,
    paddingBottom: 'env(safe-area-inset-bottom, 0)',
    zIndex: 100,
  } as CSSProperties,
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 80px 1fr 1fr',
    alignItems: 'end',
    height: 64,
    position: 'relative' as const,
  } as CSSProperties,
  btn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    padding: '8px 4px',
    fontFamily: 'inherit',
    height: '100%',
  } as CSSProperties,
  icon: { fontSize: 20, lineHeight: 1 } as CSSProperties,
  label: { fontSize: 10, fontWeight: 600 } as CSSProperties,
  fabWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
  } as CSSProperties,
  fab: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: MC.teal,
    color: '#fff',
    border: 'none',
    boxShadow: MS.fab,
    cursor: 'pointer',
    fontSize: 28,
    fontWeight: 300,
    transform: 'translateY(-12px)',
    fontFamily: 'inherit',
  } as CSSProperties,
};
