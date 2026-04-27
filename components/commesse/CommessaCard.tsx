'use client';

// ============================================================
// fliwoX Misure — Card Commessa (per dashboard list)
// ============================================================

import { useRouter } from 'next/navigation';
import type { CSSProperties } from 'react';
import { MC, MF, MR, MS } from '@/constants/design-system';
import type { Commessa, PipelineFase } from '@/lib/types';
import { FASE_LABEL } from '@/lib/types';

interface Props {
  commessa: Commessa;
  fase?: PipelineFase;
}

export default function CommessaCard({ commessa, fase }: Props) {
  const router = useRouter();
  const nome = `${commessa.cliente ?? ''} ${commessa.cognome ?? ''}`.trim() || 'Senza nome';
  const colorFase = fase?.colore ?? MC.teal;
  const labelFase = fase?.nome ?? FASE_LABEL[commessa.fase ?? ''] ?? commessa.fase ?? '—';
  const ferma = commessa.ferma === true;

  return (
    <div
      onClick={() => router.push(`/commesse/${commessa.id}`)}
      style={S.card}
    >
      <div style={S.row1}>
        <div style={S.code}>{commessa.code ?? '—'}</div>
        <div
          style={{
            ...S.faseBadge,
            background: `${colorFase}20`,
            color: colorFase,
            borderColor: `${colorFase}40`,
          }}
        >
          {fase?.icona && <span>{fase.icona}</span>}
          <span>{labelFase}</span>
        </div>
      </div>
      <div style={S.cliente}>{nome}</div>
      {commessa.indirizzo && <div style={S.indirizzo}>{commessa.indirizzo}</div>}
      <div style={S.metrics}>
        <Metric label="Vani" value={`${commessa.vani_completi ?? 0}/${commessa.vani_count ?? 0}`} />
        <Metric label="Foto" value={`${commessa.foto_count ?? 0}`} />
        <Metric label="Giorni" value={`${commessa.giorni_in_fase ?? 0}`} accent={ferma} />
      </div>
      {ferma && commessa.motivo_ferma && (
        <div style={S.ferma}>⏸ {commessa.motivo_ferma}</div>
      )}
    </div>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={S.metric}>
      <div style={{ ...S.metricLabel }}>{label}</div>
      <div style={{ ...S.metricValue, color: accent ? MC.warning : MC.text }}>{value}</div>
    </div>
  );
}

const S = {
  card: {
    background: MC.card,
    borderRadius: MR.lg,
    border: `1px solid ${MC.border}`,
    boxShadow: MS.card,
    padding: 14,
    cursor: 'pointer',
    transition: 'transform 0.1s, box-shadow 0.1s',
  } as CSSProperties,
  row1: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  } as CSSProperties,
  code: {
    fontSize: 12,
    fontWeight: 700,
    color: MC.muted,
    fontFamily: MF.mono,
  } as CSSProperties,
  faseBadge: {
    fontSize: 10,
    fontWeight: 700,
    padding: '3px 8px',
    borderRadius: MR.full,
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  } as CSSProperties,
  cliente: {
    fontSize: 15,
    fontWeight: 700,
    color: MC.text,
    marginBottom: 2,
  } as CSSProperties,
  indirizzo: {
    fontSize: 12,
    color: MC.muted,
    marginBottom: 10,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  } as CSSProperties,
  metrics: {
    display: 'flex',
    gap: 16,
    paddingTop: 8,
    borderTop: `1px solid ${MC.borderSoft}`,
  } as CSSProperties,
  metric: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,
  metricLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: MC.mutedSoft,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  } as CSSProperties,
  metricValue: {
    fontSize: 14,
    fontWeight: 800,
    fontFamily: MF.mono,
    marginTop: 2,
  } as CSSProperties,
  ferma: {
    marginTop: 8,
    padding: '6px 10px',
    background: MC.warningSoft,
    color: MC.warning,
    fontSize: 11,
    fontWeight: 600,
    borderRadius: MR.md,
  } as CSSProperties,
};
