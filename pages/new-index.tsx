import React, { useState } from 'react';
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

export default function NewHome() {
  const [userRole, setUserRole] = useState<string>('Patient');
  const [apiKey, setApiKey] = useState<string>('');

  return (
    <NewLayout pageTitle="MedPassport - AI-Powered Medical Analysis">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 px-4 py-12">
        <div className="flex-1 flex flex-col justify-center items-start gap-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-100 rounded-full">
            <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
            <span className="text-primary-700 text-sm font-medium">AI-Powered Healthcare</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-tight text-text-dark">
            AI-Powered Medical <span className="text-primary-600">Report Analysis</span>
          </h1>
          <p className="text-lg text-text-muted max-w-lg">
            Upload medical reports, images, and recordings to get instant AI analysis in simple language. 
            Available for both patients and healthcare professionals.
          </p>
          <div className="flex gap-4 mt-4">
            <button className="h-12 px-6 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white rounded-lg font-semibold text-base transition-colors shadow-md hover:shadow-lg flex items-center gap-2">
              Get Started
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.16669 10H15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 4.16669L15.8333 10L10 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="h-12 px-6 border border-neutral-200 text-text-dark hover:bg-neutral-100 rounded-lg font-semibold text-base transition-colors">
              See Demo
            </button>
          </div>
        </div>
        <div className="flex-1 relative h-[380px] w-full">
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-success-100 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
            <div className="relative w-4/5 h-4/5">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-white rounded-full shadow-inner"></div>
              <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-success-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-primary-500 rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-primary-600 rounded-full animate-pulse delay-100"></div>
              <div className="absolute bottom-1/3 left-1/3 w-14 h-14 bg-success-600 rounded-full animate-pulse delay-200"></div>
              {/* Illustration could be placed here */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-text-muted">Medical Analysis Illustration</div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="px-4 pt-16 pb-4">
        <h2 className="text-2xl font-bold text-text-dark text-center mb-8">Choose Your Role</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center max-w-[800px] mx-auto">
          <div 
            className={`flex-1 p-6 border-2 rounded-xl cursor-pointer transition-all ${
              userRole === 'Patient' 
                ? 'border-primary-500 bg-primary-50 shadow-md' 
                : 'border-neutral-200 hover:border-primary-300 hover:shadow'
            }`}
            onClick={() => setUserRole('Patient')}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className={`p-4 rounded-full ${userRole === 'Patient' ? 'bg-primary-100' : 'bg-neutral-100'}`}>
                <PatientIcon />
              </div>
              <h3 className="text-xl font-semibold text-text-dark">Patient</h3>
              <p className="text-text-muted">
                I want to understand my medical reports and get simplified explanations of my health data.
              </p>
            </div>
          </div>

          <div 
            className={`flex-1 p-6 border-2 rounded-xl cursor-pointer transition-all ${
              userRole === 'Doctor' 
                ? 'border-primary-500 bg-primary-50 shadow-md' 
                : 'border-neutral-200 hover:border-primary-300 hover:shadow'
            }`}
            onClick={() => setUserRole('Doctor')}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className={`p-4 rounded-full ${userRole === 'Doctor' ? 'bg-primary-100' : 'bg-neutral-100'}`}>
                <DoctorIcon />
              </div>
              <h3 className="text-xl font-semibold text-text-dark">Doctor</h3>
              <p className="text-text-muted">
                I need detailed analysis and medical insights to assist with patient diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* API Key Input */}
      <div className="px-4 py-10">
        <div className="max-w-[600px] mx-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <ApiKeyIcon />
              <h3 className="text-lg font-semibold text-text-dark">Enter your API key</h3>
            </div>
            <div className="flex items-center gap-2 border border-neutral-200 rounded-lg overflow-hidden">
              <div className="p-3 bg-neutral-50">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5H3.33333C2.41286 5 1.66667 5.74619 1.66667 6.66667V13.3333C1.66667 14.2538 2.41286 15 3.33333 15H16.6667C17.5871 15 18.3333 14.2538 18.3333 13.3333V6.66667C18.3333 5.74619 17.5871 5 16.6667 5Z" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1.66667 8.33334H18.3333" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="password"
                placeholder="Paste your API key here"
                className="w-full p-3 outline-none text-text-dark"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <button className="p-3 text-primary-500 font-medium">
                Apply
              </button>
            </div>
            <p className="text-sm text-text-light">Don't have an API key? <a href="#" className="text-primary-500 hover:underline">Get one here</a>.</p>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="px-4 pt-10 pb-6">
        <h2 className="text-2xl font-bold text-text-dark mb-2">Main Menu</h2>
        <p className="text-text-muted mb-8">Choose a service to get started with your medical analysis</p>
      </div>
      
      {/* Menu Cards - Modern Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        <Link href="/?tab=image" className="group p-5 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-all hover:border-primary-300">
          <div className="flex flex-col gap-4">
            <div className="p-3 bg-primary-50 rounded-lg w-fit group-hover:bg-primary-100 transition-colors">
              <ImageIcon />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-dark group-hover:text-primary-600 transition-colors">Medical Image Analysis</h3>
              <p className="text-text-muted mt-1">Upload X-rays, MRIs, CT scans, and other medical images for AI analysis</p>
            </div>
          </div>
        </Link>
        
        <Link href="/?tab=report" className="group p-5 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-all hover:border-primary-300">
          <div className="flex flex-col gap-4">
            <div className="p-3 bg-primary-50 rounded-lg w-fit group-hover:bg-primary-100 transition-colors">
              <ReportIcon />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-dark group-hover:text-primary-600 transition-colors">PDF & Lab Reports</h3>
              <p className="text-text-muted mt-1">Upload lab results, clinical notes, and other medical documents</p>
            </div>
          </div>
        </Link>
        
        <Link href="/?tab=batch" className="group p-5 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-all hover:border-primary-300">
          <div className="flex flex-col gap-4">
            <div className="p-3 bg-primary-50 rounded-lg w-fit group-hover:bg-primary-100 transition-colors">
              <BatchIcon />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-dark group-hover:text-primary-600 transition-colors">Batch Processing</h3>
              <p className="text-text-muted mt-1">Process multiple reports simultaneously for faster analysis</p>
            </div>
          </div>
        </Link>
        
        <Link href="/?tab=audio-video" className="group p-5 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-all hover:border-primary-300">
          <div className="flex flex-col gap-4">
            <div className="p-3 bg-primary-50 rounded-lg w-fit group-hover:bg-primary-100 transition-colors">
              <AudioVideoIcon />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-dark group-hover:text-primary-600 transition-colors">Audio & Video</h3>
              <p className="text-text-muted mt-1">Analyze medical conversations, consultations, and procedures</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Upload Section */}
      <div className="mt-16 px-4">
        <div className="max-w-[1000px] mx-auto bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-primary-50 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-text-dark">Upload Medical Documents</h2>
          </div>
          
          <div className="p-6">
            <div className="border-2 border-dashed border-neutral-200 rounded-lg p-10 flex flex-col items-center justify-center gap-4">
              <div className="p-4 bg-primary-50 rounded-full">
                <UploadIcon />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-text-dark">Drop your files here</h3>
                <p className="text-text-muted mt-2">Support for JPEG, PNG, PDF, DICOM</p>
              </div>
              <button className="mt-2 px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium text-sm transition-colors">
                Browse Files
              </button>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <LanguageIcon />
                  <h3 className="font-medium text-text-dark">Select Language</h3>
                </div>
                <div className="relative">
                  <select className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg appearance-none pr-10">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Chinese</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6L8 10L12 6" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-text-dark mb-3">Additional Context (Optional)</h3>
                <textarea 
                  placeholder="Enter symptoms, medical history, or concerns..."
                  className="w-full p-3 min-h-[120px] bg-neutral-50 border border-neutral-200 rounded-lg resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-16 px-4 pb-16">
        <h2 className="text-2xl font-bold text-text-dark mb-6">Analysis Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Patient Report */}
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-primary-50 border-b border-neutral-200">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-text-dark flex items-center gap-2">
                  <PatientIcon />
                  Patient Report
                </h3>
                <span className="text-sm text-success-600 font-medium bg-success-50 px-2 py-1 rounded">Simplified</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="min-h-[200px] bg-neutral-50 rounded-lg flex items-center justify-center">
                <span className="text-text-muted">Patient-friendly report will appear here</span>
              </div>
              
              <div className="mt-4 flex justify-between">
                <div>
                  <h4 className="font-medium text-text-dark">Key Findings</h4>
                  <p className="text-sm text-text-muted mt-1">Simplified for patient understanding</p>
                </div>
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors">
                  View Full Report
                </button>
              </div>
            </div>
          </div>
          
          {/* Doctor Report */}
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-primary-50 border-b border-neutral-200">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-text-dark flex items-center gap-2">
                  <DoctorIcon />
                  Doctor Report
                </h3>
                <span className="text-sm text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded border border-primary-100">Detailed</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="min-h-[200px] bg-neutral-50 rounded-lg flex items-center justify-center">
                <span className="text-text-muted">Detailed medical report will appear here</span>
              </div>
              
              <div className="mt-4 flex justify-between">
                <div>
                  <h4 className="font-medium text-text-dark">Clinical Analysis</h4>
                  <p className="text-sm text-text-muted mt-1">Detailed medical terminology included</p>
                </div>
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors">
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="flex items-center gap-2 px-5 py-3 border border-neutral-200 hover:bg-neutral-50 rounded-lg text-text-dark font-medium transition-colors">
            <ExportIcon />
            Export
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border border-neutral-200 hover:bg-neutral-50 rounded-lg text-text-dark font-medium transition-colors">
            <DownloadIcon />
            Download
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border border-neutral-200 hover:bg-neutral-50 rounded-lg text-text-dark font-medium transition-colors">
            <ShareIcon />
            Share
          </button>
        </div>
      </div>
    </NewLayout>
  );
}
