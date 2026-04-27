'use client';

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { type AttivitaCal, type Tecnico, SETTIMANA_DEMO, TIPO_COLOR, TIPO_LABEL } from '@/lib/calendario';

interface Props {
  tecnici: Tecnico[];
  attivita: AttivitaCal[];
  onClickEvento: (a: AttivitaCal) => void;
}

export default function VistaTimeline({ tecnici, attivita, onClickEvento }: Props) {
  return (
    <div style={S.wrap}>
      <div style={S.head}>
        <div style={S.headLeft}>Tecnico</div>
        {SETTIMANA_DEMO.map((g) => (
          <div key={g.iso} style={S.headDay}>{g.lbl} {g.num}</div>
        ))}
      </div>
      <div style={S.body}>
        {tecnici.map((t) => (
          <div key={t.id} style={S.row}>
            <div style={S.tecLabel}>{t.nome}</div>
            <div style={S.daysRow}>
              {SETTIMANA_DEMO.map((g) => (
                <div key={g.iso} style={S.dayCell}>
                  {attivita
                    .filter((a) => a.tecnicoId === t.id && a.data === g.iso)
                    .map((a) => (
                      <div
                        key={a.id}
                        onClick={() => onClickEvento(a)}
                        style={{ ...S.evento, background: TIPO_COLOR[a.tipo] }}
                        title={`${a.oraInizio} ${a.cliente}`}
                      >
                        <div style={S.eOra}>{a.oraInizio}</div>
                        <div style={S.eTit}>{TIPO_LABEL[a.tipo]}</div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const S = {
  wrap: { flex: 1, padding: 12, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' } as CSSProperties,
  head: {
    display: 'grid',
    gridTemplateColumns: '120px repeat(7, 1fr)',
    background: MC.bgSoft,
    borderRadius: `8px 8px 0 0`,
    overflow: 'hidden',
  } as CSSProperties,
  headLeft: { padding: 8, fontSize: 10, fontWeight: 700, color: MC.muted, letterSpacing: 0.5 } as CSSProperties,
  headDay: { padding: 8, fontSize: 10, fontWeight: 700, color: MC.muted, textAlign: 'center' as const, borderLeft: `1px solid ${MC.borderSoft}` } as CSSProperties,
  body: { flex: 1, overflow: 'auto', border: `1px solid ${MC.border}`, borderTop: 'none', borderRadius: '0 0 8px 8px' } as CSSProperties,
  row: {
    display: 'grid',
    gridTemplateColumns: '120px repeat(7, 1fr)',
    minHeight: 56,
    borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  tecLabel: {
    padding: 10, fontSize: 12, fontWeight: 700, color: MC.text,
    background: MC.cardSoft, borderRight: `1px solid ${MC.border}`,
    display: 'flex', alignItems: 'center',
  } as CSSProperties,
  daysRow: { display: 'contents' } as CSSProperties,
  dayCell: {
    borderLeft: `1px solid ${MC.borderSoft}`,
    padding: 4,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 3,
  } as CSSProperties,
  evento: {
    borderRadius: MR.sm,
    padding: '4px 6px',
    color: '#fff',
    cursor: 'pointer',
  } as CSSProperties,
  eOra: { fontSize: 9, fontWeight: 700, fontFamily: MF.mono, opacity: 0.9 } as CSSProperties,
  eTit: { fontSize: 10, fontWeight: 700 } as CSSProperties,
};
