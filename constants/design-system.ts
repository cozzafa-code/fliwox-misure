// ============================================================
// fliwoX Design System v2 — DARK mockup approvato 27/04/2026
// ============================================================

export const MC = {
  // Background dark
  bg: '#0A0E1A',
  bgSoft: '#101524',
  card: '#161B2A',
  cardSoft: '#1C2236',
  topbar: '#0A0E1A',

  // Text
  text: '#F1F5F9',
  textSoft: '#CBD5E1',
  muted: '#94A3B8',
  mutedSoft: '#64748B',

  // Borders
  border: '#1F2937',
  borderSoft: '#161E2E',
  borderStrong: '#374151',

  // Accent (logo)
  teal: '#14B8A6',
  tealDark: '#0F766E',
  tealBg: '#0D3B36',

  // Status
  success: '#22C55E',
  successSoft: '#14532D',
  warning: '#F59E0B',
  warningSoft: '#451A03',
  danger: '#EF4444',
  dangerSoft: '#450A0A',
  info: '#3B82F6',
  infoSoft: '#1E3A8A',

  // Tile colors mockup home
  tileCommesseOggi: '#7BA0E0',
  tileSopralluoghi: '#E89947',
  tileMisure: '#86A872',
  tileMontaggi: '#4A90E2',
  tileProblemi: '#E74C3C',
  tileFoto: '#9B7BC8',
} as const;

export const MF = {
  ui: 'Inter, system-ui, -apple-system, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
} as const;

export const MR = {
  xs: 4, sm: 6, md: 8, lg: 12, xl: 16, '2xl': 20, '3xl': 24, full: 9999,
} as const;

export const MP = {
  s1: 4, s2: 8, s3: 12, s4: 16, s5: 20, s6: 24, s7: 32, s8: 40,
} as const;

export const MS = {
  card: '0 1px 2px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
  tile: '0 4px 12px rgba(0,0,0,0.25)',
  button: '0 1px 2px rgba(0,0,0,0.2)',
  fab: '0 6px 20px rgba(20,184,166,0.4)',
} as const;
