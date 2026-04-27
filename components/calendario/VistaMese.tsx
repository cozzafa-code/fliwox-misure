'use client';

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { type AttivitaCal, TIPO_COLOR } from '@/lib/calendario';

interface Props {
  meseIso: string; // YYYY-MM
  attivita: AttivitaCal[];
  onClickEvento: (a: AttivitaCal) => void;
}

const GIORNI_LBL = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'];

export default function VistaMese({ meseIso, attivita, onClickEvento }: Props) {
  const [year, month] = meseIso.split('-').map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekday = (firstDay.getDay() + 6) % 7; // 0=Lun

  const cells: (number | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div style={S.wrap}>
      <div style={S.head}>
        {GIORNI_LBL.map((g) => (
          <div key={g} style={S.headCell}>{g}</div>
        ))}
      </div>
      <div style={S.grid}>
        {cells.map((d, i) => {
          if (d === null) return <div key={i} style={S.emptyCell} />;
          const iso = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const dayEvents = attivita.filter((a) => a.data === iso);
          return (
            <div key={i} style={S.dayCell}>
              <div style={S.dayNum}>{d}</div>
              <div style={S.dayEvents}>
                {dayEvents.slice(0, 3).map((a) => (
                  <div
                    key={a.id}
                    onClick={() => onClickEvento(a)}
                    style={{ ...S.eventoMini, background: TIPO_COLOR[a.tipo] }}
                  >
                    <span style={S.eMiniOra}>{a.oraInizio}</span>
                    <span style={S.eMiniTit}>{a.cliente}</span>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div style={S.more}>+{dayEvents.length - 3} altri</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const S = {
  wrap: { flex: 1, display: 'flex', flexDirection: 'column' as const, padding: 12 } as CSSProperties,
  head: {
    display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
    background: MC.cardSoft, borderRadius: `${8}px ${8}px 0 0`, overflow: 'hidden',
  } as CSSProperties,
  headCell: {
    padding: 8, textAlign: 'center' as const,
    fontSize: 10, fontWeight: 700, color: MC.muted, letterSpacing: 0.5,
  } as CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridAutoRows: 'minmax(80px, 1fr)',
    flex: 1,
    border: `1px solid ${MC.border}`,
    borderRadius: 8,
    overflow: 'hidden',
  } as CSSProperties,
  emptyCell: { background: MC.bgSoft, borderRight: `1px solid ${MC.borderSoft}`, borderBottom: `1px solid ${MC.borderSoft}` } as CSSProperties,
  dayCell: {
    padding: 4,
    borderRight: `1px solid ${MC.borderSoft}`,
    borderBottom: `1px solid ${MC.borderSoft}`,
    overflow: 'hidden',
  } as CSSProperties,
  dayNum: { fontSize: 11, fontWeight: 700, color: MC.text, fontFamily: MF.mono, marginBottom: 2 } as CSSProperties,
  dayEvents: { display: 'flex', flexDirection: 'column' as const, gap: 2 } as CSSProperties,
  eventoMini: {
    fontSize: 9, padding: '2px 4px', borderRadius: 3, color: '#fff',
    cursor: 'pointer', display: 'flex', gap: 4, overflow: 'hidden',
  } as CSSProperties,
  eMiniOra: { fontWeight: 700, fontFamily: MF.mono, flexShrink: 0 } as CSSProperties,
  eMiniTit: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const } as CSSProperties,
  more: { fontSize: 9, color: MC.muted, fontWeight: 600 } as CSSProperties,
};
