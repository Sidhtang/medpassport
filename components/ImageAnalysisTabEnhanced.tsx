import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Card from './ui/Card';
import Button from './ui/Button';
import { analyzeImage } from '@/lib/api';
import { ImageAnalysisResult } from '@/lib/types';

// Icons
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const PrintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
  </svg>
);

// Define supported medical image types
const supportedImageTypes = [
  { name: 'X-ray', icon: '🦴', description: 'Radiographic imaging of bones, chest, joints' },
  { name: 'MRI', icon: '🧠', description: 'Magnetic resonance imaging for soft tissues' },
  { name: 'CT Scan', icon: '🫁', description: 'Computerized tomography cross-sectional images' },
  { name: 'Ultrasound', icon: '🔊', description: 'Sonographic imaging using sound waves' },
  { name: 'PET Scan', icon: '⚛️', description: 'Positron emission tomography with tracer' },
  { name: 'Mammogram', icon: '👩‍⚕️', description: 'Breast cancer screening images' },
  { name: 'Retinal Scan', icon: '👁️', description: 'Ophthalmology retinal imaging' },
  { name: 'Histopathology', icon: '🔬', description: 'Microscopic tissue sample analysis' }
];

interface ImageAnalysisTabProps {
  apiKey: string;
  userRole: string;
}

