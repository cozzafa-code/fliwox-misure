'use client';

// ============================================================
// fliwoX Misure — SUPER AREA COMMESSE v3
// 9 sezioni specifica + vista dettaglio overview
// ============================================================

import { useMemo, useState, type CSSProperties } from 'react';
import { MC, MF } from '@/constants/design-system';
import SidebarDesktop from '@/components/desktop/SidebarDesktop';
import CommesseHeader from '@/components/commesse-desktop/CommesseHeader';
import CommesseTabs from '@/components/commesse-desktop/CommesseTabs';
import CommesseTable from '@/components/commesse-desktop/CommesseTable';
import LegendaStati from '@/components/commesse-desktop/LegendaStati';
import DettaglioOverview from '@/components/commesse-desktop/DettaglioOverview';
import VaniDellaCommessa from '@/components/commesse-desktop/VaniDellaCommessa';
import WizardNuovaCommessa, { type WizardForm } from '@/components/commesse-desktop/WizardNuovaCommessa';
import PannelloFiltriAvanzati, { type FormFiltriCom } from '@/components/commesse-desktop/PannelloFiltriAvanzati';
import VistaKanban from '@/components/commesse-desktop/VistaKanban';
import VistaGantt from '@/components/commesse-desktop/VistaGantt';
import DocumentiCommessa from '@/components/commesse-desktop/DocumentiCommessa';
import NoteComunicazioni from '@/components/commesse-desktop/NoteComunicazioni';
import AzioniMassa from '@/components/commesse-desktop/AzioniMassa';
import IntegrazioniFunz from '@/components/commesse-desktop/IntegrazioniFunz';
import { type ComRow, type StatoCom, COMMESSE_MOCK, COUNTS_HARDCODED } from '@/lib/commesse';

export const dynamic = 'force-dynamic';

type TabKey = 'all' | StatoCom;
type VistaCom = 'lista' | 'kanban' | 'gantt';

export default function CommesseDesktopPage() {
  const [tab, setTab] = useState<TabKey>('all');
  const [vista, setVista] = useState<VistaCom>('lista');
  const [search, setSearch] = useState('');
  const [openWizard, setOpenWizard] = useState(false);
  const [openFiltri, setOpenFiltri] = useState(false);
  const [selected, setSelected] = useState<ComRow | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [rows, setRows] = useState<ComRow[]>(COMMESSE_MOCK);

  const counts = useMemo(() => COUNTS_HARDCODED, []);

  const filtered = useMemo(() => {
    let res = rows;
    if (tab !== 'all') res = res.filter((r) => r.stato === tab);
    if (search) {
      const s = search.toLowerCase();
      res = res.filter(
        (r) =>
          r.numero.toLowerCase().includes(s) ||
          r.cliente.toLowerCase().includes(s) ||
          r.indirizzo.toLowerCase().includes(s),
      );
    }
    return res;
  }, [rows, tab, search]);

  const handleSalvaWizard = (f: WizardForm) => {
    const nuova: ComRow = {
      id: `${Date.now()}`,
      numero: `2024-${String(rows.length + 60).padStart(3, '0')}`,
      cliente: f.nome || 'Senza nome',
      riferimento: f.riferimento,
      indirizzo: `${f.indirizzo}, ${f.citta}`.trim(),
      telefono: f.telefono,
      email: f.email,
      tipo: f.tipo,
      stato: 'in_corso',
      dataSopralluogo: f.dataSopralluogo || '—',
      tecnico: f.tecnico,
      importo: parseFloat(f.importo) || 0,
      note: f.note,
    };
    setRows((p) => [nuova, ...p]);
    setOpenWizard(false);
  };

  const apriDettaglio = (r: ComRow) => {
    setSelected(r);
    setShowDetail(true);
  };

  return (
    <main style={S.page}>
      <SidebarDesktop active="commesse" />

      <section style={S.main}>
        <CommesseHeader
          search={search}
          onSearchChange={setSearch}
          onApriFiltri={() => setOpenFiltri(true)}
          onNuova={() => setOpenWizard(true)}
          statoSel={tab}
        />

        {!showDetail && (
          <>
            <div style={S.viewSwitch}>
              {(['lista', 'kanban', 'gantt'] as VistaCom[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setVista(v)}
                  style={{
                    ...S.viewBtn,
                    color: vista === v ? MC.teal : MC.muted,
                    borderBottomColor: vista === v ? MC.teal : 'transparent',
                  }}
                >
                  {v === 'lista' ? 'Lista' : v === 'kanban' ? 'Kanban' : 'Gantt'}
                </button>
              ))}
            </div>

            {vista === 'lista' && (
              <>
                <CommesseTabs active={tab} counts={counts} onChange={setTab} />
                <CommesseTable
                  rows={filtered}
                  selectedId={selected?.id}
                  onSelect={apriDettaglio}
                />
                <LegendaStati />
              </>
            )}
            {vista === 'kanban' && <VistaKanban rows={filtered} onSelect={apriDettaglio} />}
            {vista === 'gantt' && <VistaGantt rows={filtered} onSelect={apriDettaglio} />}

            <div style={S.bottomBlock}>
              <AzioniMassa onApplica={() => {}} onSelezionaTutte={() => {}} />
            </div>
          </>
        )}

        {showDetail && selected && (
          <>
            <DettaglioOverview
              com={selected}
              onBack={() => setShowDetail(false)}
              onModifica={() => {}}
              onAzione={(_k) => {}}
              onChiama={() => {}}
              onNavigatore={() => {}}
            />
            <div style={S.tripleGrid}>
              <VaniDellaCommessa onVediTutti={() => {}} />
              <DocumentiCommessa />
              <NoteComunicazioni />
            </div>
          </>
        )}

        <IntegrazioniFunz />
      </section>

      {openWizard && (
        <WizardNuovaCommessa
          onClose={() => setOpenWizard(false)}
          onSalva={handleSalvaWizard}
        />
      )}

      {openFiltri && (
        <PannelloFiltriAvanzati
          onClose={() => setOpenFiltri(false)}
          onApplica={(_f: FormFiltriCom) => setOpenFiltri(false)}
          onPulisci={() => {}}
        />
      )}
    </main>
  );
}

const S = {
  page: { display: 'flex', minHeight: '100vh', background: MC.bg, fontFamily: MF.ui, color: MC.text } as CSSProperties,
  main: { flex: 1, display: 'flex', flexDirection: 'column' as const, minWidth: 0 } as CSSProperties,
  viewSwitch: {
    display: 'flex', padding: '0 24px',
    borderBottom: `1px solid ${MC.borderSoft}`, background: MC.bg,
  } as CSSProperties,
  viewBtn: {
    background: 'transparent', border: 'none', cursor: 'pointer',
    padding: '8px 0', marginRight: 24,
    fontSize: 11, fontWeight: 700,
    textTransform: 'uppercase' as const, letterSpacing: 0.6,
    fontFamily: 'inherit', borderBottom: '2px solid',
  } as CSSProperties,
  tripleGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
    gap: 16, padding: 20,
    borderTop: `1px solid ${MC.borderSoft}`, background: MC.bg,
  } as CSSProperties,
  bottomBlock: {
    padding: 20,
    borderTop: `1px solid ${MC.borderSoft}`, background: MC.bg,
  } as CSSProperties,
};
