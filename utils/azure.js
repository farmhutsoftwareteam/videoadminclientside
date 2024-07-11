import { BlobServiceClient } from '@azure/storage-blob';

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);

export const uploadToAzure = async (file, folder) => {
  const blobName = `${folder}/${new Date().getTime()}-${file.name}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.uploadData(file);
    const fileUrl = blockBlobClient.url;
    return fileUrl;
  } catch (error) {
    console.error('Azure upload error:', error);
    throw error;
  }
};
