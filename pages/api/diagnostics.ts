import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const results = [];
    
    // Check internet connectivity
    try {
      const response = await axios.get('https://www.google.com', { timeout: 5000 });
      results.push({
        test: 'Internet Connectivity',
        result: `✅ Working - Status code: ${response.status}`
      });
    } catch (error) {
      results.push({
        test: 'Internet Connectivity',
        result: `❌ Failed - ${error instanceof Error ? error.message : String(error)}`
      });
    }
    
    // Check DNS resolution
    try {
      // Simulate DNS resolution using axios
      const dnsResponse = await axios.get('https://generativelanguage.googleapis.com', {
        timeout: 5000,
        validateStatus: () => true // Accept any status code
      });
      results.push({
        test: 'DNS Resolution',
        result: `✅ Working - Successfully resolved googleapis.com`
      });
    } catch (error) {
      results.push({
        test: 'DNS Resolution',
        result: `❌ Failed - ${error instanceof Error ? error.message : String(error)}`
      });
    }
    
    // Check proxy settings
    const httpProxy = process.env.HTTP_PROXY || '';
    const httpsProxy = process.env.HTTPS_PROXY || '';
    if (httpProxy || httpsProxy) {
      results.push({
        test: 'Proxy Settings',
        result: `⚠️ Proxies detected - HTTP: ${httpProxy}, HTTPS: ${httpsProxy}`
      });
    } else {
      results.push({
        test: 'Proxy Settings',
        result: '✅ No proxies configured in environment'
      });
    }
    
    // Check Google API connection
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || req.query.apiKey;
      
      if (!apiKey) {
        results.push({
          test: 'Google API Connection',
          result: '⚠️ No API key provided for testing'
        });
      } else {
        const apiResponse = await axios.get(
          `https://generativelanguage.googleapis.com/v1beta/models`,
          {
            params: { key: apiKey },
            timeout: 5000
          }
        );
        
        results.push({
          test: 'Google API Connection',
          result: `✅ Working - Status code: ${apiResponse.status}`
        });
      }
    } catch (error) {
      let errorMessage = error instanceof Error ? error.message : String(error);
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = `Status ${error.response.status}: ${JSON.stringify(error.response.data)}`;
      }
      
      results.push({
        test: 'Google API Connection',
        result: `❌ Failed - ${errorMessage}`
      });
    }
    
    // Check system resources
    results.push({
      test: 'System Time',
      result: `✅ Current time: ${new Date().toLocaleString()}`
    });
    
    res.status(200).json({ results });
  } catch (error) {
    console.error('Error running diagnostics:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      results: [{ test: 'Diagnostics', result: '❌ Failed to run diagnostics' }]
    });
  }
}
