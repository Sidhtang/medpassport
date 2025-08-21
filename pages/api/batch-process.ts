import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { 
  initializeGemini,
  generateContentHash, 
  getCachedAnalysis, 
  saveToCache
} from '@/utils/ai-helpers';
import { 
  processImage, 
  extractTextFromPDF,
  getFileType
} from '@/utils/file-helpers';
import { BatchResult } from '@/lib/types';

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '10mb',
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fields, files } = await parseForm(req);
    
    const apiKey = fields.apiKey ? String(fields.apiKey) : process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const reportType = fields.reportType ? String(fields.reportType) : 'Mixed (Auto-detect)';
    const userRole = fields.userRole ? String(fields.userRole) : 'Patient';
    const additionalInfo = fields.additionalInfo ? String(fields.additionalInfo) : '';
    
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    if (!files.files) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const genAI = initializeGemini(apiKey);
    
    // Use the same model for both text and vision tasks in Gemini 2.0
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash', // Updated to stable Gemini 2.0 Flash
      generationConfig: {
        temperature: 0.4,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048, // Increased for better responses
      },
    });

    // Process each file
    const results: BatchResult[] = [];
    const uploadedFiles = Array.isArray(files.files) ? files.files : [files.files];

    for (const file of uploadedFiles) {
      const fileName = file.originalFilename || path.basename(file.filepath);
      const fileType = getFileType(fileName);
      
      const result: BatchResult = {
        fileName,
        fileType: determineReportType(fileType, reportType),
        status: 'Processing',
        result: ''
      };
      
      results.push(result);
      
      try {
        if (fileType === 'image') {
          // Process image
          const imageBuffer = await fs.readFile(file.filepath);
          const base64Image = await processImage(imageBuffer);
          
          // Check cache
          const contentHash = generateContentHash(base64Image);
          const cachedResult = getCachedAnalysis(contentHash, result.fileType, userRole);
          
          if (cachedResult) {
            result.result = cachedResult;
            result.status = 'Completed';
            continue;
          }
          
          // Create prompt for image analysis
          const prompt = `Professional analysis of ${result.fileType} for ${userRole === 'Doctor' ? 'medical practitioner' : 'patient'}.
          
          Provide a concise assessment of the visible structures and patterns in this diagnostic image.
          Include key anatomical observations and potential areas of interest.
          Context information: ${additionalInfo}
          
          Format your response to be clear and focused on key findings.`;
          
          // Prepare image data for Gemini 2.0
          const imageData = {
            inlineData: {
              data: base64Image,
              mimeType: 'image/jpeg',
            },
          };
          
          // Make API request - Gemini 2.0 can handle both text and images
          const response = await model.generateContent([prompt, imageData]);
          const responseText = response.response.text();
          
          result.result = responseText;
          result.status = 'Completed';
          
          // Save to cache
          saveToCache(contentHash, result.fileType, userRole, responseText);
        } else {
          // Process text or PDF
          let text = '';
          
          if (fileType === 'pdf') {
            text = await extractTextFromPDF(file.filepath);
          } else {
            text = await fs.readFile(file.filepath, 'utf8');
          }
          
          // Check cache
          const contentHash = generateContentHash(text);
          const cachedResult = getCachedAnalysis(contentHash, result.fileType, userRole);
          
          if (cachedResult) {
            result.result = cachedResult;
            result.status = 'Completed';
            continue;
          }
          
          // Limit text size
          if (text.length > 8000) {
            text = text.substring(0, 4000) + '...' + text.substring(text.length - 4000);
          }
          
          // Create prompt
          const prompt = `Analyze this ${result.fileType} for ${userRole === 'Doctor' ? 'healthcare professional' : 'patient'}.
          
          Content:
          ${text}
          
          Additional context: ${additionalInfo}
          
          Provide concise insights focusing on key findings, abnormal values, and actionable recommendations.
          Keep your response comprehensive but focused.`;
          
          // Make API request
          const response = await model.generateContent(prompt);
          const responseText = response.response.text();
          
          result.result = responseText;
          result.status = 'Completed';
          
          // Save to cache
          saveToCache(contentHash, result.fileType, userRole, responseText);
        }
      } catch (error) {
        result.status = 'Error';
        result.result = error instanceof Error ? error.message : 'Error processing file';
        console.error(`Error processing ${fileName}:`, error);
      } finally {
        // Clean up file
        try {
          await fs.unlink(file.filepath);
        } catch (err) {
          console.error(`Failed to delete temporary file ${file.filepath}:`, err);
        }
      }
    }

    res.status(200).json({ results });
  } catch (error) {
    console.error('Error processing batch files:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
}

const parseForm = async (req: NextApiRequest): Promise<{ fields: formidable.Fields, files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const uploadDir = '/tmp/uploads/temp';
    
    // Ensure directory exists
    try {
      fs.ensureDirSync(uploadDir);
    } catch (error) {
      console.log('Upload directory already exists or created');
    }
    
    const form = formidable({
      multiples: true,
      uploadDir,
      filename: (name, ext, part) => {
        return `${uuidv4()}${path.extname(part.originalFilename || '')}`;
      },
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });
    
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files });
    });
  });
};

const determineReportType = (fileType: string, selectedReportType: string): string => {
  if (selectedReportType !== 'Mixed (Auto-detect)') {
    return selectedReportType;
  }
  
  switch (fileType) {
    case 'image':
      return 'X-Ray';
    case 'pdf':
      return 'Medical PDF';
    case 'text':
      return 'Text Report';
    default:
      return 'Medical Document';
  }
};
