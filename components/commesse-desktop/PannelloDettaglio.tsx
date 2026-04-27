'use client';

// ============================================================
// fliwoX Misure — PannelloDettaglio commessa selezionata
// 4 colonne: foto+cliente / informazioni / riepilogo attività / azioni rapide
// ============================================================

import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { type ComRow, STATO_COM_LABEL, STATO_COM_BG, STATO_COM_FG, fmtEuro } from '@/lib/commesse';
import { IconClose } from '@/components/icons';
import RiepilogoAttivita from './RiepilogoAttivita';
import AzioniRapide from './AzioniRapide';

interface Props {
  com: ComRow;
  onClose: () => void;
  onAzione: (key: string) => void;
}

export default function PannelloDettaglio({ com, onClose, onAzione }: Props) {
  return (
    <div style={S.wrap}>
      <header style={S.header}>
        <span style={S.titleBar}>Dettaglio commessa selezionata</span>
        <button onClick={onClose} style={S.closeBtn}><IconClose size={16} /></button>
      </header>

      <div style={S.body}>
        {/* Col 1: Foto + cliente principali */}
        <div style={S.colCliente}>
          <div style={S.thumb}>
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
              {/* telaio esterno */}
              <rect x="6" y="6" width="88" height="88" rx="2" fill="#1A1F26" stroke={MC.muted} strokeWidth="2" />
              {/* divisorio centrale verticale */}
              <line x1="50" y1="6" x2="50" y2="94" stroke={MC.muted} strokeWidth="2" />
              {/* divisorio orizzontale */}
              <line x1="6" y1="50" x2="94" y2="50" stroke={MC.muted} strokeWidth="2" />
              {/* riflessi vetro */}
              <rect x="12" y="12" width="34" height="34" fill="rgba(47,167,162,0.08)" />
              <rect x="54" y="12" width="34" height="34" fill="rgba(47,167,162,0.12)" />
              <rect x="12" y="54" width="34" height="34" fill="rgba(47,167,162,0.06)" />
              <rect x="54" y="54" width="34" height="34" fill="rgba(47,167,162,0.10)" />
              {/* maniglie */}
              <rect x="46" y="46" width="3" height="14" fill={MC.muted} rx="1" />
              <rect x="51" y="46" width="3" height="14" fill={MC.muted} rx="1" />
            </svg>
          </div>
          <div style={S.clienteName}>{com.cliente}</div>
          <div style={S.clienteTipo}>{com.tipo}</div>
          <span
            style={{
              ...S.badge,
              background: STATO_COM_BG[com.stato],
              color: STATO_COM_FG[com.stato],
              marginTop: 6,
            }}
          >
            {STATO_COM_LABEL[com.stato]}
          </span>
          <div style={{ ...S.field, marginTop: 14 }}>
            <div style={S.fieldLabel}>Indirizzo</div>
            <div style={S.fieldValue}>{com.indirizzo}</div>
          </div>
          {com.riferimento && (
            <div style={S.field}>
              <div style={S.fieldLabel}>Riferimento</div>
              <div style={S.fieldValue}>{com.riferimento}</div>
            </div>
          )}
          {com.telefono && (
            <div style={S.field}>
              <div style={S.fieldLabel}>Telefono</div>
              <div style={S.fieldValue}>{com.telefono}</div>
            </div>
          )}
          {com.email && (
            <div style={S.field}>
              <div style={S.fieldLabel}>Email</div>
              <div style={S.fieldValue}>{com.email}</div>
            </div>
          )}
          {com.note && (
            <div style={S.field}>
              <div style={S.fieldLabel}>Note</div>
              <div style={S.fieldValue}>{com.note}</div>
            </div>
          )}
        </div>

        {/* Col 2: Informazioni commessa */}
        <div style={S.col}>
          <div style={S.colTitle}>Informazioni commessa</div>
          <div style={S.field}>
            <div style={S.fieldLabel}>N° commessa</div>
            <div style={{ ...S.fieldValue, fontFamily: MF.mono }}>{com.numero}</div>
          </div>
          <div style={S.field}>
            <div style={S.fieldLabel}>Data sopralluogo</div>
            <div style={{ ...S.fieldValue, fontFamily: MF.mono }}>{com.dataSopralluogo}</div>
          </div>
          <div style={S.field}>
            <div style={S.fieldLabel}>Tecnico assegnato</div>
            <div style={S.fieldValue}>{com.tecnico}</div>
          </div>
          <div style={S.field}>
            <div style={S.fieldLabel}>Stato</div>
            <span
              style={{
                ...S.badge,
                background: STATO_COM_BG[com.stato],
                color: STATO_COM_FG[com.stato],
                marginTop: 4,
              }}
            >
              {STATO_COM_LABEL[com.stato]}
            </span>
          </div>
          <div style={S.field}>
            <div style={S.fieldLabel}>Importo totale</div>
            <div style={{ ...S.fieldValue, fontFamily: MF.mono, fontWeight: 800 }}>{fmtEuro(com.importo)}</div>
          </div>
          {com.acconto != null && (
            <div style={S.field}>
              <div style={S.fieldLabel}>Acconto</div>
              <div style={{ ...S.fieldValue, fontFamily: MF.mono }}>{fmtEuro(com.acconto)}</div>
            </div>
          )}
          {com.saldo != null && (
            <div style={S.field}>
              <div style={S.fieldLabel}>Saldo</div>
              <div style={{ ...S.fieldValue, fontFamily: MF.mono, color: MC.warning, fontWeight: 800 }}>{fmtEuro(com.saldo)}</div>
            </div>
          )}
          {com.dataConsegna && (
            <div style={S.field}>
              <div style={S.fieldLabel}>Data prevista consegna</div>
              <div style={{ ...S.fieldValue, fontFamily: MF.mono }}>{com.dataConsegna}</div>
            </div>
          )}
        </div>

        {/* Col 3: Riepilogo attività */}
        <div style={S.col}>
          <div style={S.colTitle}>Riepilogo attività</div>
          <RiepilogoAttivita com={com} />
        </div>

        {/* Col 4: Azioni rapide */}
        <div style={S.col}>
          <div style={S.colTitle}>Azioni rapide</div>
          <AzioniRapide onAzione={onAzione} />
        </div>
      </div>
    </div>
  );
}

