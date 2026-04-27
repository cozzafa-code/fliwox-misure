// ============================================================
// fliwoX Design System v3 — DARK + palette ufficiale brand
// ============================================================

export const MC = {
  // Background dark (mockup master)
  bg: '#1E2128',
  bgSoft: '#252830',
  card: '#2D3D3B',
  cardSoft: '#243034',
  topbar: '#1E2128',

  // Text
  text: '#FFFFFF',
  textSoft: '#E5E7EB',
  muted: '#A4A78A',
  mutedSoft: '#6B7280',

  // Borders
  border: '#3A4148',
  borderSoft: '#252830',
  borderStrong: '#4B5563',

  // Brand (logo ufficiale fliwoX)
  teal: '#2FA7A2',
  tealLight: '#3EC7C1',
  tealDark: '#1F7A76',
  tealBg: '#1A3F3D',

  // Status (mockup)
  success: '#6CC0A4',
  successSoft: '#1A3F3D',
  warning: '#F28C1A',
  warningSoft: '#3D2A12',
  danger: '#E74C3C',
  dangerSoft: '#3D1F1B',
  info: '#1B8CC4',
  infoSoft: '#1A2D3D',

  // Tile colors mockup home (palette ufficiale)
  tileCommesseOggi: '#1B8CC4',
  tileSopralluoghi: '#F28C1A',
  tileMisure: '#6CC0A4',
  tileMontaggi: '#1E74C3',
  tileProblemi: '#E74C3C',
  tileFoto: '#7A2F8A',

  // Stati commessa
  statoInCorso: '#F28C1A',
  statoInAttesa: '#F1C40F',
  statoCompletata: '#6CC0A4',
  statoChiusa: '#6B7280',
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
  fab: '0 6px 20px rgba(47,167,162,0.4)',
} as const;
