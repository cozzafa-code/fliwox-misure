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
  themeColor: '#0A0E1A',
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
          background: '#0A0E1A',
          color: '#F1F5F9',
          overflowX: 'hidden',
          maxWidth: '100vw',
          minHeight: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  );
}
