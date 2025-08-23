# MedPassport - Advanced Medical Analysis Platform

A modern, feature-rich React application for analyzing medical reports, images, and audio/video using Google's Gemini AI. MedPassport provides healthcare professionals and patients with comprehensive AI-powered insights from various medical content types in an intuitive, visually appealing interface.

## Features

- **Enhanced UI/UX** with vibrant colors, intuitive navigation, and responsive design
- **Modern Dashboard** providing quick access to all platform capabilities
- **Medical Image Analysis** (X-rays, CT scans, MRIs, etc.)
- **Medical Report Processing** for PDFs and lab reports
- **Audio/Video Analysis** for heart sounds, lung sounds, medical videos
- **Batch Processing** of multiple files
- **Multi-language Support** with translation capability
- **Educational Resources** integrated throughout the application
- **PDF Report Generation** with professional formatting
- **Network Diagnostics** for troubleshooting connectivity issues

## Technology Stack

- **Frontend**: React, Next.js, TailwindCSS with custom design system
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **AI**: Google Gemini AI (gemini-1.0-pro and gemini-1.0-pro-vision models)
- **PDF Processing**: pdf-lib, pdfjs-dist
- **Image Processing**: sharp
- **Deployment**: Vercel

## UI/UX Features

- **Vibrant Color Palette**: Engaging color scheme optimized for medical applications
- **Component Library**: Custom-designed cards, buttons, and UI elements
- **Responsive Layout**: Adaptive design that works on desktop, tablet, and mobile
- **Intuitive Navigation**: Clear information hierarchy with smart sidebar
- **Educational Content**: Built-in resources to help users understand medical analyses
- **Interactive Dashboard**: At-a-glance overview of platform capabilities
- **Progress Visualization**: Clear visual feedback on analysis processes
- **Accessibility Features**: Designed with accessibility in mind

## Prerequisites

- Node.js 16+ and npm
- Google AI API key (Gemini)

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/medical-analyzer.git
cd medical-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your API key:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
ANALYSIS_CACHE_DIR=./cache
UPLOAD_DIR=./uploads
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

This application is optimized for deployment on Vercel. Follow these steps to deploy:

1. Create a Vercel account at [vercel.com](https://vercel.com) if you don't have one.

2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy the application:
```bash
vercel
```

5. Set up environment variables in the Vercel dashboard:
   - Go to your project settings in the Vercel dashboard
   - Navigate to "Environment Variables"
   - Add your `NEXT_PUBLIC_GEMINI_API_KEY` variable

6. For production deployment:
```bash
vercel --prod
```

## Project Structure

```
medical-analyzer/
├── components/               # React components
├── lib/                      # Shared utilities and types
├── pages/                    # Next.js pages and API routes
│   ├── api/                  # Backend API endpoints
│   ├── _app.tsx              # App component
│   └── index.tsx             # Main page
├── public/                   # Static assets
├── styles/                   # Global styles
├── utils/                    # Utility functions
├── .env.local                # Environment variables (local)
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
├── tailwind.config.js        # TailwindCSS configuration
├── tsconfig.json             # TypeScript configuration
└── vercel.json               # Vercel configuration
```

## API Endpoints

- `/api/analyze-image` - Analyze medical images
- `/api/analyze-report` - Analyze PDF and text reports
- `/api/batch-process` - Process multiple files
- `/api/translate` - Translate analysis results
- `/api/summarize` - Generate summaries
- `/api/generate-pdf` - Create PDF reports
- `/api/diagnostics` - Run network diagnostics

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool is provided for informational purposes only and does not replace professional medical advice. Always consult with a healthcare provider for medical guidance.
