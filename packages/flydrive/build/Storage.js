"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("./exceptions");
class Storage {
    /**
     * Appends content to a file.
     *
     * Supported drivers: "local"
     */
    append(location, content) {
        throw new exceptions_1.MethodNotSupported('append', this.constructor.name);
    }
    /**
     * Copy a file to a location.
     *
     * Supported drivers: "local", "s3", "gcs"
     */
    copy(src, dest) {
        throw new exceptions_1.MethodNotSupported('copy', this.constructor.name);
    }
    /**
     * Delete existing file.
     * The value returned by this method will have a `wasDeleted` property that
     * can be either a boolean (`true` if a file was deleted, `false` if there was
     * no file to delete) or `null` (if no information about the file is available).
     *
     * Supported drivers: "local", "s3", "gcs"
     */
    delete(location) {
        throw new exceptions_1.MethodNotSupported('delete', this.constructor.name);
    }
    /**
     * Returns the driver.
     *
     * Supported drivers: "local", "s3", "gcs"
     */
    driver() {
        throw new exceptions_1.MethodNotSupported('driver', this.constructor.name);
    }
    /**
     * Determines if a file or folder already exists.
     *
     * Supported drivers: "local", "s3", "gcs"
     */
    exists(location) {
        throw new exceptions_1.MethodNotSupported('exists', this.constructor.name);
    }
    /**
     * Returns the file contents as a string.
     *
     * Supported drivers: "local", "s3", "gcs"
     */
    get(location, encoding) {
        throw new exceptions_1.MethodNotSupported('get', this.constructor.name);
    }
    /**
     * Returns the file contents as a Buffer.
     *
     * Supported drivers: "local", "s3", "gcs"
     */
    getBuffer(location) {
        throw new exceptions_1.MethodNotSupported('getBuffer', this.constructor.name);
    }
    /**
     * Returns signed url for an existing file.
     *
     * Supported drivers: "s3", "gcs"
     */
    getSignedUrl(location, options) {
        throw new exceptions_1.MethodNotSupported('getSignedUrl', this.constructor.name);
    }
    /**
     * Returns file's size and modification date.
     *
     * Supported drivers: "local", "s3", "gcs"
     */
    getStat(location) {
        throw new exceptions_1.MethodNotSupported('getStat', this.constructor.name);
    }
    /**
     * Returns the stream for the given file.
     *
     * Supported drivers: "local", "s3", "gcs"
     */
    getStream(location) {
        throw new exceptions_1.MethodNotSupported('getStream', this.constructor.name);
    }
    /**
     * Returns url for a given key. Note this method doesn't
     * validates the existence of file or it's visibility
     * status.
     *
     * Supported drivers: "s3", "gcs"
     */
    getUrl(location) {
        throw new exceptions_1.MethodNotSupported('getUrl', this.constructor.name);
    }
    /**
     * Move file to a new location.
     *
     * Supported drivers: "local", "s3", "gcs"
     */
    move(src, dest) {
        throw new exceptions_1.MethodNotSupported('move', this.constructor.name);
    }
    /**
     * Creates a new file.
     * This method will create missing directories on the fly.
     *
     * Supported drivers: "local", "s3", "gcs"
     */
    put(location, content) {
        throw new exceptions_1.MethodNotSupported('put', this.constructor.name);
    }
    /**
     * Prepends content to a file.
     *
     * Supported drivers: "local"
     */
    prepend(location, content) {
        throw new exceptions_1.MethodNotSupported('prepend', this.constructor.name);
    }
    /**
     * List files with a given prefix.
     *
     * Supported drivers: "local", "s3", "gcs"
     */
    flatList(prefix) {
        throw new exceptions_1.MethodNotSupported('flatList', this.constructor.name);
    }
}
exports.default = Storage;
//# sourceMappingURL=Storage.js.map