import type { Metadata } from 'next';
// import { Sprite } from '@/components/avatar';
import Navbar from '@/components/navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sellebr8',
  description: 'Portfolio of a software engineer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
