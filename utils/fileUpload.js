import axios from 'axios';
import { BlockBlobClient } from '@azure/storage-blob';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hstvserver.azurewebsites.net/api/videos/upload'

/**
 * 
 * @param {File} file 
 * @param {String} container 
 * @param {AbortController} abortController 
 * @param {Function} onProgress 
 * @returns {Promise<String>} url
 */
export const uploadFileToBlob = async (file, container, abortController, onProgress) => {
    const response = await axios.post(API_URL, {
        fileName: file.name,
        container,
    });

    const abortSignal = abortController.signal;

    const blockBlobClient = new BlockBlobClient(response.data.url)
    await blockBlobClient.uploadData(
        file,
        {
            abortSignal,
            onProgress,
            blobHTTPHeaders: {
                blobContentType: file.type
            }
        }
    )

    return blockBlobClient.url
}