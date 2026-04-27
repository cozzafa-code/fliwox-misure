// ============================================================
// fliwoX Misure — Types domain
// ============================================================

export interface Commessa {
  id: string;
  azienda_id: string | null;
  code: string | null;
  cliente: string | null;
  cognome: string | null;
  indirizzo: string | null;
  telefono: string | null;
  email: string | null;
  fase: string | null;
  fase_start: string | null;
  ferma: boolean | null;
  motivo_ferma: string | null;
  totale_finale: number | null;
  assegnato_a: string | null;
  zona_clima: string | null;
  created_at: string;
  updated_at: string;
  // Solo per v_commesse_dashboard:
  vani_count?: number;
  vani_completi?: number;
  foto_count?: number;
  giorni_in_fase?: number;
}

export interface Evento {
  id: string;
  azienda_id: string | null;
  commessa_id: string | null;
  titolo: string;
  tipo: string | null;
  data: string;          // YYYY-MM-DD
  ora: string | null;    // HH:MM
  ora_fine: string | null;
  durata_min: number | null;
  persona: string | null;
  indirizzo: string | null;
  note: string | null;
  colore: string | null;
  reminder: string | null;
  completato: boolean;
  annullato: boolean;
}

export interface Task {
  id: string;
  azienda_id: string | null;
  commessa_id: string | null;
  testo: string;
  data: string | null;
  ora: string | null;
  priorita: 'bassa' | 'media' | 'alta' | string;
  persona: string | null;
  done: boolean;
}

export interface PipelineFase {
  codice: string;
  nome: string;
  icona: string | null;
  colore: string | null;
  ordine: number;
}

export interface Vano {
  id: string;
  commessa_id: string;
  nome: string | null;
  larghezza: number | null;
  altezza: number | null;
  // ... altri campi che vedremo dopo
}

// Helpers
export const FASE_LABEL: Record<string, string> = {
  sopralluogo: 'Sopralluogo',
  preventivo: 'Preventivo',
  conferma: 'Conferma',
  misure: 'Misure',
  ordini: 'Ordini',
  produzione: 'Produzione',
  posa: 'Posa',
  chiusura: 'Chiusura',
};
