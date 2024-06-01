import axios from 'axios';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB per chunk

export const uploadVideoAndAddToDB = async (videoFile, thumbnailFile, episodeDetails, onProgress) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_SERVER}/api/videos/upload-episode`; // Use the environment variable    
    const formData = new FormData();
    formData.append('thumbnail', thumbnailFile);
    formData.append('title', episodeDetails.title);
    formData.append('description', episodeDetails.description);
    formData.append('duration', episodeDetails.duration);
    formData.append('episodenumber', episodeDetails.episodenumber);
    formData.append('seasonnumber', episodeDetails.seasonnumber);
    formData.append('show', episodeDetails.show);
    formData.append('monetization', episodeDetails.monetization);

    const totalChunks = Math.ceil(videoFile.size / CHUNK_SIZE);
    let uploadedChunks = 0;

    for (let start = 0; start < videoFile.size; start += CHUNK_SIZE) {
      const chunk = videoFile.slice(start, start + CHUNK_SIZE);
      formData.set('video', chunk, videoFile.name);

      await retry(async () => {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(((uploadedChunks + progressEvent.loaded / progressEvent.total) / totalChunks) * 100);
            console.log(`Upload Progress: ${progress}%`);
            if (onProgress) onProgress(progress);
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to upload chunk');
        }
      });

      uploadedChunks++;
    }

    return { message: 'Upload successful' };
  } catch (error) {
    console.error('Error uploading video and metadata:', error);
    throw error;
  }
};