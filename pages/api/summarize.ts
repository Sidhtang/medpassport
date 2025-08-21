import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeGemini } from '@/utils/ai-helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, apiKey } = req.body;

  if (!text || text.length < 200) {
    return res.status(400).json({ error: 'Not enough content to summarize' });
  }

  const actualApiKey = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!actualApiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }

  try {
    const genAI = initializeGemini(actualApiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.0-pro',
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    // Create prompt
    const prompt = `Summarize the following medical analysis in 3-5 bullet points, highlighting only the most critical findings, potential concerns, and key recommendations:

    ${text.substring(0, 3000)}

    Format as bullet points starting with '•'
    `;

    // Make API request
    const result = await model.generateContent(prompt);
    const response = result.response;
    let responseText = response.text();

    // Ensure formatting as bullet points if not already
    if (!responseText.includes('•')) {
      const summaryLines: string[] = responseText.split('\n');
      responseText = summaryLines
        .filter((line: string) => line.trim().length > 0)
        .map((line: string) => line.trim().startsWith('•') ? line : `• ${line}`)
        .join('\n');
    }

    res.status(200).json({ result: `## Key Takeaways\n${responseText}` });
  } catch (error) {
    console.error('Error summarizing text:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
}
