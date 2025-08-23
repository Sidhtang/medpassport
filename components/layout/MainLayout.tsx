import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Icons (you can replace with an icon library like react-icons or heroicons)
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
  </svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);

const ReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const AudioVideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const BatchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
  </svg>
);

const DiagnosticsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
  </svg>
);

const FigmaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
  </svg>
);

interface MainLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  apiKey: string;
  userRole: string;
  setApiKey: (key: string) => void;
  setUserRole: (role: string) => void;
}

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: DashboardIcon },
  { name: 'Image Analysis', href: '/?tab=image', icon: ImageIcon },
  { name: 'Report Analysis', href: '/?tab=report', icon: ReportIcon },
  { name: 'Audio/Video Analysis', href: '/?tab=audio-video', icon: AudioVideoIcon },
  { name: 'Batch Processing', href: '/?tab=batch', icon: BatchIcon },
  { name: 'Network Diagnostics', href: '/?tab=diagnostics', icon: DiagnosticsIcon },
  { name: 'Figma Design', href: '/?tab=figma-design', icon: FigmaIcon },
];

const MainLayout = ({ 
  children, 
  pageTitle = "MedPassport - AI-Powered Medical Analysis",
  apiKey,
  userRole,
  setApiKey,
  setUserRole
}: MainLayoutProps) => {
  const router = useRouter();
  const currentTab = router.query.tab || 'image';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="AI-powered medical image, text, and audio/video analysis" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* Sidebar component */}
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-gradient-to-b from-primary-700 to-primary-900 rounded-r-xl shadow-xl">
              <div className="flex items-center flex-shrink-0 px-4 mb-5">
                <div className="flex items-center">
                  {/* Logo */}
                  <div className="w-10 h-10 bg-white rounded-lg shadow-primary-glow flex items-center justify-center">
                    <span className="text-primary-500 text-2xl font-extrabold font-display">M</span>
                  </div>
                  <span className="ml-3 text-xl font-medium text-white font-display tracking-wide">MedPassport</span>
                </div>
              </div>
              <div className="mt-5 flex-1 flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  {navigationItems.map((item) => {
                    const isActive = 
                      item.href === '/' && !router.query.tab && router.pathname === '/' || 
                      item.href.includes(currentTab as string);
                      
                    return (
                      <Link 
                        key={item.name} 
                        href={item.href}
                        className={`
                          group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                          ${isActive 
                            ? 'bg-primary-600 text-white shadow-primary-glow' 
                            : 'text-primary-100 hover:bg-primary-600/40 hover:text-white'
                          }
                        `}
                      >
                        <div className={`
                          mr-3 flex-shrink-0 h-6 w-6
                          ${isActive ? 'text-white' : 'text-primary-200 group-hover:text-white'}
                        `}>
                          <item.icon />
                        </div>
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              
              {/* User Profile Section */}
              <div className="px-3 py-4 mt-6">
                <div className="flex items-center px-3 py-3 text-sm font-medium text-primary-100 rounded-lg bg-primary-800/50">
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                    {userRole === 'Doctor' ? 'Dr' : 'P'}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium text-white truncate">{userRole}</div>
                    <div className="text-xs text-primary-300 truncate">Connected to API</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
          <div className="flex justify-around">
            {navigationItems.slice(0, 5).map((item, idx) => {
              const isActive = 
                item.href === '/' && !router.query.tab && router.pathname === '/' || 
                item.href.includes(currentTab as string);
              
              return (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={`
                    flex flex-col items-center py-2 px-2 text-xs
                    ${isActive 
                      ? 'text-primary-600' 
                      : 'text-gray-500'
                    }
                  `}
                >
                  <div className="w-6 h-6">
                    <item.icon />
                  </div>
                  <span className="mt-1">{item.name.split(' ')[0]}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          {/* Top navbar */}
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
            <div className="flex-1 px-4 flex justify-between items-center">
              <div className="flex-1 flex">
                <h1 className="text-2xl font-semibold text-gray-900 font-display">
                  {currentTab === 'image' && 'Image Analysis'}
                  {currentTab === 'report' && 'Medical Report Analysis'}
                  {currentTab === 'audio-video' && 'Audio/Video Analysis'}
                  {currentTab === 'batch' && 'Batch Processing'}
                  {currentTab === 'diagnostics' && 'Network Diagnostics'}
                  {!currentTab && 'Dashboard'}
                </h1>
              </div>
              
              {/* User settings dropdown would go here */}
              <div className="ml-4 flex items-center md:ml-6">
                {/* API key display/edit UI */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">API Key:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {apiKey ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}` : 'Not Set'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
