import ReactQueryProvider from '@/utils/reactQueryProvider';
import type { Metadata } from 'next';
import { Inter, Moul } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '400'],
  variable: '--inter-font',
});
const moul = Moul({
  variable: '--moul-font',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Casino Mocana',
    template: '%s | Casino Mocana',
  },
  description: 'Gira los carretes y gana premios increibles en Casino Mocana. Tu tragamonedas online favorito.',
  icons: {
    icon: '/Logo.svg',
  },
  keywords: ['casino', 'tragamonedas', 'slot machine', 'premios', 'juego'],
  openGraph: {
    title: 'Casino Mocana',
    description: 'Gira los carretes y gana premios increibles',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${moul.variable}`}>
        <ReactQueryProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1a1a2e',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <main className="overflow-hidden">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
