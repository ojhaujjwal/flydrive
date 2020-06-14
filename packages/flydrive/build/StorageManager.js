"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const LocalFileSystemStorage_1 = require("./LocalFileSystemStorage");
const exceptions_1 = require("./exceptions");
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
        this.defaultDisk = config.default;
        this.disksConfig = config.disks || {};
        this.registerDriver('local', LocalFileSystemStorage_1.LocalFileSystemStorage);
    }
    /**
     * Get a disk instance.
     */
    disk(name) {
        name = name || this.defaultDisk;
        /**
         * No name is defined and neither there
         * are any defaults.
         */
        if (!name) {
            throw exceptions_1.InvalidConfig.missingDiskName();
        }
        if (this._disks.has(name)) {
            return this._disks.get(name);
        }
        const diskConfig = this.disksConfig[name];
        /**
         * Configuration for the defined disk is missing
         */
        if (!diskConfig) {
            throw exceptions_1.InvalidConfig.missingDiskConfig(name);
        }
        /**
         * There is no driver defined on disk configuration
         */
        if (!diskConfig.driver) {
            throw exceptions_1.InvalidConfig.missingDiskDriver(name);
        }
        const Driver = this._drivers.get(diskConfig.driver);
        if (!Driver) {
            throw exceptions_1.DriverNotSupported.driver(diskConfig.driver);
        }
        const disk = new Driver(diskConfig.config);
        this._disks.set(name, disk);
        return disk;
    }
    addDisk(name, config) {
        if (this.disksConfig[name]) {
            throw exceptions_1.InvalidConfig.duplicateDiskName(name);
        }
        this.disksConfig[name] = config;
    }
    /**
     * Register a custom driver.
     */
    registerDriver(name, driver) {
        this._drivers.set(name, driver);
    }
}
exports.default = StorageManager;
//# sourceMappingURL=StorageManager.js.map