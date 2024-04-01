import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authProvider';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Eye, BarChart2 } from 'lucide-react'; // Importing BarChart2 icon along with Eye
import Navbar from '@/components/navbar';




const Videos = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const apiUrl = 'https://hstvvideoapp.azurewebsites.net/api'; // Base API URL

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      fetch(`${apiUrl}/videos`)
        .then(response => response.json())
        .then(data => {
          // Since the API returns absolute URLs for filePath and thumbnail,
          // there's no need to modify them.
          setVideos(data); // Directly use the data received from the API.
          console.log(data);
        })
        .catch(error => console.error('Error fetching videos:', error));
    }
  }, [user, router]);


 
  return (
    <div>
      <Navbar />
    <div className="p-8">
    <div className="grid grid-cols-4 gap-6">
    {videos.map(video => (
  <div key={video._id} className="border p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <img src={`https://hstvvideoapp.azurewebsites.net/videos/thumbnails/${video.thumbnail}`}  className="w-full h-auto rounded-t-lg" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{video.title}</h3>
      <p className="text-gray-600">{video.description}</p>
      <div className="flex items-center text-gray-500 text-xs mt-2">
        <BarChart2 size={16} className="mr-1" aria-hidden="true" />
        {video.views} views
      </div>
      <Link legacyBehavior href={`/videos/${video._id}`}>
        <a className="text-blue-500 hover:underline mt-4 flex items-center">
          <Eye size={20} className="mr-1" aria-hidden="true" />
          View Details
        </a>
      </Link>
    </div>
  </div>
))}
    </div>
  </div>
  </div>
  );
};

export default Videos;