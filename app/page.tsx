'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { MC, MF, MR, MS } from '@/constants/design-system';

export default function HomePage() {
  const [supabaseStatus, setSupabaseStatus] = useState<'check' | 'ok' | 'error'>('check');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    // Test connessione Supabase: query semplice su tabella esistente
    supabase
      .from('aziende')
      .select('id')
      .limit(1)
      .then(({ error }) => {
        if (error) {
          setSupabaseStatus('error');
          setErrorMsg(error.message);
        } else {
          setSupabaseStatus('ok');
        }
      });
  }, []);

  return (
    <main style={S.main}>
      <div style={S.card}>
        <div style={S.brand}>
          fliwo<span style={{ color: MC.teal }}>X</span>{' '}
          <span style={{ color: MC.tealDark }}>Misure</span>
        </div>

        <div style={S.tagline}>App per misuratori serramentisti</div>

        <div style={S.status}>
          <div style={S.statusRow}>
            <span style={S.statusLabel}>Setup Next.js</span>
            <span style={{ ...S.statusBadge, background: MC.successSoft, color: MC.success }}>
              ✓ OK
            </span>
          </div>

          <div style={S.statusRow}>
            <span style={S.statusLabel}>Connessione Supabase</span>
            <span
              style={{
                ...S.statusBadge,
                background:
                  supabaseStatus === 'ok'
                    ? MC.successSoft
                    : supabaseStatus === 'error'
                    ? MC.dangerSoft
                    : MC.warningSoft,
                color:
                  supabaseStatus === 'ok'
                    ? MC.success
                    : supabaseStatus === 'error'
                    ? MC.danger
                    : MC.warning,
              }}
            >
              {supabaseStatus === 'ok'
                ? '✓ OK'
                : supabaseStatus === 'error'
                ? '✗ ERR'
                : '... check'}
            </span>
          </div>

          {errorMsg && <div style={S.errorMsg}>{errorMsg}</div>}
        </div>

        <div style={S.footer}>
          <div style={S.version}>v0.1.0 · scaffold iniziale</div>
          <div style={S.date}>27 aprile 2026</div>
        </div>
      </div>
    </main>
  );
}

const S = {
  main: {
    minHeight: '100vh',
    background: MC.bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    fontFamily: MF.ui,
  } as React.CSSProperties,
  card: {
    background: MC.card,
    borderRadius: MR['2xl'],
    boxShadow: MS.card,
    border: `1px solid ${MC.border}`,
    padding: 40,
    maxWidth: 480,
    width: '100%',
  } as React.CSSProperties,
  brand: {
    fontSize: 32,
    fontWeight: 900,
    color: MC.text,
    letterSpacing: -0.5,
    marginBottom: 4,
  } as React.CSSProperties,
  tagline: {
    fontSize: 14,
    color: MC.muted,
    marginBottom: 32,
  } as React.CSSProperties,
  status: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 32,
  } as React.CSSProperties,
  statusRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: MC.bgSoft,
    borderRadius: MR.md,
  } as React.CSSProperties,
  statusLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: MC.text,
  } as React.CSSProperties,
  statusBadge: {
    fontSize: 12,
    fontWeight: 700,
    padding: '4px 10px',
    borderRadius: MR.full,
    fontFamily: MF.mono,
  } as React.CSSProperties,
  errorMsg: {
    fontSize: 12,
    color: MC.danger,
    background: MC.dangerSoft,
    padding: 12,
    borderRadius: MR.md,
    fontFamily: MF.mono,
  } as React.CSSProperties,
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTop: `1px solid ${MC.borderSoft}`,
  } as React.CSSProperties,
  version: {
    fontSize: 11,
    color: MC.mutedSoft,
    fontFamily: MF.mono,
  } as React.CSSProperties,
  date: {
    fontSize: 11,
    color: MC.mutedSoft,
  } as React.CSSProperties,
};
