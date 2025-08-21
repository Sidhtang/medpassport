// Types for our application
export interface AnalysisResult {
  result: string;
  error?: string;
}

export interface FileInfo {
  name: string;
  type: string;
  size: number;
  path?: string;
}

export interface BatchResult {
  fileName: string;
  fileType: string;
  status: 'Processing' | 'Completed' | 'Error';
  result: string;
}

export interface NetworkDiagnostic {
  test: string;
  result: string;
}

// Types for form inputs
export interface MedicalImageFormData {
  reportType: string;
  userRole: string;
  apiKey?: string;
  additionalInfo?: string;
  file?: File;
  targetLanguage?: string;
}

export interface MedicalReportFormData {
  reportType: string;
  userRole: string;
  apiKey?: string;
  additionalInfo?: string;
  file?: File;
  textInput?: string;
  targetLanguage?: string;
}

export interface BatchProcessFormData {
  reportType: string;
  userRole: string;
  apiKey?: string;
  additionalInfo?: string;
  files: File[];
}

// Supported languages
export const SUPPORTED_LANGUAGES = {
  "English": "en",
  "Hindi": "hi",
  "Tamil": "ta",
  "Punjabi": "pa",
  "Marathi": "mr"
};

export const REPORT_TYPES = {
  IMAGE_TYPES: ["CT Scan", "MRI", "X-Ray", "Ultrasound", "PET Scan", "Mammogram", "Other Imaging"],
  TEXT_TYPES: ["Blood Work", "Urinalysis", "Pathology Report", "Genetic Test", "Microbiology Report", "Other Lab Test", "Medical PDF"],
  BATCH_TYPES: ["Mixed (Auto-detect)", "CT Scan", "MRI", "X-Ray", "Blood Work", "Pathology Report"]
};
