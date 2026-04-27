'use client';

import type { CSSProperties, ReactNode } from 'react';
import { MC, MF } from '@/constants/design-system';
import type { ComRow } from '@/lib/commesse';

interface Props { com: ComRow }

interface ItemDef {
  key: string; label: string; done?: number; tot?: number;
  problemi?: number; iconBg: string; iconSvg: ReactNode;
}

const sw = (path: ReactNode) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

export default function RiepilogoAttivita({ com }: Props) {
  const items: ItemDef[] = [
    {
      key: 'vani', label: 'Vani', done: com.vaniDone, tot: com.vaniTot, iconBg: MC.tileCommesseOggi,
      iconSvg: sw(<><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>),
    },
    {
      key: 'misure', label: 'Misure complete', done: com.misureDone, tot: com.misureTot, iconBg: MC.tileMisure,
      iconSvg: sw(<><path d="M21.3 8.7L8.7 21.3a2.41 2.41 0 0 1-3.4 0l-2.6-2.6a2.41 2.41 0 0 1 0-3.4L15.3 2.7a2.41 2.41 0 0 1 3.4 0l2.6 2.6a2.41 2.41 0 0 1 0 3.4z" /></>),
    },
    {
      key: 'foto', label: 'Foto complete', done: com.fotoDone, tot: com.fotoTot, iconBg: MC.tileFoto,
      iconSvg: sw(<><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>),
    },
    {
      key: 'check', label: 'Check completati', done: com.checkDone, tot: com.checkTot, iconBg: MC.success,
      iconSvg: sw(<><polyline points="20 6 9 17 4 12" /></>),
    },
    {
      key: 'montaggi', label: 'Montaggi', done: com.montaggiDone, tot: com.montaggiTot, iconBg: MC.tileMontaggi,
      iconSvg: sw(<><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></>),
    },
    {
      key: 'problemi', label: 'Problemi', problemi: com.problemi ?? 0, iconBg: MC.danger,
      iconSvg: sw(<><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>),
    },
  ];

  return (
    <div style={S.list}>
      {items.map((it) => {
        const valueStr = it.problemi != null
          ? String(it.problemi)
          : it.done != null && it.tot != null ? `${it.done} / ${it.tot}` : '—';
        const isProblem = it.key === 'problemi' && (it.problemi ?? 0) > 0;
        return (
          <div key={it.key} style={S.row}>
            <span style={{ ...S.iconBox, background: it.iconBg }}>
              {it.iconSvg}
            </span>
            <span style={S.label}>{it.label}</span>
            <span
              style={{
                ...S.value,
                color: isProblem ? MC.danger : MC.text,
              }}
            >
              {valueStr}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const S = {
  list: { display: 'flex', flexDirection: 'column' as const, gap: 6 } as CSSProperties,
  row: {
    display: 'grid',
    gridTemplateColumns: '24px 1fr auto',
    alignItems: 'center',
    gap: 10,
    padding: '6px 0',
  } as CSSProperties,
  iconBox: {
    width: 22, height: 22,
    borderRadius: 4,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  } as CSSProperties,
  label: { fontSize: 12, color: MC.text } as CSSProperties,
  value: { fontSize: 12, fontWeight: 800, fontFamily: MF.mono } as CSSProperties,
};
