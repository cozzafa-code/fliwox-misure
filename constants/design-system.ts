// ============================================================
// fliwoX Design System - LIGHT (versione definitiva 24/04/2026)
// Bibbia v1.4 dark è OBSOLETA - tutti i device usano LIGHT Google-style
// ============================================================

export const MC = {
  // Background
  bg: '#F8FAFC',
  bgSoft: '#F1F5F9',
  card: '#FFFFFF',
  topbar: '#0B1F2A',

  // Text
  text: '#0F172A',
  textSoft: '#334155',
  muted: '#64748B',
  mutedSoft: '#94A3B8',

  // Borders
  border: '#E2E8F0',
  borderSoft: '#F1F5F9',
  borderStrong: '#CBD5E1',

  // Accent (logo + bottoni primari)
  teal: '#14B8A6',
  tealDark: '#0F766E',
  tealBg: '#F0FDFA',

  // Status
  success: '#10B981',
  successSoft: '#D1FAE5',
  warning: '#F59E0B',
  warningSoft: '#FEF3C7',
  danger: '#EF4444',
  dangerSoft: '#FEE2E2',
  info: '#3B82F6',
  infoSoft: '#DBEAFE',
} as const;

export const MF = {
  ui: 'Inter, system-ui, -apple-system, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
} as const;

export const MR = {
  xs: 4, sm: 6, md: 8, lg: 12, xl: 16, '2xl': 20, full: 9999,
} as const;

export const MP = {
  s1: 4, s2: 8, s3: 12, s4: 16, s5: 20, s6: 24, s7: 32, s8: 40,
} as const;

export const MS = {
  card: '0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06)',
  button: '0 1px 2px rgba(15,23,42,0.05)',
  buttonPrimary: '0 4px 12px rgba(20,184,166,0.25)',
  modal: '0 25px 50px -12px rgba(15,23,42,0.25)',
} as const;

export const sectionLabel = {
  fontSize: 11,
  fontWeight: 700,
  color: MC.muted,
  textTransform: 'uppercase' as const,
  letterSpacing: 1,
};
