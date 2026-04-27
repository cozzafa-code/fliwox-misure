'use client';

// ============================================================
// fliwoX Misure — Dettaglio Commessa
// Mostra info commessa + lista vani (click → /vani/[vid])
// ============================================================

import { useEffect, useState, type CSSProperties } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchCommessaById, fetchVaniByCommessa } from '@/lib/api';
import type { Commessa, Vano } from '@/lib/types';
import { MC, MF, MR } from '@/constants/design-system';
import TopBar from '@/components/mobile/TopBar';
import BottomNav from '@/components/mobile/BottomNav';
import { IconChevronRight } from '@/components/icons';

export const dynamic = 'force-dynamic';

export default function CommessaDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [commessa, setCommessa] = useState<Commessa | null>(null);
  const [vani, setVani] = useState<Vano[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [c, v] = await Promise.all([
          fetchCommessaById(id),
          fetchVaniByCommessa(id),
        ]);
        setCommessa(c);
        setVani(v);
        setErrorMsg('');
      } catch (e: any) {
        setErrorMsg(e?.message ?? 'Errore caricamento');
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  const titolo = commessa
    ? `${commessa.cliente ?? ''} ${commessa.cognome ?? ''}`.trim() || commessa.code || 'Commessa'
    : 'Caricamento';

  return (
    <main style={S.page}>
      <TopBar
        leftIcon="back"
        onLeftClick={() => router.back()}
        title={<span style={S.titleHeader}>{titolo}</span>}
        rightIcon="search"
      />

      <div style={S.body}>
        {errorMsg && <div style={S.error}>⚠ {errorMsg}</div>}

        {commessa && (
          <div style={S.infoCard}>
            <div style={S.infoLabel}>Indirizzo</div>
            <div style={S.infoValue}>{commessa.indirizzo ?? '—'}</div>
            <div style={{ ...S.infoLabel, marginTop: 12 }}>Telefono</div>
            <div style={S.infoValue}>{commessa.telefono ?? '—'}</div>
            <div style={{ ...S.infoLabel, marginTop: 12 }}>Codice</div>
            <div style={S.infoValue}>{commessa.code ?? '—'}</div>
          </div>
        )}

        <div style={S.section}>
          <div style={S.sectionHeader}>
            <h2 style={S.sectionTitle}>Vani</h2>
            <span style={S.count}>{vani.length}</span>
          </div>
          {loading ? (
            <div style={S.loading}>Caricamento…</div>
          ) : vani.length === 0 ? (
            <div style={S.empty}>
              Nessun vano ancora rilevato.
              <br />
              <button
                onClick={() => router.push(`/commesse/${id}/vani/nuovo`)}
                style={S.btnPrimary}
              >
                + Aggiungi vano
              </button>
            </div>
          ) : (
            <div style={S.vaniList}>
              {vani.map((v, i) => (
                <div
                  key={v.id}
                  onClick={() => router.push(`/commesse/${id}/vani/${v.id}`)}
                  style={S.vanoCard}
                >
                  <div style={S.vanoNum}>{i + 1}</div>
                  <div style={S.vanoContent}>
                    <div style={S.vanoNome}>{v.nome ?? `Vano ${i + 1}`}</div>
                    {v.larghezza && v.altezza && (
                      <div style={S.vanoMis}>
                        {v.larghezza} × {v.altezza} cm
                      </div>
                    )}
                  </div>
                  <IconChevronRight size={18} style={{ color: MC.muted }} />
                </div>
              ))}
            </div>
          )}
        </div>
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
  } as CSSProperties,
  titleHeader: { fontSize: 16, fontWeight: 700, color: MC.text } as CSSProperties,
  body: { padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 16 } as CSSProperties,
  error: { padding: 14, background: MC.dangerSoft, color: MC.danger, borderRadius: MR.md, fontSize: 13 } as CSSProperties,
  infoCard: { background: MC.cardSoft, borderRadius: MR.lg, padding: 14 } as CSSProperties,
  infoLabel: {
    fontSize: 10, fontWeight: 700, color: MC.muted,
    textTransform: 'uppercase' as const, letterSpacing: 0.5,
  } as CSSProperties,
  infoValue: { fontSize: 14, fontWeight: 600, color: MC.text, marginTop: 2 } as CSSProperties,
  section: { display: 'flex', flexDirection: 'column' as const, gap: 10 } as CSSProperties,
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } as CSSProperties,
  sectionTitle: { fontSize: 16, fontWeight: 800, color: MC.text, margin: 0 } as CSSProperties,
  count: {
    background: MC.cardSoft, color: MC.muted, padding: '3px 10px',
    borderRadius: MR.full, fontSize: 11, fontWeight: 700, fontFamily: MF.mono,
  } as CSSProperties,
  vaniList: { display: 'flex', flexDirection: 'column' as const, gap: 8 } as CSSProperties,
  vanoCard: {
    background: MC.cardSoft, borderRadius: MR.lg, padding: 12,
    display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
  } as CSSProperties,
  vanoNum: {
    width: 36, height: 36, borderRadius: MR.md, background: MC.tealBg,
    color: MC.teal, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 800, fontFamily: MF.mono, flexShrink: 0,
  } as CSSProperties,
  vanoContent: { flex: 1, minWidth: 0 } as CSSProperties,
  vanoNome: { fontSize: 14, fontWeight: 700, color: MC.text } as CSSProperties,
  vanoMis: { fontSize: 12, color: MC.muted, fontFamily: MF.mono, marginTop: 2 } as CSSProperties,
  loading: { padding: 24, textAlign: 'center' as const, color: MC.muted, fontSize: 13 } as CSSProperties,
  empty: {
    padding: 32, textAlign: 'center' as const, color: MC.mutedSoft,
    fontSize: 13, background: MC.cardSoft, borderRadius: MR.lg,
  } as CSSProperties,
  btnPrimary: {
    marginTop: 14, padding: '10px 20px', background: MC.teal, color: '#fff',
    border: 'none', borderRadius: MR.md, fontSize: 13, fontWeight: 700,
    cursor: 'pointer', fontFamily: 'inherit',
  } as CSSProperties,
};
