'use client';

// ============================================================
// fliwoX Misure — VistaSettimana (swimlane tecnici × giorni × ore)
// Specifica 01: panoramica generale
// ============================================================

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import {
  type AttivitaCal, type Tecnico, ORE_GIORNATA, SETTIMANA_DEMO,
  TIPO_COLOR, TIPO_LABEL,
} from '@/lib/calendario';

const PIXEL_PER_HOUR = 60;
const HEADER_GIORNO_H = 36;

interface Props {
  tecnici: Tecnico[];
  attivita: AttivitaCal[];
  oraCorrente?: string; // HH:MM
  onClickEvento: (a: AttivitaCal) => void;
  onClickCella: (tecnicoId: string, giornoIso: string, ora: string) => void;
}

function oraToMinuti(ora: string): number {
  const [h, m] = ora.split(':').map(Number);
  return h * 60 + m;
}

function topPxFromOra(ora: string): number {
  const startMin = oraToMinuti(ORE_GIORNATA[0]);
  return ((oraToMinuti(ora) - startMin) / 60) * PIXEL_PER_HOUR;
}

function durataPx(start: string, end: string): number {
  return ((oraToMinuti(end) - oraToMinuti(start)) / 60) * PIXEL_PER_HOUR;
}

export default function VistaSettimana({
  tecnici, attivita, oraCorrente, onClickEvento, onClickCella,
}: Props) {
  const altezzaCorpo = ORE_GIORNATA.length * PIXEL_PER_HOUR;

  return (
    <div style={S.wrap}>
      {/* Header giorni in alto */}
      <div style={S.headerRow}>
        <div style={S.headerLeft} />
        {SETTIMANA_DEMO.map((g) => (
          <div key={g.iso} style={S.headerGiorno}>
            {g.lbl} {g.num}
          </div>
        ))}
      </div>

      <div style={S.scrollBody}>
        {tecnici.map((tec) => (
          <div key={tec.id} style={S.lane}>
            {/* Etichetta tecnico a sinistra */}
            <div style={S.tecLabel}>
              <div style={S.tecNome}>{tec.nome}</div>
              {tec.attivitaTotali != null && (
                <div style={S.tecCount}>
                  {tec.attivitaCompletate ?? 0}/{tec.attivitaTotali} attività
                </div>
              )}
            </div>

            {/* 7 colonne giorni */}
            {SETTIMANA_DEMO.map((g) => (
              <div
                key={g.iso}
                style={{ ...S.dayCol, height: altezzaCorpo }}
              >
                {/* griglia ore */}
                {ORE_GIORNATA.map((ora, oi) => (
                  <div
                    key={ora}
                    onClick={() => onClickCella(tec.id, g.iso, ora)}
                    style={{
                      ...S.hourSlot,
                      top: oi * PIXEL_PER_HOUR,
                      height: PIXEL_PER_HOUR,
                    }}
                  >
                    {oi === 0 && <span style={S.hourLabel}>{ora}</span>}
                  </div>
                ))}

                {/* eventi del giorno per il tecnico */}
                {attivita
                  .filter((a) => a.tecnicoId === tec.id && a.data === g.iso)
                  .map((a) => (
                    <div
                      key={a.id}
                      onClick={(e) => { e.stopPropagation(); onClickEvento(a); }}
                      style={{
                        ...S.evento,
                        top: topPxFromOra(a.oraInizio) + 2,
                        height: durataPx(a.oraInizio, a.oraFine) - 4,
                        background: TIPO_COLOR[a.tipo],
                      }}
                    >
                      <div style={S.eOra}>{a.oraInizio} - {a.oraFine}</div>
                      <div style={S.eTit}>{TIPO_LABEL[a.tipo]}</div>
                      <div style={S.eCli}>{a.cliente}</div>
                      {a.indirizzo && <div style={S.eAddr}>{a.indirizzo}</div>}
                    </div>
                  ))}

                {/* linea ora corrente (se siamo "oggi") */}
                {oraCorrente && (
                  <div
                    style={{
                      ...S.nowLine,
                      top: topPxFromOra(oraCorrente),
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const COL_TEC_W = 96;
const S = {
  wrap: {
    background: MC.bg,
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
  } as CSSProperties,
  headerRow: {
    display: 'grid',
    gridTemplateColumns: `${COL_TEC_W}px repeat(7, 1fr)`,
    background: MC.bgSoft,
    borderBottom: `1px solid ${MC.borderSoft}`,
    height: HEADER_GIORNO_H,
  } as CSSProperties,
  headerLeft: {} as CSSProperties,
  headerGiorno: {
    fontSize: 10,
    fontWeight: 700,
    color: MC.muted,
    textAlign: 'center' as const,
    padding: '8px 4px',
    borderLeft: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  scrollBody: { flex: 1, overflow: 'auto' } as CSSProperties,
  lane: {
    display: 'grid',
    gridTemplateColumns: `${COL_TEC_W}px repeat(7, 1fr)`,
    borderBottom: `2px solid ${MC.border}`,
  } as CSSProperties,
  tecLabel: {
    padding: '8px 10px',
    background: MC.cardSoft,
    borderRight: `1px solid ${MC.border}`,
  } as CSSProperties,
  tecNome: { fontSize: 13, fontWeight: 800, color: MC.text } as CSSProperties,
  tecCount: { fontSize: 10, color: MC.muted, fontFamily: MF.mono, marginTop: 2 } as CSSProperties,
  dayCol: {
    position: 'relative' as const,
    borderLeft: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  hourSlot: {
    position: 'absolute' as const,
    left: 0, right: 0,
    borderBottom: `1px solid ${MC.borderSoft}`,
    cursor: 'pointer',
  } as CSSProperties,
  hourLabel: {
    position: 'absolute' as const,
    top: 2, left: 2,
    fontSize: 9, color: MC.muted, fontFamily: MF.mono, fontWeight: 600,
    pointerEvents: 'none' as const,
  } as CSSProperties,
  evento: {
    position: 'absolute' as const,
    left: 4, right: 4,
    borderRadius: MR.sm,
    padding: 4,
    color: '#fff',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  } as CSSProperties,
  eOra: { fontSize: 9, fontWeight: 700, fontFamily: MF.mono, opacity: 0.9 } as CSSProperties,
  eTit: { fontSize: 10, fontWeight: 800, marginTop: 1 } as CSSProperties,
  eCli: { fontSize: 9, fontWeight: 600 } as CSSProperties,
  eAddr: { fontSize: 8, opacity: 0.85, marginTop: 1 } as CSSProperties,
  nowLine: {
    position: 'absolute' as const,
    left: 0, right: 0,
    height: 2,
    background: MC.danger,
    zIndex: 5,
    pointerEvents: 'none' as const,
  } as CSSProperties,
};
