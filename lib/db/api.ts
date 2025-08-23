import { AnalysisResult } from '@/lib/types';
import prisma from '@/lib/db/prisma';

export async function getPreviousAnalysisResults(): Promise<AnalysisResult[]> {
  try {
    const results = await prisma.analysisResult.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });
    
    return results.map(r => ({
      result: r.result,
      error: undefined
    }));
  } catch (error) {
    console.error('Error fetching previous analysis results:', error);
    return [];
  }
}
