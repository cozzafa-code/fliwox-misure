'use client';

// ============================================================
// fliwoX Misure — RiepilogoBarre (sezione 02 v3 - centro)
// Barre progresso + AVANZAMENTO COMPLESSIVO
// ============================================================

import type { CSSProperties, ReactNode } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import type { ComRow } from '@/lib/commesse';

interface Props { com: ComRow }

const sw = (path: ReactNode) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

interface ItemDef {
  key: string; label: string; done: number; tot: number;
  iconBg: string; iconSvg: ReactNode;
}

export default function RiepilogoBarre({ com }: Props) {
  const items: ItemDef[] = [
    {
      key: 'vani', label: 'Vani', done: com.vaniDone ?? 0, tot: com.vaniTot ?? 1, iconBg: MC.tileCommesseOggi,
      iconSvg: sw(<><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>),
    },
    {
      key: 'misure', label: 'Misure complete', done: com.misureDone ?? 0, tot: com.misureTot ?? 1, iconBg: MC.tileMisure,
      iconSvg: sw(<><path d="M21.3 8.7L8.7 21.3a2.41 2.41 0 0 1-3.4 0l-2.6-2.6a2.41 2.41 0 0 1 0-3.4L15.3 2.7a2.41 2.41 0 0 1 3.4 0l2.6 2.6a2.41 2.41 0 0 1 0 3.4z" /></>),
    },
    {
      key: 'foto', label: 'Foto complete', done: com.fotoDone ?? 0, tot: com.fotoTot ?? 1, iconBg: MC.tileFoto,
      iconSvg: sw(<><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>),
    },
    {
      key: 'check', label: 'Check completati', done: com.checkDone ?? 0, tot: com.checkTot ?? 1, iconBg: MC.success,
      iconSvg: sw(<polyline points="20 6 9 17 4 12" />),
    },
    {
      key: 'montaggi', label: 'Montaggi', done: com.montaggiDone ?? 0, tot: com.montaggiTot ?? 1, iconBg: MC.tileMontaggi,
      iconSvg: sw(<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />),
    },
  ];

  // Avanzamento complessivo: somma done / somma tot
  const totDone = items.reduce((s, i) => s + i.done, 0);
  const totMax = items.reduce((s, i) => s + i.tot, 0);
  const pct = totMax > 0 ? Math.round((totDone / totMax) * 100) : 0;

  return (
    <div style={S.wrap}>
      <div style={S.list}>
        {items.map((it) => {
          const itemPct = it.tot > 0 ? Math.round((it.done / it.tot) * 100) : 0;
          return (
            <div key={it.key} style={S.row}>
              <div style={S.head}>
                <span style={{ ...S.iconBox, background: it.iconBg }}>{it.iconSvg}</span>
                <span style={S.label}>{it.label}</span>
                <span style={S.value}>{it.done} / {it.tot}</span>
              </div>
              <div style={S.barBg}>
                <div style={{ ...S.barFill, width: `${itemPct}%`, background: it.iconBg }} />
              </div>
            </div>
          );
        })}
        {/* Problemi separato (no barra) */}
        <div style={S.row}>
          <div style={S.head}>
            <span style={{ ...S.iconBox, background: MC.danger }}>
              {sw(<><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>)}
            </span>
            <span style={S.label}>Problemi</span>
            <span style={{ ...S.value, color: (com.problemi ?? 0) > 0 ? MC.danger : MC.text }}>
              {com.problemi ?? 0}
            </span>
          </div>
        </div>
      </div>

      <div style={S.totale}>
        <div style={S.totaleHead}>
          <span style={S.totaleLbl}>Avanzamento complessivo</span>
          <span style={S.totalePct}>{pct}%</span>
        </div>
        <div style={S.barBg}>
          <div style={{ ...S.barFill, width: `${pct}%`, background: MC.teal }} />
        </div>
      </div>
    </div>
  );
}

const S = {
  wrap: { display: 'flex', flexDirection: 'column' as const, gap: 18, height: '100%' } as CSSProperties,
  list: { display: 'flex', flexDirection: 'column' as const, gap: 10, flex: 1 } as CSSProperties,
  row: { display: 'flex', flexDirection: 'column' as const, gap: 6 } as CSSProperties,
  head: { display: 'grid', gridTemplateColumns: '24px 1fr auto', alignItems: 'center', gap: 10 } as CSSProperties,
  iconBox: {
    width: 22, height: 22, borderRadius: 4,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  } as CSSProperties,
  label: { fontSize: 12, color: MC.text } as CSSProperties,
  value: { fontSize: 12, fontWeight: 800, fontFamily: MF.mono, color: MC.text } as CSSProperties,
  barBg: { height: 5, background: MC.bg, borderRadius: MR.full, overflow: 'hidden' } as CSSProperties,
  barFill: { height: '100%', borderRadius: MR.full, transition: 'width 0.3s' } as CSSProperties,
  totale: {
    paddingTop: 14,
    borderTop: `1px solid ${MC.borderSoft}`,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 6,
  } as CSSProperties,
  totaleHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } as CSSProperties,
  totaleLbl: {
    fontSize: 10, fontWeight: 800, color: MC.muted,
    textTransform: 'uppercase' as const, letterSpacing: 0.5,
  } as CSSProperties,
  totalePct: { fontSize: 18, fontWeight: 800, color: MC.teal, fontFamily: MF.mono } as CSSProperties,
};
