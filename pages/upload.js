import React, { useState, useCallback } from 'react';
import Navbar from '@/components/navbar'; // Adjust the import path as necessary
import { uploadVideoAndAddToDB } from '../functions/createvideo'; // Adjust the import path as necessary


const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [dragging, setDragging] = useState(false); // State to handle drag state
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  
  const [monetization, setMonetization] = useState('free');
  const [uploadProgress, setUploadProgress] = useState(0); // Add this line to track progress
  const [thumbnailFile, setThumbnailFile] = useState(null); // State for thumbnail file



  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setVideoFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  }, []);

  const handleThumbnailChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const episodeDetails = {
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()), // Assuming tags are entered as comma-separated values
      category,
      access,
      status,
      monetization: monetization ? 'subscription' : 'free',
      thumbnail: thumbnailFile // Assuming you handle thumbnail similarly
    };

    // Call the function from createvideo.js
    uploadVideoAndAddToDB(videoFile, episodeDetails)
      .then(response => {
        console.log('Upload and DB entry successful:', response);
        setUploadProgress(0); // Reset upload progress
        alert('Upload successful!');
      })
      .catch(error => {
        console.error('Upload failed:', error);
        alert('Upload failed. Please try again.');
      });
  };

 // Inside the UploadVideo component
return (
  <>
    <Navbar />
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-sm font-bold mb-2">Genre</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="director" className="block text-sm font-bold mb-2">Director</label>
          <input
            type="text"
            id="director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="seasons" className="block text-sm font-bold mb-2">Seasons</label>
          <input
            type="number"
            id="seasons"
            value={seasons}
            onChange={(e) => setSeasons(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-bold mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-bold mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-bold mb-2">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-sm font-bold mb-2">Thumbnail</label>
          <input
            type="file"
            id="thumbnail"
            onChange={handleThumbnailChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            accept="image/*"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">

            Upload Show
          </button>
        </form>
      </div>
    </>
  );
};
         


export default UploadVideo;