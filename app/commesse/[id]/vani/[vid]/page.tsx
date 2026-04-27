'use client';

// ============================================================
// fliwoX Misure — Vano Detail (4 tabs MISURE/FOTO/CHECK/NOTE)
// ATTENZIONE: tab MISURE = placeholder, sostituire con VanoDetailPanel
// importato pari pari da mastro-erp-new
// ============================================================

import { useState, type CSSProperties } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MC, MF, MR } from '@/constants/design-system';
import TopBar from '@/components/mobile/TopBar';
import VanoFoto from '@/components/vano/VanoFoto';
import VanoCheck from '@/components/vano/VanoCheck';
import VanoNote from '@/components/vano/VanoNote';
import VanoMisurePlaceholder from '@/components/vano/VanoMisurePlaceholder';

export const dynamic = 'force-dynamic';

type TabKey = 'misure' | 'foto' | 'check' | 'note';
const TABS: { key: TabKey; label: string }[] = [
  { key: 'misure', label: 'Misure' },
  { key: 'foto', label: 'Foto' },
  { key: 'check', label: 'Check' },
  { key: 'note', label: 'Note' },
];

export default function VanoDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const vid = params?.vid as string;
  const [tab, setTab] = useState<TabKey>('misure');

  return (
    <main style={S.page}>
      <TopBar
        leftIcon="back"
        onLeftClick={() => router.back()}
        title={<span style={S.titleHeader}>Vano 1</span>}
      />

      <div style={S.tabs}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              ...S.tab,
              color: tab === t.key ? MC.teal : MC.muted,
              borderBottomColor: tab === t.key ? MC.teal : 'transparent',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={S.body}>
        {tab === 'misure' && <VanoMisurePlaceholder vanoId={vid} commessaId={id} />}
        {tab === 'foto' && <VanoFoto vanoId={vid} />}
        {tab === 'check' && <VanoCheck vanoId={vid} />}
        {tab === 'note' && <VanoNote vanoId={vid} />}
      </div>
    </main>
  );
}

const S = {
  page: {
    minHeight: '100vh',
    background: MC.bg,
    fontFamily: MF.ui,
    color: MC.text,
  } as CSSProperties,
  titleHeader: { fontSize: 16, fontWeight: 700, color: MC.text } as CSSProperties,
  tabs: {
    display: 'flex',
    padding: '0 20px',
    borderBottom: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  tab: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '12px 0',
    marginRight: 22,
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.6,
    fontFamily: 'inherit',
    borderBottom: '2px solid',
  } as CSSProperties,
  body: {
    flex: 1,
    minHeight: 0,
  } as CSSProperties,
};
