"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const util_1 = require("util");
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
/**
 * Returns a boolean indication if stream param
 * is a readable stream or not.
 */
function isReadableStream(stream) {
    return (stream !== null &&
        typeof stream === 'object' &&
        typeof stream.pipe === 'function' &&
        typeof stream._read === 'function' &&
        typeof stream._readableState === 'object' &&
        stream.readable !== false);
}
exports.isReadableStream = isReadableStream;
exports.pipeline = util_1.promisify(stream_1.pipeline);
