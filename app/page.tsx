'use client';

// ============================================================
// fliwoX Misure — Dashboard principale
// Supercalendario iperconnesso con commesse + task + zona
// ============================================================

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import {
  AZIENDA_ID,
  fetchPipelineFasi,
  fetchCommesseDashboard,
  fetchEventiRange,
  fetchTasksAperti,
} from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { MC, MF, MR, MS, MP } from '@/constants/design-system';
import {
  startOfWeek,
  endOfWeek,
  formatDate,
  isToday,
  formatGiornoLungo,
} from '@/lib/dates';
import type { Commessa, Evento, Task, PipelineFase } from '@/lib/types';
import KPIStrip from '@/components/dashboard/KPIStrip';
import TaskList from '@/components/dashboard/TaskList';
import CalendarioSettimana from '@/components/calendario/CalendarioSettimana';
import CommessaCard from '@/components/commesse/CommessaCard';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date()));
  const [commesse, setCommesse] = useState<Commessa[]>([]);
  const [eventi, setEventi] = useState<Evento[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fasi, setFasi] = useState<PipelineFase[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const from = formatDate(weekStart);
        const to = formatDate(endOfWeek(weekStart));
        const [cmm, evv, tt, ff] = await Promise.all([
          fetchCommesseDashboard(),
          fetchEventiRange(from, to),
          fetchTasksAperti(),
          fetchPipelineFasi(),
        ]);
        setCommesse(cmm);
        setEventi(evv);
        setTasks(tt);
        setFasi(ff);
        setErrorMsg('');
      } catch (e: any) {
        setErrorMsg(e?.message ?? 'Errore caricamento');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [weekStart]);

  const fasiByCodice = useMemo(() => {
    const map = new Map<string, PipelineFase>();
    fasi.forEach((f) => map.set(f.codice, f));
    return map;
  }, [fasi]);

  const eventiOggi = useMemo(
    () => eventi.filter((e) => isToday(e.data) && !e.completato),
    [eventi],
  );

  // KPI calcolati
  const commesseAperte = commesse.filter((c) => !c.ferma && c.fase !== 'chiusura');
  const daRilevare = commesse.filter((c) => c.fase === 'misure' || c.fase === 'sopralluogo');

  const kpiItems = [
    { label: 'Commesse aperte', value: commesseAperte.length, color: MC.tealDark, icon: '📋' },
    { label: 'Da rilevare', value: daRilevare.length, color: MC.warning, icon: '📐' },
    { label: 'Eventi oggi', value: eventiOggi.length, color: MC.info, icon: '📅' },
    { label: 'Task aperti', value: tasks.filter((t) => !t.done).length, color: MC.danger, icon: '✓' },
  ];

  const handleToggleTask = async (id: string, done: boolean) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done } : t)));
    await supabase
      .from('tasks')
      .update({ done, done_at: done ? new Date().toISOString() : null })
      .eq('id', id);
  };

  return (
    <main style={S.page}>
      <header style={S.topbar}>
        <div style={S.brand}>
          fliwo<span style={{ color: MC.teal }}>X</span>{' '}
          <span style={S.brandSub}>Misure</span>
        </div>
        <div style={S.dateBox}>
          <div style={S.dateLabel}>Oggi</div>
          <div style={S.dateValue}>{formatGiornoLungo(new Date())}</div>
        </div>
      </header>

      <div style={S.body}>
        {errorMsg && <div style={S.errorBox}>⚠ {errorMsg}</div>}
        {loading && !errorMsg && (
          <div style={S.loading}>Caricamento dati…</div>
        )}

        <section style={S.section}>
          <KPIStrip items={kpiItems} />
        </section>

        <section style={S.section}>
          <div style={S.sectionHeader}>
            <h2 style={S.sectionTitle}>Calendario settimana</h2>
            <button onClick={() => setWeekStart(startOfWeek(new Date()))} style={S.todayBtn}>
              Oggi
            </button>
          </div>
          <CalendarioSettimana
            weekStart={weekStart}
            eventi={eventi}
            onPrevWeek={() => {
              const d = new Date(weekStart);
              d.setDate(d.getDate() - 7);
              setWeekStart(d);
            }}
            onNextWeek={() => {
              const d = new Date(weekStart);
              d.setDate(d.getDate() + 7);
              setWeekStart(d);
            }}
          />
        </section>

        <div style={S.twoCol}>
          <section style={S.section}>
            <div style={S.sectionHeader}>
              <h2 style={S.sectionTitle}>Commesse aperte</h2>
              <span style={S.count}>{commesseAperte.length}</span>
            </div>
            <div style={S.cardsGrid}>
              {commesseAperte.slice(0, 6).map((c) => (
                <CommessaCard key={c.id} commessa={c} fase={fasiByCodice.get(c.fase ?? '')} />
              ))}
            </div>
          </section>

          <section style={S.section}>
            <div style={S.sectionHeader}>
              <h2 style={S.sectionTitle}>Task</h2>
              <span style={S.count}>{tasks.length}</span>
            </div>
            <TaskList tasks={tasks} onToggle={handleToggleTask} />
          </section>
        </div>
      </div>
    </main>
  );
}

const S = {
  page: {
    minHeight: '100vh',
    background: MC.bg,
    fontFamily: MF.ui,
  } as CSSProperties,
  topbar: {
    background: MC.topbar,
    padding: '14px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky' as const,
    top: 0,
    zIndex: 10,
  } as CSSProperties,
  brand: {
    fontSize: 20,
    fontWeight: 900,
    color: '#fff',
    letterSpacing: -0.5,
  } as CSSProperties,
  brandSub: {
    color: MC.tealBg,
    fontWeight: 600,
    marginLeft: 4,
  } as CSSProperties,
  dateBox: {
    textAlign: 'right' as const,
  } as CSSProperties,
  dateLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  } as CSSProperties,
  dateValue: {
    fontSize: 13,
    fontWeight: 600,
    color: '#fff',
    fontFamily: MF.mono,
  } as CSSProperties,
  body: {
    padding: 20,
    maxWidth: 1400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 20,
  } as CSSProperties,
  errorBox: {
    padding: 14,
    background: MC.dangerSoft,
    color: MC.danger,
    borderRadius: MR.md,
    fontSize: 13,
    fontWeight: 600,
  } as CSSProperties,
  loading: {
    padding: 14,
    background: MC.warningSoft,
    color: MC.warning,
    borderRadius: MR.md,
    fontSize: 13,
    fontWeight: 600,
    textAlign: 'center' as const,
  } as CSSProperties,
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
  } as CSSProperties,
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as CSSProperties,
  sectionTitle: {
    fontSize: 16,
    fontWeight: 800,
    color: MC.text,
    margin: 0,
  } as CSSProperties,
  todayBtn: {
    background: MC.card,
    color: MC.tealDark,
    border: `1px solid ${MC.border}`,
    padding: '6px 14px',
    borderRadius: MR.md,
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxShadow: MS.button,
  } as CSSProperties,
  count: {
    background: MC.bgSoft,
    color: MC.muted,
    padding: '3px 10px',
    borderRadius: MR.full,
    fontSize: 11,
    fontWeight: 700,
    fontFamily: MF.mono,
  } as CSSProperties,
  twoCol: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 20,
  } as CSSProperties,
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 12,
  } as CSSProperties,
};
