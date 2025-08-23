import React from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Link from 'next/link';

// Icons
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

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const HistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface DashboardProps {
  apiKey: string;
  userRole: string;
}

const Dashboard: React.FC<DashboardProps> = ({ apiKey, userRole }) => {
  const recentActivity = [
    { type: 'Image Analysis', title: 'X-Ray Analysis', date: '2 hours ago' },
    { type: 'Report Analysis', title: 'Blood Work Report', date: '1 day ago' },
    { type: 'Audio Analysis', title: 'Heart Sounds Analysis', date: '3 days ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl shadow-lg">
        <div className="px-8 py-10 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to MedPassport<span className="text-primary-200">.</span>
            </h1>
            <p className="text-primary-100 text-lg mb-6">
              Your AI-powered medical analysis platform for images, reports, audio, and video.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="accent" 
                icon={<ImageIcon />} 
                onClick={() => window.location.href='/?tab=image'}
              >
                Analyze Medical Image
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/20 text-white border-white/40 hover:bg-white/30"
                icon={<ReportIcon />}
                onClick={() => window.location.href='/?tab=report'}
              >
                Analyze Medical Report
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8">
          <div className="w-64 h-64 bg-primary-400 opacity-20 rounded-full"></div>
        </div>
        <div className="absolute bottom-0 left-1/2 -mb-8">
          <div className="w-40 h-40 bg-accent-500 opacity-20 rounded-full"></div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card title="Image Analysis" icon={<ImageIcon />} accent="primary" hoverEffect={true} className="cursor-pointer" onClick={() => window.location.href='/?tab=image'}>
            <p className="text-gray-600 text-sm mb-4">Analyze X-rays, CT scans, MRIs, ultrasounds and other medical images.</p>
            <Button size="sm" variant="primary" fullWidth>
              Start Analysis
            </Button>
          </Card>
          
          <Card title="Report Analysis" icon={<ReportIcon />} accent="secondary" hoverEffect={true} className="cursor-pointer" onClick={() => window.location.href='/?tab=report'}>
            <p className="text-gray-600 text-sm mb-4">Process lab reports, pathology results, and clinical documentation.</p>
            <Button size="sm" variant="secondary" fullWidth>
              Analyze Reports
            </Button>
          </Card>
          
          <Card title="Audio/Video" icon={<AudioVideoIcon />} accent="accent" hoverEffect={true} className="cursor-pointer" onClick={() => window.location.href='/?tab=audio-video'}>
            <p className="text-gray-600 text-sm mb-4">Analyze heart sounds, lung sounds, medical videos and more.</p>
            <Button size="sm" variant="accent" fullWidth>
              Process Media
            </Button>
          </Card>
          
          <Card title="Batch Processing" icon={<BatchIcon />} accent="primary" hoverEffect={true} className="cursor-pointer" onClick={() => window.location.href='/?tab=batch'}>
            <p className="text-gray-600 text-sm mb-4">Upload and process multiple medical files in a single operation.</p>
            <Button size="sm" variant="outline" fullWidth>
              Batch Upload
            </Button>
          </Card>
        </div>
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card title="Recent Activity" icon={<HistoryIcon />} accent="secondary" className="lg:col-span-2">
          <div className="divide-y">
            {recentActivity.map((activity, index) => (
              <div key={index} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{activity.type}</p>
                  <p className="font-medium">{activity.title}</p>
                </div>
                <div className="text-xs text-gray-500">{activity.date}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button variant="ghost" size="sm" className="text-primary-600">
              View All Activity
            </Button>
          </div>
        </Card>

        {/* Analytics Preview */}
        <Card title="Usage Analytics" icon={<ChartIcon />} accent="accent">
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Image Analysis</span>
                <span className="text-sm text-gray-600">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Report Analysis</span>
                <span className="text-sm text-gray-600">42%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Audio/Video</span>
                <span className="text-sm text-gray-600">23%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-accent-500 h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Resources and Education */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Resources & Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="h-40 bg-gradient-to-r from-primary-500 to-primary-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-white opacity-80">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Learning Center</h3>
              <p className="text-gray-600 text-sm mb-4">Access comprehensive guides on medical imaging, reports, and AI-assisted diagnosis.</p>
              <Button variant="ghost" className="text-primary-600">
                Browse Resources
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="h-40 bg-gradient-to-r from-secondary-500 to-secondary-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-white opacity-80">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm mb-4">Watch detailed tutorials on how to get the most out of MedPassport's analysis tools.</p>
              <Button variant="ghost" className="text-secondary-600">
                Watch Videos
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="h-40 bg-gradient-to-r from-accent-500 to-accent-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-white opacity-80">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Community Forum</h3>
              <p className="text-gray-600 text-sm mb-4">Connect with other healthcare professionals and share insights about medical analysis.</p>
              <Button variant="ghost" className="text-accent-600">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
