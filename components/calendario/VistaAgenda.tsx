'use client';

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { type AttivitaCal, type Tecnico, TIPO_COLOR, TIPO_LABEL } from '@/lib/calendario';

interface Props {
  attivita: AttivitaCal[];
  tecnici: Tecnico[];
  onClickEvento: (a: AttivitaCal) => void;
}

export default function VistaAgenda({ attivita, tecnici, onClickEvento }: Props) {
  // raggruppa per data
  const groups: Record<string, AttivitaCal[]> = {};
  attivita.forEach((a) => {
    if (!groups[a.data]) groups[a.data] = [];
    groups[a.data].push(a);
  });
  const dates = Object.keys(groups).sort();
  const tecnicoNome = (id: string) => tecnici.find((t) => t.id === id)?.nome ?? '—';

  return (
    <div style={S.wrap}>
      {dates.map((d) => {
        const dt = new Date(d);
        const lbl = dt.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
        return (
          <div key={d} style={S.dayGroup}>
            <div style={S.dayHead}>{lbl}</div>
            {groups[d].sort((a, b) => a.oraInizio.localeCompare(b.oraInizio)).map((a) => (
              <div key={a.id} onClick={() => onClickEvento(a)} style={S.row}>
                <div style={S.ora}>{a.oraInizio}</div>
                <div style={{ ...S.dot, background: TIPO_COLOR[a.tipo] }} />
                <div style={S.content}>
                  <div style={S.tit}>{TIPO_LABEL[a.tipo]} – {a.cliente}</div>
                  <div style={S.meta}>
                    {tecnicoNome(a.tecnicoId)} · {a.oraInizio}–{a.oraFine}
                    {a.indirizzo ? ` · ${a.indirizzo}` : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
      {dates.length === 0 && <div style={S.empty}>Nessuna attività</div>}
    </div>
  );
}

const S = {
  wrap: { flex: 1, padding: 12, overflow: 'auto', display: 'flex', flexDirection: 'column' as const, gap: 16 } as CSSProperties,
  dayGroup: { display: 'flex', flexDirection: 'column' as const, gap: 6 } as CSSProperties,
  dayHead: {
    fontSize: 11, fontWeight: 800, color: MC.muted,
    textTransform: 'uppercase' as const, letterSpacing: 0.6,
    padding: '4px 0',
  } as CSSProperties,
  row: {
    background: MC.cardSoft,
    borderRadius: MR.lg,
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
  } as CSSProperties,
  ora: { fontSize: 13, fontWeight: 800, color: MC.text, fontFamily: MF.mono, minWidth: 50 } as CSSProperties,
  dot: { width: 10, height: 10, borderRadius: '50%', flexShrink: 0 } as CSSProperties,
  content: { flex: 1, minWidth: 0 } as CSSProperties,
  tit: { fontSize: 13, fontWeight: 700, color: MC.text } as CSSProperties,
  meta: { fontSize: 11, color: MC.muted, marginTop: 2 } as CSSProperties,
  empty: { padding: 32, textAlign: 'center' as const, color: MC.mutedSoft } as CSSProperties,
};
