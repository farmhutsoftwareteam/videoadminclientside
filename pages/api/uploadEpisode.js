import { uploadToAzure } from '../../lib/uploadToAzure';
import { createEpisode } from '../../lib/createEpisode';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Form parsing failed' });
        return;
      }

      try {
        const { title, description, seasonnumber, episodenumber, show, isFree } = fields;
        const thumbnailFile = files.thumbnailFile[0];
        const videoFile = files.videoFile[0];

        const thumbnailUrl = await uploadToAzure(thumbnailFile, 'thumbnails');
        const videoUrl = await uploadToAzure(videoFile, 'videos');

        const episodeDetails = {
          title,
          description,
          seasonnumber,
          episodenumber,
          thumbnail: thumbnailUrl,
          video_url: videoUrl,
          show,
          isFree,
        };

        const data = await createEpisode(episodeDetails);
        res.status(200).json(data);
      } catch (error) {
        console.error('Error during upload:', error);
        res.status(500).json({ error: 'Upload failed' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
