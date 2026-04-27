'use client';

// ============================================================
// fliwoX Misure — Calendario Settimana
// Mostra 7 giorni con eventi colorati per tipo
// Click evento → naviga a /commesse/[id]
// ============================================================

import { useRouter } from 'next/navigation';
import { useMemo, type CSSProperties } from 'react';
import { MC, MF, MR, MS, MP } from '@/constants/design-system';
import {
  daysOfWeek,
  formatDate,
  formatGiornoCorto,
  GIORNI_SETTIMANA,
  isToday,
} from '@/lib/dates';
import type { Evento } from '@/lib/types';

interface Props {
  weekStart: Date;
  eventi: Evento[];
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

export default function CalendarioSettimana({ weekStart, eventi, onPrevWeek, onNextWeek }: Props) {
  const router = useRouter();
  const giorni = useMemo(() => daysOfWeek(weekStart), [weekStart]);

  const eventiByGiorno = useMemo(() => {
    const map = new Map<string, Evento[]>();
    eventi.forEach((e) => {
      const arr = map.get(e.data) ?? [];
      arr.push(e);
      map.set(e.data, arr);
    });
    // ordina per ora
    map.forEach((arr) =>
      arr.sort((a, b) => (a.ora ?? '').localeCompare(b.ora ?? '')),
    );
    return map;
  }, [eventi]);

  const goToCommessa = (commessaId: string | null) => {
    if (commessaId) router.push(`/commesse/${commessaId}`);
  };

  return (
    <div style={S.wrap}>
      <div style={S.header}>
        <button onClick={onPrevWeek} style={S.navBtn} aria-label="Settimana precedente">
          ‹
        </button>
        <div style={S.range}>
          {formatGiornoCorto(giorni[0])} – {formatGiornoCorto(giorni[6])}
        </div>
        <button onClick={onNextWeek} style={S.navBtn} aria-label="Settimana successiva">
          ›
        </button>
      </div>

      <div style={S.grid}>
        {giorni.map((d, i) => {
          const iso = formatDate(d);
          const today = isToday(iso);
          const evs = eventiByGiorno.get(iso) ?? [];
          return (
            <div key={iso} style={{ ...S.col, ...(today ? S.colToday : {}) }}>
              <div style={S.colHeader}>
                <div style={{ ...S.dayLabel, ...(today ? S.dayLabelToday : {}) }}>
                  {GIORNI_SETTIMANA[i]}
                </div>
                <div style={{ ...S.dayNum, ...(today ? S.dayNumToday : {}) }}>
                  {d.getDate()}
                </div>
              </div>
              <div style={S.colBody}>
                {evs.length === 0 && <div style={S.empty}>—</div>}
                {evs.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => goToCommessa(e.commessa_id)}
                    style={{
                      ...S.evento,
                      borderLeftColor: e.colore || MC.teal,
                      opacity: e.completato ? 0.5 : 1,
                      cursor: e.commessa_id ? 'pointer' : 'default',
                    }}
                    title={e.note || e.titolo}
                  >
                    {e.ora && <div style={S.eventoOra}>{e.ora}</div>}
                    <div style={S.eventoTitolo}>{e.titolo}</div>
                    {e.persona && <div style={S.eventoPersona}>{e.persona}</div>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const S = {
  wrap: {
    background: MC.card,
    borderRadius: MR.lg,
    border: `1px solid ${MC.border}`,
    boxShadow: MS.card,
    overflow: 'hidden',
  } as CSSProperties,
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: `1px solid ${MC.borderSoft}`,
    background: MC.bgSoft,
  } as CSSProperties,
  navBtn: {
    width: 32,
    height: 32,
    borderRadius: MR.md,
    border: `1px solid ${MC.border}`,
    background: MC.card,
    cursor: 'pointer',
    fontSize: 18,
    color: MC.textSoft,
    fontFamily: 'inherit',
  } as CSSProperties,
  range: {
    fontSize: 14,
    fontWeight: 700,
    color: MC.text,
    fontFamily: MF.mono,
  } as CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    minHeight: 320,
  } as CSSProperties,
  col: {
    borderRight: `1px solid ${MC.borderSoft}`,
    display: 'flex',
    flexDirection: 'column' as const,
    minWidth: 0,
  } as CSSProperties,
  colToday: {
    background: MC.tealBg,
  } as CSSProperties,
  colHeader: {
    padding: '10px 8px',
    textAlign: 'center' as const,
    borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  dayLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: MC.muted,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  } as CSSProperties,
  dayLabelToday: { color: MC.tealDark } as CSSProperties,
  dayNum: {
    fontSize: 18,
    fontWeight: 800,
    color: MC.text,
    fontFamily: MF.mono,
    marginTop: 2,
  } as CSSProperties,
  dayNumToday: { color: MC.tealDark } as CSSProperties,
  colBody: {
    padding: 6,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
    flex: 1,
  } as CSSProperties,
  empty: {
    fontSize: 11,
    color: MC.mutedSoft,
    textAlign: 'center' as const,
    padding: '12px 0',
  } as CSSProperties,
  evento: {
    background: MC.card,
    borderRadius: MR.sm,
    borderLeft: '3px solid',
    padding: '6px 8px',
    fontSize: 11,
    boxShadow: MS.button,
    transition: 'transform 0.1s',
    minWidth: 0,
  } as CSSProperties,
  eventoOra: {
    fontSize: 10,
    fontWeight: 700,
    color: MC.muted,
    fontFamily: MF.mono,
  } as CSSProperties,
  eventoTitolo: {
    fontSize: 11,
    fontWeight: 600,
    color: MC.text,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  } as CSSProperties,
  eventoPersona: {
    fontSize: 10,
    color: MC.muted,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  } as CSSProperties,
};
