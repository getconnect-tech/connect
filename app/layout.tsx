import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import AppProvider from '../components/appProvider';
import SessionWrapper from './SessionWrapper';
import Favicon from '@/components/favIcon';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Connect',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <Favicon />
      </head>
      <body className={inter.className}>
        <SessionWrapper>
          <AppProvider>{children}</AppProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
