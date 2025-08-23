import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import NewLayout from '@/components/layout/NewLayout';
import Link from 'next/link';
import Image from 'next/image';

import { 
  ImageIcon, 
  ReportIcon, 
  BatchIcon, 
  AudioVideoIcon, 
  UploadIcon, 
  DownloadIcon, 
  ShareIcon, 
  ExportIcon,
  PatientIcon,
  DoctorIcon,
  ApiKeyIcon,
  LanguageIcon
} from '@/components/ui/Icons';

import { 
  MedicalCrossIcon, 
  HeartRateIcon, 
  DnaIcon, 
  MicroscopeIcon,
  PulseIcon,
  HospitalIcon,
  StethoscopeIcon,
  XRayIcon,
  ClipboardMedicalIcon,
  HealthShieldIcon,
  ActivityGraphIcon
} from '@/components/ui/HealthIcons';

// Import existing components
import ImageAnalysisTab from '@/components/ImageAnalysisTab';
import ReportAnalysisTab from '@/components/ReportAnalysisTab';
import AudioVideoAnalysisTab from '@/components/AudioVideoAnalysisTab';
import BatchProcessingTab from '@/components/BatchProcessingTab';
import NetworkDiagnosticsTab from '@/components/NetworkDiagnosticsTab';

export default function Home() {
  // State from original app
  const [activeTab, setActiveTab] = useState('imageAnalysis');
  const [userRole, setUserRole] = useState('Patient');
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
  const [debugMode, setDebugMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // Handle tab changes from URL parameter
  useEffect(() => {
    if (router.isReady) {
      const { tab } = router.query;
      if (tab) {
        switch (tab) {
          case 'image':
            setActiveTab('imageAnalysis');
            break;
          case 'report':
            setActiveTab('reportAnalysis');
            break;
          case 'audio-video':
            setActiveTab('audioVideoAnalysis');
            break;
          case 'batch':
            setActiveTab('batchProcessing');
            break;
          case 'diagnostics':
            setActiveTab('networkDiagnostics');
            break;
        }
      }
    }
  }, [router.isReady, router.query]);

  // Function to render active component
  const renderActiveComponent = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800); // Simulate loading for better UX

    switch (activeTab) {
      case 'imageAnalysis':
        return <ImageAnalysisTab apiKey={apiKey} userRole={userRole} />;
      case 'reportAnalysis':
        return <ReportAnalysisTab apiKey={apiKey} userRole={userRole} />;
      case 'audioVideoAnalysis':
        return <AudioVideoAnalysisTab apiKey={apiKey} userRole={userRole} />;
      case 'batchProcessing':
        return <BatchProcessingTab apiKey={apiKey} userRole={userRole} />;
      case 'networkDiagnostics':
        return <NetworkDiagnosticsTab />;
      default:
        return <ImageAnalysisTab apiKey={apiKey} userRole={userRole} />;
    }
  };

  return (
    <NewLayout>
      {/* Hero Section */}
      <div className="py-12 md:py-20 animate-slide-up">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-2 bg-primary-100 rounded-full mb-4">
            <MedicalCrossIcon className="h-8 w-8 text-primary-600 animate-pulse-gentle" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-6">
            Medical Document Analysis Made <span className="text-primary-600">Simple</span>
          </h1>
          <p className="text-lg md:text-xl text-text-dark max-w-3xl mx-auto mb-10">
            Upload medical images, reports, and audio/video for AI-powered analysis. Get instant insights in simple language.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-primary-glow transform hover:-translate-y-0.5"
              onClick={() => setActiveTab('imageAnalysis')}
            >
              Start Analyzing
            </button>
            <button 
              className="px-6 py-3 bg-white border border-neutral-200 hover:bg-neutral-50 text-text-dark rounded-xl font-semibold transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-0.5"
            >
              See How It Works
            </button>
          </div>
        </div>
      </div>

      {/* Features Section with Healthcare Icons */}
      <div className="py-16 md:py-20 bg-gradient-to-b from-white to-primary-50 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 text-center mb-12">
            Complete Medical Document Analysis
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-card transition-all duration-300 hover:shadow-card-hover transform hover:-translate-y-1">
              <div className="bg-healing-50 p-3 rounded-xl inline-flex mb-4">
                <XRayIcon className="h-8 w-8 text-healing-600" />
              </div>
              <h3 className="text-xl font-semibold text-text-dark mb-3">Medical Image Analysis</h3>
              <p className="text-text-muted">
                Advanced AI for X-rays, MRIs, CT scans, and other medical imaging with detailed explanation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-card transition-all duration-300 hover:shadow-card-hover transform hover:-translate-y-1">
              <div className="bg-primary-50 p-3 rounded-xl inline-flex mb-4">
                <ClipboardMedicalIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-text-dark mb-3">Report Analysis</h3>
              <p className="text-text-muted">
                Extract and explain key information from lab reports, diagnoses, and discharge summaries.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-card transition-all duration-300 hover:shadow-card-hover transform hover:-translate-y-1">
              <div className="bg-mint-50 p-3 rounded-xl inline-flex mb-4">
                <HeartRateIcon className="h-8 w-8 text-mint-600" />
              </div>
              <h3 className="text-xl font-semibold text-text-dark mb-3">Audio & Video Analysis</h3>
              <p className="text-text-muted">
                Analyze heart sounds, breathing patterns, and medical consultations through audio and video.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <button className="group flex items-center gap-2 px-6 py-3 bg-white border border-primary-200 hover:border-primary-300 rounded-xl text-primary-700 font-medium transition-all duration-300 shadow hover:shadow-md">
              <span>Learn More About Features</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Medical Analysis Tabs */}
      <div className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'imageAnalysis'
                  ? 'bg-primary-500 text-white shadow-primary-glow'
                  : 'bg-white text-text-muted hover:bg-primary-50'
              }`}
              onClick={() => setActiveTab('imageAnalysis')}
            >
              <div className="flex items-center gap-2">
                <ImageIcon />
                <span>Image Analysis</span>
              </div>
            </button>
            
            <button
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'reportAnalysis'
                  ? 'bg-healing-500 text-white shadow-healing-glow'
                  : 'bg-white text-text-muted hover:bg-healing-50'
              }`}
              onClick={() => setActiveTab('reportAnalysis')}
            >
              <div className="flex items-center gap-2">
                <ReportIcon />
                <span>Report Analysis</span>
              </div>
            </button>
            
            <button
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'audioVideoAnalysis'
                  ? 'bg-mint-500 text-white shadow-md'
                  : 'bg-white text-text-muted hover:bg-mint-50'
              }`}
              onClick={() => setActiveTab('audioVideoAnalysis')}
            >
              <div className="flex items-center gap-2">
                <AudioVideoIcon />
                <span>Audio/Video Analysis</span>
              </div>
            </button>
            
            <button
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'batchProcessing'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-text-muted hover:bg-primary-50'
              }`}
              onClick={() => setActiveTab('batchProcessing')}
            >
              <div className="flex items-center gap-2">
                <BatchIcon />
                <span>Batch Processing</span>
              </div>
            </button>
            
            <button
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'networkDiagnostics'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-text-muted hover:bg-primary-50'
              }`}
              onClick={() => setActiveTab('networkDiagnostics')}
            >
              <div className="flex items-center gap-2">
                <DnaIcon className="h-5 w-5" />
                <span>Network Diagnostics</span>
              </div>
            </button>
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-card animate-fade-in">
            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center">
                <div className="mb-4">
                  <div className="animate-spin h-12 w-12 text-primary-500">
                    <MedicalCrossIcon className="h-full w-full" />
                  </div>
                </div>
                <p className="text-text-muted">Loading analysis tools...</p>
              </div>
            ) : (
              renderActiveComponent()
            )}
          </div>
        </div>
      </div>

      {/* Role Selection with Enhanced UI */}
      <div className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-2">Choose Your Role</h2>
          <p className="text-text-muted text-center mb-10 max-w-xl mx-auto">Personalized experience based on whether you're a patient or healthcare professional</p>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <div 
              className={`relative group flex-1 p-8 border-2 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden ${
                userRole === 'Patient' 
                  ? 'border-primary-500 bg-primary-50 shadow-md' 
                  : 'border-neutral-200 hover:border-primary-300 hover:shadow bg-white'
              }`}
              onClick={() => setUserRole('Patient')}
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 bg-primary-100 rounded-full opacity-30 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                <div className={`p-4 rounded-full ${userRole === 'Patient' ? 'bg-primary-100' : 'bg-neutral-100'}`}>
                  <PatientIcon />
                </div>
                <h3 className="text-xl font-semibold text-text-dark">Patient</h3>
                <p className="text-text-muted">
                  I want to understand my medical reports and get simplified explanations of my health data.
                </p>
                <div className="mt-4 h-1 w-20 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div 
              className={`relative group flex-1 p-8 border-2 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden ${
                userRole === 'Healthcare Professional' 
                  ? 'border-healing-500 bg-healing-50 shadow-md' 
                  : 'border-neutral-200 hover:border-healing-300 hover:shadow bg-white'
              }`}
              onClick={() => setUserRole('Healthcare Professional')}
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 bg-healing-100 rounded-full opacity-30 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                <div className={`p-4 rounded-full ${userRole === 'Healthcare Professional' ? 'bg-healing-100' : 'bg-neutral-100'}`}>
                  <DoctorIcon />
                </div>
                <h3 className="text-xl font-semibold text-text-dark">Healthcare Professional</h3>
                <p className="text-text-muted">
                  I need detailed analysis with medical terminology and comprehensive insights.
                </p>
                <div className="mt-4 h-1 w-20 bg-healing-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Upload Section with Drag and Drop */}
      <div className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-card">
            <div className="px-8 py-5 bg-gradient-to-r from-primary-50 to-primary-100 border-b border-neutral-200">
              <h2 className="text-2xl font-semibold text-primary-800">Upload Medical Documents</h2>
            </div>
            
            <div className="p-8">
              <div className="border-2 border-dashed border-neutral-200 rounded-xl p-10 flex flex-col items-center justify-center gap-4 group hover:border-primary-300 transition-colors duration-300">
                <div className="p-5 bg-primary-50 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <UploadIcon />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-text-dark">Drop your files here</h3>
                  <p className="text-text-muted mt-2">Drag and drop or click to browse</p>
                  <p className="text-xs text-text-light mt-1">Supports JPEG, PNG, PDF, DICOM, MP3, MP4</p>
                </div>
                <button className="mt-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-primary-glow transform hover:-translate-y-0.5">
                  Browse Files
                </button>
              </div>

              <div className="mt-10 grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <LanguageIcon />
                    <h3 className="font-medium text-text-dark">Analysis Options</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="translate" className="rounded text-primary-500 focus:ring-primary-500" />
                      <label htmlFor="translate" className="text-text-dark">Translate to simple language</label>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="highlight" className="rounded text-primary-500 focus:ring-primary-500" />
                      <label htmlFor="highlight" className="text-text-dark">Highlight critical findings</label>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="compare" className="rounded text-primary-500 focus:ring-primary-500" />
                      <label htmlFor="compare" className="text-text-dark">Compare with previous results</label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ApiKeyIcon />
                    <h3 className="font-medium text-text-dark">Advanced Settings</h3>
                  </div>
                  
                  <div className="relative">
                    <select className="w-full p-3 bg-white border border-neutral-200 rounded-lg appearance-none pr-10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all">
                      <option>Default Analysis Mode</option>
                      <option>Detailed Technical Analysis</option>
                      <option>Patient-Friendly Summary</option>
                      <option>Emergency Triage</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button className="w-full px-4 py-3 bg-healing-500 hover:bg-healing-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-healing-glow flex items-center justify-center gap-2">
                      <ClipboardMedicalIcon className="h-5 w-5" />
                      <span>Analyze Documents</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="py-16 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-800 mb-3">Trusted by Healthcare Professionals</h2>
          <p className="text-text-muted max-w-2xl mx-auto mb-12">Our platform maintains the highest standards of medical data security and accuracy</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-card border border-neutral-100">
              <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-full mb-4">
                <HealthShieldIcon className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">HIPAA Compliant</h3>
              <p className="text-text-muted">Fully compliant with healthcare privacy standards and regulations.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-card border border-neutral-100">
              <div className="inline-flex items-center justify-center p-3 bg-healing-50 rounded-full mb-4">
                <StethoscopeIcon className="h-8 w-8 text-healing-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Clinically Validated</h3>
              <p className="text-text-muted">Analysis tools validated through extensive clinical testing and research.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-card border border-neutral-100">
              <div className="inline-flex items-center justify-center p-3 bg-mint-50 rounded-full mb-4">
                <ActivityGraphIcon className="h-8 w-8 text-mint-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Continuous Learning</h3>
              <p className="text-text-muted">Our AI systems constantly improve through feedback from medical professionals.</p>
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
}
