"use strict";
/**
 * @slynova/flydrive
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSuchBucket = void 0;
const node_exceptions_1 = require("node-exceptions");
class NoSuchBucket extends node_exceptions_1.RuntimeException {
    constructor(err, bucket) {
        super(`The bucket ${bucket} doesn't exist\n${err.message}`, 500, 'E_NO_SUCH_BUCKET');
        this.raw = err;
    }
}
exports.NoSuchBucket = NoSuchBucket;
//# sourceMappingURL=NoSuchBucket.js.map