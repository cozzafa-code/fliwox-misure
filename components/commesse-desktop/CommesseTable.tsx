'use client';

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { type ComRow, STATO_COM_LABEL, STATO_COM_BG, STATO_COM_FG, TIPO_INT_LABEL, fmtEuro } from '@/lib/commesse';

interface Props {
  rows: ComRow[];
  selectedId?: string;
  onSelect: (r: ComRow) => void;
}

export default function CommesseTable({ rows, selectedId, onSelect }: Props) {
  return (
    <div style={S.wrap}>
      <table style={S.table}>
        <thead>
          <tr style={S.headerRow}>
            <th style={S.th}>N°</th>
            <th style={S.th}>Cliente</th>
            <th style={S.th}>Indirizzo</th>
            <th style={S.th}>Tipo</th>
            <th style={S.th}>Stato</th>
            <th style={S.th}>Data sopralluogo</th>
            <th style={S.th}>Tecnico</th>
            <th style={{ ...S.th, textAlign: 'right' }}>Importo</th>
            <th style={{ ...S.th, width: 40 }}>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const isSelected = r.id === selectedId;
            return (
              <tr
                key={r.id}
                onClick={() => onSelect(r)}
                style={{
                  ...S.row,
                  background: isSelected ? MC.tealBg : 'transparent',
                }}
              >
                <td style={{ ...S.td, fontFamily: MF.mono, color: MC.muted }}>{r.numero}</td>
                <td style={{ ...S.td, fontWeight: 700 }}>{r.cliente}</td>
                <td style={S.td}>{r.indirizzo}</td>
                <td style={S.td}>{TIPO_INT_LABEL[r.tipo]}</td>
                <td style={S.td}>
                  <span
                    style={{
                      ...S.badge,
                      background: STATO_COM_BG[r.stato],
                      color: STATO_COM_FG[r.stato],
                    }}
                  >
                    {STATO_COM_LABEL[r.stato]}
                  </span>
                </td>
                <td style={{ ...S.td, fontFamily: MF.mono }}>{r.dataSopralluogo}</td>
                <td style={S.td}>{r.tecnico}</td>
                <td style={{ ...S.td, textAlign: 'right', fontFamily: MF.mono, fontWeight: 700 }}>{fmtEuro(r.importo)}</td>
                <td style={{ ...S.td, textAlign: 'center' }}>
                  <button onClick={(e) => { e.stopPropagation(); }} style={S.dotsBtn}>⋯</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {rows.length === 0 && <div style={S.empty}>Nessuna commessa in questa categoria</div>}
    </div>
  );
}

const S = {
  wrap: {
    flex: 1,
    overflow: 'auto',
    background: MC.bg,
  } as CSSProperties,
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontFamily: 'inherit',
  } as CSSProperties,
  headerRow: {
    background: MC.bgSoft,
  } as CSSProperties,
  th: {
    padding: '10px 14px',
    textAlign: 'left' as const,
    fontSize: 10,
    fontWeight: 700,
    color: MC.muted,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  row: {
    borderBottom: `1px solid ${MC.borderSoft}`,
    cursor: 'pointer',
    transition: 'background 0.1s',
  } as CSSProperties,
  td: {
    padding: '12px 14px',
    fontSize: 13,
    color: MC.text,
    verticalAlign: 'middle' as const,
  } as CSSProperties,
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: MR.xs,
    fontSize: 9,
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  } as CSSProperties,
  dotsBtn: {
    background: 'transparent',
    border: 'none',
    color: MC.muted,
    cursor: 'pointer',
    fontSize: 18,
    fontFamily: 'inherit',
    padding: '4px 8px',
    lineHeight: 1,
  } as CSSProperties,
  empty: {
    padding: 60,
    textAlign: 'center' as const,
    color: MC.mutedSoft,
    fontSize: 13,
  } as CSSProperties,
};
