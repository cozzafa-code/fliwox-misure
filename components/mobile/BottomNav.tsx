'use client';

// ============================================================
// fliwoX Misure — Bottom Navigation (mobile, mockup-fedele)
// 4 voci SVG + FAB teal centrale con icona +
// ============================================================

import { usePathname, useRouter } from 'next/navigation';
import type { CSSProperties, ReactNode } from 'react';
import { MC, MR, MS } from '@/constants/design-system';
import { IconHome, IconCalendar, IconList, IconMenu, IconPlus } from '@/components/icons';

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
  matchPrefix?: boolean;
}

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const NAV_LEFT: NavItem[] = [
    { label: 'Home', href: '/', icon: <IconHome size={22} /> },
    { label: 'Calendario', href: '/calendario', icon: <IconCalendar size={22} />, matchPrefix: true },
  ];

  const NAV_RIGHT: NavItem[] = [
    { label: 'Commesse', href: '/commesse', icon: <IconList size={22} />, matchPrefix: true },
    { label: 'Menu', href: '/menu', icon: <IconMenu size={22} />, matchPrefix: true },
  ];

  const isActive = (it: NavItem) =>
    it.matchPrefix ? pathname?.startsWith(it.href) ?? false : pathname === it.href;

  return (
    <nav style={S.nav}>
      <div style={S.row}>
        {NAV_LEFT.map((it) => (
          <NavBtn key={it.href} item={it} active={isActive(it)} onClick={() => router.push(it.href)} />
        ))}
        <div style={S.fabWrap}>
          <button onClick={() => router.push('/nuova')} style={S.fab} aria-label="Nuovo">
            <IconPlus size={26} strokeWidth={2.5} />
          </button>
        </div>
        {NAV_RIGHT.map((it) => (
          <NavBtn key={it.href} item={it} active={isActive(it)} onClick={() => router.push(it.href)} />
        ))}
      </div>
    </nav>
  );
}

function NavBtn({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ ...S.btn, color: active ? MC.teal : MC.muted }}>
      {item.icon}
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
    gap: 4,
    padding: '8px 4px',
    fontFamily: 'inherit',
    height: '100%',
  } as CSSProperties,
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
    transform: 'translateY(-12px)',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,
};
