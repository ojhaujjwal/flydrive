/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
import { LocalFileSystemStorage, LocalFileSystemStorageConfig } from './LocalFileSystemStorage';
export type { LocalFileSystemStorage, LocalFileSystemStorageConfig };
export declare type StorageManagerSingleDiskConfig = {
    driver: 'local';
    config: LocalFileSystemStorageConfig;
} | {
    driver: string;
    config: unknown;
};
export interface StorageManagerDiskConfig {
    [key: string]: StorageManagerSingleDiskConfig;
}
export interface StorageManagerConfig {
    /**
     * The default disk returned by `disk()`.
     */
    default?: string;
    disks?: StorageManagerDiskConfig;
}
export interface Response {
    raw: unknown;
}
export interface ExistsResponse extends Response {
    exists: boolean;
}
export interface ContentResponse<ContentType> extends Response {
    content: ContentType;
}
export interface SignedUrlOptions {
    /**
     * Expiration time of the URL.
     * It should be a number of seconds from now.
     * @default `900` (15 minutes)
     */
    expiry?: number;
}
export interface SignedUrlResponse extends Response {
    signedUrl: string;
}
export interface StatResponse extends Response {
    size: number;
    modified: Date;
}
export interface FileListResponse extends Response {
    path: string;
}
export interface DeleteResponse extends Response {
    wasDeleted: boolean | null;
}
//# sourceMappingURL=types.d.ts.map