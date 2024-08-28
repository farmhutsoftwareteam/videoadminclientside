import axios from 'axios';
import { BlockBlobClient } from '@azure/storage-blob';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hstvserver.azurewebsites.net/api'

/**
 * 
 * @param {File} file 
 * @param {String} container 
 * @param {AbortController} abortController 
 * @param {Function} onProgress 
 * @returns {Promise<String>} url
 */
export const uploadFileToBlob = async (file, container, abortController, onProgress) => {
    const response = await axios.post(`${API_URL}/videos/upload`, {
        fileName: file.name,
        container,
    });

    const abortSignal = abortController.signal;

    const blockBlobClient = new BlockBlobClient(response.data.uploadUrl)
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

    // After successful upload, return the Blob URL to store in Supabase
    return response.data.blobUrl
}