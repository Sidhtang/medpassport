import React, { useState } from 'react';
import { MedicalImageFormData, SUPPORTED_LANGUAGES, REPORT_TYPES, ImageAnalysisResult } from '@/lib/types';
import { analyzeImage, translateText, summarizeAnalysis, generatePdfReport } from '@/lib/api';

// Import the ImageAnalysisParams interface
interface ImageAnalysisParams {
  file: File;
  imageType: string;
  clinicalContext?: string;
  userRole: string;
}

// Add JSX namespace declaration to fix the "JSX element implicitly has type 'any'" errors
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

interface ImageAnalysisTabProps {
  apiKey: string;
  userRole: string;
}

const ImageAnalysisTab = ({ apiKey, userRole }: ImageAnalysisTabProps) => {
import { MedicalImageFormData, AnalysisResult, SUPPORTED_LANGUAGES, REPORT_TYPES } from '@/lib/types';
import { analyzeImage, translateText, summarizeAnalysis, generatePdfReport } from '@/lib/api';

const ImageAnalysisTab: React.FC<{ apiKey: string; userRole: string }> = ({ apiKey, userRole }) => {
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

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
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
      if (!file) {
        setError("No file selected");
        setLoading(false);
        return;
      }
      
      // Convert from MedicalImageFormData to the format expected by analyzeImage
      const analysisParams: ImageAnalysisParams = {
        file, // now guaranteed to be defined
        imageType: reportType, // map reportType to imageType
        clinicalContext: additionalInfo,
        userRole
      };
      
      const response = await analyzeImage(analysisParams);
      
      if (response.error) {
        setError(response.error);
      } else {
        // Format the structured response into a string
        const resultText = `
          **Findings:** ${response.findings}
          
          **Impressions:** ${response.impressions}
          
          ${response.recommendations ? `**Recommendations:** ${response.recommendations}` : ''}
          
          ${response.possibleConditions ? `**Possible Conditions:** ${response.possibleConditions}` : ''}
          
          ${response.additionalFindings ? `**Additional Findings:** ${response.additionalFindings}` : ''}
        `;
        
        if (targetLanguage !== 'English') {
          const translatedText = await translateText(resultText, targetLanguage, apiKey);
          setResult(translatedText);
        } else {
          setResult(resultText);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    setSummarizing(true);
    try {
      const summary = await summarizeAnalysis(result, apiKey);
      setSummaryResult(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during summarization');
    } finally {
      setSummarizing(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const pdfBlob = await generatePdfReport(result, reportType, userRole);
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `medical_report_${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Medical Image Analysis</h2>
      <p className="mb-4">Upload medical images like CT scans, MRI scans, X-rays, or ultrasound images</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Image Type</label>
          <select 
            value={reportType} 
            onChange={(e: any) => setReportType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {REPORT_TYPES.IMAGE_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Upload Medical Image</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {filePreview && (
            <div className="mt-2">
              <img src={filePreview} alt="Preview" className="max-h-40 rounded" />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Additional Information (symptoms, medical history, etc.)</label>
          <textarea 
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="w-full p-2 border rounded"
            rows={2}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Translate to</label>
          <select 
            value={targetLanguage} 
            onChange={(e: any) => setTargetLanguage(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {Object.keys(SUPPORTED_LANGUAGES).map((language) => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          disabled={loading || !file}
          className={`w-full p-2 rounded font-medium ${loading || !file ? 'bg-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          {loading ? 'Analyzing...' : 'Analyze Image'}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {result && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Analysis Results</h3>
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Download PDF
            </button>
          </div>
          <div className="p-4 bg-gray-50 border rounded whitespace-pre-wrap">
            {result}
          </div>
          
          <div className="mt-4">
            <button
              onClick={handleSummarize}
              disabled={summarizing || !result}
              className={`px-4 py-2 rounded ${summarizing || !result ? 'bg-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {summarizing ? 'Summarizing...' : 'Summarize Analysis'}
            </button>
          </div>
          
          {summaryResult && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Summary</h3>
              <div className="p-4 bg-blue-50 border rounded whitespace-pre-wrap">
                {summaryResult}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageAnalysisTab;
