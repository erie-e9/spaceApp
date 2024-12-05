import { storage } from '@redux/store';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { Logger } from '@services';
import { FetchArgsWithEnqueueable } from '..';

// Adds a request to a persistent queue in MMKV storage.
export const enqueue = (request: FetchArgsWithEnqueueable) => {
    const timestamp = new Date().toISOString();

    if (!request.enqueueable) { // Skipping request if 'enqueueable' is false
        return;
    }

    const id = Number(request.url.split('/')[1]);
    let queue: FetchArgsWithEnqueueable[] = JSON.parse(storage.getString('requestQueue') || '[]');

    // If the method is POST, always add it to the queue without checking for duplicates
    if (request.method === 'POST') {
        Logger.log('[enqueue] Adding POST request to storage', { request });
        queue.push({ ...request, timestamp });
        storage.set('requestQueue', JSON.stringify(queue)); // Save directly and return
        return;
    }

    const existingIndex = queue.findIndex((queuedRequest) => queuedRequest.url === request.url); // Checking for existing requests

    if (existingIndex !== -1) { // If item already exists in the queue
        const existingRequest = queue[existingIndex];

        // Skips adding if a DELETE request already exists for the resource.
        if (existingRequest.method === 'DELETE') {
            Logger.log('[enqueue] Skipping request because DELETE already exists:', { request });
            return; // Do not add new request if DELETE exists
        }

        // If it's a DELETE request, replace any existing ones for the same resource
        if (request.method === 'DELETE') {
            Logger.log('[enqueue] Replacing existing requests with DELETE:', { request });
            queue = queue.filter((r) => r.url !== request.url); // Remove existing requests for the same resource
            queue.push({ ...request, timestamp, idRequest: id });
        }
        // Merges bodies of UPDATE requests to avoid redundant changes
        else if (request.method === 'PUT' || request.method === 'PATCH') {
            Logger.log('[enqueue] Merging update requests for the same resource:', { request });
            // Merge bodies of UPDATE requests
            const mergedBody = { ...existingRequest.body, ...request.body };
            queue[existingIndex] = { ...request, body: mergedBody }; // Update the request with merged body
        } else {
            Logger.log('[enqueue] Skipping duplicate request:', { request });
        }
    } else {
        // If the item doesn't exist, just add it
        Logger.log('[enqueue] Adding new request to storage', { request });
        queue.push({ ...request, idRequest: id, timestamp });
    }

    // Save updated queue to MMKV storage
    storage.set('requestQueue', JSON.stringify(queue));
};

// Processes all queued requests sequentially.
export const processQueue = async (baseQuery: BaseQueryFn) => {
    let queue: FetchArgsWithEnqueueable[] = JSON.parse(storage.getString('requestQueue') || '[]');
    const remainingQueue: FetchArgsWithEnqueueable[] = [];
    let successCount = 0;
    let failureCount = 0;
    const startTime = Date.now();

    for (const request of queue) {
        try {
            const result = await baseQuery(request, {}, {});

            if (result.error) {
                Logger.error('[processQueue] Request failed:', {
                    body: request.body,
                    error: result.error,
                    errorDetails: result?.error?.data,
                    message: result?.message,
                    queriesPending: queue.length,
                });
                failureCount++;
                remainingQueue.push(request); // Retain failed requests in the queue.
            } else { // Request processed successfully
                successCount++;
            }
        } catch (error) {
            Logger.error('[processQueue] Error processing request:', { request, error });
            failureCount++;
            remainingQueue.push(request); // Retain requests in case of unexpected errors.
        }
    }
    storage.set('requestQueue', JSON.stringify(remainingQueue)); // Update queue in storage.

    const elapsedTime = Date.now() - startTime;
    Logger.log('Queue success count: ', successCount);
    Logger.log('Queue failure count: ', failureCount);
    Logger.log('Queue processing time ms: ', elapsedTime);
    Logger.log('Queue size after processing: ', remainingQueue.length);
};
