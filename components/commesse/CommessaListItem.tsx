'use client';

// ============================================================
// fliwoX Misure — CommessaListItem (card lista)
// ============================================================

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { classificaStato, STATO_LABEL, type StatoCommessa } from '@/lib/api';
import type { Commessa } from '@/lib/types';
import { IconChevronRight } from '@/components/icons';

interface Props {
  commessa: Commessa;
  onClick?: () => void;
}

const STATO_BG: Record<StatoCommessa, string> = {
  in_corso: MC.statoInCorso,
  in_attesa: MC.statoInAttesa,
  completata: MC.statoCompletata,
  chiusa: MC.statoChiusa,
};

const STATO_FG: Record<StatoCommessa, string> = {
  in_corso: '#FFFFFF',
  in_attesa: '#1E2128',
  completata: '#1E2128',
  chiusa: '#FFFFFF',
};

export default function CommessaListItem({ commessa, onClick }: Props) {
  const nome = `${commessa.cliente ?? ''} ${commessa.cognome ?? ''}`.trim() || 'Senza nome';
  const stato = classificaStato(commessa);
  const dataSopralluogo = commessa.created_at
    ? new Date(commessa.created_at).toLocaleDateString('it-IT', {
        day: '2-digit', month: '2-digit', year: 'numeric',
      })
    : '—';

  return (
    <div onClick={onClick} style={S.card}>
      <div style={S.thumb}>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
          <rect x={4} y={4} width={16} height={16} rx={1} />
          <line x1={12} y1={4} x2={12} y2={20} />
          <line x1={4} y1={12} x2={20} y2={12} />
        </svg>
      </div>
      <div style={S.content}>
        <div style={S.row1}>
          <span style={S.cliente}>{nome}</span>
          <span style={{ ...S.badge, background: STATO_BG[stato], color: STATO_FG[stato] }}>
            {STATO_LABEL[stato]}
          </span>
        </div>
        {commessa.indirizzo && <div style={S.indirizzo}>{commessa.indirizzo}</div>}
        <div style={S.date}>Sopralluogo: {dataSopralluogo}</div>
      </div>
      <span style={S.arrow}>
        <IconChevronRight size={18} />
      </span>
    </div>
  );
}

const S = {
  card: {
    background: MC.cardSoft,
    borderRadius: MR.lg,
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
  } as CSSProperties,
  thumb: {
    width: 48,
    height: 48,
    borderRadius: MR.md,
    background: '#1A1F26',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: MC.muted,
    flexShrink: 0,
  } as CSSProperties,
  content: { flex: 1, minWidth: 0 } as CSSProperties,
  row1: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  } as CSSProperties,
  cliente: {
    fontSize: 14,
    fontWeight: 700,
    color: MC.text,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  } as CSSProperties,
  badge: {
    fontSize: 9,
    fontWeight: 800,
    padding: '3px 8px',
    borderRadius: MR.xs,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    flexShrink: 0,
  } as CSSProperties,
  indirizzo: {
    fontSize: 12,
    color: MC.muted,
    marginTop: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  } as CSSProperties,
  date: {
    fontSize: 11,
    color: MC.muted,
    marginTop: 2,
    fontFamily: MF.mono,
  } as CSSProperties,
  arrow: {
    color: MC.muted,
    flexShrink: 0,
  } as CSSProperties,
};
