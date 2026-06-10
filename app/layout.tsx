import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'ERM - Ecossistema de Aprendizagem',
  description:
    'PWA narrativo para criancas e jovens observarem o territorio, criarem prototipos e aprenderem com a comunidade.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#256f5a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
