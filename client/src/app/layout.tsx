import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import './globals.css'
import { ClientProvider } from "@/components/ClientProviders";
import { AppErrorBoundary } from "@/components/Erorr/AppErrorBoundary";
import { Toaster } from "sonner";
import { TranslationsProvider } from '@/components/providers/TranslationsProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto'
});

export const metadata: Metadata = {
  title: 'Auto Chain',
  description: 'Automated management system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} bg-[#1A1F27]`}>
        <AppErrorBoundary>
          <ClientProvider>
            <TranslationsProvider>
              <Header />
              <main className="p-8">
                {children}
              </main>
            </TranslationsProvider>
          </ClientProvider>
          <Toaster 
            theme="dark" 
            position="top-right"
            toastOptions={{
              style: {
                background: '#1A1F27',
                border: '1px solid #2A2F38',
                color: '#F0F0F0',
              }
            }}
          />
        </AppErrorBoundary>
      </body>
    </html>
  );
}
