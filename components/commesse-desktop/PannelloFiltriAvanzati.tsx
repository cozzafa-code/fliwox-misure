'use client';

import { useState, type CSSProperties } from 'react';
import { MC, MF, MR, MS } from '@/constants/design-system';
import { IconClose } from '@/components/icons';
import { TIPO_INT_LABEL, TECNICI_LIST, STATO_COM_LABEL, type StatoCom, type TipoIntervento } from '@/lib/commesse';

interface Props {
  onClose: () => void;
  onApplica: (f: FormFiltriCom) => void;
  onPulisci: () => void;
}

export interface FormFiltriCom {
  stato: StatoCom | 'all';
  tecnico: string;
  tipo: TipoIntervento | 'all';
  dataDa: string;
  dataA: string;
  importoDa: string;
  importoA: string;
  cliente: string;
}

const INIT: FormFiltriCom = {
  stato: 'all', tecnico: 'all', tipo: 'all',
  dataDa: '', dataA: '', importoDa: '', importoA: '', cliente: '',
};

export default function PannelloFiltriAvanzati({ onClose, onApplica, onPulisci }: Props) {
  const [f, setF] = useState<FormFiltriCom>(INIT);
  const upd = (k: keyof FormFiltriCom, v: any) => setF((p) => ({ ...p, [k]: v }));

  return (
    <div style={S.backdrop} onClick={onClose}>
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        <header style={S.header}>
          <h2 style={S.title}>Filtri avanzati</h2>
          <button onClick={onClose} style={S.closeBtn}><IconClose size={18} /></button>
        </header>

        <div style={S.body}>
          <Lbl>Stato</Lbl>
          <select value={f.stato} onChange={(e) => upd('stato', e.target.value)} style={S.input}>
            <option value="all">Tutti</option>
            {Object.entries(STATO_COM_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>

          <Lbl>Tecnico</Lbl>
          <select value={f.tecnico} onChange={(e) => upd('tecnico', e.target.value)} style={S.input}>
            <option value="all">Tutti</option>
            {TECNICI_LIST.map((t) => <option key={t}>{t}</option>)}
          </select>

          <Lbl>Tipo intervento</Lbl>
          <select value={f.tipo} onChange={(e) => upd('tipo', e.target.value)} style={S.input}>
            <option value="all">Tutti</option>
            {Object.entries(TIPO_INT_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>

          <Lbl>Data sopralluogo</Lbl>
          <div style={S.row2}>
            <input type="date" value={f.dataDa} onChange={(e) => upd('dataDa', e.target.value)} style={S.input} placeholder="Da" />
            <input type="date" value={f.dataA} onChange={(e) => upd('dataA', e.target.value)} style={S.input} placeholder="A" />
          </div>

          <Lbl>Importo (€)</Lbl>
          <div style={S.row2}>
            <input value={f.importoDa} onChange={(e) => upd('importoDa', e.target.value)} placeholder="Da" style={S.input} />
            <input value={f.importoA} onChange={(e) => upd('importoA', e.target.value)} placeholder="A" style={S.input} />
          </div>

          <Lbl>Cliente</Lbl>
          <input value={f.cliente} onChange={(e) => upd('cliente', e.target.value)} placeholder="Seleziona cliente" style={S.input} />
        </div>

        <footer style={S.footer}>
          <button onClick={() => { setF(INIT); onPulisci(); }} style={{ ...S.btn, background: MC.bg, color: MC.text }}>Pulisci</button>
          <button onClick={() => onApplica(f)} style={{ ...S.btn, background: MC.teal, color: '#fff' }}>Applica filtri</button>
        </footer>
      </div>
    </div>
  );
}

function Lbl({ children }: any) { return <div style={S.lbl}>{children}</div>; }

const S = {
  backdrop: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 200 } as CSSProperties,
  modal: { background: MC.card, borderRadius: MR['2xl'], width: '100%', maxWidth: 440, maxHeight: '90vh', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden', boxShadow: MS.card, color: MC.text, fontFamily: MF.ui } as CSSProperties,
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${MC.border}` } as CSSProperties,
  title: { fontSize: 16, fontWeight: 800, margin: 0 } as CSSProperties,
  closeBtn: { width: 32, height: 32, background: MC.bg, border: 'none', borderRadius: MR.md, color: MC.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' } as CSSProperties,
  body: { flex: 1, overflow: 'auto', padding: '12px 20px', display: 'flex', flexDirection: 'column' as const, gap: 6 } as CSSProperties,
  lbl: { fontSize: 10, fontWeight: 700, color: MC.muted, textTransform: 'uppercase' as const, letterSpacing: 0.5, marginTop: 8 } as CSSProperties,
  input: { background: MC.bg, color: MC.text, border: `1px solid ${MC.border}`, borderRadius: MR.md, padding: '10px 12px', fontSize: 13, fontFamily: 'inherit', outline: 'none' } as CSSProperties,
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 } as CSSProperties,
  footer: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '12px 16px', borderTop: `1px solid ${MC.border}` } as CSSProperties,
  btn: { padding: '12px 0', border: 'none', borderRadius: MR.md, fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' } as CSSProperties,
};
