import React, { useState, useEffect } from 'react';
import { AnalysisResult } from '@/lib/types';

interface AnalysisHistoryProps {
  userRole: string;
}

const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({ userRole }) => {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/analysis-history');
        if (!response.ok) {
          throw new Error('Failed to fetch analysis history');
        }
        const data = await response.json();
        setHistory(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (userRole) {
      fetchHistory();
    }
  }, [userRole]);

  if (!userRole) {
    return null;
  }

  if (loading) {
    return <div className="mt-4 text-center">Loading history...</div>;
  }

  if (error) {
    return <div className="mt-4 text-center text-red-500">Error: {error}</div>;
  }

  if (history.length === 0) {
    return <div className="mt-4 text-center text-gray-500">No previous analysis found</div>;
  }

  return (
    <div className="mt-8 border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Recent Analysis History</h3>
      <div className="space-y-3">
        {history.map((item, index) => (
          <div key={index} className="border rounded p-3 bg-gray-50">
            <div className="text-sm text-gray-600">{item.result.substring(0, 200)}...</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisHistory;
