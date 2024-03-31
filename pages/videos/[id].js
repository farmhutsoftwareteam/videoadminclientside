import { useRouter } from 'next/router';
import Navbar from '@/components/navbar';
import { format } from 'date-fns'; // Assuming you're using date-fns for date formatting


export async function getServerSideProps(context) {
  const { id } = context.params;
  const apiUrl = 'https://hstvvideoapp.azurewebsites.net/api/videos/';
  const res = await fetch(`${apiUrl}${id}`);
  const video = await res.json();

  // Handle the case where the video is not found
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

  const tagsString = video.video.tags && video.video.tags.length > 0 ? video.video.tags.join(', ') : 'No tags';
  const formattedUploadDate = video.video.uploadDate ? format(new Date(video.video.uploadDate), 'PPP') : 'Unknown';

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col lg:flex-row">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetails;