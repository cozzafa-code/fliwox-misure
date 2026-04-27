// ============================================================
// fliwoX Misure — Data fetching
// ============================================================

import { supabase } from './supabase';
import type { Commessa, Evento, Task, PipelineFase, Vano } from './types';

// HARDCODED per ora (Walter Cozza Serramenti) — l'auth arriva dopo
export const AZIENDA_ID = 'ccca51c1-656b-4e7c-a501-55753e20da29';

// ============================================================
// Pipeline fasi
// ============================================================
export async function fetchPipelineFasi(): Promise<PipelineFase[]> {
  const { data, error } = await supabase
    .from('pipeline_fasi')
    .select('codice, nome, icona, colore, ordine')
    .eq('azienda_id', AZIENDA_ID)
    .eq('attiva', true)
    .order('ordine');
  if (error) throw error;
  return data ?? [];
}

// ============================================================
// Commesse (con dati aggregati da v_commesse_dashboard)
// ============================================================
export async function fetchCommesseDashboard(): Promise<Commessa[]> {
  const { data, error } = await supabase
    .from('v_commesse_dashboard')
    .select('*')
    .eq('azienda_id', AZIENDA_ID)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchCommessaById(id: string): Promise<Commessa | null> {
  const { data, error } = await supabase
    .from('v_commesse_dashboard')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// ============================================================
// Eventi calendario
// ============================================================
export async function fetchEventiRange(from: string, to: string): Promise<Evento[]> {
  const { data, error } = await supabase
    .from('eventi')
    .select('*')
    .eq('azienda_id', AZIENDA_ID)
    .eq('annullato', false)
    .gte('data', from)
    .lte('data', to)
    .order('data')
    .order('ora');
  if (error) throw error;
  return data ?? [];
}

export async function fetchEventiCommessa(commessaId: string): Promise<Evento[]> {
  const { data, error } = await supabase
    .from('eventi')
    .select('*')
    .eq('azienda_id', AZIENDA_ID)
    .eq('commessa_id', commessaId)
    .eq('annullato', false)
    .order('data', { ascending: false })
    .order('ora');
  if (error) throw error;
  return data ?? [];
}

// ============================================================
// Tasks
// ============================================================
export async function fetchTasksAperti(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('azienda_id', AZIENDA_ID)
    .eq('done', false)
    .order('data', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// ============================================================
// Home stats (6 tile)
// ============================================================
export interface HomeStats {
  commesseOggi: number;
  sopralluoghi: number;
  misureDaFare: number;
  montaggi: number;
  problemi: number;
  fotoDaCompletare: number;
}

export async function fetchHomeStats(): Promise<HomeStats> {
  const oggi = new Date();
  const isoOggi = `${oggi.getFullYear()}-${String(oggi.getMonth() + 1).padStart(2, '0')}-${String(oggi.getDate()).padStart(2, '0')}`;

  const [eventiOggi, commesse, vCommesse] = await Promise.all([
    supabase
      .from('eventi')
      .select('id', { count: 'exact', head: true })
      .eq('azienda_id', AZIENDA_ID)
      .eq('data', isoOggi)
      .eq('annullato', false)
      .eq('completato', false),
    supabase
      .from('commesse')
      .select('id, fase, ferma')
      .eq('azienda_id', AZIENDA_ID)
      .is('deleted_at', null),
    supabase
      .from('v_commesse_dashboard')
      .select('id, vani_count, foto_count')
      .eq('azienda_id', AZIENDA_ID),
  ]);

  const cmm = commesse.data ?? [];
  const vcmm = vCommesse.data ?? [];

  const sopralluoghi = cmm.filter((c) => c.fase === 'sopralluogo' && !c.ferma).length;
  const misureDaFare = cmm.filter((c) => (c.fase === 'misure' || c.fase === 'sopralluogo') && !c.ferma).length;
  const montaggi = cmm.filter((c) => c.fase === 'posa' && !c.ferma).length;
  const problemi = cmm.filter((c) => c.ferma === true).length;
  const fotoDaCompletare = vcmm.filter(
    (v) => (v.vani_count ?? 0) > 0 && (v.foto_count ?? 0) < (v.vani_count ?? 0) * 2,
  ).length;

  return {
    commesseOggi: eventiOggi.count ?? 0,
    sopralluoghi,
    misureDaFare,
    montaggi,
    problemi,
    fotoDaCompletare,
  };
}

export async function fetchProssimoEvento(): Promise<Evento | null> {
  const oggi = new Date();
  const iso = `${oggi.getFullYear()}-${String(oggi.getMonth() + 1).padStart(2, '0')}-${String(oggi.getDate()).padStart(2, '0')}`;
  const { data, error } = await supabase
    .from('eventi')
    .select('*')
    .eq('azienda_id', AZIENDA_ID)
    .eq('annullato', false)
    .eq('completato', false)
    .gte('data', iso)
    .order('data')
    .order('ora')
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// ============================================================
// Vani
// ============================================================
export async function fetchVaniByCommessa(commessaId: string): Promise<Vano[]> {
  const { data, error } = await supabase
    .from('vani')
    .select('*')
    .eq('commessa_id', commessaId)
    .order('created_at');
  if (error) throw error;
  return data ?? [];
}

export async function fetchVanoById(vanoId: string): Promise<Vano | null> {
  const { data, error } = await supabase
    .from('vani')
    .select('*')
    .eq('id', vanoId)
    .maybeSingle();
  if (error) throw error;
  return data;
}
