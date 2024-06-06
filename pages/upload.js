import React, { useState, useCallback, useEffect } from "react";
import { CloudUpload, Image } from "lucide-react"; // Importing icons from Lucide
import Layout from "@/components/layout";
import { getShows } from "../functions/getShows"; // Adjust the import path as necessary
import { uploadVideoAndAddToDB } from "../functions/createvideo"; // Adjust the import path as necessary

const UploadEpisode = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState(""); // State for thumbnail URL
  const [seasonNumber, setSeasonNumber] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [show, setShow] = useState("");
  const [showOptions, setShowOptions] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [monetization, setMonetization] = useState("free");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchShowOptions = async () => {
      const shows = await getShows();
      setShowOptions(shows);
    };
    fetchShowOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Check if the URLs are valid and not YouTube URLs
    const isValidURL = (url) => {
      try {
        const newUrl = new URL(url);
        return newUrl.hostname !== 'www.youtube.com' && newUrl.hostname !== 'youtube.com';
      } catch (_) {
        return false;
      }
    };
  
    if (!isValidURL(videoURL) || !isValidURL(thumbnailURL)) {
      alert("Invalid URL. Please provide valid Azure Blob Storage URLs.");
      setIsLoading(false);
      return;
    }

    const episodeDetails = {
      title,
      description,
      seasonnumber: seasonNumber,
      episodenumber: episodeNumber,
      thumbnail: thumbnailURL,
      video_url: videoURL,
      show: selectedShowId, // Use the selected show ID
      isFree: monetization === "free",
    };
  
    try {
      const response = await uploadVideoAndAddToDB(episodeDetails);
      console.log('Upload and DB entry successful:', response);
      alert('Upload successful!');
      setTimeout(() => {
        window.location.href = `/shows/${selectedShowId}`;
      }, 5000); // Redirect after 5 seconds
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredShowOptions = showOptions.filter((option) =>
    option.title.toLowerCase().includes(show.toLowerCase())
  );

  const handleShowSelect = (selectedTitle) => {
    const selectedShow = showOptions.find(
      (option) => option.title === selectedTitle
    );
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
              <label htmlFor="title" className="block text-sm font-bold mb-2">
                Title
              </label>
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
              <label
                htmlFor="seasonNumber"
                className="block text-sm font-bold mb-2"
              >
                Season Number
              </label>
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
              <label
                htmlFor="episodeNumber"
                className="block text-sm font-bold mb-2"
              >
                Episode Number
              </label>
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
              <label htmlFor="show" className="block text-sm font-bold mb-2">
                Show
                <a href="/create-show" className="text-blue-500 ml-2">
                  Create new show
                </a>
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
                  filteredShowOptions
                    .slice(0, 10)
                    .map((option, index) => (
                      <option key={index} value={option.title} />
                    ))
                ) : (
                  <option value="Create new show">Create new show</option>
                )}
              </datalist>
            </div>
            <div className="mb-4">
              <label
                htmlFor="monetization"
                className="block text-sm font-bold mb-2"
              >
                Monetization
              </label>
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
              <label
                htmlFor="description"
                className="block text-sm font-bold mb-2"
              >
                Description
              </label>
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
              <label
                htmlFor="thumbnailURL"
                className="block text-sm font-bold mb-2"
              >
                Thumbnail URL
              </label>
              <input
                type="text"
                id="thumbnailURL"
                value={thumbnailURL}
                onChange={(e) => setThumbnailURL(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <p className="text-sm text-gray-500">No YouTube URLs, only Azure Blob URLs.</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="videoURL"
                className="block text-sm font-bold mb-2"
              >
                Video URL
              </label>
              <input
                type="text"
                id="videoURL"
                value={videoURL}
                onChange={(e) => setVideoURL(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <p className="text-sm text-gray-500">No YouTube URLs, only Azure Blob URLs.</p>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Upload Episode'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UploadEpisode;
