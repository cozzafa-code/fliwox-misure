// ============================================================
// fliwoX Misure — Calendario types + constants
// Specifica: super-calendario completo (9 sezioni)
// ============================================================

import { MC } from '@/constants/design-system';

export type TipoAttivita = 'sopralluogo' | 'montaggio' | 'consegna' | 'problema' | 'appuntamento' | 'altro';
export type StatoAttivita = 'da_confermare' | 'confermato' | 'in_corso' | 'completato' | 'annullato';
export type VistaCalendario = 'settimana' | 'giorno' | 'mese' | 'agenda' | 'timeline';

export interface Tecnico {
  id: string;
  nome: string;
  attivitaTotali?: number;
  attivitaCompletate?: number;
  colore?: string;
}

export interface AttivitaCal {
  id: string;
  titolo: string;
  cliente: string;
  indirizzo: string;
  tecnicoId: string;
  data: string; // YYYY-MM-DD
  oraInizio: string; // HH:MM
  oraFine: string; // HH:MM
  tipo: TipoAttivita;
  stato: StatoAttivita;
  note?: string;
  promemoria?: string;
  allegatiCount?: number;
  problemi?: boolean;
}

export const TIPO_COLOR: Record<TipoAttivita, string> = {
  sopralluogo: MC.tileSopralluoghi,
  montaggio: MC.tileMisure,
  consegna: '#F1C40F',
  problema: MC.danger,
  appuntamento: MC.tileMontaggi,
  altro: MC.statoChiusa,
};

export const TIPO_LABEL: Record<TipoAttivita, string> = {
  sopralluogo: 'Sopralluogo',
  montaggio: 'Montaggio',
  consegna: 'Consegna',
  problema: 'Problema',
  appuntamento: 'Appuntamento',
  altro: 'Altro',
};

export const STATO_LABEL_ATT: Record<StatoAttivita, string> = {
  da_confermare: 'Da confermare',
  confermato: 'Confermato',
  in_corso: 'In corso',
  completato: 'Completato',
  annullato: 'Annullato',
};

export const STATO_COLOR_ATT: Record<StatoAttivita, string> = {
  da_confermare: MC.warning,
  confermato: MC.teal,
  in_corso: MC.info,
  completato: MC.success,
  annullato: MC.statoChiusa,
};

export const VISTE: { key: VistaCalendario; label: string; descr: string }[] = [
  { key: 'settimana', label: 'Settimana', descr: 'Vista orizzontale con 7 giorni' },
  { key: 'giorno', label: 'Giorno', descr: 'Vista dettagliata di un singolo giorno' },
  { key: 'mese', label: 'Mese', descr: 'Vista mensile con tutti gli eventi' },
  { key: 'agenda', label: 'Agenda', descr: 'Elenco cronologico in ordine temporale' },
  { key: 'timeline', label: 'Timeline (Tecnici)', descr: 'Vista timeline orizzontale per tecnico' },
];

export const ORE_GIORNATA = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

// MOCK tecnici (poi sostituire con fetchTecnici da Supabase)
export const TECNICI_MOCK: Tecnico[] = [
  { id: 't1', nome: 'Francesco', attivitaTotali: 10, attivitaCompletate: 8 },
  { id: 't2', nome: 'Antonio', attivitaTotali: 10, attivitaCompletate: 6 },
  { id: 't3', nome: 'Team 3', attivitaTotali: 10, attivitaCompletate: 4 },
];

// MOCK attivita settimana 20-26 maggio
export const ATTIVITA_MOCK: AttivitaCal[] = [
  { id: '1', titolo: 'Montaggio', cliente: 'Cliente Verdi', indirizzo: 'Via Milano 5', tecnicoId: 't1', data: '2024-05-20', oraInizio: '08:00', oraFine: '10:00', tipo: 'montaggio', stato: 'confermato' },
  { id: '2', titolo: 'Sopralluogo', cliente: 'Cliente Bianchi', indirizzo: 'Via Verdi 15', tecnicoId: 't1', data: '2024-05-21', oraInizio: '09:00', oraFine: '10:30', tipo: 'sopralluogo', stato: 'confermato', note: 'Portare catalogo e campioni materiali', promemoria: '15 minuti prima', allegatiCount: 2 },
  { id: '3', titolo: 'Consegna', cliente: 'Showroom', indirizzo: '', tecnicoId: 't2', data: '2024-05-21', oraInizio: '09:00', oraFine: '10:00', tipo: 'consegna', stato: 'da_confermare' },
  { id: '4', titolo: 'Montaggio', cliente: 'Cliente Neri', indirizzo: 'Via Torino 8', tecnicoId: 't1', data: '2024-05-22', oraInizio: '11:00', oraFine: '13:00', tipo: 'montaggio', stato: 'confermato' },
  { id: '5', titolo: 'Problema', cliente: 'Cliente Rossi', indirizzo: 'Via Roma 12', tecnicoId: 't3', data: '2024-05-22', oraInizio: '13:00', oraFine: '14:30', tipo: 'problema', stato: 'in_corso', problemi: true },
  { id: '6', titolo: 'Sopralluogo', cliente: 'Cliente Galli', indirizzo: 'Via Milano 25', tecnicoId: 't1', data: '2024-05-23', oraInizio: '14:00', oraFine: '15:30', tipo: 'sopralluogo', stato: 'confermato' },
  { id: '7', titolo: 'Consegna', cliente: 'Fornitore', indirizzo: '', tecnicoId: 't2', data: '2024-05-23', oraInizio: '14:00', oraFine: '15:00', tipo: 'consegna', stato: 'da_confermare' },
  { id: '8', titolo: 'Montaggio', cliente: 'Cliente Blu', indirizzo: 'Via Como 3', tecnicoId: 't1', data: '2024-05-24', oraInizio: '16:00', oraFine: '17:00', tipo: 'montaggio', stato: 'confermato' },
];

// Settimana 20-26 maggio 2024 (mockup riferimento)
export const SETTIMANA_DEMO = [
  { iso: '2024-05-20', lbl: 'LUN', num: 20 },
  { iso: '2024-05-21', lbl: 'MAR', num: 21 },
  { iso: '2024-05-22', lbl: 'MER', num: 22 },
  { iso: '2024-05-23', lbl: 'GIO', num: 23 },
  { iso: '2024-05-24', lbl: 'VEN', num: 24 },
  { iso: '2024-05-25', lbl: 'SAB', num: 25 },
  { iso: '2024-05-26', lbl: 'DOM', num: 26 },
];
