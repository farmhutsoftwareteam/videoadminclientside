import axios from 'axios';

// Function to upload video and thumbnail, and add metadata to the database
export const uploadVideoAndAddToDB = async (videoFile, thumbnailFile, episodeDetails, onProgress) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_SERVER}/api/videos/upload-episode`; // Use the environment variable    
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('thumbnail', thumbnailFile);
      formData.append('title', episodeDetails.title);
      formData.append('description', episodeDetails.description);
      formData.append('duration', episodeDetails.duration);
      formData.append('episodenumber', episodeDetails.episodenumber);
      formData.append('seasonnumber', episodeDetails.seasonnumber);
      formData.append('show', episodeDetails.show);
      formData.append('monetization', episodeDetails.monetization);
  
      // Send a POST request to the Express API endpoint
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${progress}%`);
          if (onProgress) onProgress(progress);
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error uploading video and metadata:', error);
      throw error;
    }
  };
