import type { Metadata } from 'next';
import { Roboto_Mono, Inter } from 'next/font/google';
import './globals.css';

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' });

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
      <body className={`${inter.variable} ${robotoMono.variable}`}>{children}</body>
    </html>
  );
}
