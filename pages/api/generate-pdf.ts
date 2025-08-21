import type { NextApiRequest, NextApiResponse } from 'next';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { analysisResult, reportType, userRole } = req.body;

  if (!analysisResult) {
    return res.status(400).json({ error: 'Analysis result is required' });
  }

  try {
    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    
    // Add a page
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const margin = 50;
    const textWidth = width - 2 * margin;
    
    // Add title
    page.drawText('Medical Report Analysis', {
      x: width / 2 - 100,
      y: height - margin,
      size: 24,
      font: timesRomanBoldFont,
      color: rgb(0, 0, 0.5)
    });
    
    // Add subtitle
    page.drawText(`Report Type: ${reportType}`, {
      x: margin,
      y: height - margin - 40,
      size: 12,
      font: timesRomanFont,
      color: rgb(0, 0, 0)
    });
    
    page.drawText(`User Role: ${userRole}`, {
      x: margin,
      y: height - margin - 60,
      size: 12,
      font: timesRomanFont,
      color: rgb(0, 0, 0)
    });
    
    page.drawText(`Generated: ${new Date().toLocaleString()}`, {
      x: margin,
      y: height - margin - 80,
      size: 12,
      font: timesRomanFont,
      color: rgb(0, 0, 0)
    });
    
    // Draw a separator line
    page.drawLine({
      start: { x: margin, y: height - margin - 100 },
      end: { x: width - margin, y: height - margin - 100 },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7)
    });
    
    // Format analysis text for rendering
    const text = analysisResult;
    const textLines = text.split('\n');
    
    let yPosition = height - margin - 120;
    const lineHeight = 15;
    
    // Render text
    for (const line of textLines) {
      if (yPosition < margin) {
        // Add a new page if we've reached the bottom margin
        const newPage = pdfDoc.addPage();
        yPosition = height - margin;
      }
      
      page.drawText(line, {
        x: margin,
        y: yPosition,
        size: 11,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
        lineHeight,
        maxWidth: textWidth
      });
      
      yPosition -= lineHeight;
    }
    
    // Add footer
    page.drawText('This analysis is provided for informational purposes only.', {
      x: margin,
      y: margin - 15,
      size: 9,
      font: timesRomanFont,
      color: rgb(0.5, 0.5, 0.5)
    });
    
    page.drawText('It does not constitute medical advice. Consult with healthcare professionals.', {
      x: margin,
      y: margin - 30,
      size: 9,
      font: timesRomanFont,
      color: rgb(0.5, 0.5, 0.5)
    });
    
    // Serialize PDF to bytes
    const pdfBytes = await pdfDoc.save();
    
    // Return PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=medical_report_${Date.now()}.pdf`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
}
