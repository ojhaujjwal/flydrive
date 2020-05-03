/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
/// <reference types="node" />
import { Readable } from 'stream';
import S3, { ClientConfiguration } from 'aws-sdk/clients/s3';
import { Storage } from '..';
import { SignedUrlOptions, Response, ExistsResponse, ContentResponse, SignedUrlResponse, StatResponse, FileListResponse, DeleteResponse } from '../types';
export declare class AmazonWebServicesS3Storage extends Storage {
    protected $driver: S3;
    protected $bucket: string;
    constructor(config: AmazonWebServicesS3StorageConfig);
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
    driver(): S3;
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
     * Returns signed url for an existing file
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
     * Returns url for a given key.
     */
    getUrl(location: string): string;
    /**
     * Moves file from one location to another. This
     * method will call `copy` and `delete` under
     * the hood.
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
export interface AmazonWebServicesS3StorageConfig extends ClientConfiguration {
    key: string;
    secret: string;
    bucket: string;
}
