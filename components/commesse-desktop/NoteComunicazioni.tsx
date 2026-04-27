'use client';

import { useState, type CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import { NOTE_MOCK } from '@/lib/commesse';

export default function NoteComunicazioni() {
  const [val, setVal] = useState('');

  return (
    <section style={S.section}>
      <header style={S.header}>
        <h3 style={S.title}>Note e comunicazioni</h3>
      </header>
      <div style={S.inputRow}>
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Aggiungi nota…"
          style={S.input}
        />
        <button onClick={() => setVal('')} style={S.btn}>Invia</button>
      </div>
      <div style={S.list}>
        {NOTE_MOCK.map((n) => (
          <div key={n.id} style={S.note}>
            <div style={S.row1}>
              <span style={S.avatar}>{n.autore[0]}</span>
              <span style={S.autore}>{n.autore}</span>
              <span style={S.ruolo}>({n.ruolo})</span>
              <span style={S.data}>{n.data}</span>
            </div>
            <div style={S.testo}>{n.testo}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const S = {
  section: { background: MC.bgSoft, borderRadius: MR.lg, padding: 14, border: `1px solid ${MC.borderSoft}` } as CSSProperties,
  header: { marginBottom: 10 } as CSSProperties,
  title: { fontSize: 11, fontWeight: 800, color: MC.text, margin: 0, textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  inputRow: { display: 'flex', gap: 8, marginBottom: 12 } as CSSProperties,
  input: { flex: 1, background: MC.cardSoft, color: MC.text, border: `1px solid ${MC.border}`, borderRadius: MR.sm, padding: '8px 10px', fontSize: 12, fontFamily: 'inherit', outline: 'none' } as CSSProperties,
  btn: { background: MC.teal, color: '#fff', border: 'none', borderRadius: MR.sm, padding: '0 14px', fontSize: 11, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'uppercase' as const, letterSpacing: 0.5 } as CSSProperties,
  list: { display: 'flex', flexDirection: 'column' as const, gap: 8 } as CSSProperties,
  note: { background: MC.cardSoft, borderRadius: MR.sm, padding: 8 } as CSSProperties,
  row1: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 } as CSSProperties,
  avatar: { width: 20, height: 20, borderRadius: '50%', background: MC.teal, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 } as CSSProperties,
  autore: { fontSize: 11, fontWeight: 700, color: MC.text } as CSSProperties,
  ruolo: { fontSize: 10, color: MC.muted } as CSSProperties,
  data: { fontSize: 10, color: MC.muted, fontFamily: MF.mono, marginLeft: 'auto' } as CSSProperties,
  testo: { fontSize: 12, color: MC.text } as CSSProperties,
};
