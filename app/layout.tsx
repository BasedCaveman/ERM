import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Brota! - Trilha Nossa Terra',
  description:
    'Uma plataforma de aprendizagem para observar o lugar onde a gente vive, guardar pistas, criar e melhorar ideias.',
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
