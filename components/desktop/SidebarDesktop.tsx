'use client';

// ============================================================
// fliwoX Misure — SidebarDesktop con icone SVG outline
// ============================================================

import { useRouter } from 'next/navigation';
import type { CSSProperties, ReactNode } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { LogoBrand } from '@/components/icons/Logo';

interface NavItem {
  key: string;
  label: string;
  icon: ReactNode;
  href?: string;
}

const I = (path: ReactNode) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const NAV: NavItem[] = [
  {
    key: 'home', label: 'Home', href: '/',
    icon: I(<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>),
  },
  {
    key: 'commesse', label: 'Commesse', href: '/desktop/commesse',
    icon: I(<><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></>),
  },
  {
    key: 'calendario', label: 'Calendario', href: '/calendario',
    icon: I(<><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>),
  },
  {
    key: 'clienti', label: 'Clienti',
    icon: I(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
  },
  {
    key: 'prodotti', label: 'Prodotti',
    icon: I(<><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></>),
  },
  {
    key: 'magazzino', label: 'Magazzino',
    icon: I(<><path d="M22 12V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6" /><path d="M2 12h20" /><path d="M5 18h14" /></>),
  },
  {
    key: 'report', label: 'Report',
    icon: I(<><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>),
  },
  {
    key: 'impostazioni', label: 'Impostazioni',
    icon: I(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>),
  },
];

interface Props { active?: string }

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
  sidebar: { width: 220, minWidth: 220, background: MC.cardSoft, padding: '20px 14px', display: 'flex', flexDirection: 'column' as const, gap: 16, minHeight: '100vh' } as CSSProperties,
  brandWrap: { padding: '4px 6px 12px', borderBottom: `1px solid ${MC.borderSoft}` } as CSSProperties,
  nav: { flex: 1, display: 'flex', flexDirection: 'column' as const, gap: 2 } as CSSProperties,
  navBtn: { border: 'none', textAlign: 'left' as const, padding: '10px 12px', borderRadius: MR.md, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 12 } as CSSProperties,
  navIcon: { width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' } as CSSProperties,
  profile: { display: 'flex', gap: 10, alignItems: 'center', padding: 12, borderTop: `1px solid ${MC.borderSoft}`, marginTop: 8 } as CSSProperties,
  avatar: { width: 36, height: 36, borderRadius: '50%', background: MC.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff' } as CSSProperties,
  profileName: { fontSize: 13, fontWeight: 700, color: MC.text } as CSSProperties,
  profileRole: { fontSize: 11, color: MC.muted } as CSSProperties,
};
