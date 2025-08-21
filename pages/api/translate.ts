import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeGemini } from '@/utils/ai-helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, targetLanguage, apiKey } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  if (!targetLanguage) {
    return res.status(400).json({ error: 'Target language is required' });
  }

  const actualApiKey = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!actualApiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }

  try {
    // Skip translation if target language is English
    if (targetLanguage === 'English') {
      return res.status(200).json({ result: text });
    }

    const genAI = initializeGemini(actualApiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash', // Updated to stable Gemini 2.0 Flash
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048, // Increased for better responses
      },
    });

    // Create prompt
    const prompt = `Translate the following medical analysis to ${targetLanguage}.
    Maintain all medical terminology but present it in a way that's natural in the target language.
    Keep formatting like bullet points, paragraphs, and section headings intact.
    
    Text to translate:
    ${text}
    `;

    // Make API request
    const result = await model.generateContent(prompt);
    const response = result.response;
    const responseText = response.text();

    res.status(200).json({ result: responseText });
  } catch (error) {
    console.error('Error translating text:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
}
