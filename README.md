# fliwoX Misure

App standalone per misuratori serramentisti.
Parte della suite fliwoX (insieme a fliwoX Cantiere, fliwoX Studio, fliwoX Magazzino, ...).

## Stack
- Next.js 14 + React 18 + TypeScript
- Supabase (DB condiviso con altre app fliwoX: `fgefcigxlbrmbeqqzjmo`)
- Vercel deploy
- Design system fliwoX light (centralizzato in `constants/design-system.ts`)

## Setup locale

```bash
npm install
cp .env.local.example .env.local
# editare .env.local con la chiave Supabase corretta
npm run dev
```

## Deploy
Push su `main` → Vercel autodeploy.

## Regole immutabili
- App esistenti (mastro-erp, mastro-desktop, mastro-montaggi) non vengono mai modificate
- DB Supabase condiviso, ma fliwoX Misure scrive solo nelle sue tabelle dedicate
- 3 shell device-specific (mobile / tablet / desktop) — mai responsive condiviso
- File max 300 righe, hooks separati, design system centralizzato
