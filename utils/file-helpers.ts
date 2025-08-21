import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import { pdfjs } from 'pdfjs-dist';
import { v4 as uuidv4 } from 'uuid';
import { PassThrough } from 'stream';

// Ensure upload directory exists
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
fs.ensureDirSync(UPLOAD_DIR);
fs.ensureDirSync(path.join(UPLOAD_DIR, 'temp'));

// Initialize PDF.js worker
if (typeof window === 'undefined') {
  // We're on the server
  pdfjs.GlobalWorkerOptions.workerSrc = path.resolve('./node_modules/pdfjs-dist/build/pdf.worker.js');
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

export const saveUploadedFile = async (fileBuffer: Buffer, fileName: string): Promise<string> => {
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
  } else if (['.mp3', '.wav', '.ogg', '.m4a'].includes(ext)) {
    return 'audio';
  } else {
    return 'unknown';
  }
};

export const cleanupTempFiles = async (): Promise<void> => {
  try {
    const tempDir = path.join(UPLOAD_DIR, 'temp');
    const files = await fs.readdir(tempDir);
    
    // Get files older than 1 hour
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    
    for (const file of files) {
      const filePath = path.join(tempDir, file);
      const stats = await fs.stat(filePath);
      
      if (stats.mtimeMs < oneHourAgo) {
        await fs.unlink(filePath);
      }
    }
  } catch (error) {
    console.error('Error cleaning up temp files:', error);
  }
};
