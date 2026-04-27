// ============================================================
// fliwoX Misure — Area Commesse types + mock
// Specifica completa: 9 sezioni
// ============================================================

import { MC } from '@/constants/design-system';

export type StatoCom = 'in_corso' | 'in_attesa' | 'in_sospeso' | 'chiusa';
export type VistaCom = 'lista' | 'kanban' | 'gantt';
export type TipoIntervento = 'serramenti' | 'ristrutturazione' | 'persiane' | 'zanzariere' | 'box_doccia' | 'altro';

export const STATO_COM_LABEL: Record<StatoCom, string> = {
  in_corso: 'In corso',
  in_attesa: 'In attesa',
  in_sospeso: 'In sospeso',
  chiusa: 'Chiusa',
};

export const STATO_COM_BG: Record<StatoCom, string> = {
  in_corso: '#F28C1A',
  in_attesa: '#F1C40F',
  in_sospeso: '#9B59B6', // viola come nel mockup
  chiusa: '#6CC0A4',
};

export const STATO_COM_FG: Record<StatoCom, string> = {
  in_corso: '#FFFFFF',
  in_attesa: '#1E2128',
  in_sospeso: '#FFFFFF',
  chiusa: '#1E2128',
};

// Counts hardcoded come da mockup (in attesa del DB reale)
export const COUNTS_HARDCODED = {
  all: 78,
  in_corso: 32,
  in_attesa: 16,
  in_sospeso: 7,
  chiusa: 21,
} as const;

export const TIPO_INT_LABEL: Record<TipoIntervento, string> = {
  serramenti: 'Serramenti',
  ristrutturazione: 'Ristrutturazione',
  persiane: 'Persiane',
  zanzariere: 'Zanzariere',
  box_doccia: 'Box doccia',
  altro: 'Altro',
};

export interface ComRow {
  id: string;
  numero: string;
  cliente: string;
  riferimento?: string;
  indirizzo: string;
  telefono?: string;
  email?: string;
  note?: string;
  tipo: TipoIntervento;
  stato: StatoCom;
  dataSopralluogo: string; // DD/MM/YYYY
  dataConsegna?: string;
  tecnico: string;
  importo: number;
  acconto?: number;
  saldo?: number;
  // Riepilogo attività
  vaniDone?: number;
  vaniTot?: number;
  misureDone?: number;
  misureTot?: number;
  fotoDone?: number;
  fotoTot?: number;
  checkDone?: number;
  checkTot?: number;
  montaggiDone?: number;
  montaggiTot?: number;
  problemi?: number;
}

export const COMMESSE_MOCK: ComRow[] = [
  {
    id: '058', numero: '2024-058', cliente: 'Cliente Rossi', riferimento: 'Mario Rossi',
    indirizzo: 'Via Roma 12, Milano', telefono: '333-1234567', email: 'mrossi@email.it',
    note: 'Preferisce contatti via WhatsApp',
    tipo: 'serramenti', stato: 'in_corso',
    dataSopralluogo: '21/05/2024', dataConsegna: '30/06/2024',
    tecnico: 'Francesco', importo: 12450, acconto: 3000, saldo: 9450,
    vaniDone: 6, vaniTot: 8, misureDone: 5, misureTot: 8,
    fotoDone: 4, fotoTot: 8, checkDone: 3, checkTot: 8,
    montaggiDone: 0, montaggiTot: 1, problemi: 1,
  },
  { id: '057', numero: '2024-057', cliente: 'Cliente Bianchi', indirizzo: 'Via Verdi 15, Milano', tipo: 'serramenti', stato: 'in_attesa', dataSopralluogo: '20/05/2024', tecnico: 'Antonio', importo: 8750 },
  { id: '056', numero: '2024-056', cliente: 'Cliente Verdi', indirizzo: 'Via Napoli 8, Milano', tipo: 'serramenti', stato: 'in_corso', dataSopralluogo: '18/05/2024', tecnico: 'Francesco', importo: 15300 },
  { id: '055', numero: '2024-055', cliente: 'Cliente Galli', indirizzo: 'Via Torino 25, Milano', tipo: 'ristrutturazione', stato: 'in_sospeso', dataSopralluogo: '17/05/2024', tecnico: 'Team 3', importo: 22100 },
  { id: '054', numero: '2024-054', cliente: 'Cliente Neri', indirizzo: 'Via Como 3, Milano', tipo: 'serramenti', stato: 'in_corso', dataSopralluogo: '16/05/2024', tecnico: 'Antonio', importo: 9800 },
  { id: '053', numero: '2024-053', cliente: 'Cliente Blu', indirizzo: 'Via Milano 5, Monza', tipo: 'serramenti', stato: 'chiusa', dataSopralluogo: '15/05/2024', tecnico: 'Francesco', importo: 7650 },
  { id: '052', numero: '2024-052', cliente: 'Cliente Galli', indirizzo: 'Via Milano 25, Sesto S.', tipo: 'ristrutturazione', stato: 'in_attesa', dataSopralluogo: '13/05/2024', tecnico: 'Team 3', importo: 18900 },
  { id: '051', numero: '2024-051', cliente: 'Cliente Marroni', indirizzo: 'Via Lecco 7, Milano', tipo: 'serramenti', stato: 'in_corso', dataSopralluogo: '12/05/2024', tecnico: 'Antonio', importo: 11200 },
];

export const TECNICI_LIST = ['Francesco', 'Antonio', 'Team 3'];

export interface DocCommessa { nome: string; tipo: 'pdf' | 'img'; data: string; size?: string }
export const DOCUMENTI_MOCK: DocCommessa[] = [
  { nome: 'Preventivo_2024-058.pdf', tipo: 'pdf', data: '21/05/2024' },
  { nome: 'Contratto_ClienteRossi.pdf', tipo: 'pdf', data: '22/05/2024' },
  { nome: 'Sopralluogo_Firmato.pdf', tipo: 'pdf', data: '23/05/2024' },
  { nome: 'Disegni_Vani.pdf', tipo: 'pdf', data: '23/05/2024' },
  { nome: 'Fattura_Acconto.pdf', tipo: 'pdf', data: '25/05/2024' },
];

export interface Nota { id: string; autore: string; ruolo: string; data: string; testo: string }
export const NOTE_MOCK: Nota[] = [
  { id: '1', autore: 'Francesco', ruolo: 'Tecnico', data: '21/05/2024 10:30', testo: 'Cliente molto preciso sulle finiture.' },
  { id: '2', autore: 'Antonio', ruolo: 'Tecnico', data: '22/05/2024 09:15', testo: 'Richiesto sopralluogo aggiuntivo per misure scorrevole.' },
  { id: '3', autore: 'Francesco', ruolo: 'Tecnico', data: '23/05/2024 14:20', testo: 'Inviato preventivo aggiornato.' },
];

export interface AttivitaCorrelata { id: string; titolo: string; data?: string; stato: 'completato' | 'da_fare' | 'in_corso' }
export const ATTIVITA_CORR_MOCK: AttivitaCorrelata[] = [
  { id: '1', titolo: 'Sopralluogo iniziale', data: '21/05/2024', stato: 'completato' },
  { id: '2', titolo: 'Invio preventivo', data: '22/05/2024', stato: 'completato' },
  { id: '3', titolo: 'Conferma cliente', data: '25/05/2024', stato: 'in_corso' },
  { id: '4', titolo: 'Produzione', stato: 'da_fare' },
  { id: '5', titolo: 'Montaggio', stato: 'da_fare' },
  { id: '6', titolo: 'Consegna', stato: 'da_fare' },
];

export function fmtEuro(v: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(v);
}
