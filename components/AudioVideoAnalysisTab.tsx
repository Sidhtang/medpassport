import React, { useState, useRef } from 'react';
import { AnalysisResult, SUPPORTED_LANGUAGES, REPORT_TYPES } from '@/lib/types';
import { analyzeAudioVideo, translateText, summarizeAnalysis, generatePdfReport } from '@/lib/api';

const AudioVideoAnalysisTab: React.FC<{ apiKey: string; userRole: string }> = ({ apiKey, userRole }) => {
  const [reportType, setReportType] = useState<string>(REPORT_TYPES.AUDIO_VIDEO_TYPES[0]);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | undefined>(undefined);
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('English');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [summaryResult, setSummaryResult] = useState<string>('');
  const [summarizing, setSummarizing] = useState<boolean>(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setRecordedBlob(undefined);
      
      // Create preview for video files
      if (selectedFile.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFilePreview(event.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(undefined);
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: reportType.includes('Video') 
      });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { 
          type: reportType.includes('Video') ? 'video/webm' : 'audio/webm' 
        });
        setRecordedBlob(blob);
        setFile(undefined);
        
        // Create preview for video recordings
        if (reportType.includes('Video')) {
          const url = URL.createObjectURL(blob);
          setFilePreview(url);
        }
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError('Failed to start recording. Please check your microphone/camera permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult('');
    setSummaryResult('');
    
    const fileToAnalyze = file || (recordedBlob ? new File([recordedBlob], 
      `recording.${reportType.includes('Video') ? 'webm' : 'webm'}`, 
      { type: recordedBlob.type }
    ) : undefined);
    
    if (!fileToAnalyze) {
      setError('Please upload a file or record audio/video');
      setLoading(false);
      return;
    }
    
    try {
      const formData: AudioVideoFormData = {
        reportType,
        userRole,
        apiKey,
        additionalInfo,
        file: fileToAnalyze,
        targetLanguage
      };
      
      const response = await analyzeAudioVideo(formData);
      
      if (response.error) {
        setError(response.error);
      } else if (targetLanguage !== 'English') {
        const translatedText = await translateText(response.result, targetLanguage, apiKey);
        setResult(translatedText);
      } else {
        setResult(response.result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    setSummarizing(true);
    try {
      const summary = await summarizeAnalysis(result, apiKey);
      setSummaryResult(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during summarization');
    } finally {
      setSummarizing(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const pdfBlob = await generatePdfReport(result, reportType, userRole);
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `audio_video_report_${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
    }
  };

  const getFileTypeHelperText = () => {
    if (reportType.includes('Heart') || reportType.includes('Lung')) {
      return 'Upload or record heart/lung sounds (stethoscope recordings)';
    } else if (reportType.includes('Ultrasound')) {
      return 'Upload ultrasound video files showing real-time imaging';
    } else if (reportType.includes('Voice')) {
      return 'Upload or record voice samples for speech pattern analysis';
    } else if (reportType.includes('Movement')) {
      return 'Upload videos showing patient movement, gait, or physical examination';
    }
    return 'Upload audio or video files for medical analysis';
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Audio & Video Analysis</h2>
      <p className="mb-4">{getFileTypeHelperText()}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Analysis Type</label>
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {REPORT_TYPES.AUDIO_VIDEO_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Upload Audio/Video File</label>
          <input 
            type="file" 
            accept="audio/*,video/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            disabled={isRecording}
          />
          
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={startRecording}
              disabled={isRecording || loading}
              className={`px-3 py-1 rounded text-sm ${
                isRecording || loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isRecording ? 'Recording...' : 
               (reportType.includes('Video') ? 'Start Video Recording' : 'Start Audio Recording')}
            </button>
            
            {isRecording && (
              <button
                type="button"
                onClick={stopRecording}
                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
              >
                Stop Recording
              </button>
            )}
          </div>
          
          {filePreview && reportType.includes('Video') && (
            <div className="mt-2">
              <video 
                src={filePreview} 
                controls 
                className="max-h-40 rounded border"
                preload="metadata"
              />
            </div>
          )}
          
          {recordedBlob && !reportType.includes('Video') && (
            <div className="mt-2">
              <audio 
                src={URL.createObjectURL(recordedBlob)} 
                controls 
                className="w-full"
              />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Clinical Context (symptoms, patient history, examination findings)
          </label>
          <textarea 
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Describe the clinical context, symptoms, or specific areas of concern..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Translate to</label>
          <select 
            value={targetLanguage} 
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {Object.keys(SUPPORTED_LANGUAGES).map((language) => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          disabled={loading || (!file && !recordedBlob)}
          className={`w-full p-2 rounded font-medium ${
            loading || (!file && !recordedBlob) 
              ? 'bg-gray-400' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? 'Analyzing...' : 'Analyze Audio/Video'}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {result && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Analysis Results</h3>
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Download PDF
            </button>
          </div>
          <div className="p-4 bg-gray-50 border rounded whitespace-pre-wrap">
            {result}
          </div>
          
          <div className="mt-4">
            <button
              onClick={handleSummarize}
              disabled={summarizing || !result}
              className={`px-4 py-2 rounded ${
                summarizing || !result 
                  ? 'bg-gray-400' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {summarizing ? 'Summarizing...' : 'Summarize Analysis'}
            </button>
          </div>
          
          {summaryResult && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Summary</h3>
              <div className="p-4 bg-blue-50 border rounded whitespace-pre-wrap">
                {summaryResult}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioVideoAnalysisTab;
