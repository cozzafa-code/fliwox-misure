'use client';

// ============================================================
// fliwoX Misure — SUPER AREA COMMESSE Desktop
// 9 sezioni specifica completa
// ============================================================

import { useMemo, useState, type CSSProperties } from 'react';
import { MC, MF } from '@/constants/design-system';
import SidebarDesktop from '@/components/desktop/SidebarDesktop';
import CommesseHeader from '@/components/commesse-desktop/CommesseHeader';
import CommesseTabs from '@/components/commesse-desktop/CommesseTabs';
import CommesseTable from '@/components/commesse-desktop/CommesseTable';
import PannelloDettaglio from '@/components/commesse-desktop/PannelloDettaglio';
import WizardNuovaCommessa, { type WizardForm } from '@/components/commesse-desktop/WizardNuovaCommessa';
import PannelloFiltriAvanzati, { type FormFiltriCom } from '@/components/commesse-desktop/PannelloFiltriAvanzati';
import VistaKanban from '@/components/commesse-desktop/VistaKanban';
import VistaGantt from '@/components/commesse-desktop/VistaGantt';
import DocumentiCommessa from '@/components/commesse-desktop/DocumentiCommessa';
import NoteComunicazioni from '@/components/commesse-desktop/NoteComunicazioni';
import AttivitaCorrelate from '@/components/commesse-desktop/AttivitaCorrelate';
import EsportazioniReport from '@/components/commesse-desktop/EsportazioniReport';
import FunzionalitaChiave from '@/components/commesse-desktop/FunzionalitaChiave';
import { type ComRow, type StatoCom, COMMESSE_MOCK } from '@/lib/commesse';

export const dynamic = 'force-dynamic';

type TabKey = 'all' | StatoCom;
type VistaCom = 'lista' | 'kanban' | 'gantt';

export default function CommesseDesktopPage() {
  const [tab, setTab] = useState<TabKey>('all');
  const [vista, setVista] = useState<VistaCom>('lista');
  const [search, setSearch] = useState('');
  const [openWizard, setOpenWizard] = useState(false);
  const [openFiltri, setOpenFiltri] = useState(false);
  const [selected, setSelected] = useState<ComRow | null>(COMMESSE_MOCK[0]);
  const [rows, setRows] = useState<ComRow[]>(COMMESSE_MOCK);

  const counts = useMemo(() => {
    const all = rows.length;
    const inCorso = rows.filter((r) => r.stato === 'in_corso').length;
    const inAttesa = rows.filter((r) => r.stato === 'in_attesa').length;
    const inSospeso = rows.filter((r) => r.stato === 'in_sospeso').length;
    const chiusa = rows.filter((r) => r.stato === 'chiusa').length;
    return { all, in_corso: inCorso, in_attesa: inAttesa, in_sospeso: inSospeso, chiusa };
  }, [rows]);

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
    setSelected(nuova);
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
        />

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
              onSelect={setSelected}
            />
            {selected && (
              <PannelloDettaglio
                com={selected}
                onClose={() => setSelected(null)}
                onAzione={(_k) => {}}
              />
            )}
          </>
        )}

        {vista === 'kanban' && <VistaKanban rows={filtered} onSelect={setSelected} />}
        {vista === 'gantt' && <VistaGantt rows={filtered} onSelect={setSelected} />}

        {/* Sezioni 06 / 07 / 08 / 09 sotto */}
        {vista === 'lista' && selected && (
          <div style={S.bottomGrid}>
            <DocumentiCommessa />
            <NoteComunicazioni />
            <AttivitaCorrelate />
            <EsportazioniReport />
          </div>
        )}

        <FunzionalitaChiave />
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
  page: {
    display: 'flex',
    minHeight: '100vh',
    background: MC.bg,
    fontFamily: MF.ui,
    color: MC.text,
  } as CSSProperties,
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    minWidth: 0,
  } as CSSProperties,
  viewSwitch: {
    display: 'flex',
    padding: '0 24px',
    borderBottom: `1px solid ${MC.borderSoft}`,
    background: MC.bg,
  } as CSSProperties,
  viewBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 0',
    marginRight: 24,
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.6,
    fontFamily: 'inherit',
    borderBottom: '2px solid',
  } as CSSProperties,
  bottomGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    padding: 20,
    borderTop: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
};
