import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import { 
  initializeGemini, 
  generateContentHash, 
  getCachedAnalysis, 
  saveToCache, 
  filterUnhelpfulResponses 
} from '@/utils/ai-helpers';
import { processImage } from '@/utils/file-helpers';
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
    const reportType = fields.reportType ? String(fields.reportType) : 'X-Ray';
    const userRole = fields.userRole ? String(fields.userRole) : 'Patient';
    const additionalInfo = fields.additionalInfo ? String(fields.additionalInfo) : '';
    
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    if (!files.image || !Array.isArray(files.image) || !files.image[0]) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // Process the image
    const imageFile = files.image[0];
    const imageBuffer = await fs.readFile(imageFile.filepath);
    const base64Image = await processImage(imageBuffer);
    
    // Check cache
    const contentHash = generateContentHash(base64Image);
    const cachedResult = getCachedAnalysis(contentHash, reportType, userRole);
    
    if (cachedResult) {
      return res.status(200).json({ result: cachedResult });
    }

    // Call Gemini API
    const genAI = initializeGemini(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.0-pro-vision',
      generationConfig: {
        temperature: 0.4,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    // Create prompt
    const prompt = `Professional analysis of ${reportType} for ${userRole === 'Doctor' ? 'medical practitioner' : 'patient'}.

    Provide a detailed assessment of the visible structures and patterns in this diagnostic image.
    Include anatomical observations, notable features, and potential areas of interest.
    Context information: ${additionalInfo ? additionalInfo : 'None provided'}

    Format your response as a doctor explaining to the patient focusing on:
    1. Key findings and their implications
    2. Potential diagnoses and their explanations
    3. Recommended next steps for the patient
    4. Any immediate actions the patient should take
    5. Explain visible features in accessible language, formatted as if the doctor is explaining the report to the patient
    6. Highlight the main factors causing the problem in **bold text**
    
    ${userRole === 'Doctor' ? `
    Include technical terminology and specific radiological observations.
    Additionally, provide a 'Clinical Considerations' section with:
    - Potential differential diagnoses based on imaging findings
    - Recommended follow-up imaging studies if applicable
    - Suggested laboratory tests that may complement these findings
    - Potential treatment implications based on observed patterns
    - Correlation with clinical presentation and patient history
    - Detailed anatomical descriptions and any abnormalities noted
    - Discussion on the severity and urgency of findings
    - References to relevant medical literature or guidelines if applicable
    -Highlight the main factors causing the problem, Display it in bold characters.
    ` : ''}`;

    // Prepare image data
    const imageData = {
      inlineData: {
        data: base64Image,
        mimeType: 'image/jpeg',
      },
    };

    // Make API request
    const result = await model.generateContent([prompt, imageData]);
    const response = result.response;
    const responseText = response.text();
    
    // Filter out unhelpful responses
    const filteredResponse = filterUnhelpfulResponses(responseText);
    
    // Save to cache
    saveToCache(contentHash, reportType, userRole, filteredResponse);
    
    // Clean up temporary file
    await fs.unlink(imageFile.filepath);
    
    res.status(200).json({ result: filteredResponse });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
}

const parseForm = async (req: NextApiRequest): Promise<{ fields: formidable.Fields, files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const uploadDir = '/tmp/uploads/temp'; // Changed this line
    
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
