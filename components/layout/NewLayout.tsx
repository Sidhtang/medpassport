import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { LogoIcon } from '../ui/Icons';

interface NewLayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

const NewLayout = ({ children, pageTitle = "MedPassport - AI-Powered Medical Analysis" }: NewLayoutProps) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="AI-powered medical image, text, and audio/video analysis for patients and healthcare professionals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="h-[72px] border-b border-neutral-200 bg-white px-4 md:px-10 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <LogoIcon />
          <div className="text-primary-600 text-xl font-bold">MedPassport</div>
        </div>
        <div className="flex flex-1 justify-end items-center gap-6 md:gap-8">
          <div className="h-10 hidden md:flex items-center gap-7">
            <Link href="/" className="text-text-dark text-sm font-medium hover:text-primary-600 transition-colors">Home</Link>
            <Link href="/features" className="text-text-muted text-sm font-medium hover:text-primary-600 transition-colors">Features</Link>
            <Link href="/pricing" className="text-text-muted text-sm font-medium hover:text-primary-600 transition-colors">Pricing</Link>
            <Link href="/support" className="text-text-muted text-sm font-medium hover:text-primary-600 transition-colors">Support</Link>
          </div>
          <div className="flex gap-3">
            <button className="h-10 px-5 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm hover:shadow">
              Get Started
            </button>
            <button className="h-10 px-5 bg-white border border-neutral-200 hover:bg-neutral-100 text-text-dark rounded-lg font-semibold text-sm transition-colors shadow-sm">
              Log In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full px-4 md:px-10 lg:px-20 py-8">
        <div className="max-w-[1200px] mx-auto">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-10 flex flex-col gap-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-text-dark">MedPassport</h3>
              <Link href="/about" className="text-sm text-text-muted hover:text-primary-600">About Us</Link>
              <Link href="/team" className="text-sm text-text-muted hover:text-primary-600">Our Team</Link>
              <Link href="/careers" className="text-sm text-text-muted hover:text-primary-600">Careers</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-text-dark">Resources</h3>
              <Link href="/blog" className="text-sm text-text-muted hover:text-primary-600">Blog</Link>
              <Link href="/guides" className="text-sm text-text-muted hover:text-primary-600">Guides</Link>
              <Link href="/faq" className="text-sm text-text-muted hover:text-primary-600">FAQ</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-text-dark">Legal</h3>
              <Link href="/privacy" className="text-sm text-text-muted hover:text-primary-600">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-text-muted hover:text-primary-600">Terms of Service</Link>
              <Link href="/security" className="text-sm text-text-muted hover:text-primary-600">Security</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-text-dark">Contact</h3>
              <Link href="/contact" className="text-sm text-text-muted hover:text-primary-600">Contact Us</Link>
              <Link href="/support" className="text-sm text-text-muted hover:text-primary-600">Support</Link>
              <Link href="/partnerships" className="text-sm text-text-muted hover:text-primary-600">Partnerships</Link>
            </div>
          </div>
          <div className="text-center pt-4 border-t border-neutral-200 text-sm text-text-muted">
            <p>For informational purposes only, not a substitute for professional medical advice, diagnosis, or treatment.</p>
            <p className="mt-2">© {new Date().getFullYear()} MedPassport. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewLayout;
