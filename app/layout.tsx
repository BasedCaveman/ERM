import './globals.css';
import type { Metadata, Viewport } from 'next';
export const metadata: Metadata = { title: 'Trilhas Empreendedoras Mirins', description: 'PWA interativo para despertar mentalidade empreendedora com atividades dentro e fora da tela.', manifest: '/manifest.json' };
export const viewport: Viewport = { themeColor: '#2f7d4b', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="pt-BR"><body>{children}</body></html>; }
