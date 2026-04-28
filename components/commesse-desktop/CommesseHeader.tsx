'use client';

// ============================================================
// fliwoX Misure — CommesseHeader v3 (con breadcrumb stato)
// ============================================================

import type { CSSProperties } from 'react';
import { MC, MR } from '@/constants/design-system';
import { IconSearch, IconPlus } from '@/components/icons';
import { type StatoCom, STATO_COM_LABEL, STATO_COM_BG, STATO_COM_FG } from '@/lib/commesse';

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  onApriFiltri: () => void;
  onNuova: () => void;
  statoSel?: StatoCom | 'all';
}

export default function CommesseHeader({ search, onSearchChange, onApriFiltri, onNuova, statoSel = 'all' }: Props) {
  const showBreadcrumb = statoSel !== 'all';

  return (
    <>
      {/* Mini-breadcrumb top a destra */}
      <div style={S.breadcrumbBar}>
        <span style={S.bcText}>Commesse</span>
        {showBreadcrumb && (
          <>
            <span style={S.bcSep}>|</span>
            <span
              style={{
                ...S.bcBadge,
                background: STATO_COM_BG[statoSel as StatoCom],
                color: STATO_COM_FG[statoSel as StatoCom],
              }}
            >
              {STATO_COM_LABEL[statoSel as StatoCom]}
            </span>
          </>
        )}
      </div>

      <div style={S.bar}>
        <h1 style={S.title}>Commesse</h1>
        <div style={S.searchWrap}>
          <IconSearch size={16} style={{ color: MC.muted, position: 'absolute', left: 12, top: 11 }} />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cerca commessa, cliente, indirizzo…"
            style={S.search}
          />
        </div>
        <button onClick={onApriFiltri} style={S.btnIcon} aria-label="Filtri">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46" />
          </svg>
        </button>
        <button onClick={onNuova} style={S.btnPrimary}>
          <IconPlus size={16} strokeWidth={2.5} />
          <span>Nuova commessa</span>
        </button>
      </div>
    </>
  );
}

const S = {
  breadcrumbBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '8px 24px',
    background: MC.bgSoft,
    borderBottom: `1px solid ${MC.borderSoft}`,
    gap: 8,
  } as CSSProperties,
  bcText: { fontSize: 11, fontWeight: 700, color: MC.muted, textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  bcSep: { fontSize: 11, color: MC.mutedSoft } as CSSProperties,
  bcBadge: {
    padding: '3px 10px',
    borderRadius: MR.xs,
    fontSize: 9,
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  } as CSSProperties,
  bar: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '20px 24px',
    background: MC.bg,
    borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  title: { fontSize: 20, fontWeight: 800, color: MC.text, margin: 0, marginRight: 8 } as CSSProperties,
  searchWrap: { position: 'relative' as const, flex: 1, maxWidth: 480 } as CSSProperties,
  search: {
    width: '100%',
    padding: '10px 12px 10px 36px',
    background: MC.cardSoft,
    color: MC.text,
    border: `1px solid ${MC.border}`,
    borderRadius: MR.md,
    fontSize: 13,
    outline: 'none',
    fontFamily: 'inherit',
  } as CSSProperties,
  btnIcon: {
    width: 38, height: 38,
    background: MC.cardSoft,
    border: `1px solid ${MC.border}`,
    borderRadius: MR.md,
    color: MC.text,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'inherit',
  } as CSSProperties,
  btnPrimary: {
    background: MC.teal,
    color: '#fff',
    border: 'none',
    borderRadius: MR.md,
    padding: '10px 18px',
    fontSize: 12,
    fontWeight: 800,
    cursor: 'pointer',
    fontFamily: 'inherit',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  } as CSSProperties,
};
