'use client';

import FigmaLayout from '../components/layout/FigmaLayout';
import { useState } from 'react';
import ImageAnalysisTab from '../components/ImageAnalysisTab';
import ReportAnalysisTab from '../components/ReportAnalysisTab';
import AudioVideoAnalysisTab from '../components/AudioVideoAnalysisTab';
import BatchProcessingTab from '../components/BatchProcessingTab';
import NetworkDiagnosticsTab from '../components/NetworkDiagnosticsTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState('imageAnalysis');
  const [userRole, setUserRole] = useState('Patient');
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

  // Render the active component based on state
  const renderActiveComponent = () => {
    switch(activeTab) {
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
    <FigmaLayout pageTitle="MedPassport - AI-Powered Medical Analysis">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold mb-4">MedPassport</h1>
          <p className="mb-6">AI-powered medical analysis platform</p>
        </div>

        {/* Role Selection */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Select Your Role</h2>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setUserRole('Patient')} 
              className={`px-4 py-2 rounded-lg ${userRole === 'Patient' ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}
            >
              Patient
            </button>
            <button 
              onClick={() => setUserRole('Doctor')} 
              className={`px-4 py-2 rounded-lg ${userRole === 'Doctor' ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}
            >
              Doctor
            </button>
          </div>
        </div>

        {/* API Key Input */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">API Key</h2>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Google AI API key"
            className="w-full p-2 border rounded"
          />
        </div>
        
        {/* Tabs Navigation */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Select Analysis Type</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setActiveTab('imageAnalysis')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'imageAnalysis' ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}
            >
              Image Analysis
            </button>
            <button
              onClick={() => setActiveTab('reportAnalysis')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'reportAnalysis' ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}
            >
              Report Analysis
            </button>
            <button
              onClick={() => setActiveTab('audioVideoAnalysis')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'audioVideoAnalysis' ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}
            >
              Audio/Video Analysis
            </button>
            <button
              onClick={() => setActiveTab('batchProcessing')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'batchProcessing' ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}
            >
              Batch Processing
            </button>
            <button
              onClick={() => setActiveTab('networkDiagnostics')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'networkDiagnostics' ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}
            >
              Network Diagnostics
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white p-6 rounded-lg">
          {renderActiveComponent()}
        </div>
      </div>
    </FigmaLayout>
  );
}
