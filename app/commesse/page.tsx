'use client';

import { useRouter } from 'next/navigation';
import type { CSSProperties } from 'react';
import { MC, MF, MR } from '@/constants/design-system';
import TopBar from '@/components/mobile/TopBar';
import BottomNav from '@/components/mobile/BottomNav';

export const dynamic = 'force-dynamic';

export default function CommessePage() {
  const router = useRouter();
  return (
    <main style={S.page}>
      <TopBar
        leftIcon="back"
        onLeftClick={() => router.back()}
        title={<span style={S.title}>Commesse</span>}
        rightIcon="search"
      />
      <div style={S.body}>
        <div style={S.placeholder}>
          <div style={S.label}>Lista commesse</div>
          <div style={S.sub}>In costruzione — prossimo step.</div>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}

const S = {
  page: { minHeight: '100vh', background: MC.bg, fontFamily: MF.ui, color: MC.text, paddingBottom: 96 } as CSSProperties,
  title: { color: MC.text, fontSize: 16, fontWeight: 700 } as CSSProperties,
  body: { padding: 20, maxWidth: 480, margin: '0 auto' } as CSSProperties,
  placeholder: {
    background: MC.card,
    border: `1px dashed ${MC.border}`,
    borderRadius: MR.lg,
    padding: 40,
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
  } as CSSProperties,
  label: { fontSize: 16, fontWeight: 700, color: MC.text } as CSSProperties,
  sub: { fontSize: 13, color: MC.muted } as CSSProperties,
};
