export async function analyzeAudioVideo(data: AudioVideoFormData): Promise<AnalysisResult> {
  try {
    const formData = new FormData();
    formData.append('apiKey', data.apiKey || '');
    formData.append('reportType', data.reportType);
    formData.append('userRole', data.userRole);
    formData.append('additionalInfo', data.additionalInfo || '');
    if (data.file) {
      formData.append('audioVideo', data.file);
    }

    const response = await axios.post('/api/analyze-audio-video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000, // 2 minutes timeout for larger audio/video files
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Error analyzing audio/video');
    }
    throw new Error('Error processing request');
  }
}
