import { BlobServiceClient } from '@azure/storage-blob';

export async function uploadToAzure(file, containerName) {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error('Azure Storage connection string is not defined in environment variables.');
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Create the container if it doesn't exist
  await containerClient.createIfNotExists();

  const blobName = new Date().getTime() + '-' + file.name;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file, {
    blobHTTPHeaders: { blobContentType: file.type },
  });

  return blockBlobClient.url;
}
