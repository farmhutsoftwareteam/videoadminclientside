import { BlobServiceClient } from "@azure/storage-blob";

export async function uploadToAzure(file, containerName) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(file.name);

  await blockBlobClient.uploadData(file);
  return blockBlobClient.url;
}
