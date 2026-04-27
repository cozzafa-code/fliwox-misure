'use client';

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { type ComRow, STATO_COM_LABEL, STATO_COM_BG, STATO_COM_FG, TIPO_INT_LABEL } from '@/lib/commesse';

interface Props {
  rows: ComRow[];
  onSelect: (r: ComRow) => void;
}

const COL: { stato: 'in_corso' | 'in_attesa' | 'in_sospeso'; }[] = [
  { stato: 'in_corso' }, { stato: 'in_attesa' }, { stato: 'in_sospeso' },
];

export default function VistaKanban({ rows, onSelect }: Props) {
  return (
    <div style={S.wrap}>
      {COL.map((c) => {
        const items = rows.filter((r) => r.stato === c.stato);
        return (
          <div key={c.stato} style={S.col}>
            <div style={S.colHeader}>
              <span
                style={{
                  ...S.colBadge,
                  background: STATO_COM_BG[c.stato],
                  color: STATO_COM_FG[c.stato],
                }}
              >
                {STATO_COM_LABEL[c.stato]}
              </span>
              <span style={S.count}>{items.length}</span>
            </div>
            <div style={S.cards}>
              {items.map((r) => (
                <div key={r.id} onClick={() => onSelect(r)} style={S.card}>
                  <div style={S.numero}>{r.numero}</div>
                  <div style={S.cliente}>{r.cliente}</div>
                  <div style={S.indirizzo}>{r.indirizzo}</div>
                  <div style={S.tipo}>{TIPO_INT_LABEL[r.tipo]}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const S = {
  wrap: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 16,
    padding: 20,
    flex: 1,
    overflow: 'auto',
  } as CSSProperties,
  col: {
    background: MC.bgSoft,
    borderRadius: MR.lg,
    padding: 12,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
  } as CSSProperties,
  colHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
    borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  colBadge: {
    padding: '4px 10px',
    borderRadius: MR.xs,
    fontSize: 10,
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  } as CSSProperties,
  count: { fontSize: 13, fontWeight: 800, color: MC.muted, fontFamily: MF.mono } as CSSProperties,
  cards: { display: 'flex', flexDirection: 'column' as const, gap: 8 } as CSSProperties,
  card: {
    background: MC.cardSoft,
    borderRadius: MR.md,
    padding: 12,
    cursor: 'pointer',
    border: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  numero: { fontSize: 11, color: MC.muted, fontFamily: MF.mono, marginBottom: 4 } as CSSProperties,
  cliente: { fontSize: 13, fontWeight: 700, color: MC.text } as CSSProperties,
  indirizzo: { fontSize: 11, color: MC.muted, marginTop: 2 } as CSSProperties,
  tipo: { fontSize: 11, color: MC.text, marginTop: 4 } as CSSProperties,
};
