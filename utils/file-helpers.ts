import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import * as pdfjs from 'pdfjs-dist';
import { v4 as uuidv4 } from 'uuid';

// Use /tmp for Vercel compatibility
const UPLOAD_DIR = '/tmp/uploads';

// Ensure upload directory exists
const ensureUploadDir = () => {
  try {
    fs.ensureDirSync(UPLOAD_DIR);
    fs.ensureDirSync(path.join(UPLOAD_DIR, 'temp'));
  } catch (error) {
    console.log('Upload directories already exist or created');
  }
};

// Initialize PDF.js worker
if (typeof window === 'undefined') {
  // We're on the server
  pdfjs.GlobalWorkerOptions.workerSrc = require.resolve('pdfjs-dist/build/pdf.worker.js');
}

export const processImage = async (fileBuffer: Buffer): Promise<string> => {
  try {
    // Resize image if necessary
    const image = sharp(fileBuffer);
    const metadata = await image.metadata();
    
    if (metadata.width && metadata.height && Math.max(metadata.width, metadata.height) > 800) {
      // Resize to max 800px while maintaining aspect ratio
      image.resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Convert to JPEG
    const processedImageBuffer = await image
      .toFormat('jpeg', { quality: 85 })
      .toBuffer();
    
    // Convert to base64
    const base64Data = processedImageBuffer.toString('base64');
    return base64Data;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image');
  }
};

export const processAudioVideo = async (fileBuffer: Buffer, type: 'audio' | 'video'): Promise<{ base64Data: string; extractedAudioFeatures?: string }> => {
  try {
    // For now, we'll convert the file to base64 for Gemini 2.0's multimodal capabilities
    // In a production environment, you might want to use FFmpeg for more sophisticated processing
    
    const base64Data = fileBuffer.toString('base64');
    
    if (type === 'audio') {
      // Extract basic audio features (this is a simplified version)
      const audioFeatures = await extractAudioFeatures(fileBuffer);
      return { base64Data, extractedAudioFeatures: audioFeatures };
    } else {
      // For video, return base64 data for Gemini 2.0 to process
      return { base64Data };
    }
  } catch (error) {
    console.error('Error processing audio/video:', error);
    throw new Error('Failed to process audio/video file');
  }
};

export const extractAudioFeatures = async (audioBuffer: Buffer): Promise<string> => {
  try {
    // This is a simplified audio analysis
    // In a production environment, you would use libraries like node-wav, audio-analysis, etc.
    
    const fileSize = audioBuffer.length;
    const duration = estimateAudioDuration(audioBuffer);
    
    // Basic file analysis
    const features = {
      fileSize: `${Math.round(fileSize / 1024)} KB`,
      estimatedDuration: `${duration} seconds`,
      sampleAnalysis: analyzeAudioSamples(audioBuffer),
      fileFormat: detectAudioFormat(audioBuffer),
    };
    
    return JSON.stringify(features, null, 2);
  } catch (error) {
    console.error('Error extracting audio features:', error);
    return 'Audio feature extraction failed';
  }
};

const estimateAudioDuration = (buffer: Buffer): number => {
  // This is a very rough estimation based on file size
  // Actual duration would require proper audio decoding
  const assumedBitrate = 128000; // 128 kbps
  const fileSizeBits = buffer.length * 8;
  return Math.round(fileSizeBits / assumedBitrate);
};

const analyzeAudioSamples = (buffer: Buffer): string => {
  // Basic analysis of audio data
  const samples = [];
  const sampleSize = Math.min(1000, buffer.length);
  
  for (let i = 0; i < sampleSize; i += 2) {
    if (i + 1 < buffer.length) {
      // Read 16-bit samples (little-endian)
      const sample = buffer.readInt16LE(i);
      samples.push(sample);
    }
  }
  
  if (samples.length === 0) return 'No samples analyzed';
  
  const maxAmplitude = Math.max(...samples.map(Math.abs));
  const avgAmplitude = samples.reduce((sum, s) => sum + Math.abs(s), 0) / samples.length;
  
  return `Max amplitude: ${maxAmplitude}, Average amplitude: ${Math.round(avgAmplitude)}`;
};

const detectAudioFormat = (buffer: Buffer): string => {
  // Detect audio format from file headers
  if (buffer.length < 4) return 'Unknown';
  
  const header = buffer.toString('ascii', 0, 4);
  
  if (header === 'RIFF') return 'WAV';
  if (header.startsWith('ID3') || (buffer[0] === 0xFF && (buffer[1] & 0xE0) === 0xE0)) return 'MP3';
  if (header === 'OggS') return 'OGG';
  if (header === 'fLaC') return 'FLAC';
  
  return 'Unknown';
};

export const saveUploadedFile = async (fileBuffer: Buffer, fileName: string): Promise<string> => {
  ensureUploadDir();
  const uniqueId = uuidv4();
  const fileExt = path.extname(fileName);
  const safeFileName = `${uniqueId}${fileExt}`;
  const filePath = path.join(UPLOAD_DIR, safeFileName);
  
  await fs.writeFile(filePath, fileBuffer);
  return filePath;
};

export const extractTextFromPDF = async (filePath: string): Promise<string> => {
  try {
    const data = await fs.readFile(filePath);
    const loadingTask = pdfjs.getDocument({ data });
    const pdf = await loadingTask.promise;
    
    let fullText = "";
    
    // Loop through each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += `--- Page ${i} ---\n${text}\n\n`;
    }
    
    if (!fullText.trim()) {
      return "PDF content extraction failed. This might be a scanned document.";
    }
    
    return cleanTextContent(fullText);
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return `Error processing PDF: ${error instanceof Error ? error.message : String(error)}`;
  }
};

