import * as React from 'react';
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { MedicalImageFormData, ImageAnalysisResult, AnalysisResult, SUPPORTED_LANGUAGES, REPORT_TYPES } from '@/lib/types';
import { analyzeImage, translateText, summarizeAnalysis, generatePdfReport } from '@/lib/api';
// Add JSX namespace declaration to fix the "JSX element implicitly has type 'any'" errors
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Import or define ImageAnalysisParams interface
interface ImageAnalysisParams {
  file: File;
  imageType: string;
  clinicalContext?: string;
  userRole: string;
}
import Card from './ui/Card';
import Button from './ui/Button';

// Icons
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const AnalyzeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
  </svg>
);

const SummaryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const TranslateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
  </svg>
);

const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

interface ImageAnalysisTabProps {
  apiKey: string;
  userRole: string;
}

const ImageAnalysisTab = ({ apiKey, userRole }: ImageAnalysisTabProps) => {
  const [reportType, setReportType] = useState<string>(REPORT_TYPES.IMAGE_TYPES[0]);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('English');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [summaryResult, setSummaryResult] = useState<string>('');
  const [summarizing, setSummarizing] = useState<boolean>(false);
  const [translating, setTranslating] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'analysis' | 'summary'>('analysis');

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setFilePreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult('');
    setSummaryResult('');
    
    try {
      // Ensure file is defined before proceeding
      if (!file) {
        setError("No file selected");
        setLoading(false);
        return;
      }
      
      const imageAnalysisParams: ImageAnalysisParams = {
        file, // file is now guaranteed to be defined
        imageType: reportType,
        clinicalContext: additionalInfo,
        userRole
      };
      
      const response = await analyzeImage(imageAnalysisParams);
      
      if (response.error) {
        setError(response.error);
      } else {
        // Handle structured result from ImageAnalysisResult
        const analysisText = `
          **Findings:** ${response.findings}
          
          **Impressions:** ${response.impressions}
          
          ${response.recommendations ? `**Recommendations:** ${response.recommendations}` : ''}
          
          ${response.possibleConditions ? `**Possible Conditions:** ${response.possibleConditions}` : ''}
          
          ${response.additionalFindings ? `**Additional Findings:** ${response.additionalFindings}` : ''}
        `;
        setResult(analysisText);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = useCallback(async () => {
    if (!result || translating) return;
    
    setTranslating(true);
    try {
      const translated = await translateText(result, targetLanguage, apiKey);
      
      // translateText now returns a string directly
      setResult(translated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error during translation');
    } finally {
      setTranslating(false);
    }
  }, [result, targetLanguage, apiKey, translating]);

  const handleSummarize = useCallback(async () => {
    if (!result || summarizing) return;
    
    setSummarizing(true);
    try {
      const summary = await summarizeAnalysis(result, apiKey);
      
      // summarizeAnalysis now returns a string directly
      setSummaryResult(summary);
      setActiveTab('summary');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error during summarization');
    } finally {
      setSummarizing(false);
    }
  }, [result, apiKey, summarizing]);

  const handleGeneratePDF = useCallback(async () => {
    if (!result || generating) return;
    
    setGenerating(true);
    try {
      await generatePdfReport(result, reportType, userRole);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error generating PDF');
    } finally {
      setGenerating(false);
    }
  }, [result, summaryResult, reportType, userRole, apiKey, generating]);

  return (
    <div className="space-y-8">
      {/* Upload and Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Upload Card */}
        <Card 
          title="Upload Medical Image" 
          accent="primary"
          hoverEffect={true}
          className="h-full"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Report Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Type
              </label>
              <select
                value={reportType}
                onChange={(e: any) => setReportType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md shadow-sm"
                disabled={loading}
              >
                {REPORT_TYPES.IMAGE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Medical Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors">
                <div className="space-y-1 text-center">
                  {filePreview ? (
                    <div className="relative mx-auto">
                      <img 
                        src={filePreview} 
                        alt="Preview" 
                        className="max-h-40 max-w-full rounded-lg mx-auto object-cover shadow-md"
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          setFile(undefined);
                          setFilePreview(undefined);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center">
                        <UploadIcon />
                      </div>
                      <p className="text-sm text-gray-500">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept="image/*"
                            disabled={loading}
                          />
                        </label>
                        <span> or drag and drop</span>
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Information (Optional)
              </label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows={3}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter any additional context about the image..."
                disabled={loading}
              />
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Language
              </label>
              <select
                value={targetLanguage}
                onChange={(e: any) => setTargetLanguage(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md shadow-sm"
                disabled={loading}
              >
                {Object.keys(SUPPORTED_LANGUAGES).map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <Button 
                type="submit"
                fullWidth
                loading={loading}
                disabled={!file}
                icon={<AnalyzeIcon />}
              >
                {loading ? 'Analyzing...' : 'Analyze Image'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Results Card */}
        <Card 
          title="Analysis Results" 
          accent={activeTab === 'analysis' ? 'primary' : 'secondary'}
          className="h-full flex flex-col"
        >
          {/* Results navigation tabs */}
          <div className="flex mb-4 border-b">
            <button
              onClick={() => setActiveTab('analysis')}
              className={`py-2 px-4 font-medium text-sm border-b-2 ${activeTab === 'analysis' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Analysis
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              disabled={!summaryResult}
              className={`py-2 px-4 font-medium text-sm border-b-2 ${activeTab === 'summary' ? 'border-secondary-500 text-secondary-600' : summaryResult ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' : 'border-transparent text-gray-400 cursor-not-allowed'}`}
            >
              Summary
            </button>
          </div>

          {/* Results content */}
          <div className="flex-grow overflow-auto">
            {error && (
              <div className="bg-red-50 p-4 rounded-md mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'analysis' ? (
              result ? (
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line bg-white p-4 rounded-md border border-gray-200">
                    {result}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 bg-gray-50 rounded-md">
                  <p className="text-gray-500">
                    {loading ? 'Analyzing image...' : 'Upload and analyze an image to see results'}
                  </p>
                </div>
              )
            ) : (
              summaryResult ? (
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line bg-white p-4 rounded-md border border-gray-200">
                    {summaryResult}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 bg-gray-50 rounded-md">
                  <p className="text-gray-500">
                    {summarizing ? 'Generating summary...' : 'Generate a summary to see results here'}
                  </p>
                </div>
              )
            )}
          </div>

          {/* Action buttons */}
          {result && (
            <div className="flex flex-wrap justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleTranslate}
                loading={translating}
                disabled={!result}
                icon={<TranslateIcon />}
              >
                Translate
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSummarize}
                loading={summarizing}
                disabled={!result}
                icon={<SummaryIcon />}
              >
                Summarize
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={handleGeneratePDF}
                loading={generating}
                disabled={!result}
                icon={<PdfIcon />}
              >
                Generate PDF
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Clinical Interpretation & Education Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card 
          title="Clinical Interpretation" 
          accent="secondary"
          className="lg:col-span-2"
        >
          <div className="prose max-w-none">
            <p className="text-gray-700">
              Our AI analysis provides a detailed interpretation of medical images that can assist healthcare professionals in their diagnosis. The system has been trained on a vast dataset of medical images and can identify common patterns and abnormalities.
            </p>
            <div className="bg-blue-50 p-3 rounded-md mt-3 border border-blue-100">
              <h4 className="text-blue-800 text-sm font-medium mb-1">How to interpret these results:</h4>
              <ul className="text-sm text-blue-700 list-disc pl-4 space-y-1">
                <li>Review the detailed analysis for potential findings and abnormalities</li>
                <li>Compare with clinical symptoms and patient history</li>
                <li>Use the summary feature for a concise overview</li>
                <li>Always confirm AI findings with professional medical judgment</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card 
          title="Educational Resources" 
          accent="accent"
        >
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent-100 text-accent-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </span>
              <span>
                <a href="#" className="text-accent-600 font-medium hover:underline">Guide to Reading Medical Images</a>
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent-100 text-accent-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </span>
              <span>
                <a href="#" className="text-accent-600 font-medium hover:underline">Common Findings & Terminology</a>
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent-100 text-accent-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
              </span>
              <span>
                <a href="#" className="text-accent-600 font-medium hover:underline">Video Tutorial: Advanced Image Analysis</a>
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ImageAnalysisTab;
