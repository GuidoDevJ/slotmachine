import ReactQueryProvider from '@/utils/reactQueryProvider';
import type { Metadata } from 'next';
import { Inter, Moul } from 'next/font/google';
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

// Static metadata
export const metadata: Metadata = {
  title: 'Casino Mocana',
  description: "Page's games of Casino Mocana",
  icons: {
    icon: '/Logo.svg', // Make sure this path is correct
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ReactQueryProvider>
          <main className='overflow-hidden'>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
