import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'fliwoX Misure',
  description: 'App per misuratori serramentisti',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B1F2A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          background: '#F8FAFC',
          color: '#0F172A',
          overflowX: 'hidden',
          maxWidth: '100vw',
        }}
      >
        {children}
      </body>
    </html>
  );
}
