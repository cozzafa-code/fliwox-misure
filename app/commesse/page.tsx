'use client';

// ============================================================
// fliwoX Misure — Lista Commesse
// Tabs: Tutte / In corso / In attesa / Chiuse
// ============================================================

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import {
  fetchCommesseDashboard,
  classificaStato,
  STATO_LABEL,
  type StatoCommessa,
} from '@/lib/api';
import type { Commessa } from '@/lib/types';
import { MC, MF, MR } from '@/constants/design-system';
import TopBar from '@/components/mobile/TopBar';
import BottomNav from '@/components/mobile/BottomNav';
import CommessaListItem from '@/components/commesse/CommessaListItem';

export const dynamic = 'force-dynamic';

type FilterKey = 'all' | StatoCommessa;
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Tutte' },
  { key: 'in_corso', label: 'In corso' },
  { key: 'in_attesa', label: 'In attesa' },
  { key: 'chiusa', label: 'Chiuse' },
];

export default function CommessePage() {
  const router = useRouter();
  const [items, setItems] = useState<Commessa[]>([]);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchCommesseDashboard();
        setItems(data);
        setErrorMsg('');
      } catch (e: any) {
        setErrorMsg(e?.message ?? 'Errore caricamento');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((c) => classificaStato(c) === filter);
  }, [items, filter]);

  return (
    <main style={S.page}>
      <TopBar leftIcon="menu" onLeftClick={() => {}} rightIcon="search" onRightClick={() => {}} />

      <div style={S.titleRow}>
        <h1 style={S.title}>Commesse</h1>
      </div>

      <div style={S.tabs}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              ...S.tab,
              color: filter === f.key ? MC.teal : MC.muted,
              borderBottomColor: filter === f.key ? MC.teal : 'transparent',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={S.list}>
        {errorMsg && <div style={S.error}>⚠ {errorMsg}</div>}
        {loading && <div style={S.loading}>Caricamento…</div>}
        {!loading && filtered.length === 0 && (
          <div style={S.empty}>Nessuna commessa in questa categoria</div>
        )}
        {filtered.map((c) => (
          <CommessaListItem
            key={c.id}
            commessa={c}
            onClick={() => router.push(`/commesse/${c.id}`)}
          />
        ))}
      </div>

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
    paddingBottom: 96,
    display: 'flex',
    flexDirection: 'column' as const,
  } as CSSProperties,
  titleRow: { padding: '6px 20px 8px' } as CSSProperties,
  title: {
    fontSize: 20,
    fontWeight: 800,
    color: MC.text,
    margin: 0,
    letterSpacing: -0.4,
  } as CSSProperties,
  tabs: {
    display: 'flex',
    padding: '0 20px',
    borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  tab: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 0',
    marginRight: 22,
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.6,
    fontFamily: 'inherit',
    borderBottom: '2px solid',
  } as CSSProperties,
  list: {
    padding: '14px 16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
    flex: 1,
  } as CSSProperties,
  error: {
    padding: 14,
    background: MC.dangerSoft,
    color: MC.danger,
    borderRadius: MR.md,
    fontSize: 13,
    fontWeight: 600,
  } as CSSProperties,
  loading: {
    padding: 24,
    textAlign: 'center' as const,
    color: MC.muted,
    fontSize: 13,
  } as CSSProperties,
  empty: {
    padding: 32,
    textAlign: 'center' as const,
    color: MC.mutedSoft,
    fontSize: 13,
  } as CSSProperties,
};
