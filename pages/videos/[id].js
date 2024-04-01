import React, { useState } from 'react'; // Import React and useState
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar';
import { format } from 'date-fns';
import VideoEditForm from '@/components/videoeditform'; // Ensure this path matches your file structure

export async function getServerSideProps(context) {
  const { id } = context.params;
  const apiUrl = 'https://hstvvideoapp.azurewebsites.net/api/videos/';
  const res = await fetch(`${apiUrl}${id}`);
  const video = await res.json();

  if (!video) {
    return {
      notFound: true,
    };
  }

  return {
    props: { video },
  };
}

const VideoDetails = ({ video }) => {
  const [isEditMode, setIsEditMode] = useState(false); // Initialize edit mode state
  const router = useRouter();
  const tagsString = video.video.tags && video.video.tags.length > 0 ? video.video.tags.join(', ') : 'No tags';
  const formattedUploadDate = video.video.uploadDate ? format(new Date(video.video.uploadDate), 'PPP') : 'Unknown';

 // Inside VideoDetails component

// Function to handle saving the edited video details
const handleSave = async (editedVideo) => {
  console.log(video)
  const apiUrl = `https://hstvvideoapp.azurewebsites.net/api/videos/${video.video._id}`; // Use the correct ID
  try {
    const response = await fetch(apiUrl, {
      method: 'PUT', // Specify the method to update
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify(editedVideo), // Convert the JavaScript object to a JSON string
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const updatedVideo = await response.json(); // Assuming the server responds with the updated video
    // Optionally, update the local state or re-fetch video details to reflect the changes
    console.log('Video updated successfully:', updatedVideo);
    setIsEditMode(false); // Exit edit mode after successful save
    // You might want to navigate the user away from the edit page or refresh the page to show the updated video details
    // router.push(`/videos/${video.video.id}`); // Uncomment if you want to redirect or refresh
  } catch (error) {
    console.error('Error updating video:', error);
    // Handle error, e.g., show an error message to the user
  }
};

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col lg:flex-row">
        {isEditMode ? (
          // Render the VideoEditForm component when in edit mode
          <VideoEditForm video={video.video} onSave={handleSave} onCancel={() => setIsEditMode(false)} />
        ) : (
          // Display video details and an "Edit" button when not in edit mode
          <>
            <div className="lg:w-2/3">
              <div className="relative" style={{ paddingTop: "56.25%" }}>
                <video 
                  controls 
                  src={video.video.filePath}
                  className="absolute top-0 left-0 w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="lg:w-1/3 lg:pl-4 mt-4 lg:mt-0">
              <div>
                <h1 className="text-2xl font-bold mb-2">Video Details</h1>
                <h2 className="text-xl font-semibold mb-2">{video.video.title}</h2>
                <p className="mb-4">{video.video.description}</p>
                <p><strong>Upload Date:</strong> {formattedUploadDate}</p>
                <p><strong>Duration:</strong> {video.video.duration ? `${video.video.duration} minutes` : 'Unknown'}</p>
                <p><strong>Views:</strong> {video.video.views}</p>
                <p><strong>Tags:</strong> {tagsString}</p>
                {/* Display other details as needed */}
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => setIsEditMode(true)}
                >
                  Edit Video Details
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VideoDetails;