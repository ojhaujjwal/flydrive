"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const fse = __importStar(require("fs-extra"));
const Storage_1 = __importDefault(require("../Storage"));
const Exceptions_1 = require("../Exceptions");
const utils_1 = require("../utils");
function handleError(err, location) {
    switch (err.code) {
        case 'ENOENT':
            return new Exceptions_1.FileNotFound(err, location);
        case 'EPERM':
            return new Exceptions_1.PermissionMissing(err, location);
        default:
            return new Exceptions_1.UnknownException(err, err.code, location);
    }
}
class LocalFileSystemStorage extends Storage_1.default {
    constructor(config) {
        super();
        this.$root = path_1.resolve(config.root);
    }
    /**
     * Returns full path relative to the storage's root directory.
     */
    _fullPath(relativePath) {
        return path_1.join(this.$root, path_1.join(path_1.sep, relativePath));
    }
    /**
     * Appends content to a file.
     */
    async append(location, content) {
        try {
            const result = await fse.appendFile(this._fullPath(location), content);
            return { raw: result };
        }
        catch (e) {
            throw handleError(e, location);
        }
    }
    /**
     * Copy a file to a location.
     */
    async copy(src, dest) {
        try {
            const result = await fse.copy(this._fullPath(src), this._fullPath(dest));
            return { raw: result };
        }
        catch (e) {
            throw handleError(e, `${src} -> ${dest}`);
        }
    }
    /**
     * Delete existing file.
     */
    async delete(location) {
        try {
            const result = await fse.unlink(this._fullPath(location));
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
        return fse;
    }
    /**
     * Determines if a file or folder already exists.
     */
    async exists(location) {
        try {
            const result = await fse.pathExists(this._fullPath(location));
            return { exists: result, raw: result };
        }
        catch (e) {
            throw handleError(e, location);
        }
    }
    /**
     * Returns the file contents as string.
     */
    async get(location, encoding = 'utf-8') {
        try {
            const result = await fse.readFile(this._fullPath(location), encoding);
            return { content: result, raw: result };
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
            const result = await fse.readFile(this._fullPath(location));
            return { content: result, raw: result };
        }
        catch (e) {
            throw handleError(e, location);
        }
    }
    /**
     * Returns file size in bytes.
     */
    async getStat(location) {
        try {
            const stat = await fse.stat(this._fullPath(location));
            return {
                size: stat.size,
                modified: stat.mtime,
                raw: stat,
            };
        }
        catch (e) {
            throw handleError(e, location);
        }
    }
    /**
     * Returns a read stream for a file location.
     */
    getStream(location) {
        return fse.createReadStream(this._fullPath(location));
    }
    /**
     * Move file to a new location.
     */
    async move(src, dest) {
        try {
            const result = await fse.move(this._fullPath(src), this._fullPath(dest));
            return { raw: result };
        }
        catch (e) {
            throw handleError(e, `${src} -> ${dest}`);
        }
    }
    /**
     * Prepends content to a file.
     */
    async prepend(location, content) {
        try {
            const { content: actualContent } = await this.get(location, 'utf-8');
            return this.put(location, `${content}${actualContent}`);
        }
        catch (e) {
            if (e instanceof Exceptions_1.FileNotFound) {
                return this.put(location, content);
            }
            throw e;
        }
    }
    /**
     * Creates a new file.
     * This method will create missing directories on the fly.
     */
    async put(location, content) {
        const fullPath = this._fullPath(location);
        try {
            if (utils_1.isReadableStream(content)) {
                const dir = path_1.dirname(fullPath);
                await fse.ensureDir(dir);
                const ws = fse.createWriteStream(fullPath);
                await utils_1.pipeline(content, ws);
                return { raw: undefined };
            }
            const result = await fse.outputFile(fullPath, content);
            return { raw: result };
        }
        catch (e) {
            throw handleError(e, location);
        }
    }
    /**
     * List files with a given prefix.
     */
    flatList(prefix = '') {
        const fullPrefix = this._fullPath(prefix);
        return this._flatDirIterator(fullPrefix, prefix);
    }
    _flatDirIterator(prefix, originalPrefix) {
        return __asyncGenerator(this, arguments, function* _flatDirIterator_1() {
            var e_1, _a;
            const prefixDirectory = prefix[prefix.length - 1] === path_1.sep ? prefix : path_1.dirname(prefix);
            try {
                const dir = yield __await(fs_1.promises.opendir(prefixDirectory));
                try {
                    for (var dir_1 = __asyncValues(dir), dir_1_1; dir_1_1 = yield __await(dir_1.next()), !dir_1_1.done;) {
                        const file = dir_1_1.value;
                        const fileName = path_1.join(prefixDirectory, file.name);
                        if (fileName.startsWith(prefix)) {
                            if (file.isDirectory()) {
                                yield __await(yield* __asyncDelegator(__asyncValues(this._flatDirIterator(path_1.join(fileName, path_1.sep), originalPrefix))));
                            }
                            else if (file.isFile()) {
                                const path = path_1.relative(this.$root, fileName);
                                yield yield __await({
                                    raw: null,
                                    path,
                                });
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (dir_1_1 && !dir_1_1.done && (_a = dir_1.return)) yield __await(_a.call(dir_1));
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            catch (e) {
                if (e.code !== 'ENOENT') {
                    throw handleError(e, originalPrefix);
                }
            }
        });
    }
}
exports.LocalFileSystemStorage = LocalFileSystemStorage;
