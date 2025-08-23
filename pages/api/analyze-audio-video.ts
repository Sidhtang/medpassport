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
import { processAudioVideo, extractAudioFeatures, getFileType } from '@/utils/file-helpers';
import path from 'path';
import prisma from '@/lib/db/prisma';

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
    const reportType = fields.reportType ? String(fields.reportType) : 'Heart Sounds Analysis';
    const userRole = fields.userRole ? String(fields.userRole) : 'Patient';
    const additionalInfo = fields.additionalInfo ? String(fields.additionalInfo) : '';
    
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    if (!files.audioVideo || !Array.isArray(files.audioVideo) || !files.audioVideo[0]) {
      return res.status(400).json({ error: 'No audio/video file uploaded' });
    }

    // Process the audio/video file
    const mediaFile = files.audioVideo[0];
    const fileBuffer = await fs.readFile(mediaFile.filepath);
    const fileType = getFileType(mediaFile.originalFilename || '');
    
    let processedData: string;
    let mimeType: string;
    
    if (fileType === 'video') {
      // For video files, extract frames for analysis
      const { base64Data, extractedAudioFeatures } = await processAudioVideo(fileBuffer, 'video');
      processedData = base64Data;
      mimeType = 'video/mp4';
    } else if (fileType === 'audio') {
      // For audio files, extract features and convert for analysis
      const audioFeatures = await extractAudioFeatures(fileBuffer);
      processedData = audioFeatures;
      mimeType = 'audio/wav';
    } else {
      throw new Error('Unsupported file type. Please upload audio or video files.');
    }
    
    // Check cache
    const contentHash = generateContentHash(fileBuffer);
    const cachedResult = getCachedAnalysis(contentHash, reportType, userRole);
    
    if (cachedResult) {
      await fs.unlink(mediaFile.filepath);
      return res.status(200).json({ result: cachedResult });
    }

    // Call Gemini API
    const genAI = initializeGemini(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.4,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    // Create specialized prompt based on analysis type
    let prompt = createAnalysisPrompt(reportType, userRole, additionalInfo);
    
    let result;
    
    if (fileType === 'video') {
      // For video analysis, use the multimodal capabilities
      const videoData = {
        inlineData: {
          data: processedData,
          mimeType: 'video/mp4',
        },
      };
      
      result = await model.generateContent([prompt, videoData]);
    } else {
      // For audio analysis, provide audio features in text format
      const audioAnalysisPrompt = `${prompt}

Audio Analysis Data:
${processedData}

Please analyze these audio characteristics and provide insights based on the medical context.`;
      
      result = await model.generateContent(audioAnalysisPrompt);
    }

    const response = result.response;
    const responseText = response.text();
    
    // Filter out unhelpful responses
    const filteredResponse = filterUnhelpfulResponses(responseText);
    
    // Save to cache
    saveToCache(contentHash, reportType, userRole, filteredResponse);
    
    // Save result to database
    try {
      await prisma.analysisResult.create({
        data: {
          reportType,
          result: filteredResponse,
          userRole,
          additionalInfo: additionalInfo || null,
          targetLanguage: fields.targetLanguage ? String(fields.targetLanguage) : null
        }
      });
    } catch (dbError) {
      console.error('Error saving to database:', dbError);
      // Continue even if database save fails
    }
    
    // Clean up temporary file
    await fs.unlink(mediaFile.filepath);
    
    res.status(200).json({ result: filteredResponse });
  } catch (error) {
    console.error('Error processing audio/video:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
}

function createAnalysisPrompt(reportType: string, userRole: string, additionalInfo: string): string {
  const basePrompt = `Professional analysis of ${reportType} for ${userRole === 'Doctor' ? 'medical practitioner' : 'patient'}.`;
  
  let specificInstructions = '';
  
  switch (reportType) {
    case 'Heart Sounds Analysis':
      specificInstructions = `
Analyze the cardiac auscultation recording focusing on:
1. Heart rate and rhythm patterns
2. Presence of murmurs, gallops, or extra sounds
3. S1 and S2 heart sound characteristics
4. Any abnormal sounds (S3, S4, clicks, rubs)
5. Timing and intensity of sounds
6. Clinical significance of findings`;
      break;
      
    case 'Lung Sounds Analysis':
      specificInstructions = `
Analyze the pulmonary auscultation recording focusing on:
1. Breathing pattern and rate
2. Presence of adventitious sounds (crackles, wheezes, rhonchi)
3. Air entry quality in different lung zones
4. Presence of stridor or pleural friction rubs
5. Respiratory phase timing
6. Clinical implications`;
      break;
      
    case 'Voice Pattern Analysis':
      specificInstructions = `
Analyze the voice recording for:
1. Voice quality (hoarseness, breathiness, roughness)
2. Pitch and volume variations
3. Speech articulation clarity
4. Fluency and rhythm
5. Signs of vocal cord dysfunction
6. Neurological speech patterns`;
      break;
      
    case 'Ultrasound Video Analysis':
      specificInstructions = `
Analyze the ultrasound video focusing on:
1. Image quality and probe positioning
2. Anatomical structures visible
3. Movement patterns and dynamics
4. Echogenicity and texture patterns
5. Measurements and dimensions
6. Pathological findings`;
      break;
      
    case 'Movement/Gait Analysis':
      specificInstructions = `
Analyze the movement/gait video for:
1. Walking pattern and stride characteristics
2. Balance and coordination
3. Posture and alignment
4. Range of motion in joints
5. Signs of neurological impairment
6. Compensatory movements`;
      break;
      
    default:
      specificInstructions = `
Provide a comprehensive analysis of the audio/video content focusing on:
1. Key observable/audible features
2. Patterns and abnormalities
3. Clinical significance
4. Potential diagnostic considerations`;
  }
  
  const contextSection = additionalInfo ? `
Clinical Context: ${additionalInfo}` : '';
  
  const doctorAdditions = userRole === 'Doctor' ? `

Additional Clinical Considerations:
- Differential diagnoses based on findings
- Recommended follow-up studies or tests
- Treatment implications
- Correlation with patient history and physical examination
- Technical quality assessment of the recording
- Limitations of the analysis` : '';

  return `${basePrompt}
${specificInstructions}
${contextSection}

Format your response as a structured analysis with clear sections:
1. **Technical Quality Assessment**
2. **Primary Findings**
3. **Clinical Interpretation**
4. **Recommendations**
5. **Important Notes**

${doctorAdditions}

Highlight significant abnormalities in **bold text**.`;
}

const parseForm = async (req: NextApiRequest): Promise<{ fields: formidable.Fields, files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const uploadDir = '/tmp/uploads/temp';
    
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
      maxFileSize: 50 * 1024 * 1024, // 50MB for audio/video files
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
