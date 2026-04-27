'use client';

import type { CSSProperties, ReactNode } from 'react';
import { MC, MR } from '@/constants/design-system';

const sw = (path: ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const FEATURES: { icon: ReactNode; title: string; desc: string }[] = [
  { icon: sw(<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>), title: 'Gestione completa ciclo', desc: 'Dalla creazione alla chiusura della commessa.' },
  { icon: sw(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><circle cx="11" cy="14" r="3" /></>), title: 'Tracciabilità totale', desc: 'Ogni attività, documento e nota è sempre collegata.' },
  { icon: sw(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>), title: 'Collaborazione team', desc: 'Più tecnici e ufficio lavorano sulla stessa commessa.' },
  { icon: sw(<><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>), title: 'Integrazione calendario', desc: "Tutte le attività sono sincronizzate con il Super Calendario." },
  { icon: sw(<><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>), title: 'Controllo economico', desc: 'Preventivi, acconti, saldi e fatture sempre sotto controllo.' },
  { icon: sw(<><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>), title: 'Accesso rapido', desc: 'Da ogni schermata puoi accedere ai vani, documenti e attività.' },
  { icon: sw(<><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></>), title: 'Personalizzazione', desc: 'Campi, stati e workflow personalizzabili in base alle esigenze aziendali.' },
  { icon: sw(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>), title: 'Sicurezza e backup', desc: 'Dati sempre protetti, con backup automatici e permessi utente.' },
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
  section: { padding: '24px', borderTop: `1px solid ${MC.borderSoft}`, background: MC.bg } as CSSProperties,
  title: { fontSize: 14, fontWeight: 800, color: MC.text, textTransform: 'uppercase' as const, letterSpacing: 0.6, margin: '0 0 16px 0' } as CSSProperties,
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 } as CSSProperties,
  box: { display: 'flex', gap: 12, alignItems: 'flex-start' } as CSSProperties,
  icon: {
    width: 36, height: 36, borderRadius: MR.sm,
    background: MC.tealBg, color: MC.teal,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  } as CSSProperties,
  boxTitle: { fontSize: 12, fontWeight: 800, color: MC.text } as CSSProperties,
  boxDesc: { fontSize: 11, color: MC.muted, marginTop: 2, lineHeight: 1.4 } as CSSProperties,
};
