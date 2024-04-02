import React, { useState, useCallback } from 'react';
import Navbar from '@/components/navbar'; // Adjust the import path as necessary

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [dragging, setDragging] = useState(false); // State to handle drag state
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [access, setAccess] = useState('public');
  const [status, setStatus] = useState('active');
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
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('category', category);
    formData.append('access', access);
    formData.append('status', status);
    formData.append('monetization', monetization ? 'subscription' : 'free');
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile); // Append the thumbnail file to formData
  
    const xhr = new XMLHttpRequest();
  
    xhr.upload.onprogress = function(event) {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete); // Update upload progress
      }
    };
  
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log("Upload successful");
        setUploadProgress(0); // Reset upload progress
        alert("Upload successful!"); // Show success alert
        // Here, you can also handle other UI updates or state resets as needed
      } else {
        console.error("Upload failed");
        alert("Upload failed. Please try again."); // Optionally, show an error alert
      }
    };
  
    xhr.onerror = function() {
      console.error("Network Error");
      alert("Network error. Please check your connection and try again."); // Show network error alert
    };
  
    xhr.open('POST', 'https://hstvvideoapp.azurewebsites.net/api/videos/upload-video', true);
    xhr.send(formData);
  };

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
          <label htmlFor="access" className="block text-sm font-bold mb-2">Access</label>
          <select
            id="access"
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="unlisted">Unlisted</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-bold mb-2">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="active">Active</option>
            <option value="processing">Processing</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>
        <div className="mb-4">
  <label htmlFor="monetization" className="block text-sm font-bold mb-2">Monetization</label>
  <label className="inline-flex items-center mt-3">
    <input
      type="checkbox"
      id="monetization"
      checked={monetization}
      onChange={(e) => setMonetization(e.target.checked)}
      className="form-checkbox h-5 w-5 text-blue-600"
    /><span className="ml-2 text-white">Enable Subscription View</span>
  </label>
</div>
<div className="mb-4">
            <label htmlFor="thumbnail" className="block text-sm font-bold mb-2">Thumbnail</label>
            <input
              type="file"
              id="thumbnail"
              onChange={handleThumbnailChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              accept="image/*" // Ensure only images can be selected
            />
          </div>
        <div className="mb-4">
  <div
    className={`p-4 border-2 ${dragging ? 'border-blue-500' : 'border-gray-300'} border-dashed rounded flex justify-center items-center`}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
  >
    <input
      type="file"
      id="video"
      onChange={handleFileChange}
      className="hidden"
    />
    <label htmlFor="video" className="cursor-pointer text-gray-700">
      {videoFile ? videoFile.name : "Click or drag a video file here to add"}
    </label>
  </div>
  <div className="mb-4">
  <div className="bg-gray-200 rounded-full h-2.5 mt-4 dark:bg-gray-700">
    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
  </div>
</div>
</div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Save Video
        </button>
      </form>
    </div>

    </>
  );
};

export default UploadVideo;