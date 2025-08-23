import React, { ReactNode, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { LogoIcon } from '../ui/Icons';
import { MedicalCrossIcon, HeartRateIcon, HealthShieldIcon } from '../ui/HealthIcons';

interface NewLayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

const NewLayout = ({ children, pageTitle = "MedPassport - AI-Powered Medical Analysis" }: NewLayoutProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add animation after component mounts
    setAnimateHeader(true);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-mint-50 text-center">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="AI-powered medical image, text, and audio/video analysis for patients and healthcare professionals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header 
        className={`${
          scrolled 
            ? 'h-16 shadow-md bg-white/95 backdrop-blur-sm' 
            : 'h-[72px] bg-white'
        } border-b border-neutral-200 px-4 md:px-10 py-3 sticky top-0 z-50 transition-all duration-300 ${
          animateHeader ? 'animate-fade-in' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3 mb-2 md:mb-0">
            <div className="animate-pulse-gentle">
              <MedicalCrossIcon className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-primary-700 text-xl font-bold">MedPassport</div>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 w-full md:w-auto">
            <div className="h-10 flex items-center gap-5 md:gap-7 mb-2 md:mb-0">
              <Link href="/" className="text-text-dark text-sm font-medium hover:text-primary-600 transition-colors hover:scale-105">
                Home
              </Link>
              <Link href="/features" className="text-text-muted text-sm font-medium hover:text-primary-600 transition-colors hover:scale-105">
                Features
              </Link>
              <Link href="/pricing" className="text-text-muted text-sm font-medium hover:text-primary-600 transition-colors hover:scale-105">
                Pricing
              </Link>
              <Link href="/support" className="text-text-muted text-sm font-medium hover:text-primary-600 transition-colors hover:scale-105">
                Support
              </Link>
            </div>
            <div className="flex gap-3">
              <button className="h-10 px-5 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white rounded-lg font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-primary-glow transform hover:-translate-y-0.5">
                Get Started
              </button>
              <button className="h-10 px-5 bg-white border border-neutral-200 hover:bg-neutral-100 text-text-dark rounded-lg font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5">
                Log In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full px-4 md:px-10 lg:px-20 py-8 animate-fade-in">
        <div className="max-w-[1200px] mx-auto text-center">
          {children}
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto transform translate-y-1">
          <path 
            fill="#EFF6FF" 
            fillOpacity="1" 
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,69.3C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
        </svg>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-b from-primary-50 to-primary-100 border-t border-neutral-200 animate-fade-in">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-10 flex flex-col gap-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-3 transform transition-transform duration-300 hover:scale-105">
              <div className="mb-2">
                <MedicalCrossIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-text-dark">MedPassport</h3>
              <Link href="/about" className="text-sm text-text-muted hover:text-primary-600 transition-all">About Us</Link>
              <Link href="/team" className="text-sm text-text-muted hover:text-primary-600 transition-all">Our Team</Link>
              <Link href="/careers" className="text-sm text-text-muted hover:text-primary-600 transition-all">Careers</Link>
            </div>
            <div className="flex flex-col items-center gap-3 transform transition-transform duration-300 hover:scale-105">
              <div className="mb-2">
                <HeartRateIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-text-dark">Resources</h3>
              <Link href="/blog" className="text-sm text-text-muted hover:text-primary-600 transition-all">Blog</Link>
              <Link href="/guides" className="text-sm text-text-muted hover:text-primary-600 transition-all">Guides</Link>
              <Link href="/faq" className="text-sm text-text-muted hover:text-primary-600 transition-all">FAQ</Link>
            </div>
            <div className="flex flex-col items-center gap-3 transform transition-transform duration-300 hover:scale-105">
              <div className="mb-2">
                <HealthShieldIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-text-dark">Legal</h3>
              <Link href="/privacy" className="text-sm text-text-muted hover:text-primary-600 transition-all">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-text-muted hover:text-primary-600 transition-all">Terms of Service</Link>
              <Link href="/security" className="text-sm text-text-muted hover:text-primary-600 transition-all">Security</Link>
            </div>
            <div className="flex flex-col items-center gap-3 transform transition-transform duration-300 hover:scale-105">
              <div className="mb-2">
                <LogoIcon />
              </div>
              <h3 className="font-semibold text-text-dark">Contact</h3>
              <Link href="/contact" className="text-sm text-text-muted hover:text-primary-600 transition-all">Contact Us</Link>
              <Link href="/support" className="text-sm text-text-muted hover:text-primary-600 transition-all">Support</Link>
              <Link href="/partnerships" className="text-sm text-text-muted hover:text-primary-600 transition-all">Partnerships</Link>
            </div>
          </div>
          <div className="text-center pt-6 border-t border-neutral-200 text-sm text-text-muted">
            <p className="bg-white/50 p-3 rounded-lg inline-block shadow-sm">For informational purposes only, not a substitute for professional medical advice, diagnosis, or treatment.</p>
            <p className="mt-4">© {new Date().getFullYear()} MedPassport. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewLayout;
