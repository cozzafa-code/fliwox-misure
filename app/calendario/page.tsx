'use client';

// ============================================================
// fliwoX Misure — Calendario settimana per squadre (mockup 06)
// ============================================================

import { useState, type CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import TopBar from '@/components/mobile/TopBar';
import BottomNav from '@/components/mobile/BottomNav';

export const dynamic = 'force-dynamic';

const SQUADRE = ['Francesco', 'Antonio', 'Team 3'];
const ORE = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const GIORNI = [
  { lbl: 'LUN', num: 20 },
  { lbl: 'MAR', num: 21 },
  { lbl: 'MER', num: 22 },
  { lbl: 'GIO', num: 23 },
  { lbl: 'VEN', num: 24 },
  { lbl: 'SAB', num: 25 },
  { lbl: 'DOM', num: 26 },
];

type EventoCal = {
  squadra: number;
  oraStart: number;
  durata: number;
  titolo: string;
  cliente: string;
  indirizzo: string;
  colore: string;
};

const EVENTI: EventoCal[] = [
  { squadra: 0, oraStart: 0, durata: 2, titolo: 'Montaggio', cliente: 'Cliente Verdi', indirizzo: 'Via Milano 5', colore: MC.tileMontaggi },
  { squadra: 1, oraStart: 1, durata: 1, titolo: 'Consegna', cliente: 'Showroom', indirizzo: '', colore: MC.warning },
  { squadra: 2, oraStart: 1, durata: 2, titolo: 'Sopralluogo', cliente: 'Cliente Bianchi', indirizzo: 'Via Verdi 15', colore: MC.tileSopralluoghi },
  { squadra: 0, oraStart: 4, durata: 2, titolo: 'Montaggio', cliente: 'Cliente Neri', indirizzo: 'Via Torino 8', colore: MC.tileMontaggi },
  { squadra: 2, oraStart: 4, durata: 2, titolo: 'Problema', cliente: 'Cliente Rossi', indirizzo: 'Via Roma 12', colore: MC.danger },
  { squadra: 0, oraStart: 6, durata: 2, titolo: 'Sopralluogo', cliente: 'Cliente Galli', indirizzo: 'Via Milano 25', colore: MC.tileSopralluoghi },
  { squadra: 1, oraStart: 6, durata: 2, titolo: 'Consegna', cliente: 'Fornitore', indirizzo: '', colore: MC.warning },
  { squadra: 0, oraStart: 9, durata: 1, titolo: 'Montaggio', cliente: 'Cliente Blu', indirizzo: 'Via Como 3', colore: MC.tileMontaggi },
];

export default function CalendarioPage() {
  const [selDay, setSelDay] = useState(1);

  return (
    <main style={S.page}>
      <TopBar leftIcon="menu" rightIcon="search" title={<span style={S.titleHeader}>Calendario</span>} />

      <div style={S.monthRow}>
        <span style={S.month}>Maggio 2024</span>
      </div>

      <div style={S.daysRow}>
        {GIORNI.map((g, i) => (
          <button key={g.num} onClick={() => setSelDay(i)} style={S.dayBtn}>
            <span style={S.dayLbl}>{g.lbl}</span>
            <span
              style={{
                ...S.dayNum,
                background: i === selDay ? MC.teal : 'transparent',
                color: i === selDay ? '#fff' : MC.text,
              }}
            >
              {g.num}
            </span>
          </button>
        ))}
      </div>

      <div style={S.calBody}>
        <div style={S.headRow}>
          <div />
          {SQUADRE.map((s) => (
            <div key={s} style={S.headSquadra}>{s}</div>
          ))}
        </div>

        <div style={S.gridScroll}>
          {ORE.map((ora, oi) => (
            <div key={ora} style={S.oraRow}>
              <div style={S.oraLabel}>{ora}</div>
              {SQUADRE.map((_, si) => (
                <div key={si} style={S.cell}>
                  {EVENTI.filter((e) => e.squadra === si && e.oraStart === oi).map((e, ei) => (
                    <div
                      key={ei}
                      style={{
                        ...S.evento,
                        background: e.colore,
                        height: e.durata * 60 - 4,
                      }}
                    >
                      <div style={S.eTit}>{e.titolo}</div>
                      <div style={S.eCli}>{e.cliente}</div>
                      {e.indirizzo && <div style={S.eAddr}>{e.indirizzo}</div>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}

const S = {
  page: { minHeight: '100vh', background: MC.bg, fontFamily: MF.ui, color: MC.text, paddingBottom: 70, display: 'flex', flexDirection: 'column' as const } as CSSProperties,
  titleHeader: { fontSize: 16, fontWeight: 700, color: MC.text } as CSSProperties,
  monthRow: { padding: '8px 20px 4px' } as CSSProperties,
  month: { fontSize: 13, fontWeight: 700, color: MC.muted, fontFamily: MF.mono } as CSSProperties,
  daysRow: {
    display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
    padding: '6px 12px 10px', borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  dayBtn: {
    background: 'transparent', border: 'none', cursor: 'pointer',
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
    gap: 4, padding: '4px 0', fontFamily: 'inherit',
  } as CSSProperties,
  dayLbl: { fontSize: 9, fontWeight: 700, color: MC.muted, letterSpacing: 0.5 } as CSSProperties,
  dayNum: {
    fontSize: 14, fontWeight: 700, fontFamily: MF.mono,
    width: 28, height: 28, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  } as CSSProperties,
  calBody: { flex: 1, display: 'flex', flexDirection: 'column' as const, minHeight: 0 } as CSSProperties,
  headRow: {
    display: 'grid', gridTemplateColumns: '52px 1fr 1fr 1fr',
    padding: '8px 0', borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  headSquadra: { fontSize: 11, fontWeight: 700, color: MC.text, textAlign: 'center' as const } as CSSProperties,
  gridScroll: { flex: 1, overflowY: 'auto' as const } as CSSProperties,
  oraRow: {
    display: 'grid', gridTemplateColumns: '52px 1fr 1fr 1fr',
    height: 60, borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  oraLabel: {
    fontSize: 10, color: MC.muted, fontFamily: MF.mono,
    padding: '2px 6px', fontWeight: 600,
  } as CSSProperties,
  cell: {
    borderLeft: `1px solid ${MC.borderSoft}`,
    padding: 2, position: 'relative' as const,
  } as CSSProperties,
  evento: { borderRadius: MR.sm, padding: 4, color: '#fff', overflow: 'hidden' } as CSSProperties,
  eTit: { fontSize: 9, fontWeight: 700 } as CSSProperties,
  eCli: { fontSize: 9, fontWeight: 600, opacity: 0.9 } as CSSProperties,
  eAddr: { fontSize: 8, opacity: 0.75 } as CSSProperties,
};
