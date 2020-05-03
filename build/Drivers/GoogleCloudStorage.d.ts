/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
/// <reference types="node" />
import { Readable } from 'stream';
import { Storage as GCSDriver, StorageOptions, Bucket } from '@google-cloud/storage';
import Storage from '../Storage';
import { Response, ExistsResponse, ContentResponse, SignedUrlResponse, SignedUrlOptions, StatResponse, FileListResponse, DeleteResponse } from '../types';
export declare class GoogleCloudStorage extends Storage {
    protected $config: GoogleCloudStorageConfig;
    protected $driver: GCSDriver;
    protected $bucket: Bucket;
    constructor(config: GoogleCloudStorageConfig);
    private _file;
    /**
     * Copy a file to a location.
     */
    copy(src: string, dest: string): Promise<Response>;
    /**
     * Delete existing file.
     */
    delete(location: string): Promise<DeleteResponse>;
    /**
     * Returns the driver.
     */
    driver(): GCSDriver;
    /**
     * Determines if a file or folder already exists.
     */
    exists(location: string): Promise<ExistsResponse>;
    /**
     * Returns the file contents.
     */
    get(location: string, encoding?: string): Promise<ContentResponse<string>>;
    /**
     * Returns the file contents as Buffer.
     */
    getBuffer(location: string): Promise<ContentResponse<Buffer>>;
    /**
     * Returns signed url for an existing file.
     */
    getSignedUrl(location: string, options?: SignedUrlOptions): Promise<SignedUrlResponse>;
    /**
     * Returns file's size and modification date.
     */
    getStat(location: string): Promise<StatResponse>;
    /**
     * Returns the stream for the given file.
     */
    getStream(location: string): Readable;
    /**
     * Returns URL for a given location. Note this method doesn't
     * validates the existence of file or it's visibility
     * status.
     */
    getUrl(location: string): string;
    /**
     * Move file to a new location.
     */
    move(src: string, dest: string): Promise<Response>;
    /**
     * Creates a new file.
     * This method will create missing directories on the fly.
     */
    put(location: string, content: Buffer | Readable | string): Promise<Response>;
    /**
     * Iterate over all files in the bucket.
     */
    flatList(prefix?: string): AsyncIterable<FileListResponse>;
}
export interface GoogleCloudStorageConfig extends StorageOptions {
    bucket: string;
}
