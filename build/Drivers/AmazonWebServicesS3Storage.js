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
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Exceptions_1 = require("../Exceptions");
function handleError(err, path, bucket) {
    switch (err.name) {
        case 'NoSuchBucket':
            return new Exceptions_1.NoSuchBucket(err, bucket);
        case 'NoSuchKey':
            return new Exceptions_1.FileNotFound(err, path);
        case 'AllAccessDisabled':
            return new Exceptions_1.PermissionMissing(err, path);
        default:
            return new Exceptions_1.UnknownException(err, err.name, path);
    }
}
class AmazonWebServicesS3Storage extends __1.Storage {
    constructor(config) {
        super();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const S3 = require('aws-sdk/clients/s3');
        this.$driver = new S3(Object.assign({ accessKeyId: config.key, secretAccessKey: config.secret }, config));
        this.$bucket = config.bucket;
    }
    /**
     * Copy a file to a location.
     */
    async copy(src, dest) {
        const params = {
            Key: dest,
            Bucket: this.$bucket,
            CopySource: `/${this.$bucket}/${src}`,
        };
        try {
            const result = await this.$driver.copyObject(params).promise();
            return { raw: result };
        }
        catch (e) {
            throw handleError(e, src, this.$bucket);
        }
    }
    /**
     * Delete existing file.
     */
    async delete(location) {
        const params = { Key: location, Bucket: this.$bucket };
        try {
            const result = await this.$driver.deleteObject(params).promise();
            // Amazon does not inform the client if anything was deleted.
            return { raw: result, wasDeleted: null };
        }
        catch (e) {
            throw handleError(e, location, this.$bucket);
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
        const params = { Key: location, Bucket: this.$bucket };
        try {
            const result = await this.$driver.headObject(params).promise();
            return { exists: true, raw: result };
        }
        catch (e) {
            if (e.statusCode === 404) {
                return { exists: false, raw: e };
            }
            else {
                throw handleError(e, location, this.$bucket);
            }
        }
    }
    /**
     * Returns the file contents.
     */
    async get(location, encoding = 'utf-8') {
        const bufferResult = await this.getBuffer(location);
        return {
            content: bufferResult.content.toString(encoding),
            raw: bufferResult.raw,
        };
    }
    /**
     * Returns the file contents as Buffer.
     */
    async getBuffer(location) {
        const params = { Key: location, Bucket: this.$bucket };
        try {
            const result = await this.$driver.getObject(params).promise();
            // S3.getObject returns a Buffer in Node.js
            const body = result.Body;
            return { content: body, raw: result };
        }
        catch (e) {
            throw handleError(e, location, this.$bucket);
        }
    }
    /**
     * Returns signed url for an existing file
     */
    async getSignedUrl(location, options = {}) {
        const { expiry = 900 } = options;
        try {
            const params = {
                Key: location,
                Bucket: this.$bucket,
                Expiry: expiry,
            };
            const result = await this.$driver.getSignedUrlPromise('getObject', params);
            return { signedUrl: result, raw: result };
        }
        catch (e) {
            throw handleError(e, location, this.$bucket);
        }
    }
    /**
     * Returns file's size and modification date.
     */
    async getStat(location) {
        const params = { Key: location, Bucket: this.$bucket };
        try {
            const result = await this.$driver.headObject(params).promise();
            return {
                size: result.ContentLength,
                modified: result.LastModified,
                raw: result,
            };
        }
        catch (e) {
            throw handleError(e, location, this.$bucket);
        }
    }
    /**
     * Returns the stream for the given file.
     */
    getStream(location) {
        const params = { Key: location, Bucket: this.$bucket };
        return this.$driver.getObject(params).createReadStream();
    }
    /**
     * Returns url for a given key.
     */
    getUrl(location) {
        const { href } = this.$driver.endpoint;
        if (href.startsWith('https://s3.amazonaws')) {
            return `https://${this.$bucket}.s3.amazonaws.com/${location}`;
        }
        return `${href}${this.$bucket}/${location}`;
    }
    /**
     * Moves file from one location to another. This
     * method will call `copy` and `delete` under
     * the hood.
     */
    async move(src, dest) {
        await this.copy(src, dest);
        await this.delete(src);
        return { raw: undefined };
    }
    /**
     * Creates a new file.
     * This method will create missing directories on the fly.
     */
    async put(location, content) {
        const params = { Key: location, Body: content, Bucket: this.$bucket };
        try {
            const result = await this.$driver.upload(params).promise();
            return { raw: result };
        }
        catch (e) {
            throw handleError(e, location, this.$bucket);
        }
    }
    /**
     * Iterate over all files in the bucket.
     */
    flatList(prefix = '') {
        return __asyncGenerator(this, arguments, function* flatList_1() {
            let continuationToken;
            do {
                try {
                    const response = yield __await(this.$driver
                        .listObjectsV2({
                        Bucket: this.$bucket,
                        Prefix: prefix,
                        ContinuationToken: continuationToken,
                        MaxKeys: 1000,
                    })
                        .promise());
                    continuationToken = response.NextContinuationToken;
                    for (const file of response.Contents) {
                        yield yield __await({
                            raw: file,
                            path: file.Key,
                        });
                    }
                }
                catch (e) {
                    throw handleError(e, prefix, this.$bucket);
                }
            } while (continuationToken);
        });
    }
}
exports.AmazonWebServicesS3Storage = AmazonWebServicesS3Storage;
