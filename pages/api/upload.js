import multer from 'multer';
import { BlobServiceClient } from '@azure/storage-blob';
import fs from 'fs';
import path from 'path';

// Configure multer
const upload = multer({ dest: 'uploads/' });

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, since multer will handle it
  },
};

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  upload.single('file')(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err);
      res.status(500).json({ error: 'File upload error' });
      return;
    }

    const file = req.file;
    console.log('Uploaded file:', file);

    const blobServiceClient = new BlobServiceClient(
      `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net?${process.env.AZURE_STORAGE_SAS_TOKEN}`
    );

    const containerClient1 = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME1);
    const containerClient2 = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME2);
    const container = req.body.container === '2' ? containerClient2 : containerClient1;

    const blobName = file.filename;
    const blockBlobClient = container.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadFile(file.path);
      fs.unlinkSync(path.resolve(file.path)); // Delete file from server after upload

      const fileURL = blockBlobClient.url; // Get the file URL
      res.status(200).json({ message: 'File uploaded successfully', url: fileURL });
    } catch (uploadError) {
      console.error('Error uploading file to Azure:', uploadError);
      res.status(500).json({ error: 'Error uploading file to Azure', details: uploadError.message });
    }
  });
};

export default handler;