const ImageAnalysisTabEnhanced: React.FC<ImageAnalysisTabProps> = ({ apiKey, userRole }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageType, setImageType] = useState<string>('');
  const [clinicalContext, setClinicalContext] = useState<string>('');
  const [analysisResults, setAnalysisResults] = useState<ImageAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'results' | 'education'>('upload');
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResults(null); // Reset previous results
      setError(null);
    }
  };

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResults(null); // Reset previous results
      setError(null);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Submit image for analysis
  const handleAnalyzeImage = async () => {
    if (!selectedFile) {
      setError('Please select an image file to analyze');
      return;
    }

    if (!apiKey) {
      setError('Please enter your API key');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await analyzeImage({
        file: selectedFile,
        imageType,
        clinicalContext,
        userRole
      });
      
      setAnalysisResults(result);
      setActiveTab('results');
    } catch (err) {
      setError('Error analyzing image: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const generatePdfReport = () => {
    // Future implementation for PDF generation
    alert('PDF report generation will be available in the next update.');
  };

  return (
    <div className="space-y-6">
      {/* Tabs navigation */}
      <div className="flex border-b border-gray-200">
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'upload' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-500 hover:text-primary-600'}`} 
          onClick={() => setActiveTab('upload')}
        >
          Upload & Analyze
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'results' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-500 hover:text-primary-600'}`}
          onClick={() => setActiveTab('results')}
          disabled={!analysisResults}
        >
          Analysis Results
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'education' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-500 hover:text-primary-600'}`}
          onClick={() => setActiveTab('education')}
        >
          Education
        </button>
      </div>

      {/* Upload tab */}
      {activeTab === 'upload' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Medical Image Upload" icon={<UploadIcon />} accent="primary" className="md:col-span-2">
            {/* File upload area */}
            <div 
              className={`
                border-2 border-dashed rounded-lg p-6 text-center
                ${previewUrl ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-primary-400 bg-gray-50'}
                transition-colors duration-200
              `}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {previewUrl ? (
                <div className="space-y-4">
                  <div className="relative w-full max-w-md mx-auto aspect-square">
                    <img
                      src={previewUrl}
                      alt="Medical image preview"
                      className="object-contain w-full h-full rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-500">{selectedFile?.name} ({(selectedFile?.size || 0) / 1024 < 1000 ? 
                    `${Math.round((selectedFile?.size || 0) / 1024)} KB` : 
                    `${Math.round((selectedFile?.size || 0) / 1024 / 1024 * 10) / 10} MB`})
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={handleUploadClick}
                    icon={<UploadIcon />}
                  >
                    Select Different Image
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <div className="p-4 rounded-full bg-primary-100 text-primary-600">
                      <UploadIcon />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-gray-700">Drag & drop your medical image here</p>
                      <p className="text-sm text-gray-500">or</p>
                      <Button 
                        variant="primary" 
                        onClick={handleUploadClick}
                        icon={<UploadIcon />}
                      >
                        Select Image
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 max-w-md">
                      Supported formats: JPEG, PNG, DICOM, TIFF, BMP
                    </p>
                  </div>
                </>
              )}
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,.dcm"
                className="hidden"
              />
            </div>
          </Card>

          {/* Image Type selection */}
          <Card title="Image Type" icon={<CameraIcon />} accent="secondary">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Please select the type of medical image:</p>
              
              <div className="grid grid-cols-2 gap-3">
                {supportedImageTypes.slice(0, 6).map((type) => (
                  <div
                    key={type.name}
                    onClick={() => setImageType(type.name)}
                    className={`
                      p-3 rounded-lg border cursor-pointer transition-all
                      ${imageType === type.name ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}
                    `}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-2">{type.icon}</span>
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-xs text-gray-500">{type.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium mb-1 text-gray-700">Other Image Type</label>
                <input 
                  type="text"
                  value={supportedImageTypes.map(t => t.name).includes(imageType) ? '' : imageType}
                  onChange={(e) => setImageType(e.target.value)}
                  placeholder="Specify image type if not listed"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </Card>

          {/* Clinical context */}
          <Card title="Clinical Context" icon={<InfoIcon />} accent="accent">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Providing clinical context will help produce more accurate and relevant analysis results.
              </p>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor="symptoms" className="block text-sm font-medium mb-1 text-gray-700">
                    Patient Symptoms & History
                  </label>
                  <textarea
                    id="symptoms"
                    value={clinicalContext}
                    onChange={(e) => setClinicalContext(e.target.value)}
                    placeholder={userRole === 'Doctor' ? 
                      "E.g., 45-year-old patient with chronic cough, history of smoking, and recent weight loss. Suspected lung pathology." :
                      "E.g., I've had a persistent cough for 3 weeks, history of smoking, and recent weight loss."}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="pt-3 border-t">
                  <Button 
                    variant="primary" 
                    onClick={handleAnalyzeImage} 
                    disabled={!selectedFile || isLoading}
                    fullWidth
                    className="mt-3"
                  >
                    {isLoading ? 'Analyzing...' : 'Analyze Image'}
                  </Button>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Results tab */}
      {activeTab === 'results' && analysisResults && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card title="Medical Image" accent="primary" className="h-full">
                {previewUrl && (
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Medical image"
                      className="object-contain w-full h-full"
                    />
                  </div>
                )}
                <div className="mt-4 pt-3 border-t flex justify-between">
                  <div>
                    <p className="text-sm font-medium">{imageType}</p>
                    <p className="text-xs text-gray-500">{selectedFile?.name}</p>
                  </div>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('upload')}
                  >
                    Change
                  </Button>
                </div>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card title="Analysis Results" accent="secondary" className="h-full">
                <div className="space-y-6">
                  {/* Analysis sections */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Primary Findings</h3>
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                      <p className="whitespace-pre-line">{analysisResults.findings}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Impressions</h3>
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                      <p className="whitespace-pre-line">{analysisResults.impressions}</p>
                    </div>
                  </div>
                  
                  {analysisResults.recommendations && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Recommendations</h3>
                      <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                        <ul className="list-disc pl-5 space-y-1">
                          {analysisResults.recommendations.split('\n').map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t flex flex-wrap gap-3">
                    <Button 
                      variant="primary"
                      icon={<DownloadIcon />}
                      onClick={generatePdfReport}
                    >
                      Generate PDF Report
                    </Button>
                    <Button 
                      variant="outline"
                      icon={<PrintIcon />}
                      onClick={() => window.print()}
                    >
                      Print Results
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Additional analysis information */}
          <Card title="Additional Information" accent="accent">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {analysisResults.possibleConditions && (
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-2">Possible Conditions</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {analysisResults.possibleConditions.split('\n').map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysisResults.additionalFindings && (
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-2">Additional Findings</h3>
                    <p className="text-gray-700">{analysisResults.additionalFindings}</p>
                  </div>
                )}
              </div>
              
              <div className="pt-4 mt-4 border-t">
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800">Medical Disclaimer</h3>
                      <div className="mt-2 text-sm text-amber-700">
                        <p>This analysis is provided for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider regarding medical conditions and diagnoses.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Education tab */}
      {activeTab === 'education' && (
        <div className="space-y-6">
          <Card title="Understanding Medical Images" accent="accent">
            <div className="space-y-4">
              <p className="text-gray-700">Medical imaging is crucial for diagnosis and treatment planning across many medical specialties. Different imaging technologies provide unique views of the body's internal structures.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {supportedImageTypes.map((type) => (
                  <div key={type.name} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{type.icon}</span>
                      <h3 className="font-medium">{type.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="How AI Analyzes Medical Images" accent="primary">
              <div className="space-y-4">
                <p className="text-gray-700">AI systems can detect patterns and anomalies in medical images that may be difficult for the human eye to perceive.</p>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Key Steps in AI Analysis:</h3>
                  <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                    <li>Image preprocessing and normalization</li>
                    <li>Feature detection and extraction</li>
                    <li>Pattern recognition using deep neural networks</li>
                    <li>Comparison with databases of known conditions</li>
                    <li>Probability assessment of different diagnoses</li>
                  </ol>
                </div>
              </div>
            </Card>
            
            <Card title="Reading Your Results" accent="secondary">
              <div className="space-y-4">
                <p className="text-gray-700">Understanding the analysis report can help you better communicate with your healthcare provider.</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Findings</h4>
                    <p className="text-sm text-gray-600">Objective observations about structures and abnormalities seen in the image.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Impressions</h4>
                    <p className="text-sm text-gray-600">The radiologist's or AI's interpretation of what the findings might mean.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Recommendations</h4>
                    <p className="text-sm text-gray-600">Suggested next steps for diagnosis confirmation or treatment.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-3">Remember</h2>
            <p className="mb-4">AI analysis is a powerful tool, but it should always be used alongside clinical expertise and other diagnostic methods. Always discuss results with your healthcare provider.</p>
            <Button 
              variant="outline" 
              className="bg-white/20 border-white/40 hover:bg-white/30 text-white"
              onClick={() => setActiveTab('upload')}
            >
              Return to Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysisTabEnhanced;
