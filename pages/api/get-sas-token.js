import { generateBlobSASQueryParameters, BlobSASPermissions, SASProtocol, StorageSharedKeyCredential } from '@azure/storage-blob';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed');
  }

  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
  const containerName = process.env.AZURE_STORAGE_CONTAINER;

  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

  const sasToken = generateBlobSASQueryParameters({
    containerName,
    permissions: BlobSASPermissions.parse('racwd'),
    expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 hour
    protocol: SASProtocol.Https,
    version: '2020-12-06',
  }, sharedKeyCredential).toString();

  res.status(200).json({ sasToken, storageAccount: accountName, containerName });
}
