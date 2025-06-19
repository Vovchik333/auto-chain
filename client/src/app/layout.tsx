// 'use client';

import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import './globals.css'
import { ClientProvider } from "@/components/ClientProviders";
import { AppErrorBoundary } from "@/components/Erorr/AppErrorBoundary";
import { Toaster } from "sonner";
import { TranslationsProvider } from '@/components/providers/TranslationsProvider';
import { ThemeProvider } from '@/contexts/theme.context';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-roboto'
});

// export const metadata: Metadata = {
//   title: 'Auto Chain',
//   description: 'Automated blockchain management system',
//   icons: {
//     icon: '/favicon.ico',
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} bg-background theme-transition`}>
        <AppErrorBoundary>
          <ClientProvider>
            <TranslationsProvider>
              <ThemeProvider>
                <Header />
                <main className="p-8">
                  {children}
                </main>
              </ThemeProvider>
            </TranslationsProvider>
          </ClientProvider>
          <Toaster 
            theme="system"
            position="top-right"
            toastOptions={{
              className: "rounded-box-lg theme-transition",
              style: {
                background: 'var(--background)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              }
            }}
          />
        </AppErrorBoundary>
      </body>
    </html>
  );
}