const S = {
  wrap: {
    background: MC.cardSoft,
    borderTop: `1px solid ${MC.border}`,
  } as CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  titleBar: {
    fontSize: 10,
    fontWeight: 700,
    color: MC.muted,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.6,
  } as CSSProperties,
  closeBtn: {
    width: 28, height: 28,
    background: MC.bg, border: 'none',
    borderRadius: MR.sm, color: MC.muted, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'inherit',
  } as CSSProperties,
  body: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: 24,
    padding: 20,
  } as CSSProperties,
  colCliente: { display: 'flex', flexDirection: 'column' as const } as CSSProperties,
  col: { display: 'flex', flexDirection: 'column' as const, gap: 4 } as CSSProperties,
  colTitle: {
    fontSize: 11,
    fontWeight: 800,
    color: MC.text,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    marginBottom: 10,
  } as CSSProperties,
  thumb: {
    width: 96, height: 96,
    background: MC.bg,
    borderRadius: MR.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  } as CSSProperties,
  clienteName: { fontSize: 15, fontWeight: 800, color: MC.text } as CSSProperties,
  clienteTipo: { fontSize: 11, color: MC.muted, marginTop: 2 } as CSSProperties,
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: MR.xs,
    fontSize: 9,
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    width: 'fit-content' as const,
  } as CSSProperties,
  field: { padding: '6px 0', borderBottom: `1px solid ${MC.borderSoft}` } as CSSProperties,
  fieldLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: MC.muted,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  } as CSSProperties,
  fieldValue: { fontSize: 12, fontWeight: 600, color: MC.text, marginTop: 2 } as CSSProperties,
};
