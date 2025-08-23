import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { LogoIcon } from '../ui/Icons';

interface NewLayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

const NewLayout = ({ children, pageTitle = "Medivisa - AI-Powered Medical Analysis" }: NewLayoutProps) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="AI-powered medical image, text, and audio/video analysis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="h-[65px] border-b border-neutral-200 bg-white px-10 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <LogoIcon />
          <div className="text-text-dark text-lg font-bold">Medivisa</div>
        </div>
        <div className="flex flex-1 justify-end items-start gap-8">
          <div className="h-10 flex items-center gap-9">
            <Link href="/" className="text-text-dark text-sm font-medium">Home</Link>
            <Link href="/features" className="text-text-dark text-sm font-medium">Features</Link>
            <Link href="/pricing" className="text-text-dark text-sm font-medium">Pricing</Link>
            <Link href="/support" className="text-text-dark text-sm font-medium">Support</Link>
          </div>
          <div className="flex gap-2">
            <button className="h-10 px-4 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white rounded-lg font-bold text-sm transition-colors">
              Get Started
            </button>
            <button className="h-10 w-[84px] px-4 bg-neutral-100 hover:bg-neutral-200 text-text-dark rounded-lg font-bold text-sm transition-colors">
              Log In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full px-6 md:px-10 lg:px-40 py-5">
        <div className="max-w-[960px] mx-auto">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full">
        <div className="max-w-[960px] mx-auto px-5 py-10 flex flex-col gap-6">
          <div className="flex justify-between items-center flex-wrap">
            <div className="w-40 min-w-40 text-center text-text-muted">Privacy</div>
            <div className="w-40 min-w-40 text-center text-text-muted">Contact</div>
            <div className="w-40 min-w-40 text-center text-text-muted">About</div>
          </div>
          <div className="text-center text-text-muted">
            For informational purposes only, not a substitute for medical advice
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewLayout;
