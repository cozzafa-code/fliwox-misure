'use client';

// ============================================================
// fliwoX Misure — SUPER CALENDARIO (specifica completa)
// 9 sezioni: panoramica + 5 viste + dettaglio + creazione + filtri + legenda
// ============================================================

import { useState, type CSSProperties } from 'react';
import { MC, MF, MR, MS } from '@/constants/design-system';
import TopBar from '@/components/mobile/TopBar';
import BottomNav from '@/components/mobile/BottomNav';
import CalendarioHeader from '@/components/calendario/CalendarioHeader';
import RigaGiorni from '@/components/calendario/RigaGiorni';
import VistaSettimana from '@/components/calendario/VistaSettimana';
import VistaGiorno from '@/components/calendario/VistaGiorno';
import VistaMese from '@/components/calendario/VistaMese';
import VistaAgenda from '@/components/calendario/VistaAgenda';
import VistaTimeline from '@/components/calendario/VistaTimeline';
import ModalDettaglioAttivita from '@/components/calendario/ModalDettaglioAttivita';
import ModalNuovaAttivita, { type FormNuovaAttivita } from '@/components/calendario/ModalNuovaAttivita';
import PannelloFiltri, { type FormFiltri } from '@/components/calendario/PannelloFiltri';
import LegendaColori from '@/components/calendario/LegendaColori';
import { IconPlus } from '@/components/icons';
import {
  type AttivitaCal, type VistaCalendario,
  TECNICI_MOCK, ATTIVITA_MOCK, SETTIMANA_DEMO,
} from '@/lib/calendario';

export const dynamic = 'force-dynamic';

export default function CalendarioPage() {
  const [vista, setVista] = useState<VistaCalendario>('settimana');
  const [selDay, setSelDay] = useState(1); // mar 21 di default
  const [attivita, setAttivita] = useState<AttivitaCal[]>(ATTIVITA_MOCK);
  const [openDettaglio, setOpenDettaglio] = useState<AttivitaCal | null>(null);
  const [openNuova, setOpenNuova] = useState(false);
  const [openFiltri, setOpenFiltri] = useState(false);

  const range = `${SETTIMANA_DEMO[0].num} – ${SETTIMANA_DEMO[6].num} Maggio 2024`;
  const giornoSel = SETTIMANA_DEMO[selDay];

  // ora corrente fittizia per linea rossa (16:30)
  const oraCorrente = '16:30';

  return (
    <main style={S.page}>
      <TopBar leftIcon="menu" rightIcon="bell" />

      <CalendarioHeader
        range={range}
        vista={vista}
        onPrev={() => {}}
        onNext={() => {}}
        onToday={() => setSelDay(1)}
        onCambiaVista={setVista}
        onApriFiltri={() => setOpenFiltri(true)}
      />

      {(vista === 'settimana' || vista === 'giorno') && (
        <RigaGiorni selDay={selDay} onSelect={setSelDay} />
      )}

      {vista === 'settimana' && (
        <VistaSettimana
          tecnici={TECNICI_MOCK}
          attivita={attivita}
          oraCorrente={oraCorrente}
          onClickEvento={setOpenDettaglio}
          onClickCella={() => setOpenNuova(true)}
        />
      )}

      {vista === 'giorno' && (
        <VistaGiorno
          giornoIso={giornoSel.iso}
          giornoLabel={`${giornoSel.lbl} ${giornoSel.num} Maggio`}
          tecnici={TECNICI_MOCK}
          attivita={attivita}
          onClickEvento={setOpenDettaglio}
        />
      )}

      {vista === 'mese' && (
        <VistaMese
          meseIso="2024-05"
          attivita={attivita}
          onClickEvento={setOpenDettaglio}
        />
      )}

      {vista === 'agenda' && (
        <VistaAgenda
          attivita={attivita}
          tecnici={TECNICI_MOCK}
          onClickEvento={setOpenDettaglio}
        />
      )}

      {vista === 'timeline' && (
        <VistaTimeline
          tecnici={TECNICI_MOCK}
          attivita={attivita}
          onClickEvento={setOpenDettaglio}
        />
      )}

      <LegendaColori />

      <button
        onClick={() => setOpenNuova(true)}
        style={S.fabPlus}
        aria-label="Nuova attività"
      >
        <IconPlus size={26} strokeWidth={2.5} />
      </button>

      {openDettaglio && (
        <ModalDettaglioAttivita
          attivita={openDettaglio}
          tecnici={TECNICI_MOCK}
          onClose={() => setOpenDettaglio(null)}
          onElimina={(id) => {
            setAttivita((p) => p.filter((x) => x.id !== id));
            setOpenDettaglio(null);
          }}
          onDuplica={(a) => {
            const nuova = { ...a, id: `${Date.now()}` };
            setAttivita((p) => [...p, nuova]);
            setOpenDettaglio(null);
          }}
          onModifica={() => setOpenDettaglio(null)}
        />
      )}

      {openNuova && (
        <ModalNuovaAttivita
          tecnici={TECNICI_MOCK}
          giornoIso={giornoSel.iso}
          onClose={() => setOpenNuova(false)}
          onSalva={(f: FormNuovaAttivita) => {
            const nuova: AttivitaCal = {
              id: `${Date.now()}`,
              titolo: f.titolo,
              cliente: f.cliente,
              indirizzo: f.indirizzo,
              tecnicoId: f.tecnicoId,
              data: f.data,
              oraInizio: f.oraInizio,
              oraFine: f.oraFine,
              tipo: f.tipo,
              stato: 'da_confermare',
              note: f.note,
            };
            setAttivita((p) => [...p, nuova]);
            setOpenNuova(false);
          }}
        />
      )}

      {openFiltri && (
        <PannelloFiltri
          tecnici={TECNICI_MOCK}
          onClose={() => setOpenFiltri(false)}
          onApplica={(_f: FormFiltri) => setOpenFiltri(false)}
          onPulisci={() => {}}
        />
      )}

      <BottomNav />
    </main>
  );
}

const S = {
  page: {
    minHeight: '100vh',
    background: MC.bg,
    fontFamily: MF.ui,
    color: MC.text,
    paddingBottom: 70,
    display: 'flex',
    flexDirection: 'column' as const,
  } as CSSProperties,
  fabPlus: {
    position: 'fixed' as const,
    right: 16,
    bottom: 84,
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: MC.teal,
    color: '#fff',
    border: 'none',
    boxShadow: MS.fab,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 60,
    fontFamily: 'inherit',
  } as CSSProperties,
};
