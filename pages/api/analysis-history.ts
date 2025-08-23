import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const results = await prisma.analysisResult.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10,
      select: {
        id: true,
        reportType: true,
        result: true,
        userRole: true,
        createdAt: true
      }
    });

    res.status(200).json({ results });
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      results: [] 
    });
  }
}
