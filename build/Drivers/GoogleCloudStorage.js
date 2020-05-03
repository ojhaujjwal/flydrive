"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Storage_1 = __importDefault(require("../Storage"));
const utils_1 = require("../utils");
const Exceptions_1 = require("../Exceptions");
function handleError(err, path) {
    switch (err.code) {
        case 401:
            return new Exceptions_1.AuthorizationRequired(err, path);
        case 403:
            return new Exceptions_1.PermissionMissing(err, path);
        case 404:
            return new Exceptions_1.FileNotFound(err, path);
        case 'ENOENT':
            return new Exceptions_1.WrongKeyPath(err, path);
        default:
            return new Exceptions_1.UnknownException(err, String(err.code), path);
    }
}
class GoogleCloudStorage extends Storage_1.default {
    constructor(config) {
        super();
        this.$config = config;
        const GCSStorage = require('@google-cloud/storage').Storage;
        this.$driver = new GCSStorage(config);
        this.$bucket = this.$driver.bucket(config.bucket);
    }
    _file(path) {
        return this.$bucket.file(path);
    }
    /**
     * Copy a file to a location.
     */
    async copy(src, dest) {
        const srcFile = this._file(src);
        const destFile = this._file(dest);
        try {
            const result = await srcFile.copy(destFile);
            return { raw: result };
        }
        catch (e) {
            throw handleError(e, src);
        }
    }
    /**
     * Delete existing file.
     */
    async delete(location) {
        try {
            const result = await this._file(location).delete();
            return { raw: result, wasDeleted: true };
        }
        catch (e) {
            e = handleError(e, location);
            if (e instanceof Exceptions_1.FileNotFound) {
                return { raw: undefined, wasDeleted: false };
            }
            throw e;
        }
    }
    /**
     * Returns the driver.
     */
    driver() {
        return this.$driver;
    }
    /**
     * Determines if a file or folder already exists.
     */
    async exists(location) {
        try {
            const result = await this._file(location).exists();
            return { exists: result[0], raw: result };
        }
        catch (e) {
            throw handleError(e, location);
        }
    }
    /**
     * Returns the file contents.
     */
    async get(location, encoding = 'utf-8') {
        try {
            const result = await this._file(location).download();
            return { content: result[0].toString(encoding), raw: result };
        }
        catch (e) {
            throw handleError(e, location);
        }
    }
    /**
     * Returns the file contents as Buffer.
     */
    async getBuffer(location) {
        try {
            const result = await this._file(location).download();
            return { content: result[0], raw: result };
        }
        catch (e) {
            throw handleError(e, location);
        }
    }
    /**
     * Returns signed url for an existing file.
     */
    async getSignedUrl(location, options = {}) {
        const { expiry = 900 } = options;
        try {
            const result = await this._file(location).getSignedUrl({
                action: 'read',
                expires: Date.now() + expiry * 1000,
            });
            return { signedUrl: result[0], raw: result };
        }
        catch (e) {
            throw handleError(e, location);
        }
    }
    /**
     * Returns file's size and modification date.
     */
    async getStat(location) {
        try {
            const result = await this._file(location).getMetadata();
            return {
                size: Number(result[0].size),
                modified: new Date(result[0].updated),
                raw: result,
            };
        }
        catch (e) {
            throw handleError(e, location);
        }
    }
    /**
     * Returns the stream for the given file.
     */
    getStream(location) {
        return this._file(location).createReadStream();
    }
    /**
     * Returns URL for a given location. Note this method doesn't
     * validates the existence of file or it's visibility
     * status.
     */
    getUrl(location) {
        return `https://storage.cloud.google.com/${this.$bucket.name}/${location}`;
    }
    /**
     * Move file to a new location.
     */
    async move(src, dest) {
        const srcFile = this._file(src);
        const destFile = this._file(dest);
        try {
            const result = await srcFile.move(destFile);
            return { raw: result };
        }
        catch (e) {
            throw handleError(e, src);
        }
    }
    /**
     * Creates a new file.
     * This method will create missing directories on the fly.
     */
    async put(location, content) {
        const file = this._file(location);
        try {
            if (utils_1.isReadableStream(content)) {
                const destStream = file.createWriteStream();
                await utils_1.pipeline(content, destStream);
                return { raw: undefined };
            }
            const result = await file.save(content, { resumable: false });
            return { raw: result };
        }
        catch (e) {
            throw handleError(e, location);
        }
    }
    /**
     * Iterate over all files in the bucket.
     */
    flatList(prefix = '') {
        return __asyncGenerator(this, arguments, function* flatList_1() {
            let nextQuery = {
                prefix,
                autoPaginate: false,
                maxResults: 1000,
            };
            do {
                try {
                    const result = yield __await(this.$bucket.getFiles(nextQuery));
                    nextQuery = result[1];
                    for (const file of result[0]) {
                        yield yield __await({
                            raw: file.metadata,
                            path: file.name,
                        });
                    }
                }
                catch (e) {
                    throw handleError(e, prefix);
                }
            } while (nextQuery);
        });
    }
}
exports.GoogleCloudStorage = GoogleCloudStorage;
