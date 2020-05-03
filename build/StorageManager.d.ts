/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
import Storage from './Storage';
import { StorageManagerConfig, StorageManagerSingleDiskConfig } from './types';
interface StorageConstructor<T extends Storage = Storage> {
    new (...args: any[]): T;
}
export default class StorageManager {
    /**
     * Default disk.
     */
    private _defaultDisk;
    /**
     * Configured disks.
     */
    private _disksConfig;
    /**
     * Instantiated disks.
     */
    private _disks;
    /**
     * List of available drivers.
     */
    private _drivers;
    constructor(config: StorageManagerConfig);
    /**
     * Get a disk instance.
     */
    disk<T extends Storage = Storage>(name?: string): T;
    addDisk(name: string, config: StorageManagerSingleDiskConfig): void;
    /**
     * Register a custom driver.
     */
    registerDriver<T extends Storage>(name: string, driver: StorageConstructor<T>): void;
}
export {};
