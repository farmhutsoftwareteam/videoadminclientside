import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import { getShows } from "../functions/getShows";
import { uploadVideoAndAddToDB } from "../functions/createvideo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function UploadEpisode() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [seasonNumber, setSeasonNumber] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [show, setShow] = useState("");
  const [showOptions, setShowOptions] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [monetization, setMonetization] = useState("free");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      show: selectedShowId,
      isFree: monetization === "free",
    };

    try {
      const response = await uploadVideoAndAddToDB(episodeDetails);
      console.log('Upload and DB entry successful:', response);
      alert('Upload successful!');
      setTimeout(() => {
        window.location.href = `/shows/${selectedShowId}`;
      }, 5000);
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
      setSelectedShowId(null);
    }
  };

  return (

      <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Title
            </label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of the episode"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="seasonNumber" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Season Number
            </label>
            <Input
              type="number"
              id="seasonNumber"
              value={seasonNumber}
              onChange={(e) => setSeasonNumber(e.target.value)}
              placeholder="Enter the season number"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="episodeNumber" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Episode Number
            </label>
            <Input
              type="number"
              id="episodeNumber"
              value={episodeNumber}
              onChange={(e) => setEpisodeNumber(e.target.value)}
              placeholder="Enter the episode number"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="show" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Show
              <Link href="/show" className="text-red-500 ml-2 hover:underline">
                Create new show
              </Link>
            </label>
            <Input
              type="text"
              id="show"
              value={show}
              onChange={(e) => {
                setShow(e.target.value);
                handleShowSelect(e.target.value);
              }}
              placeholder="Search for an existing show"
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
            <label htmlFor="monetization" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Monetization
            </label>
            <select
              id="monetization"
              value={monetization}
              onChange={(e) => setMonetization(e.target.value)}
              className="w-full py-2 px-3 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a brief description of the episode"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="thumbnailURL" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Thumbnail URL
            </label>
            <Input
              type="text"
              id="thumbnailURL"
              value={thumbnailURL}
              onChange={(e) => setThumbnailURL(e.target.value)}
              placeholder="Enter the URL for the thumbnail image"
              required
            />
            <p className="text-sm text-gray-500 mt-1">No YouTube URLs, only Azure Blob URLs.</p>
          </div>
          <div className="mb-4">
            <label htmlFor="videoURL" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Video URL
            </label>
            <Input
              type="text"
              id="videoURL"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
              placeholder="Enter the URL for the video file"
              required
            />
            <p className="text-sm text-gray-500 mt-1">No YouTube URLs, only Azure Blob URLs.</p>
          </div>
          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Upload Episode'}
          </Button>
        </form>
      </div>

  );
}
