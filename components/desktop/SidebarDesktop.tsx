'use client';

// ============================================================
// fliwoX Misure — SidebarDesktop (riutilizzabile)
// ============================================================

import { useRouter } from 'next/navigation';
import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { LogoBrand } from '@/components/icons/Logo';

interface NavItem {
  key: string;
  label: string;
  icon: string;
  href?: string;
}

const NAV: NavItem[] = [
  { key: 'home', label: 'Home', icon: '⌂', href: '/' },
  { key: 'dashboard', label: 'Dashboard', icon: '▦', href: '/dashboard' },
  { key: 'commesse', label: 'Commesse', icon: '☰', href: '/desktop/commesse' },
  { key: 'calendario', label: 'Calendario', icon: '▤', href: '/calendario' },
  { key: 'clienti', label: 'Clienti', icon: '◯' },
  { key: 'prodotti', label: 'Prodotti', icon: '▧' },
  { key: 'magazzino', label: 'Magazzino', icon: '▩' },
  { key: 'report', label: 'Report', icon: '▥' },
  { key: 'impostazioni', label: 'Impostazioni', icon: '⚙' },
];

interface Props {
  active?: string;
}

export default function SidebarDesktop({ active = 'commesse' }: Props) {
  const router = useRouter();

  return (
    <aside style={S.sidebar}>
      <div style={S.brandWrap}>
        <LogoBrand textSize={20} textColor={MC.text} />
      </div>
      <nav style={S.nav}>
        {NAV.map((n) => {
          const isActive = n.key === active;
          return (
            <button
              key={n.key}
              style={{
                ...S.navBtn,
                background: isActive ? MC.tealBg : 'transparent',
                color: isActive ? MC.teal : MC.textSoft,
              }}
              onClick={() => n.href && router.push(n.href)}
            >
              <span style={S.navIcon}>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          );
        })}
      </nav>
      <div style={S.profile}>
        <div style={S.avatar}>F</div>
        <div>
          <div style={S.profileName}>Francesco</div>
          <div style={S.profileRole}>Tecnico</div>
        </div>
      </div>
    </aside>
  );
}

const S = {
  sidebar: {
    width: 220,
    minWidth: 220,
    background: MC.cardSoft,
    padding: '20px 14px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 16,
    minHeight: '100vh',
  } as CSSProperties,
  brandWrap: {
    padding: '4px 6px 12px',
    borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  nav: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
  } as CSSProperties,
  navBtn: {
    border: 'none',
    textAlign: 'left' as const,
    padding: '10px 12px',
    borderRadius: MR.md,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  } as CSSProperties,
  navIcon: { fontSize: 14, width: 20, textAlign: 'center' as const } as CSSProperties,
  profile: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    padding: 12,
    borderTop: `1px solid ${MC.borderSoft}`,
    marginTop: 8,
  } as CSSProperties,
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: MC.teal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    color: '#fff',
  } as CSSProperties,
  profileName: { fontSize: 13, fontWeight: 700, color: MC.text } as CSSProperties,
  profileRole: { fontSize: 11, color: MC.muted } as CSSProperties,
};
