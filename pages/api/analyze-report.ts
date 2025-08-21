import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import { 
  initializeGemini, 
  generateContentHash, 
  getCachedAnalysis, 
  saveToCache,
  optimizePrompt
} from '@/utils/ai-helpers';
import { extractTextFromPDF, cleanTextContent, getFileType } from '@/utils/file-helpers';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fields, files } = await parseForm(req);
    
    const apiKey = fields.apiKey ? String(fields.apiKey) : process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const reportType = fields.reportType ? String(fields.reportType) : 'Medical Report';
    const userRole = fields.userRole ? String(fields.userRole) : 'Patient';
    const additionalInfo = fields.additionalInfo ? String(fields.additionalInfo) : '';
    const textInput = fields.textInput ? String(fields.textInput) : '';
    
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    // Get text content - either from file or direct input
    let reportText = '';
    
    if (files.report && files.report[0]) {
      const reportFile = files.report[0];
      const fileType = getFileType(reportFile.originalFilename || '');
      
      if (fileType === 'pdf') {
        reportText = await extractTextFromPDF(reportFile.filepath);
      } else {
        const fileContent = await fs.readFile(reportFile.filepath, 'utf8');
        reportText = cleanTextContent(fileContent);
      }
      
      // Clean up temporary file
      await fs.unlink(reportFile.filepath);
    } else if (textInput) {
      reportText = textInput;
    } else {
      return res.status(400).json({ error: 'No report text provided' });
    }

    // Limit text size
    if (reportText.length > 5000) {
      reportText = reportText.substring(0, 1000) + '...' + reportText.substring(reportText.length - 1000);
    }
    
    // Check cache
    const contentHash = generateContentHash(reportText);
    const cachedResult = getCachedAnalysis(contentHash, reportType, userRole);
    
    if (cachedResult) {
      return res.status(200).json({ result: cachedResult });
    }

    // Call Gemini API
    const genAI = initializeGemini(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.0-pro',
      generationConfig: {
        temperature: 0.4,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    // Create prompt
    let prompt = `Analyze ${reportType} for ${userRole === 'Doctor' ? 'healthcare professional' : 'patient'}.
    Report extract: ${reportText.substring(0, 2000)}...
    Context: ${additionalInfo ? additionalInfo : 'None'}
    Provide only key findings, abnormal values, and actionable insights.
    `;
    
    if (userRole === 'Doctor') {
      prompt += `
      Include detailed medical terminology and specific observations.
      Provide a 'Clinical Considerations' section with:
      - Potential differential diagnoses based on report findings
      - Recommended follow-up tests or studies if applicable
      - Suggested laboratory tests that may complement these findings
      - Potential treatment implications based on observed patterns
      - Correlation with clinical presentation and patient history
      - Detailed explanations of abnormal values and their significance
      - References to relevant medical literature or guidelines if applicable
      `;
    }
    
    prompt = optimizePrompt(prompt);

    // Make API request
    const result = await model.generateContent(prompt);
    const response = result.response;
    const responseText = response.text();
    
    // Save to cache
    saveToCache(contentHash, reportType, userRole, responseText);
    
    res.status(200).json({ result: responseText });
  } catch (error) {
    console.error('Error processing report:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
}

const parseForm = async (req: NextApiRequest): Promise<{ fields: formidable.Fields, files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const uploadDir = path.join(process.cwd(), 'uploads', 'temp');
    fs.ensureDirSync(uploadDir);
    
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
