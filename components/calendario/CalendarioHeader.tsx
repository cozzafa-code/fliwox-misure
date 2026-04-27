'use client';

// ============================================================
// fliwoX Misure — CalendarioHeader
// Frecce navigazione + range data + selettore vista + filtri
// ============================================================

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { IconChevronLeft, IconChevronRight, IconSearch } from '@/components/icons';
import { type VistaCalendario, VISTE } from '@/lib/calendario';

interface Props {
  range: string;
  vista: VistaCalendario;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onCambiaVista: (v: VistaCalendario) => void;
  onApriFiltri: () => void;
}

export default function CalendarioHeader({
  range, vista, onPrev, onNext, onToday, onCambiaVista, onApriFiltri,
}: Props) {
  return (
    <div style={S.bar}>
      <div style={S.left}>
        <h1 style={S.title}>Calendario</h1>
        <button onClick={onPrev} style={S.iconBtn}><IconChevronLeft size={20} /></button>
        <button onClick={onToday} style={S.todayBtn}>Oggi</button>
        <button onClick={onNext} style={S.iconBtn}><IconChevronRight size={20} /></button>
        <span style={S.range}>{range}</span>
      </div>
      <div style={S.right}>
        <button onClick={onApriFiltri} style={S.iconBtn}><IconSearch size={18} /></button>
        <select
          value={vista}
          onChange={(e) => onCambiaVista(e.target.value as VistaCalendario)}
          style={S.select}
        >
          {VISTE.map((v) => (
            <option key={v.key} value={v.key}>{v.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

const S = {
  bar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: MC.cardSoft,
    borderBottom: `1px solid ${MC.borderSoft}`,
    flexWrap: 'wrap' as const,
    gap: 8,
  } as CSSProperties,
  left: { display: 'flex', alignItems: 'center', gap: 8 } as CSSProperties,
  right: { display: 'flex', alignItems: 'center', gap: 8 } as CSSProperties,
  title: { fontSize: 16, fontWeight: 800, color: MC.text, margin: 0, marginRight: 8 } as CSSProperties,
  iconBtn: {
    width: 32, height: 32, borderRadius: MR.md, border: 'none',
    background: MC.bg, color: MC.text, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit',
  } as CSSProperties,
  todayBtn: {
    background: MC.bg, color: MC.text, border: `1px solid ${MC.border}`,
    borderRadius: MR.md, padding: '6px 12px', fontSize: 12, fontWeight: 700,
    cursor: 'pointer', fontFamily: 'inherit',
  } as CSSProperties,
  range: { fontSize: 13, color: MC.muted, fontFamily: MF.mono, marginLeft: 8 } as CSSProperties,
  select: {
    background: MC.bg, color: MC.text, border: `1px solid ${MC.border}`,
    borderRadius: MR.md, padding: '6px 10px', fontSize: 12, fontWeight: 700,
    cursor: 'pointer', fontFamily: 'inherit', outline: 'none',
  } as CSSProperties,
};
