'use client';

import type { CSSProperties } from 'react';
import { MC, MR } from '@/constants/design-system';

const FEATURES = [
  { icon: '◯', title: 'Gestione completa ciclo', desc: 'Dalla creazione alla chiusura della commessa.' },
  { icon: '☰', title: 'Tracciabilità totale', desc: 'Ogni attività, documento e nota è sempre collegata.' },
  { icon: '◊', title: 'Collaborazione team', desc: 'Più tecnici e ufficio lavorano sulla stessa commessa.' },
  { icon: '▤', title: 'Integrazione calendario', desc: 'Tutte le attività sono sincronizzate con il Super Calendario.' },
  { icon: '€', title: 'Controllo economico', desc: 'Preventivi, acconti, saldi e fatture sempre sotto controllo.' },
  { icon: '◌', title: 'Accesso rapido', desc: 'Da ogni schermata puoi accedere ai vani, documenti e attività.' },
  { icon: '⚙', title: 'Personalizzazione', desc: 'Campi, stati e workflow personalizzabili alle tue esigenze aziendali.' },
  { icon: '⌥', title: 'Sicurezza e backup', desc: 'Dati sempre protetti, con backup automatici e permessi utente.' },
];

export default function FunzionalitaChiave() {
  return (
    <section style={S.section}>
      <h3 style={S.title}>Funzionalità chiave dell'area Commesse</h3>
      <div style={S.grid}>
        {FEATURES.map((f, i) => (
          <div key={i} style={S.box}>
            <span style={S.icon}>{f.icon}</span>
            <div>
              <div style={S.boxTitle}>{f.title}</div>
              <div style={S.boxDesc}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const S = {
  section: {
    padding: '24px',
    borderTop: `1px solid ${MC.borderSoft}`,
    background: MC.bg,
  } as CSSProperties,
  title: {
    fontSize: 14,
    fontWeight: 800,
    color: MC.text,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.6,
    margin: '0 0 16px 0',
  } as CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
  } as CSSProperties,
  box: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
  } as CSSProperties,
  icon: {
    width: 32,
    height: 32,
    borderRadius: MR.sm,
    background: MC.tealBg,
    color: MC.teal,
    fontSize: 16,
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  } as CSSProperties,
  boxTitle: {
    fontSize: 12,
    fontWeight: 800,
    color: MC.text,
  } as CSSProperties,
  boxDesc: {
    fontSize: 11,
    color: MC.muted,
    marginTop: 2,
    lineHeight: 1.4,
  } as CSSProperties,
};
