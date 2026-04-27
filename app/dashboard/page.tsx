'use client';

// ============================================================
// fliwoX Misure — Dashboard Desktop (mockup 07)
// Sidebar sx + KPI top + Donut + Line chart + Lista appuntamenti
// ============================================================

import { useEffect, useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCommesseDashboard, fetchEventiRange, classificaStato } from '@/lib/api';
import { formatDate, startOfWeek, endOfWeek } from '@/lib/dates';
import type { Commessa, Evento } from '@/lib/types';
import { MC, MF, MR, MS } from '@/constants/design-system';
import { LogoBrand } from '@/components/icons/Logo';

export const dynamic = 'force-dynamic';

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: '▦' },
  { key: 'commesse', label: 'Commesse', icon: '☰' },
  { key: 'calendario', label: 'Calendario', icon: '▤' },
  { key: 'clienti', label: 'Clienti', icon: '◯' },
  { key: 'prodotti', label: 'Prodotti', icon: '▧' },
  { key: 'magazzino', label: 'Magazzino', icon: '▩' },
  { key: 'report', label: 'Report', icon: '▥' },
  { key: 'impostazioni', label: 'Impostazioni', icon: '⚙' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [commesse, setCommesse] = useState<Commessa[]>([]);
  const [eventi, setEventi] = useState<Evento[]>([]);

  useEffect(() => {
    async function load() {
      const week = new Date();
      const [c, e] = await Promise.all([
        fetchCommesseDashboard(),
        fetchEventiRange(formatDate(startOfWeek(week)), formatDate(endOfWeek(week))),
      ]);
      setCommesse(c);
      setEventi(e);
    }
    load();
  }, []);

  const tot = commesse.length;
  const inCorso = commesse.filter((c) => classificaStato(c) === 'in_corso').length;
  const inAttesa = commesse.filter((c) => classificaStato(c) === 'in_attesa').length;
  const completate = commesse.filter((c) => classificaStato(c) === 'completata').length;
  const chiuse = commesse.filter((c) => classificaStato(c) === 'chiusa').length;

  return (
    <main style={S.page}>
      <aside style={S.sidebar}>
        <div style={S.brandWrap}>
          <LogoBrand textSize={20} textColor={MC.text} />
        </div>
        <nav style={S.nav}>
          {NAV.map((n, i) => (
            <button
              key={n.key}
              style={{
                ...S.navBtn,
                background: i === 0 ? MC.tealBg : 'transparent',
                color: i === 0 ? MC.teal : MC.textSoft,
              }}
              onClick={() => {
                if (n.key === 'commesse') router.push('/commesse');
                if (n.key === 'calendario') router.push('/calendario');
              }}
            >
              <span style={S.navIcon}>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
        <div style={S.profile}>
          <div style={S.avatar}>F</div>
          <div>
            <div style={S.profileName}>Francesco</div>
            <div style={S.profileRole}>Tecnico</div>
          </div>
        </div>
      </aside>

      <section style={S.main}>
        <header style={S.mainHeader}>
          <h1 style={S.h1}>Dashboard</h1>
          <span style={S.date}>20 – 26 Maggio 2024</span>
        </header>

        <div style={S.kpiRow}>
          <KPI icon="▦" iconBg={MC.tileCommesseOggi} label="Totale commesse" value={tot} delta="+12%" deltaColor={MC.success} sub="vs settimana scorsa" />
          <KPI icon="🔍" iconBg={MC.tileSopralluoghi} label="Sopralluoghi" value={inCorso} delta="+8%" deltaColor={MC.success} sub="vs settimana scorsa" />
          <KPI icon="🔧" iconBg={MC.tileMontaggi} label="Montaggi" value={completate} delta="+15%" deltaColor={MC.success} sub="vs settimana scorsa" />
          <KPI icon="⏸" iconBg={MC.danger} label="In attesa materiali" value={inAttesa} delta="-5%" deltaColor={MC.danger} sub="vs settimana scorsa" />
        </div>

        <div style={S.lowerRow}>
          <div style={S.card}>
            <div style={S.cardTitle}>Commesse per stato</div>
            <Donut tot={tot} inCorso={inCorso} inAttesa={inAttesa} completate={completate} chiuse={chiuse} />
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>Fatturato (anno corrente)</div>
            <div style={S.fatturato}>€ 122.540</div>
            <div style={S.fatturatoSub}>
              <span style={{ color: MC.success, fontWeight: 700 }}>+18%</span>
              <span style={{ color: MC.muted, marginLeft: 6 }}>rispetto allo stesso periodo</span>
            </div>
            <LineChartFake />
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}>Prossimi appuntamenti</div>
            <div style={S.appList}>
              {eventi.slice(0, 3).map((e) => (
                <div key={e.id} style={S.appItem}>
                  <span style={S.appOra}>{e.ora || '—'}</span>
                  <div style={S.appContent}>
                    <div style={S.appTit}>{e.titolo}</div>
                    {e.indirizzo && <div style={S.appAddr}>{e.indirizzo}</div>}
                  </div>
                  <span style={{ color: MC.muted }}>›</span>
                </div>
              ))}
              {eventi.length === 0 && <div style={S.appEmpty}>Nessun appuntamento</div>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function KPI({ icon, iconBg, label, value, delta, deltaColor, sub }: any) {
  return (
    <div style={SK.kpi}>
      <div style={{ ...SK.kpiIcon, background: iconBg }}>{icon}</div>
      <div style={SK.kpiContent}>
        <div style={SK.kpiLabel}>{label}</div>
        <div style={SK.kpiValue}>{value}</div>
        <div style={SK.kpiDelta}>
          <span style={{ color: deltaColor, fontWeight: 800 }}>{delta}</span>
          <span style={{ color: MC.muted, marginLeft: 4 }}>{sub}</span>
        </div>
      </div>
    </div>
  );
}

function Donut({ tot, inCorso, inAttesa, completate, chiuse }: any) {
  const segments = [
    { v: inCorso, c: MC.tileSopralluoghi, l: 'In corso' },
    { v: inAttesa, c: MC.warning, l: 'In attesa' },
    { v: completate, c: MC.success, l: 'Completate' },
    { v: chiuse, c: MC.statoChiusa, l: 'Chiuse' },
  ];
  const sum = Math.max(1, tot);
  let acc = 0;
  return (
    <div style={SK.donutRow}>
      <svg width="160" height="160" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke={MC.borderSoft} strokeWidth="14" fill="none" />
        {segments.map((s, i) => {
          if (s.v === 0) return null;
          const dash = (s.v / sum) * 251.2;
          const offset = -acc * 2.512;
          acc += s.v / sum * 100;
          return (
            <circle
              key={i}
              cx="50" cy="50" r="40"
              stroke={s.c} strokeWidth="14" fill="none"
              strokeDasharray={`${dash} 251.2`}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
            />
          );
        })}
        <text x="50" y="48" textAnchor="middle" fill={MC.text} fontSize="18" fontWeight="800">{tot}</text>
        <text x="50" y="60" textAnchor="middle" fill={MC.muted} fontSize="7">Totali</text>
      </svg>
      <div style={SK.legend}>
        {segments.map((s, i) => (
          <div key={i} style={SK.legendRow}>
            <span style={{ ...SK.dot, background: s.c }} />
            <span style={SK.legendLabel}>{s.l}</span>
            <span style={SK.legendVal}>{s.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChartFake() {
  // mock 6 mesi crescenti
  const points = [60, 55, 70, 65, 80, 95];
  const w = 280, h = 100;
  const max = Math.max(...points);
  const path = points.map((v, i) => `${(i / (points.length - 1)) * w},${h - (v / max) * h}`).join(' L ');
  return (
    <svg width="100%" height="100" viewBox={`0 0 ${w} ${h}`}>
      <path d={`M ${path}`} fill="none" stroke={MC.teal} strokeWidth="2.5" strokeLinecap="round" />
      {points.map((v, i) => (
        <circle key={i} cx={(i / (points.length - 1)) * w} cy={h - (v / max) * h} r="3" fill={MC.teal} />
      ))}
    </svg>
  );
}

const S = {
  page: { display: 'flex', minHeight: '100vh', background: MC.bg, color: MC.text, fontFamily: MF.ui } as CSSProperties,
  sidebar: { width: 220, background: MC.cardSoft, padding: '20px 14px', display: 'flex', flexDirection: 'column' as const, gap: 16 } as CSSProperties,
  brandWrap: { padding: '4px 6px 12px', borderBottom: `1px solid ${MC.borderSoft}` } as CSSProperties,
  nav: { flex: 1, display: 'flex', flexDirection: 'column' as const, gap: 2 } as CSSProperties,
  navBtn: {
    border: 'none', textAlign: 'left' as const, padding: '10px 12px',
    borderRadius: MR.md, fontSize: 13, fontWeight: 600, cursor: 'pointer',
    fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 10,
  } as CSSProperties,
  navIcon: { fontSize: 14, width: 20, textAlign: 'center' as const } as CSSProperties,
  profile: {
    display: 'flex', gap: 10, alignItems: 'center', padding: 12,
    borderTop: `1px solid ${MC.borderSoft}`, marginTop: 8,
  } as CSSProperties,
  avatar: {
    width: 36, height: 36, borderRadius: '50%', background: MC.teal,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 800, color: '#fff',
  } as CSSProperties,
  profileName: { fontSize: 13, fontWeight: 700 } as CSSProperties,
  profileRole: { fontSize: 11, color: MC.muted } as CSSProperties,
  main: { flex: 1, padding: 28, display: 'flex', flexDirection: 'column' as const, gap: 20 } as CSSProperties,
  mainHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } as CSSProperties,
  h1: { fontSize: 24, fontWeight: 800, margin: 0 } as CSSProperties,
  date: { fontSize: 13, color: MC.muted, fontFamily: MF.mono } as CSSProperties,
  kpiRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 } as CSSProperties,
  lowerRow: { display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: 16 } as CSSProperties,
  card: { background: MC.cardSoft, borderRadius: MR.lg, padding: 18, boxShadow: MS.card } as CSSProperties,
  cardTitle: { fontSize: 13, fontWeight: 700, color: MC.text, marginBottom: 12 } as CSSProperties,
  fatturato: { fontSize: 28, fontWeight: 800, fontFamily: MF.mono, marginTop: 4 } as CSSProperties,
  fatturatoSub: { fontSize: 12, marginTop: 4 } as CSSProperties,
  appList: { display: 'flex', flexDirection: 'column' as const, gap: 10 } as CSSProperties,
  appItem: {
    display: 'flex', alignItems: 'center', gap: 10, padding: 8,
    background: MC.bg, borderRadius: MR.md, cursor: 'pointer',
  } as CSSProperties,
  appOra: { fontSize: 13, fontWeight: 700, color: MC.warning, fontFamily: MF.mono, width: 50 } as CSSProperties,
  appContent: { flex: 1, minWidth: 0 } as CSSProperties,
  appTit: { fontSize: 12, fontWeight: 700 } as CSSProperties,
  appAddr: { fontSize: 11, color: MC.muted, marginTop: 1 } as CSSProperties,
  appEmpty: { fontSize: 12, color: MC.muted, padding: 10 } as CSSProperties,
};

const SK = {
  kpi: { background: MC.cardSoft, borderRadius: MR.lg, padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: MS.card } as CSSProperties,
  kpiIcon: { width: 36, height: 36, borderRadius: MR.md, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 } as CSSProperties,
  kpiContent: { flex: 1, minWidth: 0 } as CSSProperties,
  kpiLabel: { fontSize: 11, color: MC.muted, fontWeight: 600 } as CSSProperties,
  kpiValue: { fontSize: 28, fontWeight: 800, fontFamily: MF.mono, lineHeight: 1.1, marginTop: 2 } as CSSProperties,
  kpiDelta: { fontSize: 10, marginTop: 4 } as CSSProperties,
  donutRow: { display: 'flex', alignItems: 'center', gap: 16 } as CSSProperties,
  legend: { flex: 1, display: 'flex', flexDirection: 'column' as const, gap: 6 } as CSSProperties,
  legendRow: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 } as CSSProperties,
  dot: { width: 10, height: 10, borderRadius: '50%' } as CSSProperties,
  legendLabel: { flex: 1, color: MC.muted } as CSSProperties,
  legendVal: { fontWeight: 800, fontFamily: MF.mono } as CSSProperties,
};
