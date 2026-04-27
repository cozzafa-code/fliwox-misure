'use client';

// ============================================================
// fliwoX Misure — VanoCheck (checklist tecnica)
// ============================================================

import { useState, type CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';

interface Props { vanoId?: string }

type StatoItem = 'ok' | 'warning' | 'error' | 'pending';

interface ChecklistItem {
  id: string;
  titolo: string;
  meta: string;
  stato: StatoItem;
}

const ITEMS_INIT: ChecklistItem[] = [
  { id: '1', titolo: 'Muri fuori squadra', meta: 'Differenza max 1 cm', stato: 'warning' },
  { id: '2', titolo: 'Impianti / Ostacoli', meta: 'Verifica presente', stato: 'ok' },
  { id: '3', titolo: 'Accessibilità', meta: 'Accesso libero', stato: 'ok' },
  { id: '4', titolo: 'Smontaggio', meta: 'Necessario', stato: 'ok' },
  { id: '5', titolo: 'Punti di ancoraggio', meta: 'Verificati', stato: 'ok' },
  { id: '6', titolo: 'Note tecniche', meta: 'Aggiungi nota…', stato: 'pending' },
];

const STATO_BG: Record<StatoItem, string> = {
  ok: MC.statoCompletata,
  warning: MC.warning,
  error: MC.danger,
  pending: 'transparent',
};

const STATO_ICON: Record<StatoItem, string> = {
  ok: '✓',
  warning: '⚠',
  error: '✕',
  pending: '›',
};

export default function VanoCheck(_props: Props) {
  const [tab, setTab] = useState<'checklist' | 'note'>('checklist');
  const [items] = useState(ITEMS_INIT);

  return (
    <div style={S.wrap}>
      <div style={S.subtabs}>
        <button
          onClick={() => setTab('checklist')}
          style={{
            ...S.subtab,
            color: tab === 'checklist' ? MC.teal : MC.muted,
            borderBottomColor: tab === 'checklist' ? MC.teal : 'transparent',
          }}
        >
          Checklist
        </button>
        <button
          onClick={() => setTab('note')}
          style={{
            ...S.subtab,
            color: tab === 'note' ? MC.teal : MC.muted,
            borderBottomColor: tab === 'note' ? MC.teal : 'transparent',
          }}
        >
          Note
        </button>
      </div>

      {tab === 'checklist' && (
        <div style={S.list}>
          {items.map((item) => (
            <div key={item.id} style={S.row}>
              <div style={S.rowIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
              </div>
              <div style={S.rowContent}>
                <div style={S.rowTitolo}>{item.titolo}</div>
                <div style={S.rowMeta}>{item.meta}</div>
              </div>
              <div
                style={{
                  ...S.rowStato,
                  background: STATO_BG[item.stato],
                  color: item.stato === 'pending' ? MC.muted : '#fff',
                  border: item.stato === 'pending' ? `1px solid ${MC.border}` : 'none',
                }}
              >
                {STATO_ICON[item.stato]}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'note' && (
        <div style={S.notesEmpty}>Aggiungi una nota tecnica</div>
      )}

      <div style={S.actionRow}>
        <button style={S.btnPrimary}>Check completato</button>
      </div>
    </div>
  );
}

const S = {
  wrap: { display: 'flex', flexDirection: 'column' as const, height: '100%' } as CSSProperties,
  subtabs: {
    display: 'flex',
    padding: '0 20px',
    borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  subtab: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 16px',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    fontFamily: 'inherit',
    borderBottom: '2px solid',
  } as CSSProperties,
  list: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: 16,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
  } as CSSProperties,
  row: {
    background: MC.cardSoft,
    borderRadius: MR.lg,
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  } as CSSProperties,
  rowIcon: {
    width: 32,
    height: 32,
    background: '#1A1F26',
    borderRadius: MR.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: MC.muted,
    flexShrink: 0,
  } as CSSProperties,
  rowContent: { flex: 1, minWidth: 0 } as CSSProperties,
  rowTitolo: { fontSize: 13, fontWeight: 700, color: MC.text } as CSSProperties,
  rowMeta: { fontSize: 11, color: MC.muted, marginTop: 1 } as CSSProperties,
  rowStato: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 800,
    flexShrink: 0,
  } as CSSProperties,
  notesEmpty: {
    flex: 1,
    padding: 32,
    textAlign: 'center' as const,
    color: MC.mutedSoft,
    fontSize: 13,
  } as CSSProperties,
  actionRow: { padding: '0 16px 20px' } as CSSProperties,
  btnPrimary: {
    width: '100%',
    background: MC.teal,
    color: '#fff',
    border: 'none',
    borderRadius: MR.lg,
    padding: '14px 0',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: 0.3,
  } as CSSProperties,
};
