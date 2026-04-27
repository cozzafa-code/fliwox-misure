'use client';

// ============================================================
// fliwoX Misure — Lista Task aperti
// ============================================================

import type { CSSProperties } from 'react';
import { MC, MF, MR, MS } from '@/constants/design-system';
import type { Task } from '@/lib/types';
import { relativeDay } from '@/lib/dates';

const PRIORITA_COLOR: Record<string, string> = {
  alta: MC.danger,
  media: MC.warning,
  bassa: MC.info,
};

interface Props {
  tasks: Task[];
  onToggle?: (id: string, done: boolean) => void;
}

export default function TaskList({ tasks, onToggle }: Props) {
  if (tasks.length === 0) {
    return <div style={S.empty}>Nessun task aperto 🎉</div>;
  }

  return (
    <div style={S.list}>
      {tasks.map((t) => (
        <div key={t.id} style={S.row}>
          <div
            onClick={() => onToggle?.(t.id, !t.done)}
            style={{
              ...S.checkbox,
              borderColor: t.done ? MC.success : MC.borderStrong,
              background: t.done ? MC.success : 'transparent',
            }}
          >
            {t.done && <span style={S.check}>✓</span>}
          </div>
          <div style={S.content}>
            <div
              style={{
                ...S.testo,
                textDecoration: t.done ? 'line-through' : 'none',
                color: t.done ? MC.mutedSoft : MC.text,
              }}
            >
              {t.testo}
            </div>
            <div style={S.meta}>
              {t.data && <span style={S.metaItem}>📅 {relativeDay(t.data)}</span>}
              {t.persona && <span style={S.metaItem}>👤 {t.persona}</span>}
              {t.priorita && (
                <span
                  style={{
                    ...S.priorita,
                    color: PRIORITA_COLOR[t.priorita] ?? MC.muted,
                    background: `${PRIORITA_COLOR[t.priorita] ?? MC.muted}15`,
                  }}
                >
                  {t.priorita}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const S = {
  list: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
  } as CSSProperties,
  row: {
    display: 'flex',
    gap: 12,
    padding: 12,
    background: MC.card,
    borderRadius: MR.md,
    border: `1px solid ${MC.border}`,
    boxShadow: MS.button,
  } as CSSProperties,
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: MR.sm,
    border: '2px solid',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
    transition: 'all 0.15s',
  } as CSSProperties,
  check: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 800,
  } as CSSProperties,
  content: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,
  testo: {
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 1.4,
  } as CSSProperties,
  meta: {
    display: 'flex',
    gap: 10,
    marginTop: 6,
    flexWrap: 'wrap' as const,
  } as CSSProperties,
  metaItem: {
    fontSize: 11,
    color: MC.muted,
    fontFamily: MF.mono,
  } as CSSProperties,
  priorita: {
    fontSize: 10,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: MR.full,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  } as CSSProperties,
  empty: {
    padding: 24,
    textAlign: 'center' as const,
    color: MC.mutedSoft,
    fontSize: 13,
    background: MC.card,
    borderRadius: MR.md,
    border: `1px dashed ${MC.border}`,
  } as CSSProperties,
};
