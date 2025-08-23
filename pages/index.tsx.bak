import React, { useState } from 'react';
import ImageAnalysisTab from '@/components/ImageAnalysisTab';
import ReportAnalysisTab from '@/components/ReportAnalysisTab';
import AudioVideoAnalysisTab from '@/components/AudioVideoAnalysisTab';
import BatchProcessingTab from '@/components/BatchProcessingTab';
import NetworkDiagnosticsTab from '@/components/NetworkDiagnosticsTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('imageAnalysis');
  const [userRole, setUserRole] = useState<string>('Patient');
  const [apiKey, setApiKey] = useState<string>(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
  const [debugMode, setDebugMode] = useState<boolean>(false);

  const renderActiveTab = () => {
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
      case 'help':
        return <HelpInformationTab />;
      default:
        return <ImageAnalysisTab apiKey={apiKey} userRole={userRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">🏥 Medical Report Analysis Tool</h1>
          <p className="text-sm">Powered by Gemini 2.0 - Enhanced Version with Audio/Video Analysis</p>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-4 border-b">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">I am a:</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="Patient"
                      checked={userRole === 'Patient'}
                      onChange={() => setUserRole('Patient')}
                      className="mr-2"
                    />
                    Patient
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="Doctor"
                      checked={userRole === 'Doctor'}
                      onChange={() => setUserRole('Doctor')}
                      className="mr-2"
                    />
                    Doctor
                  </label>
                </div>
              </div>

              <div className="flex-grow">
                <label className="block text-sm font-medium mb-1">Google AI API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={debugMode}
                    onChange={() => setDebugMode(!debugMode)}
                    className="mr-2"
                  />
                  Debug Mode
                </label>
              </div>
            </div>
            
            {debugMode && (
              <div className="mt-4 p-3 bg-gray-100 rounded text-xs font-mono">
                <div>Debug Mode Enabled</div>
                <div>API Key: {apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : 'Not set'}</div>
                <div>User Role: {userRole}</div>
                <div>Current Tab: {activeTab}</div>
                <div>Environment: {process.env.NODE_ENV}</div>
              </div>
            )}
          </div>
          
          <nav className="flex border-b overflow-x-auto">
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'imageAnalysis' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('imageAnalysis')}
            >
              Medical Images
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'reportAnalysis' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('reportAnalysis')}
            >
              PDF & Lab Reports
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'audioVideoAnalysis' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('audioVideoAnalysis')}
            >
              🎵 Audio & Video
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'batchProcessing' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('batchProcessing')}
            >
              Batch Processing
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'networkDiagnostics' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('networkDiagnostics')}
            >
              Network Diagnostics
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'help' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('help')}
            >
              Help & Information
            </button>
          </nav>
          
          <div className="p-4">
            {renderActiveTab()}
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>Medical Report Analysis Tool - Enhanced Version with Audio/Video Analysis</p>
          <p className="text-xs mt-1">Disclaimer: This tool is provided for informational purposes only and does not replace professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
}

const HelpInformationTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-3">About this Tool</h2>
        <p>This Medical Report Analysis Tool uses Google's Gemini 2.0 AI model to provide insights on medical reports, images, audio, and video files.</p>
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-medium">Important Notes:</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>This tool is intended as a supplementary aid and should not replace professional medical advice.</li>
            <li>All analyses should be reviewed by healthcare professionals.</li>
            <li>The AI may occasionally misinterpret medical data; always verify findings with your doctor.</li>
            <li>Audio/video analysis requires appropriate permissions for recording features.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">New Audio & Video Analysis Features</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 border rounded">
            <h3 className="font-medium mb-2">🫀 Heart & Lung Sounds</h3>
            <p className="text-sm">Analyze cardiac and pulmonary auscultation recordings for murmurs, rhythms, and breathing patterns.</p>
          </div>
          <div className="p-4 bg-green-50 border rounded">
            <h3 className="font-medium mb-2">🗣️ Voice Analysis</h3>
            <p className="text-sm">Evaluate speech patterns, voice quality, and neurological speech indicators.</p>
          </div>
          <div className="p-4 bg-purple-50 border rounded">
            <h3 className="font-medium mb-2">📹 Ultrasound Videos</h3>
            <p className="text-sm">Analyze dynamic ultrasound imaging and real-time medical examinations.</p>
          </div>
          <div className="p-4 bg-orange-50 border rounded">
            <h3 className="font-medium mb-2">🚶 Movement Analysis</h3>
            <p className="text-sm">Assess gait patterns, movement disorders, and physical examination videos.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Select your role</strong> (Patient or Doctor) to receive appropriately formatted analysis.</li>
          <li><strong>Choose the appropriate tab</strong> for your content type (Images, Reports, Audio/Video).</li>
          <li><strong>Upload files or use recording</strong> features for audio/video analysis.</li>
          <li><strong>Provide clinical context</strong> about symptoms or medical history for more relevant analysis.</li>
          <li><strong>Click Analyze</strong> to generate AI-powered insights.</li>
          <li><strong>Download PDF reports</strong> or save the analysis for future reference.</li>
          <li><strong>For multiple files</strong>, use the Batch Processing tab.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Supported File Types</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-medium mb-2">📷 Images</h3>
            <p className="text-sm text-gray-600">JPG, PNG, GIF, BMP, WebP</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">📄 Documents</h3>
            <p className="text-sm text-gray-600">PDF, TXT, DOC, DOCX</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">🎵 Audio</h3>
            <p className="text-sm text-gray-600">MP3, WAV, OGG, M4A, AAC, FLAC</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">🎥 Video</h3>
            <p className="text-sm text-gray-600">MP4, AVI, MOV, WebM, MKV</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Performance Optimizations</h2>
        <p>This enhanced version includes:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Audio and video processing capabilities with Gemini 2.0</li>
          <li>Real-time recording features for audio/video capture</li>
          <li>Advanced multimodal AI analysis</li>
          <li>Specialized medical audio/video interpretation</li>
          <li>Results caching to prevent redundant API calls</li>
          <li>Optimized file processing for large media files</li>
          <li>Batch processing for multiple files</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Privacy & Security</h2>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Audio/video recordings are processed securely via Google's Gemini 2.0 API</li>
          <li>Files are temporarily stored only during processing</li>
          <li>No permanent storage of sensitive medical data</li>
          <li>Microphone/camera permissions are only requested when using recording features</li>
          <li>All data transmission is encrypted</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
        <p className="p-3 bg-red-50 border border-red-200 rounded">
          This tool is not FDA approved and is provided for informational purposes only.
          It does not establish a doctor-patient relationship, provide medical advice,
          or substitute for professional medical consultation, diagnosis, or treatment.
          Audio and video analysis features are experimental and should be used with caution.
        </p>
      </section>
    </div>
  );
};
