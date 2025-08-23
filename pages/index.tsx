import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/components/Dashboard';
import ImageAnalysisTabEnhanced from '@/components/ImageAnalysisTabEnhanced';
import ImageAnalysisTab from '@/components/ImageAnalysisTab';
import ReportAnalysisTab from '@/components/ReportAnalysisTab';
import AudioVideoAnalysisTab from '@/components/AudioVideoAnalysisTab';
import BatchProcessingTab from '@/components/BatchProcessingTab';
import NetworkDiagnosticsTab from '@/components/NetworkDiagnosticsTab';

// Figma Design Tab Component
const FigmaDesignTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-3">Figma Design Preview</h2>
      <p className="mb-4">This is the Figma design for the MedPassport application. It shows the proposed UI elements and layout.</p>
      
      <div className="w-full aspect-video bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <iframe
          className="w-full h-full"
          src="https://embed.figma.com/design/cGO7WuT5vRcUASz52jVdLB/Untitled?node-id=0-1&embed-host=share"
          allowFullScreen
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>('Doctor');
  const [apiKey, setApiKey] = useState<string>(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
  const [debugMode, setDebugMode] = useState<boolean>(false);
  
  const { tab } = router.query;

  const renderContent = () => {
    switch (tab) {
      case 'image':
        return <ImageAnalysisTabEnhanced apiKey={apiKey} userRole={userRole} />;
      case 'report':
        return <ReportAnalysisTab apiKey={apiKey} userRole={userRole} />;
      case 'audio-video':
        return <AudioVideoAnalysisTab apiKey={apiKey} userRole={userRole} />;
      case 'batch':
        return <BatchProcessingTab apiKey={apiKey} userRole={userRole} />;
      case 'diagnostics':
        return <NetworkDiagnosticsTab />;
      case 'figma-design':
        return <FigmaDesignTab />;
      default:
        return <Dashboard apiKey={apiKey} userRole={userRole} />;
    }
  };

  return (
    <MainLayout 
      pageTitle="MedPassport - AI Medical Analysis"
      apiKey={apiKey} 
      userRole={userRole}
      setApiKey={setApiKey}
      setUserRole={setUserRole}
    >
      {debugMode && (
        <div className="mb-6 p-3 bg-gray-100 rounded text-xs font-mono">
          <div>Debug Mode Enabled</div>
          <div>API Key: {apiKey ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : 'Not set'}</div>
          <div>User Role: {userRole}</div>
          <div>Current Tab: {tab as string || 'dashboard'}</div>
          <div>Environment: {process.env.NODE_ENV}</div>
        </div>
      )}
      
      {renderContent()}
    </MainLayout>
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
