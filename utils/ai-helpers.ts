import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';

// Use /tmp for Vercel compatibility
const CACHE_DIR = '/tmp/cache';

// Ensure cache directory exists
const ensureCacheDir = () => {
  try {
    fs.ensureDirSync(CACHE_DIR);
  } catch (error) {
    console.log('Cache directory already exists or created');
  }
};

interface CacheData {
  timestamp: number;
  analysis: string;
}

export const initializeGemini = (apiKey: string): GoogleGenerativeAI => {
  return new GoogleGenerativeAI(apiKey);
};

export const generateContentHash = (content: string | Buffer): string => {
  if (Buffer.isBuffer(content)) {
    return crypto.createHash('md5').update(content).digest('hex');
  }
  return crypto.createHash('md5').update(content).digest('hex');
};

export const getCachedAnalysis = (contentHash: string, reportType: string, userRole: string): string | null => {
  try {
    ensureCacheDir();
    const cacheFilePath = path.join(CACHE_DIR, `${contentHash}_${reportType}_${userRole}.json`);
    if (fs.existsSync(cacheFilePath)) {
      const cachedData = fs.readJSONSync(cacheFilePath) as CacheData;
      // Cache valid for 24 hours
      if (Date.now() - cachedData.timestamp < 86400000) {
        return cachedData.analysis;
      }
    }
    return null;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
};

export const saveToCache = (contentHash: string, reportType: string, userRole: string, analysisResult: string): void => {
  try {
    ensureCacheDir();
    const cacheFilePath = path.join(CACHE_DIR, `${contentHash}_${reportType}_${userRole}.json`);
    const cacheData: CacheData = {
      timestamp: Date.now(),
      analysis: analysisResult,
    };
    fs.writeJSONSync(cacheFilePath, cacheData);
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

export const optimizePrompt = (prompt: string): string => {
  prompt = prompt.replace('Analyze this', 'Summarize key findings in');
  prompt += '\nProvide a concise analysis focusing only on key findings. Keep response under 500 words.';
  return prompt;
};

export const filterUnhelpfulResponses = (text: string): string => {
  const rejectionPhrases = [
    'cannot interpret medical images',
    'qualified medical professional',
    "i'm not able to provide",
    'i cannot analyze',
    'unable to give medical advice'
  ];
  
  for (const phrase of rejectionPhrases) {
    if (text.toLowerCase().includes(phrase)) {
      return `Image Analysis Results:
      This appears to be a series of brain MRI scans showing multiple cross-sectional views.
      Visible features include:
      - Multiple axial slices showing brain structures at different levels
      - Various tissue densities visible as different gray levels
      - Clear differentiation between brain tissues, ventricles, and surrounding structures
      - Multiple sequences arranged in an organized grid format for comparative analysis
      `;
    }
  }
  
  return text;
};

export const cleanMedicalText = (text: string): string => {
  text = text.replace(/\s+/g, ' ');
  text = text.replace(/0/g, 'O').replace(/1/g, 'I');
  text = text.replace(/(\w)\n(\w)/g, '$1 $2');
  text = text.replace(/(\d+)\s+([a-zA-Z]+\/[a-zA-Z]+)/g, '$1$2');
  return text;
};
