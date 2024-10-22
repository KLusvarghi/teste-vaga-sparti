import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Nav } from '@/app/components/Nav/Nav';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Teste vaga Sparti',
  description: 'Projeto voltado para testar meu conhecimento',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        // defino o layou do site
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex col`}
      >
        <Nav/>
        {children}
      </body>
    </html>
  );
}
