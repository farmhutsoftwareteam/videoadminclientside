import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getShows } from "../functions/getShows";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createEpisode } from "../functions/createEpisode";
import Link from "next/link";
import { ChevronLeft } from 'lucide-react';
import axios from 'axios';

export default function UploadEpisode() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
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
      try {
        const shows = await getShows();
        setShowOptions(shows);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };
    fetchShowOptions();
  }, []);
  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith('image/')) {
      alert('Please upload a valid image file for the thumbnail.');
      return;
    }
    setThumbnailFile(file);
  };
  
  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith('video/')) {
      alert('Please upload a valid video file.');
      return;
    }
    setVideoFile(file);
  };
  
  const handleFileUpload = async (file, container) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('container', container);

    try {
      const response = await axios.post('http://localhost:8080/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('File upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Uploading thumbnail...");
      const thumbnailURL = await handleFileUpload(thumbnailFile, "1");
      console.log("Thumbnail uploaded:", thumbnailURL);

      console.log("Uploading video...");
      const videoURL = await handleFileUpload(videoFile, "2");
      console.log("Video uploaded:", videoURL);

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

      console.log("Creating episode with details:", episodeDetails);
      await createEpisode(episodeDetails);

      alert('Upload successful!');
      router.push(`/show`);
    } catch (error) {
      console.error("Error during upload:", error);
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
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
        <button
          className="mb-4 text-red-500 dark:text-gray-300 flex items-center"
          onClick={() => router.push('/dashboard')}
        >
          <ChevronLeft className="mr-2 text-red-500" />
          Back to Home
        </button>
        <form onSubmit={handleSubmit}>
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
                filteredShowOptions.slice(0, 100).map((option, index) => (
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
            <label htmlFor="thumbnailFile" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Thumbnail File
            </label>
            <Input
              type="file"
              id="thumbnailFile"
              accept="image/*"
              onChange={handleThumbnailFileChange}
              required
            />
            <p className="text-sm text-gray-500 mt-1">Upload a valid image file.</p>
          </div>
          <div className="mb-4">
            <label htmlFor="videoFile" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Video File
            </label>
            <Input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={handleVideoFileChange}
              required
            />
            <p className="text-sm text-gray-500 mt-1">Upload a valid video file.</p>
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
    </div>
  );
};  
