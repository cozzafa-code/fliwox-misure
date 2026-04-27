// ============================================================
// fliwoX Misure — Date utilities
// ============================================================

export const GIORNI_SETTIMANA = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
export const MESI = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
];

export function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function isToday(iso: string): boolean {
  return iso === formatDate(new Date());
}

export function isPastDate(iso: string): boolean {
  return parseDate(iso).getTime() < new Date(formatDate(new Date())).getTime();
}

export function startOfWeek(d: Date): Date {
  const day = d.getDay() === 0 ? 7 : d.getDay(); // dom=7, lun=1
  const result = new Date(d);
  result.setDate(d.getDate() - day + 1);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function endOfWeek(d: Date): Date {
  const start = startOfWeek(d);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return end;
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

export function daysOfWeek(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });
}

export function relativeDay(iso: string): string {
  if (isToday(iso)) return 'Oggi';
  const today = new Date();
  const d = parseDate(iso);
  const diffMs = d.getTime() - new Date(formatDate(today)).getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return 'Domani';
  if (diffDays === -1) return 'Ieri';
  if (diffDays > 0 && diffDays <= 7) return `Tra ${diffDays} giorni`;
  if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} giorni fa`;
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function formatGiornoCorto(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function formatGiornoLungo(d: Date): string {
  return `${GIORNI_SETTIMANA[(d.getDay() + 6) % 7]} ${d.getDate()} ${MESI[d.getMonth()]}`;
}
