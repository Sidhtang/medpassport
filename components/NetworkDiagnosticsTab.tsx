import React, { useState } from 'react';
import { runNetworkDiagnostics } from '@/lib/api';
import { NetworkDiagnostic } from '@/lib/types';

const NetworkDiagnosticsTab: React.FC = () => {
  const [diagnosticResults, setDiagnosticResults] = useState<NetworkDiagnostic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const runDiagnostics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await runNetworkDiagnostics();
      setDiagnosticResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Network Diagnostics</h2>
      <p className="mb-4">Check connectivity to external services and troubleshoot connection issues</p>
      
      <button
        onClick={runDiagnostics}
        disabled={loading}
        className={`px-4 py-2 rounded mb-6 ${loading ? 'bg-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
      >
        {loading ? 'Running Diagnostics...' : 'Run Network Diagnostics'}
      </button>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {diagnosticResults.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Test</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Result</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {diagnosticResults.map((result, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{result.test}</td>
                  <td className="px-4 py-2 text-sm" dangerouslySetInnerHTML={{ __html: result.result }} />
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-6 p-4 bg-blue-50 border rounded">
            <h3 className="text-lg font-medium mb-2">Troubleshooting Tips</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>If internet connectivity fails, check your network connection</li>
              <li>If DNS resolution fails, try using a different DNS server (e.g., Google's 8.8.8.8)</li>
              <li>If you see proxy warnings, your network may be filtered through a proxy server</li>
              <li>If API connection fails, check if your API key is valid and if there are any service outages</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkDiagnosticsTab;
