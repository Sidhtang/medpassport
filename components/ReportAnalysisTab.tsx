import React, { useState } from 'react';
import { MedicalReportFormData, AnalysisResult, SUPPORTED_LANGUAGES, REPORT_TYPES } from '@/lib/types';
import { analyzeReport, translateText, summarizeAnalysis, generatePdfReport } from '@/lib/api';

const ReportAnalysisTab: React.FC<{ apiKey: string; userRole: string }> = ({ apiKey, userRole }) => {
  const [reportType, setReportType] = useState<string>(REPORT_TYPES.TEXT_TYPES[0]);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [textInput, setTextInput] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('English');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [summaryResult, setSummaryResult] = useState<string>('');
  const [summarizing, setSummarizing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult('');
    setSummaryResult('');
    
    if (!file && !textInput) {
      setError('Please upload a file or enter text');
      setLoading(false);
      return;
    }
    
    try {
      const formData: MedicalReportFormData = {
        reportType,
        userRole,
        apiKey,
        additionalInfo,
        file,
        textInput,
        targetLanguage
      };
      
      const response = await analyzeReport(formData);
      
      if (response.error) {
        setError(response.error);
      } else if (targetLanguage !== 'English') {
        const translatedText = await translateText(response.result, targetLanguage, apiKey);
        setResult(translatedText);
      } else {
        setResult(response.result);
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
      <h2 className="text-xl font-semibold mb-4">PDF & Lab Report Analysis</h2>
      <p className="mb-4">Upload text-based reports, PDFs, blood work, or other lab results</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Report Type</label>
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {REPORT_TYPES.TEXT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Upload Report File (PDF or Text)</label>
          <input 
            type="file" 
            accept=".pdf,.txt,application/pdf,text/plain"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Or paste report content here:</label>
          <textarea 
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full p-2 border rounded"
            rows={5}
          />
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
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {Object.keys(SUPPORTED_LANGUAGES).map((language) => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full p-2 rounded font-medium ${loading ? 'bg-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          {loading ? 'Analyzing...' : 'Analyze Report'}
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

export default ReportAnalysisTab;
