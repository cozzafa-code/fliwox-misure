'use client';

// ============================================================
// fliwoX Misure — PannelloFiltri (specifica sezione 05)
// ============================================================

import { useState, type CSSProperties } from 'react';
import { MC, MF, MR, MS } from '@/constants/design-system';
import { IconClose } from '@/components/icons';
import { type Tecnico, type TipoAttivita, type StatoAttivita, TIPO_LABEL, STATO_LABEL_ATT } from '@/lib/calendario';

interface Props {
  tecnici: Tecnico[];
  onClose: () => void;
  onApplica: (f: FormFiltri) => void;
  onPulisci: () => void;
}

export interface FormFiltri {
  search: string;
  tecnicoId: string;
  tipo: TipoAttivita | 'all';
  stato: StatoAttivita | 'all';
  cliente: string;
  dataDa: string;
  dataA: string;
  soloProblemi: boolean;
}

export default function PannelloFiltri({ tecnici, onClose, onApplica, onPulisci }: Props) {
  const [f, setF] = useState<FormFiltri>({
    search: '', tecnicoId: 'all', tipo: 'all', stato: 'all',
    cliente: 'all', dataDa: '2024-05-20', dataA: '2024-05-26', soloProblemi: false,
  });
  const upd = (k: keyof FormFiltri, v: any) => setF((p) => ({ ...p, [k]: v }));

  return (
    <div style={S.backdrop} onClick={onClose}>
      <div style={S.panel} onClick={(e) => e.stopPropagation()}>
        <header style={S.header}>
          <h2 style={S.title}>Filtri e ricerca</h2>
          <button onClick={onClose} style={S.closeBtn}><IconClose size={18} /></button>
        </header>

        <div style={S.body}>
          <Lbl>Cerca attività…</Lbl>
          <input value={f.search} onChange={(e) => upd('search', e.target.value)} placeholder="Cerca…" style={S.input} />

          <Lbl>Tecnico</Lbl>
          <select value={f.tecnicoId} onChange={(e) => upd('tecnicoId', e.target.value)} style={S.input}>
            <option value="all">Tutti</option>
            {tecnici.map((t) => <option key={t.id} value={t.id}>{t.nome}</option>)}
          </select>

          <Lbl>Tipo attività</Lbl>
          <select value={f.tipo} onChange={(e) => upd('tipo', e.target.value)} style={S.input}>
            <option value="all">Tutti</option>
            {Object.entries(TIPO_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>

          <Lbl>Stato</Lbl>
          <select value={f.stato} onChange={(e) => upd('stato', e.target.value)} style={S.input}>
            <option value="all">Tutti</option>
            {Object.entries(STATO_LABEL_ATT).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>

          <Lbl>Cliente</Lbl>
          <input value={f.cliente === 'all' ? '' : f.cliente} onChange={(e) => upd('cliente', e.target.value || 'all')} placeholder="Tutti" style={S.input} />

          <Lbl>Data</Lbl>
          <div style={S.row2}>
            <input type="date" value={f.dataDa} onChange={(e) => upd('dataDa', e.target.value)} style={S.input} />
            <input type="date" value={f.dataA} onChange={(e) => upd('dataA', e.target.value)} style={S.input} />
          </div>

          <label style={S.toggle}>
            <input
              type="checkbox"
              checked={f.soloProblemi}
              onChange={(e) => upd('soloProblemi', e.target.checked)}
              style={{ accentColor: MC.teal }}
            />
            Mostra solo attività con problemi
          </label>
        </div>

        <footer style={S.footer}>
          <button onClick={onPulisci} style={{ ...S.btn, background: MC.bg, color: MC.text }}>Pulisci</button>
          <button onClick={() => onApplica(f)} style={{ ...S.btn, background: MC.teal, color: '#fff' }}>Applica filtri</button>
        </footer>
      </div>
    </div>
  );
}

function Lbl({ children }: { children: any }) {
  return <div style={S.lbl}>{children}</div>;
}

const S = {
  backdrop: {
    position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 16, zIndex: 200,
  } as CSSProperties,
  panel: {
    background: MC.card, borderRadius: MR['2xl'],
    width: '100%', maxWidth: 420, maxHeight: '90vh',
    display: 'flex', flexDirection: 'column' as const,
    overflow: 'hidden', boxShadow: MS.card, color: MC.text, fontFamily: MF.ui,
  } as CSSProperties,
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${MC.border}` } as CSSProperties,
  title: { fontSize: 16, fontWeight: 800, margin: 0 } as CSSProperties,
  closeBtn: { width: 32, height: 32, background: MC.bg, border: 'none', borderRadius: MR.md, color: MC.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' } as CSSProperties,
  body: { flex: 1, overflow: 'auto', padding: '12px 20px', display: 'flex', flexDirection: 'column' as const, gap: 6 } as CSSProperties,
  lbl: { fontSize: 10, fontWeight: 700, color: MC.muted, textTransform: 'uppercase' as const, letterSpacing: 0.5, marginTop: 8 } as CSSProperties,
  input: { background: MC.bg, color: MC.text, border: `1px solid ${MC.border}`, borderRadius: MR.md, padding: '10px 12px', fontSize: 13, fontFamily: 'inherit', outline: 'none' } as CSSProperties,
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 } as CSSProperties,
  toggle: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: MC.text, marginTop: 12, cursor: 'pointer' } as CSSProperties,
  footer: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '12px 16px', borderTop: `1px solid ${MC.border}` } as CSSProperties,
  btn: { padding: '12px 0', border: 'none', borderRadius: MR.md, fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' } as CSSProperties,
};
