'use client';

import type { CSSProperties } from 'react';
import { MC, MF } from '@/constants/design-system';
import type { ComRow } from '@/lib/commesse';

interface Props { com: ComRow }

interface ItemDef { key: string; label: string; done?: number; tot?: number; problemi?: number; iconBg: string }

export default function RiepilogoAttivita({ com }: Props) {
  const items: ItemDef[] = [
    { key: 'vani', label: 'Vani', done: com.vaniDone, tot: com.vaniTot, iconBg: MC.tileCommesseOggi },
    { key: 'misure', label: 'Misure complete', done: com.misureDone, tot: com.misureTot, iconBg: MC.tileMisure },
    { key: 'foto', label: 'Foto complete', done: com.fotoDone, tot: com.fotoTot, iconBg: MC.tileFoto },
    { key: 'check', label: 'Check complete', done: com.checkDone, tot: com.checkTot, iconBg: MC.success },
    { key: 'montaggi', label: 'Montaggi', done: com.montaggiDone, tot: com.montaggiTot, iconBg: MC.tileMontaggi },
    { key: 'problemi', label: 'Problemi', problemi: com.problemi, iconBg: MC.danger },
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
              <Icon kind={it.key} />
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

function Icon({ kind }: { kind: string }) {
  // semplici glifi simbolici
  const map: Record<string, string> = {
    vani: '◰', misure: '⌥', foto: '◫',
    check: '✓', montaggi: '⚙', problemi: '!',
  };
  return <span style={{ fontSize: 11, color: '#fff', fontWeight: 800 }}>{map[kind] ?? '•'}</span>;
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
