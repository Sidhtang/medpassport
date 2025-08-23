import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';

// Initialize the Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Medivisa - AI-Powered Medical Analysis</title>
        <meta name="description" content="AI-powered medical report and image analysis tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
