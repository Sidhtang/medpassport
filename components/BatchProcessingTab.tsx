import React, { useState } from 'react';
import { BatchProcessFormData, BatchResult, REPORT_TYPES } from '@/lib/types';
import { processBatchFiles, summarizeAnalysis, generatePdfReport } from '@/lib/api';

const BatchProcessingTab: React.FC<{ apiKey: string; userRole: string }> = ({ apiKey, userRole }) => {
  const [reportType, setReportType] = useState<string>(REPORT_TYPES.BATCH_TYPES[0]);
  const [files, setFiles] = useState<File[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [results, setResults] = useState<BatchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [summaryResult, setSummaryResult] = useState<string>('');
  const [summarizing, setSummarizing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);
    setSummaryResult('');
    
    if (files.length === 0) {
      setError('Please select at least one file');
      setLoading(false);
      return;
    }
    
    try {
      const formData: BatchProcessFormData = {
        reportType,
        userRole,
        apiKey,
        additionalInfo,
        files
      };
      
      // Initial status for each file
      const initialResults = files.map(file => ({
        fileName: file.name,
        fileType: file.type,
        status: 'Processing' as const,
        result: ''
      }));
      
      setResults(initialResults);
      
      // Process batch files
      const batchResponse = await processBatchFiles(formData);
      
      // Update results
      setResults(batchResponse.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    setSummarizing(true);
    try {
      // Combine all results
      const combinedResults = results.map(r => 
        `File: ${r.fileName}\nType: ${r.fileType}\nFindings: ${r.result}`
      ).join('\n\n');
      
      const summary = await summarizeAnalysis(combinedResults, apiKey);
      setSummaryResult(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during summarization');
    } finally {
      setSummarizing(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      // Prepare content for PDF
      const content = `
        Batch Processing Results
        
        ${results.map((r, i) => `
          File ${i + 1}: ${r.fileName}
          Type: ${r.fileType}
          Status: ${r.status}
          
          Results:
          ${r.result}
          
          ${'─'.repeat(50)}
        `).join('\n')}
        
        ${summaryResult ? `\nSummary:\n${summaryResult}` : ''}
      `;
      
      const pdfBlob = await generatePdfReport(content, 'Batch Analysis', userRole);
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `batch_report_${Date.now()}.pdf`);
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
      <h2 className="text-xl font-semibold mb-4">Batch Processing</h2>
      <p className="mb-4">Process multiple files at once (including ZIP archives)</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Reports Type</label>
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {REPORT_TYPES.BATCH_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Upload Multiple Files</label>
          <input 
            type="file" 
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {files.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              {files.length} file(s) selected
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Additional Information (applies to all files)</label>
          <textarea 
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="w-full p-2 border rounded"
            rows={2}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading || files.length === 0}
          className={`w-full p-2 rounded font-medium ${loading || files.length === 0 ? 'bg-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          {loading ? 'Processing...' : 'Process All Files'}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {results.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Batch Processing Results</h3>
            
            <div className="space-x-2">
              <button
                onClick={handleSummarize}
                disabled={summarizing || results.length === 0}
                className={`px-3 py-1 rounded ${summarizing || results.length === 0 ? 'bg-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'} text-sm`}
              >
                {summarizing ? 'Summarizing...' : 'Summarize Results'}
              </button>
              
              <button
                onClick={handleDownloadPDF}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Download PDF Report
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Filename</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Results</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">{result.fileName}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">{result.fileType}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <span 
                        className={`inline-block px-2 py-1 text-xs rounded ${
                          result.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          result.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {result.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <div className="max-h-20 overflow-y-auto">
                        {result.result ? 
                          result.result.length > 150 ? 
                            result.result.substring(0, 150) + '...' : 
                            result.result
                          : 'No results yet'
                        }
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default BatchProcessingTab;
