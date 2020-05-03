"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const AmazonWebServicesS3Storage_1 = require("./Drivers/AmazonWebServicesS3Storage");
const GoogleCloudStorage_1 = require("./Drivers/GoogleCloudStorage");
const LocalFileSystemStorage_1 = require("./Drivers/LocalFileSystemStorage");
const Exceptions_1 = require("./Exceptions");
class StorageManager {
    constructor(config) {
        /**
         * Instantiated disks.
         */
        this._disks = new Map();
        /**
         * List of available drivers.
         */
        this._drivers = new Map();
        this._defaultDisk = config.default;
        this._disksConfig = config.disks || {};
        this.registerDriver('s3', AmazonWebServicesS3Storage_1.AmazonWebServicesS3Storage);
        this.registerDriver('gcs', GoogleCloudStorage_1.GoogleCloudStorage);
        this.registerDriver('local', LocalFileSystemStorage_1.LocalFileSystemStorage);
    }
    /**
     * Get a disk instance.
     */
    disk(name) {
        name = name || this._defaultDisk;
        /**
         * No name is defined and neither there
         * are any defaults.
         */
        if (!name) {
            throw Exceptions_1.InvalidConfig.missingDiskName();
        }
        if (this._disks.has(name)) {
            return this._disks.get(name);
        }
        const diskConfig = this._disksConfig[name];
        /**
         * Configuration for the defined disk is missing
         */
        if (!diskConfig) {
            throw Exceptions_1.InvalidConfig.missingDiskConfig(name);
        }
        /**
         * There is no driver defined on disk configuration
         */
        if (!diskConfig.driver) {
            throw Exceptions_1.InvalidConfig.missingDiskDriver(name);
        }
        const Driver = this._drivers.get(diskConfig.driver);
        if (!Driver) {
            throw Exceptions_1.DriverNotSupported.driver(diskConfig.driver);
        }
        const disk = new Driver(diskConfig.config);
        this._disks.set(name, disk);
        return disk;
    }
    addDisk(name, config) {
        if (this._disksConfig[name]) {
            throw Exceptions_1.InvalidConfig.duplicateDiskName(name);
        }
        this._disksConfig[name] = config;
    }
    /**
     * Register a custom driver.
     */
    registerDriver(name, driver) {
        this._drivers.set(name, driver);
    }
}
exports.default = StorageManager;
