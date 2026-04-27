'use client';

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import type { ComRow } from '@/lib/commesse';

interface Props {
  rows: ComRow[];
  onSelect: (r: ComRow) => void;
}

interface FaseGantt { commId: string; label: string; start: number; durata: number; color: string }

// MOCK fasi per riga (in giorni del mese maggio)
function generaFasi(rows: ComRow[]): FaseGantt[] {
  const colors = [MC.tileSopralluoghi, MC.tileMontaggi, MC.success, MC.danger, MC.tileMisure];
  const labels = ['Sopralluogo', 'Produzione', 'Montaggio', 'Rilievi', 'Consegna'];
  const fasi: FaseGantt[] = [];
  rows.slice(0, 5).forEach((r, i) => {
    const start = 5 + i * 4;
    const durata = 6 + (i % 2) * 3;
    fasi.push({ commId: r.id, label: labels[i % labels.length], start, durata, color: colors[i % colors.length] });
  });
  return fasi;
}

const GIORNI_MESE = 31;

export default function VistaGantt({ rows, onSelect }: Props) {
  const fasi = generaFasi(rows);
  const ROW_H = 44;
  const LABEL_W = 200;

  return (
    <div style={S.wrap}>
      <div style={S.title}>Maggio 2024</div>
      <div style={S.gantt}>
        {/* Header giorni */}
        <div style={{ ...S.headerRow, gridTemplateColumns: `${LABEL_W}px repeat(${GIORNI_MESE}, 1fr)` }}>
          <div />
          {Array.from({ length: GIORNI_MESE }, (_, i) => i + 1).map((d) => (
            <div key={d} style={S.dayCol}>{d}</div>
          ))}
        </div>
        {/* Righe commesse */}
        {rows.slice(0, 5).map((r) => {
          const f = fasi.find((x) => x.commId === r.id);
          return (
            <div
              key={r.id}
              onClick={() => onSelect(r)}
              style={{
                ...S.row,
                gridTemplateColumns: `${LABEL_W}px repeat(${GIORNI_MESE}, 1fr)`,
                height: ROW_H,
              }}
            >
              <div style={S.label}>
                <div style={S.labNum}>{r.numero}</div>
                <div style={S.labCli}>{r.cliente}</div>
              </div>
              {Array.from({ length: GIORNI_MESE }, (_, i) => i + 1).map((d) => (
                <div key={d} style={S.cell} />
              ))}
              {f && (
                <div
                  style={{
                    ...S.bar,
                    background: f.color,
                    left: `calc(${LABEL_W}px + ${(f.start - 1) / GIORNI_MESE * 100}% * (1 - ${LABEL_W}px / 100%))`,
                    // semplificato: usiamo grid-column posizionando con width relativa
                    gridColumn: `${1 + f.start} / span ${f.durata}`,
                  }}
                >
                  {f.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const S = {
  wrap: {
    flex: 1,
    overflow: 'auto',
    padding: 20,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
  } as CSSProperties,
  title: { fontSize: 13, fontWeight: 800, color: MC.text, fontFamily: MF.mono } as CSSProperties,
  gantt: {
    background: MC.bgSoft,
    borderRadius: MR.lg,
    padding: 12,
    display: 'flex',
    flexDirection: 'column' as const,
  } as CSSProperties,
  headerRow: {
    display: 'grid',
    borderBottom: `1px solid ${MC.borderSoft}`,
    paddingBottom: 6,
  } as CSSProperties,
  dayCol: {
    fontSize: 9,
    color: MC.muted,
    textAlign: 'center' as const,
    fontFamily: MF.mono,
  } as CSSProperties,
  row: {
    display: 'grid',
    alignItems: 'center',
    borderBottom: `1px solid ${MC.borderSoft}`,
    cursor: 'pointer',
    position: 'relative' as const,
  } as CSSProperties,
  label: {
    paddingRight: 12,
    paddingLeft: 4,
  } as CSSProperties,
  labNum: { fontSize: 10, color: MC.muted, fontFamily: MF.mono } as CSSProperties,
  labCli: { fontSize: 12, color: MC.text, fontWeight: 700 } as CSSProperties,
  cell: { borderLeft: `1px solid ${MC.borderSoft}`, height: '100%' } as CSSProperties,
  bar: {
    height: 22,
    borderRadius: 4,
    color: '#fff',
    fontSize: 10,
    fontWeight: 700,
    padding: '0 8px',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap' as const,
  } as CSSProperties,
};
