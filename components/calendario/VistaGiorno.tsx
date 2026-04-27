'use client';

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { type AttivitaCal, type Tecnico, ORE_GIORNATA, TIPO_COLOR, TIPO_LABEL } from '@/lib/calendario';

interface Props {
  giornoIso: string;
  giornoLabel: string;
  tecnici: Tecnico[];
  attivita: AttivitaCal[];
  onClickEvento: (a: AttivitaCal) => void;
}

export default function VistaGiorno({ giornoIso, giornoLabel, tecnici, attivita, onClickEvento }: Props) {
  const attDay = attivita.filter((a) => a.data === giornoIso);

  return (
    <div style={S.wrap}>
      <div style={S.dayHead}>{giornoLabel}</div>
      <div style={S.grid}>
        <div style={S.oreCol}>
          {ORE_GIORNATA.map((ora) => (
            <div key={ora} style={S.oraSlot}>
              <span style={S.oraLbl}>{ora}</span>
            </div>
          ))}
        </div>
        <div style={S.tecCols}>
          {tecnici.map((t) => (
            <div key={t.id} style={S.tecCol}>
              <div style={S.tecHead}>{t.nome}</div>
              <div style={S.tecBody}>
                {ORE_GIORNATA.map((ora) => (
                  <div key={ora} style={S.cell} />
                ))}
                {attDay
                  .filter((a) => a.tecnicoId === t.id)
                  .map((a) => {
                    const [sh, sm] = a.oraInizio.split(':').map(Number);
                    const [eh, em] = a.oraFine.split(':').map(Number);
                    const start = sh * 60 + sm;
                    const end = eh * 60 + em;
                    const baseMin = 8 * 60;
                    const top = ((start - baseMin) / 60) * 60;
                    const height = ((end - start) / 60) * 60 - 4;
                    return (
                      <div
                        key={a.id}
                        onClick={() => onClickEvento(a)}
                        style={{
                          ...S.evento,
                          top, height,
                          background: TIPO_COLOR[a.tipo],
                        }}
                      >
                        <div style={S.eOra}>{a.oraInizio} - {a.oraFine}</div>
                        <div style={S.eTit}>{TIPO_LABEL[a.tipo]}</div>
                        <div style={S.eCli}>{a.cliente}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const S = {
  wrap: { flex: 1, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' } as CSSProperties,
  dayHead: { padding: 12, fontSize: 14, fontWeight: 800, color: MC.text, background: MC.bgSoft, borderBottom: `1px solid ${MC.borderSoft}` } as CSSProperties,
  grid: { flex: 1, display: 'grid', gridTemplateColumns: '60px 1fr', overflow: 'auto' } as CSSProperties,
  oreCol: { borderRight: `1px solid ${MC.border}` } as CSSProperties,
  oraSlot: { height: 60, borderBottom: `1px solid ${MC.borderSoft}`, position: 'relative' as const } as CSSProperties,
  oraLbl: { fontSize: 10, color: MC.muted, fontFamily: MF.mono, padding: '2px 6px' } as CSSProperties,
  tecCols: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' } as CSSProperties,
  tecCol: { borderRight: `1px solid ${MC.borderSoft}`, position: 'relative' as const, display: 'flex', flexDirection: 'column' as const } as CSSProperties,
  tecHead: { fontSize: 11, fontWeight: 700, color: MC.text, padding: 8, textAlign: 'center' as const, background: MC.cardSoft, borderBottom: `1px solid ${MC.border}` } as CSSProperties,
  tecBody: { flex: 1, position: 'relative' as const } as CSSProperties,
  cell: { height: 60, borderBottom: `1px solid ${MC.borderSoft}` } as CSSProperties,
  evento: {
    position: 'absolute' as const, left: 4, right: 4,
    borderRadius: MR.sm, padding: 6, color: '#fff', cursor: 'pointer',
  } as CSSProperties,
  eOra: { fontSize: 10, fontWeight: 700, fontFamily: MF.mono, opacity: 0.9 } as CSSProperties,
  eTit: { fontSize: 11, fontWeight: 800, marginTop: 2 } as CSSProperties,
  eCli: { fontSize: 10 } as CSSProperties,
};
