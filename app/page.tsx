'use client';

// ============================================================
// fliwoX Misure — HOME mobile (dark, mockup-fedele 27/04/2026)
// 6 tile colorate con icone SVG outline + prossimo appuntamento + bottom nav
// ============================================================

import { useEffect, useState, type CSSProperties } from 'react';
import { fetchHomeStats, fetchProssimoEvento, type HomeStats } from '@/lib/api';
import { MC, MR, MF } from '@/constants/design-system';
import type { Evento } from '@/lib/types';
import TopBar from '@/components/mobile/TopBar';
import BottomNav from '@/components/mobile/BottomNav';
import HomeTile from '@/components/mobile/HomeTile';
import ProssimoAppuntamento from '@/components/mobile/ProssimoAppuntamento';
import {
  IconCommesse,
  IconSopralluogo,
  IconMisure,
  IconMontaggi,
  IconProblemi,
  IconFoto,
} from '@/components/icons';

export const dynamic = 'force-dynamic';

const NOME_UTENTE = 'Francesco';

export default function HomePage() {
  const [stats, setStats] = useState<HomeStats | null>(null);
  const [prossimo, setProssimo] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [s, p] = await Promise.all([fetchHomeStats(), fetchProssimoEvento()]);
        setStats(s);
        setProssimo(p);
        setErrorMsg('');
      } catch (e: any) {
        setErrorMsg(e?.message ?? 'Errore caricamento');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main style={S.page}>
      <TopBar rightIcon="bell" onRightClick={() => {}} />

      <div style={S.body}>
        <div style={S.greeting}>
          <h1 style={S.helloTitle}>
            Ciao {NOME_UTENTE}
          </h1>
          <p style={S.helloSub}>Ecco cosa hai oggi.</p>
        </div>

        {errorMsg && <div style={S.error}>⚠ {errorMsg}</div>}

        <div style={S.tilesGrid}>
          <HomeTile
            label="Commesse oggi"
            count={stats?.commesseOggi ?? 0}
            color={MC.tileCommesseOggi}
            href="/commesse?filter=oggi"
            icon={<IconCommesse size={16} />}
          />
          <HomeTile
            label="Sopralluoghi"
            count={stats?.sopralluoghi ?? 0}
            color={MC.tileSopralluoghi}
            href="/commesse?filter=sopralluogo"
            icon={<IconSopralluogo size={16} />}
          />
          <HomeTile
            label="Misure da fare"
            count={stats?.misureDaFare ?? 0}
            color={MC.tileMisure}
            href="/commesse?filter=misure"
            icon={<IconMisure size={16} />}
          />
          <HomeTile
            label="Montaggi"
            count={stats?.montaggi ?? 0}
            color={MC.tileMontaggi}
            href="/commesse?filter=montaggi"
            icon={<IconMontaggi size={16} />}
          />
          <HomeTile
            label="Problemi"
            count={stats?.problemi ?? 0}
            color={MC.tileProblemi}
            href="/commesse?filter=problemi"
            icon={<IconProblemi size={16} />}
          />
          <HomeTile
            label="Foto da completare"
            count={stats?.fotoDaCompletare ?? 0}
            color={MC.tileFoto}
            href="/commesse?filter=foto"
            icon={<IconFoto size={16} />}
          />
        </div>

        <ProssimoAppuntamento evento={prossimo} />
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
  body: {
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 20,
    maxWidth: 480,
    margin: '0 auto',
  } as CSSProperties,
  greeting: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
  } as CSSProperties,
  helloTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: MC.text,
    margin: 0,
    letterSpacing: -0.5,
  } as CSSProperties,
  helloSub: {
    fontSize: 14,
    color: MC.muted,
    margin: 0,
  } as CSSProperties,
  tilesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  } as CSSProperties,
  error: {
    padding: 12,
    background: MC.dangerSoft,
    color: MC.danger,
    borderRadius: MR.md,
    fontSize: 13,
    fontWeight: 600,
  } as CSSProperties,
};
