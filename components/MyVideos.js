import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@/components/ui/icons";
import { getEpisodes } from '../functions/getVideos';

export default function MyVideos() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosData = await getEpisodes();
        setVideos(videosData);
      } catch (error) {
        setError("Failed to fetch videos");
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  // Handle switching to edit mode
  const handleEditVideo = () => {
    setIsEditing(true);
  };

  // Handle updating video details
  const handleUpdateVideo = async () => {
    if (!selectedVideo) return;
    try {
      setLoading(true);
      setError(null);
      console.log('Updating video:', selectedVideo);
      // Replace with your actual API endpoint
      const response = await fetch(`/api/videos/${selectedVideo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: selectedVideo.title }),
      });
      if (!response.ok) throw new Error("Failed to update video");
      const updatedVideo = await response.json();

      setVideos(videos.map(video => video.id === updatedVideo.id ? updatedVideo : video));
      setSelectedVideo(null);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
      console.error('Error updating video:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting video
  const handleDeleteVideo = async (videoId) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Deleting video with ID:', videoId);
      // Replace with your actual API endpoint
      const response = await fetch(`/api/videos/${videoId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete video");

      setVideos(videos.filter(video => video.id !== videoId));
      setSelectedVideo(null);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting video:', err);
    } finally {
      setLoading(false);
    }
  };

  // Render video cards
  const renderVideoCards = () => {
    return videos.map((video) => (
      <div key={video.id} className="relative bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <img
          alt="Video thumbnail"
          className="aspect-video rounded-t-lg object-cover w-full"
          src={video.thumbnail || "/placeholder.svg"} // Use a default placeholder if thumbnail is missing
        />
        <div className="mt-2">
          <h3 className="text-lg font-medium">{video.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{video.views} views</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedVideo(video);
              setIsEditing(false);
            }}
          >
            Manage
          </Button>
        </div>
      </div>
    ));
  };

  // Render modal content based on editing state
  const renderModalContent = () => {
    if (!selectedVideo) return null;

    if (isEditing) {
      return (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Edit Video</h3>
          <Input
            value={selectedVideo.title}
            onChange={(e) => setSelectedVideo({ ...selectedVideo, title: e.target.value })}
            placeholder="Video Title"
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={handleUpdateVideo}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setIsEditing(false);
                setError(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        <img
          className="aspect-video rounded-lg object-cover"
          height="180"
          src={selectedVideo.thumbnail || "/placeholder.svg"}
          width="320"
          alt={selectedVideo.title}
        />
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{selectedVideo.title}</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">{selectedVideo.views} views</div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={handleEditVideo}>Edit</Button>
            <Button variant="destructive" onClick={() => handleDeleteVideo(selectedVideo.id)}>Delete</Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <section className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Videos</h2>
          <Button size="sm" variant="outline" onClick={() => window.location.href = '/upload'}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Video
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {renderVideoCards()}
        </div>
      </section>
      {selectedVideo && (
        <Dialog open={!!selectedVideo} onOpenChange={(isOpen) => !isOpen && setSelectedVideo(null)}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg w-full max-w-[800px] p-8">
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{isEditing ? "Edit Video" : selectedVideo.title}</DialogTitle>
                  <DialogDescription>{isEditing ? "Modify your video details below." : "View details and manage your video."}</DialogDescription>
                  <DialogClose asChild>
                  </DialogClose>
                </DialogHeader>
                <div className="py-4">
                  {renderModalContent()}
                </div>
              </DialogContent>
            </div>
          </div>
        </Dialog>
      )}
    </main>
  );
}
