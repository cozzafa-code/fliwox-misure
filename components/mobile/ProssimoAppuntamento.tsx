'use client';

// ============================================================
// fliwoX Misure — ProssimoAppuntamento (home banner)
// ============================================================

import { useRouter } from 'next/navigation';
import type { CSSProperties } from 'react';
import { MC, MF, MR, MS } from '@/constants/design-system';
import type { Evento } from '@/lib/types';
import { relativeDay } from '@/lib/dates';

interface Props {
  evento: Evento | null;
}

export default function ProssimoAppuntamento({ evento }: Props) {
  const router = useRouter();

  if (!evento) {
    return (
      <div style={S.empty}>
        <div style={S.emptyLabel}>Prossimo appuntamento</div>
        <div style={S.emptyText}>Nessun appuntamento in programma</div>
      </div>
    );
  }

  return (
    <button
      onClick={() => evento.commessa_id && router.push(`/commesse/${evento.commessa_id}`)}
      style={S.card}
    >
      <div style={S.left}>
        <div style={S.ora}>{evento.ora || '—'}</div>
      </div>
      <div style={S.right}>
        <div style={S.label}>{relativeDay(evento.data)} · {evento.tipo ?? 'Appuntamento'}</div>
        <div style={S.titolo}>{evento.titolo}</div>
        {evento.indirizzo && <div style={S.indirizzo}>{evento.indirizzo}</div>}
      </div>
      <div style={S.arrow}>›</div>
    </button>
  );
}

const S = {
  card: {
    background: MC.card,
    border: `1px solid ${MC.border}`,
    borderRadius: MR.lg,
    padding: 14,
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    width: '100%',
    cursor: 'pointer',
    boxShadow: MS.card,
    fontFamily: 'inherit',
    color: MC.text,
    textAlign: 'left' as const,
  } as CSSProperties,
  left: {
    flexShrink: 0,
    width: 64,
    textAlign: 'center' as const,
  } as CSSProperties,
  ora: {
    fontSize: 22,
    fontWeight: 800,
    color: MC.teal,
    fontFamily: MF.mono,
  } as CSSProperties,
  right: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,
  label: {
    fontSize: 10,
    fontWeight: 700,
    color: MC.muted,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    marginBottom: 4,
  } as CSSProperties,
  titolo: {
    fontSize: 14,
    fontWeight: 700,
    color: MC.text,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  } as CSSProperties,
  indirizzo: {
    fontSize: 12,
    color: MC.muted,
    marginTop: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  } as CSSProperties,
  arrow: {
    fontSize: 24,
    color: MC.muted,
    flexShrink: 0,
  } as CSSProperties,
  empty: {
    background: MC.card,
    border: `1px dashed ${MC.border}`,
    borderRadius: MR.lg,
    padding: 14,
    textAlign: 'center' as const,
  } as CSSProperties,
  emptyLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: MC.muted,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    marginBottom: 4,
  } as CSSProperties,
  emptyText: {
    fontSize: 13,
    color: MC.mutedSoft,
  } as CSSProperties,
};
