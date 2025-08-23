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
  ExportIcon 
} from '@/components/ui/Icons';

export default function NewHome() {
  const [userRole, setUserRole] = useState<string>('Patient');

  return (
    <NewLayout pageTitle="Medivisa - AI-Powered Medical Analysis">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-start gap-8 px-4 py-10">
        <div className="flex-1 h-[292px] min-w-[300px] md:min-w-[400px]">
          <div className="w-full h-full bg-neutral-100 rounded-lg flex items-center justify-center">
            <span className="text-text-muted">Hero Image</span>
          </div>
        </div>
        <div className="flex-1 min-w-[300px] md:min-w-[400px] flex flex-col justify-center items-start gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-black leading-tight text-text-dark">
              AI-Powered Medical Report Analysis
            </h1>
            <div className="h-6"></div>
          </div>
          <button className="w-full h-12 px-5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-bold transition-colors">
            Get Started
          </button>
        </div>
      </div>

      {/* Role Selection */}
      <div className="px-4 pt-5 pb-3">
        <h2 className="text-[22px] font-bold text-text-dark">Select Your Role</h2>
      </div>
      <div className="flex justify-center">
        <div className="flex-1 max-w-[480px] px-4 py-3 flex justify-center gap-3 flex-wrap">
          <button 
            className={`w-[219px] h-10 px-4 rounded-lg flex justify-center items-center 
                      ${userRole === 'Patient' ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-text-dark'}`}
            onClick={() => setUserRole('Patient')}
          >
            <span className="font-bold text-sm">Patient</span>
          </button>
          <button 
            className={`w-[217px] h-10 px-4 rounded-lg flex justify-center items-center 
                      ${userRole === 'Doctor' ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-text-dark'}`}
            onClick={() => setUserRole('Doctor')}
          >
            <span className="font-bold text-sm">Doctor</span>
          </button>
        </div>
      </div>

      {/* Main Menu */}
      <div className="h-[60px] px-4 pt-5 pb-3"></div>
      <div className="max-w-[480px] px-4 py-3 flex justify-start items-end gap-4 flex-wrap">
        <h2 className="flex-1 text-[22px] font-bold text-text-dark">Main Menu</h2>
      </div>
      
      {/* Menu Cards */}
      <div className="p-4 flex flex-wrap gap-3 justify-center md:justify-start">
        <Link href="/?tab=image" className="w-[176px] pb-3 flex flex-col gap-3">
          <div className="w-full h-[176px] bg-neutral-100 rounded-lg flex items-center justify-center">
            <span className="text-text-muted">Image</span>
          </div>
          <div>
            <h3 className="text-base font-medium text-text-dark">Medical Image Analysis</h3>
            <p className="text-sm text-text-muted">Analyze medical images with AI</p>
          </div>
        </Link>
        
        <Link href="/?tab=report" className="w-[176px] pb-3 flex flex-col gap-3">
          <div className="w-full h-[176px] bg-neutral-100 rounded-lg flex items-center justify-center">
            <span className="text-text-muted">Report</span>
          </div>
          <div>
            <h3 className="text-base font-medium text-text-dark">PDF & Lab Reports</h3>
            <p className="text-sm text-text-muted">Process PDF and lab reports</p>
          </div>
        </Link>
        
        <Link href="/?tab=batch" className="w-[176px] pb-3 flex flex-col gap-3">
          <div className="w-full h-[176px] bg-neutral-100 rounded-lg flex items-center justify-center">
            <span className="text-text-muted">Batch</span>
          </div>
          <div>
            <h3 className="text-base font-medium text-text-dark">Batch Processing</h3>
            <p className="text-sm text-text-muted">Process multiple reports at once</p>
          </div>
        </Link>
        
        <Link href="/?tab=audio-video" className="w-[176px] pb-3 flex flex-col gap-3">
          <div className="w-full h-[176px] bg-neutral-100 rounded-lg flex items-center justify-center">
            <span className="text-text-muted">A/V</span>
          </div>
          <div>
            <h3 className="text-base font-medium text-text-dark">Audio & Video</h3>
            <p className="text-sm text-text-muted">Analysis through Audio & Video</p>
          </div>
        </Link>
      </div>

      {/* Upload Section */}
      <div className="px-4 pt-5 pb-3">
        <h2 className="text-[22px] font-bold text-text-dark">Upload</h2>
      </div>
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start rounded-lg gap-4">
          <div className="w-full md:w-[608px] flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-text-dark">Upload Medical Images</h3>
              <p className="text-sm text-text-muted">Drag and drop medical images here</p>
            </div>
            <button className="w-[84px] h-8 px-4 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium text-text-dark transition-colors">
              Upload
            </button>
          </div>
          <div className="flex-1 h-[171px] w-full bg-neutral-100 rounded-lg flex items-center justify-center">
            <span className="text-text-muted">Upload Area</span>
          </div>
        </div>
      </div>

      {/* Language Selector */}
      <div className="max-w-[480px] px-4 py-3 flex justify-start items-end gap-4 flex-wrap">
        <div className="flex-1 min-w-[160px]">
          <div className="h-[56px] bg-neutral-50 border border-neutral-200 rounded-lg relative p-2">
            <label className="text-sm text-text-muted">Select Language</label>
            <select className="w-full mt-1 bg-transparent border-none text-text-dark focus:ring-0 focus:outline-none">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </div>

      {/* Optional Context */}
      <div className="max-w-[480px] px-4 py-3 flex justify-start items-end gap-4 flex-wrap">
        <div className="flex-1 min-w-[160px]">
          <div className="min-h-[144px] p-[15px] bg-neutral-50 border border-neutral-200 rounded-lg">
            <textarea 
              placeholder="Optional: Symptoms, history"
              className="w-full h-full bg-transparent border-none text-text-dark focus:ring-0 focus:outline-none resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="px-4 pt-5 pb-3">
        <h2 className="text-[22px] font-bold text-text-dark">Results</h2>
      </div>

      {/* Patient Report */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start rounded-lg gap-4">
          <div className="w-full md:w-[608px] flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-text-dark">Patient Report</h3>
              <p className="text-sm text-text-muted">Simplified report for patients</p>
            </div>
            <button className="w-[84px] h-8 px-4 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium text-text-dark transition-colors">
              View
            </button>
          </div>
          <div className="flex-1 h-[171px] w-full bg-neutral-100 rounded-lg flex items-center justify-center">
            <span className="text-text-muted">Report Preview</span>
          </div>
        </div>
      </div>

      {/* Doctor Report */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start rounded-lg gap-4">
          <div className="w-full md:w-[608px] flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-text-dark">Doctor Report</h3>
              <p className="text-sm text-text-muted">Detailed report for doctors</p>
            </div>
            <button className="w-[84px] h-8 px-4 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium text-text-dark transition-colors">
              View
            </button>
          </div>
          <div className="flex-1 h-[171px] w-full bg-neutral-100 rounded-lg flex items-center justify-center">
            <span className="text-text-muted">Report Preview</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center">
        <div className="flex-1 max-w-[480px] px-4 py-3 flex justify-center gap-3 flex-wrap">
          <button className="w-[135px] h-10 px-4 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-bold text-text-dark transition-colors">
            Export
          </button>
          <button className="w-[159px] h-10 px-4 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-bold text-text-dark transition-colors">
            Download
          </button>
          <button className="w-[130px] h-10 px-4 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-bold text-text-dark transition-colors">
            Share
          </button>
        </div>
      </div>
    </NewLayout>
  );
}