export const cleanTextContent = (text: string): string => {
  // Remove excessive whitespace
  text = text.replace(/\s+/g, ' ');
  
  // Fix common OCR mistakes in medical text
  text = text.replace(/(\d+)\s+([a-zA-Z]+\/[a-zA-Z]+)/g, '$1$2');
  
  // Fix line breaks between words
  text = text.replace(/(\w)\s*\n\s*(\w)/g, '$1 $2');
  
  return text;
};

export const getFileType = (fileName: string): string => {
  const ext = path.extname(fileName).toLowerCase();
  
  if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(ext)) {
    return 'image';
  } else if (ext === '.pdf') {
    return 'pdf';
  } else if (['.txt', '.csv', '.docx', '.doc'].includes(ext)) {
    return 'text';
  } else if (['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.wma', '.webm'].includes(ext)) {
    return 'audio';
  } else if (['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv', '.m4v'].includes(ext)) {
    return 'video';
  } else {
    return 'unknown';
  }
};

export const validateAudioVideoFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const supportedAudioFormats = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.wma', '.webm'];
  const supportedVideoFormats = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv', '.m4v'];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 50MB limit' };
  }
  
  const fileType = getFileType(file.name);
  if (fileType !== 'audio' && fileType !== 'video') {
    return { valid: false, error: 'Please upload a valid audio or video file' };
  }
  
  const ext = path.extname(file.name).toLowerCase();
  const supportedFormats = [...supportedAudioFormats, ...supportedVideoFormats];
  
  if (!supportedFormats.includes(ext)) {
    return { valid: false, error: `Unsupported file format: ${ext}` };
  }
  
  return { valid: true };
};

export const cleanupTempFiles = async (): Promise<void> => {
  try {
    const tempDir = path.join(UPLOAD_DIR, 'temp');
    if (await fs.pathExists(tempDir)) {
      const files = await fs.readdir(tempDir);
      
      // Get files older than 1 hour
      const oneHourAgo = Date.now() - (60 * 60 * 1000);
      
      for (const file of files) {
        const filePath = path.join(tempDir, file);
        if (await fs.pathExists(filePath)) {
          const stats = await fs.stat(filePath);
          
          if (stats.mtimeMs < oneHourAgo) {
            await fs.unlink(filePath);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error cleaning up temp files:', error);
  }
};
