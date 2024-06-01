import React, { useState, useCallback, useEffect } from 'react';
import { CloudUpload, Image } from 'lucide-react'; // Importing icons from Lucide
import Layout from '@/components/layout';
import { getShows } from '../functions/getShows'; // Adjust the import path as necessary
import { uploadVideoAndAddToDB } from '../functions/createvideo'; // Adjust the import path as necessary

const UploadEpisode = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null); // State for thumbnail file
  const [seasonNumber, setSeasonNumber] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [duration, setDuration] = useState('');
  const [show, setShow] = useState('');
  const [showOptions, setShowOptions] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [monetization, setMonetization] = useState('free');
  const [uploadProgress, setUploadProgress] = useState(0); // Add this line to track progress

  useEffect(() => {
    const fetchShowOptions = async () => {
      const shows = await getShows();
      setShowOptions(shows);
    };
    fetchShowOptions();
  }, []);

  const handleFileChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      // Automatically set the duration here
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const videoDuration = video.duration;
        setDuration(videoDuration.toFixed(2)); // Set duration in seconds
      };
      video.src = URL.createObjectURL(e.target.files[0]);
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
      seasonnumber: seasonNumber,
      episodenumber: episodeNumber,
      duration,
      show: selectedShowId, // Use the selected show ID
      monetization,
      thumbnail: thumbnailFile, // Assuming you handle thumbnail similarly
    };

    // Call the function to upload video and episode details
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

  const filteredShowOptions = showOptions.filter(option =>
    option.title.toLowerCase().includes(show.toLowerCase())
  );

  const handleShowSelect = (selectedTitle) => {
    const selectedShow = showOptions.find(option => option.title === selectedTitle);
    if (selectedShow) {
      setSelectedShowId(selectedShow.id);
    } else {
      setSelectedShowId(null); // Reset if no valid selection
    }
  };

  return (
    <Layout>
      <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label htmlFor="seasonNumber" className="block text-sm font-bold mb-2">Season Number</label>
              <input
                type="number"
                id="seasonNumber"
                value={seasonNumber}
                onChange={(e) => setSeasonNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="episodeNumber" className="block text-sm font-bold mb-2">Episode Number</label>
              <input
                type="number"
                id="episodeNumber"
                value={episodeNumber}
                onChange={(e) => setEpisodeNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-bold mb-2">Duration</label>
              <input
                type="text"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                readOnly
                required
              />
            </div>
            <div className="mb-4">
            <label htmlFor="show" className="block text-sm font-bold mb-2">
        Show
        <a href="/create-show" className="text-blue-500 ml-2">Create new show</a>
      </label>
              <input
                type="text"
                id="show"
                value={show}
                onChange={(e) => {
                  setShow(e.target.value);
                  handleShowSelect(e.target.value);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                list="show-options"
                required
              />
              <datalist id="show-options" className="max-h-40 overflow-y-auto">
                {filteredShowOptions.length > 0 ? (
                  filteredShowOptions.slice(0, 10).map((option, index) => (
                    <option key={index} value={option.title} />
                  ))
                ) : (
                  <option value="Create new show">Create new show</option>
                )}
              </datalist>
            </div>
            <div className="mb-4">
              <label htmlFor="monetization" className="block text-sm font-bold mb-2">Monetization</label>
              <select
                id="monetization"
                value={monetization}
                onChange={(e) => setMonetization(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div className="mb-4 col-span-2">
              <label htmlFor="description" className="block text-sm font-bold mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="mb-4">
              <label htmlFor="thumbnail" className="block text-sm font-bold mb-2">Thumbnail</label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="thumbnail"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500"
                >
                  <Image size={40} className="text-gray-500" />
                  <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
                  <input
                    type="file"
                    id="thumbnail"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="videoFile" className="block text-sm font-bold mb-2">Video File</label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="videoFile"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500"
                >
                  <CloudUpload size={40} className="text-gray-500" />
                  <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
                  <input
                    type="file"
                    id="videoFile"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="video/*"
                  />
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Upload Episode
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UploadEpisode;
