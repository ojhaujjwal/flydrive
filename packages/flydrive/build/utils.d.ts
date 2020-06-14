/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
/// <reference types="node" />
import { Readable, pipeline as nodePipeline } from 'stream';
/**
 * Returns a boolean indication if stream param
 * is a readable stream or not.
 */
export declare function isReadableStream(stream: any): stream is Readable;
export declare const pipeline: typeof nodePipeline.__promisify__;
//# sourceMappingURL=utils.d.ts.map