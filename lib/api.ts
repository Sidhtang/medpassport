import axios from 'axios';
import { AnalysisResult, MedicalImageFormData, MedicalReportFormData, BatchProcessFormData } from '@/lib/types';

export async function analyzeImage(data: MedicalImageFormData): Promise<AnalysisResult> {
  try {
    const formData = new FormData();
    formData.append('apiKey', data.apiKey || '');
    formData.append('reportType', data.reportType);
    formData.append('userRole', data.userRole);
    formData.append('additionalInfo', data.additionalInfo || '');
    if (data.file) {
      formData.append('image', data.file);
    }

    const response = await axios.post('/api/analyze-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Error analyzing image');
    }
    throw new Error('Error processing request');
  }
}

export async function analyzeReport(data: MedicalReportFormData): Promise<AnalysisResult> {
  try {
    const formData = new FormData();
    formData.append('apiKey', data.apiKey || '');
    formData.append('reportType', data.reportType);
    formData.append('userRole', data.userRole);
    formData.append('additionalInfo', data.additionalInfo || '');
    formData.append('textInput', data.textInput || '');
    if (data.file) {
      formData.append('report', data.file);
    }

    const response = await axios.post('/api/analyze-report', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Error analyzing report');
    }
    throw new Error('Error processing request');
  }
}

export async function translateText(text: string, language: string, apiKey: string): Promise<string> {
  try {
    if (language === 'English') {
      return text;
    }
    
    const response = await axios.post('/api/translate', {
      text,
      targetLanguage: language,
      apiKey,
    });
    
    return response.data.result;
  } catch (error) {
    console.error('Translation error:', error);
    return `${text}\n\n[Translation to ${language} failed]`;
  }
}

export async function summarizeAnalysis(analysisText: string, apiKey: string): Promise<string> {
  try {
    const response = await axios.post('/api/summarize', {
      text: analysisText,
      apiKey,
    });
    
    return response.data.result;
  } catch (error) {
    console.error('Summarization error:', error);
    return 'Could not generate summary due to an error.';
  }
}

export async function generatePdfReport(analysisResult: string, reportType: string, userRole: string): Promise<Blob> {
  try {
    const response = await axios.post('/api/generate-pdf', {
      analysisResult,
      reportType,
      userRole,
    }, {
      responseType: 'blob',
    });
    
    return response.data;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF report');
  }
}

export async function runNetworkDiagnostics() {
  try {
    const response = await axios.get('/api/diagnostics');
    return response.data.results;
  } catch (error) {
    console.error('Diagnostics error:', error);
    return [{ test: 'API Connection', result: '❌ Failed - Could not connect to server' }];
  }
}

export async function processBatchFiles(data: BatchProcessFormData): Promise<any> {
  try {
    const formData = new FormData();
    formData.append('apiKey', data.apiKey || '');
    formData.append('reportType', data.reportType);
    formData.append('userRole', data.userRole);
    formData.append('additionalInfo', data.additionalInfo || '');
    
    data.files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await axios.post('/api/batch-process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Error processing batch');
    }
    throw new Error('Error processing request');
  }
}
